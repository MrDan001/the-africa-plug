import { head } from "@vercel/blob";
import { NextResponse } from "next/server";

const VIDEO_PATH = "homepage.mp4";

export async function GET() {
  try {
    const blob = await head(VIDEO_PATH);
    const url = new URL(blob.url);
    url.searchParams.set("v", blob.etag);
    return NextResponse.redirect(url, {
      status: 302,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return new NextResponse("Homepage video is not published yet.", { status: 404 });
  }
}
