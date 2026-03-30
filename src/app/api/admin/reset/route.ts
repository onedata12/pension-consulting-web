import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "03267";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (token !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json();
  const { from, to, fromHour, toHour } = body;

  // Full reset
  if (!from && !to) {
    const keys = await kv.keys("track:*");
    if (keys.length > 0) {
      for (const k of keys) await kv.del(k);
    }
    return NextResponse.json({ ok: true, deleted: keys.length, mode: "all" });
  }

  // Range delete
  const startDate = new Date(from);
  const endDate = new Date(to);
  let deleted = 0;

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const day = d.toISOString().slice(0, 10);
    const dayKeys = await kv.keys(`track:*:${day}`);

    if (fromHour !== undefined && toHour !== undefined) {
      // Hourly range delete
      for (let h = Number(fromHour); h <= Number(toHour); h++) {
        const hh = String(h).padStart(2, "0");
        const hourKeys = await kv.keys(`track:*:${day}:${hh}`);
        for (const k of hourKeys) {
          const val = (await kv.get<number>(k)) || 0;
          const baseKey = k.split(":").slice(0, 2).join(":");
          await kv.decrby(baseKey, val);
          await kv.del(k);
          deleted++;
        }
      }
      for (const k of dayKeys) {
        const hourlyKeys = await kv.keys(`${k}:*`);
        if (hourlyKeys.length === 0) {
          await kv.del(k);
          deleted++;
        }
      }
    } else {
      // Full day delete
      for (const k of dayKeys) {
        const val = (await kv.get<number>(k)) || 0;
        const baseKey = k.split(":").slice(0, 2).join(":");
        await kv.decrby(baseKey, val);
        const hourKeys = await kv.keys(`${k}:*`);
        for (const hk of hourKeys) await kv.del(hk);
        await kv.del(k);
        deleted++;
      }
    }
  }

  return NextResponse.json({
    ok: true,
    deleted,
    mode: fromHour !== undefined ? "hourly" : "range",
    from,
    to,
  });
}
