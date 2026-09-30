import { handleUpload } from "@vercel/blob/client";
import { head } from "@vercel/blob";
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "tap_admin";
const MAX_BYTES = 50 * 1024 * 1024;
const VIDEO_PATH = "homepage.mp4";

function validSession(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const raw = request.headers.get("cookie")?.match(new RegExp("(^|;\\s*)" + COOKIE + "=([^;]+)"))?.[2];
  if (!password || !raw) return false;
  const [issued, sig] = raw.split(".");
  if (!issued || !sig || Date.now() - Number(issued) > 12 * 60 * 60 * 1000) return false;
  const expected = createHmac("sha256", password).update(issued).digest("hex");
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export async function GET(request: Request) {
  if (!validSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const blob = await head(VIDEO_PATH);
    return NextResponse.json({
      exists: true,
      name: VIDEO_PATH,
      size: blob.size,
      url: "/api/homepage-video"
    });
  } catch {
    return NextResponse.json({ exists: false, error: "Video is not published yet." });
  }
}

export async function POST(request: Request) {
  if (!validSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const body = await request.json();

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, _clientPayload, _multipart) => ({
        allowedContentTypes: ["video/mp4"],
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: false,
        allowOverwrite: true,
      }),
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to prepare the video upload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
