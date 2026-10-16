import { handleUpload } from "@vercel/blob/client";
import { head } from "@vercel/blob";
import { NextResponse } from "next/server";

const MAX_BYTES = 50 * 1024 * 1024;
const VIDEO_PATH = "homepage.mp4";

export async function GET(_request: Request) {

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
