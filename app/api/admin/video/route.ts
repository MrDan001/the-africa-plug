import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "tap_admin";
const MAX_BYTES = 50 * 1024 * 1024;
const VIDEO_PATH = "public/videos/homepage.mp4";
const OWNER = "MrDan001";
const REPO = "the-africa-plug";
const BRANCH = "main";

function validSession(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const raw = request.headers.get("cookie")?.match(new RegExp("(^|;\\s*)" + COOKIE + "=([^;]+)"))?.[2];
  if (!password || !raw) return false;
  const [issued, sig] = raw.split(".");
  if (!issued || !sig || Date.now() - Number(issued) > 12 * 60 * 60 * 1000) return false;
  const expected = createHmac("sha256", password).update(issued).digest("hex");
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

async function github(path: string, init: RequestInit = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured.");
  return fetch("https://api.github.com/repos/" + OWNER + "/" + REPO + "/contents/" + path, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + token,
      "X-GitHub-Api-Version": "2026-03-10",
      ...(init.headers || {})
    },
    cache: "no-store"
  });
}

export async function GET(request: Request) {
  if (!validSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const response = await github(VIDEO_PATH + "?ref=" + BRANCH);
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ exists: false, error: "Video is not published yet." });
  return NextResponse.json({ exists: true, name: data?.name, size: data?.size, url: "/videos/homepage.mp4" });
}

export async function POST(request: Request) {
  if (!validSession(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Upload a video file." }, { status: 400 });
  }

  const form = await request.formData();
  const file = form.get("video");
  if (!(file instanceof File)) return NextResponse.json({ error: "No video selected." }, { status: 400 });
  if (file.type !== "video/mp4") return NextResponse.json({ error: "Only MP4 videos are supported." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Video must be 50 MB or smaller." }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const encoded = bytes.toString("base64");

  const existingResponse = await github(VIDEO_PATH + "?ref=" + BRANCH);
  const existing = existingResponse.ok ? await existingResponse.json() : null;

  const body = {
    message: "Update homepage promo video",
    content: encoded,
    branch: BRANCH,
    ...(existing?.sha ? { sha: existing.sha } : {})
  };

  const upload = await github(VIDEO_PATH, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const result = await upload.json().catch(() => null);

  if (!upload.ok) {
    return NextResponse.json({ error: result?.message || "GitHub could not publish the video." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: "Video published. The site will update after the new deployment finishes." });
}
