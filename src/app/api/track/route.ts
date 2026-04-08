import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  try {
    const { event, utm_source, utm_content } = await req.json();
    if (!event) return NextResponse.json({ ok: false });

    const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const day = now.toISOString().slice(0, 10);
    const hour = String(now.getUTCHours()).padStart(2, "0");

    await Promise.all([
      kv.incr(`track:${event}`),
      kv.incr(`track:${event}:${day}`),
      kv.incr(`track:${event}:${day}:${hour}`),
    ]);

    console.log(`[track] ${event} | utm_source=${utm_source || "direct"} | utm_content=${utm_content || "-"} | ${day} ${hour}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
