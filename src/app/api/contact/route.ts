import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, gender, ageGroup, region, phone, pension, content, source, submittedAt } = body;

    // Google Apps Script
    const gasUrl = process.env.APPS_SCRIPT_URL;
    if (gasUrl) {
      const params = new URLSearchParams({
        name: name || "",
        gender: gender || "",
        ageGroup: ageGroup || "",
        region: region || "",
        phone: phone || "",
        pension: pension || "",
        content: content || "",
        source: source || "",
        submittedAt: submittedAt || "",
      });
      fetch(`${gasUrl}?${params.toString()}`).catch(() => {});
    }

    // Telegram
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChat = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChat) {
      const text = [
        `<b>새 연금종합상담 신청</b>`,
        `이름: ${name || "-"}`,
        `전화: ${phone || "-"}`,
        `성별/연령: ${gender || "-"} / ${ageGroup || "-"}`,
        `지역: ${region || "-"}`,
        `관심연금: ${pension || "-"}`,
        `유입경로: ${source || "-"}`,
        `상담내용: ${content || "-"}`,
      ].join("\n");

      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text, parse_mode: "HTML" }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
