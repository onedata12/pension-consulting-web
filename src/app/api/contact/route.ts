import { NextResponse } from "next/server";

const UNIFIED_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyk3FojrBtIAdr-9KHz4Wf0HTGLfVH-dr9_jIUeFTZUpBl3PFTWl3H06JdJzcGczYSEmg/exec";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, gender, ageGroup, region, phone, pension, content, source, utm_source, utm_content, submittedAt } = body;

    // 통합 시트로 전송
    const params = new URLSearchParams({
      landing: "연금 종합 상담",
      name: name || "",
      gender: gender || "",
      ageGroup: ageGroup || "",
      region: region || "",
      phone: phone || "",
      pension: pension || "",
      content: content || "",
      source: source || "",
      utm_source: utm_source || "",
      utm_content: utm_content || "",
      submittedAt: submittedAt || "",
    });
    try {
      await fetch(`${UNIFIED_SCRIPT_URL}?${params.toString()}`, { method: "GET", redirect: "follow" });
    } catch (e) {
      console.error("GAS error:", e);
    }

    // Telegram
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChat = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChat) {
      const text = [
        `<b>새 상담 신청 [연금 종합 상담]</b>`,
        `이름: ${name || "-"}`,
        `전화: ${phone || "-"}`,
        `성별/연령: ${gender || "-"} / ${ageGroup || "-"}`,
        `지역: ${region || "-"}`,
        `관심연금: ${pension || "-"}`,
        `유입경로: ${source || "-"}`,
        `유입채널: ${utm_source || "직접유입"}`,
        utm_content ? `UTM콘텐츠: ${utm_content}` : "",
        `상담내용: ${content || "-"}`,
      ].filter(Boolean).join("\n");

      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: tgChat, text, parse_mode: "HTML" }),
        });
      } catch (e) {
        console.error("Telegram error:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact submit error:", e);
    return NextResponse.json({ success: true });
  }
}
