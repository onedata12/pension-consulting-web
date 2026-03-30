import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { kv } from "@vercel/kv";
import { Suspense } from "react";
import TrafficChart from "./TrafficChart";
import AdminControls from "./AdminControls";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "03267";

const S = { green: "#1B6B4A", greenLight: "#2E9B6E", accent: "#E8A838" };

async function getCount(key: string) {
  return ((await kv.get<number>(key)) || 0);
}

async function getResponses(): Promise<Record<string, string>[]> {
  const url = process.env.APPS_SCRIPT_READ_URL;
  if (!url) return [];
  try {
    const res = await fetch(url, { cache: "no-store" });
    return await res.json();
  } catch {
    return [];
  }
}

export default async function AdminPage(props: { searchParams: Promise<{ from?: string; to?: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (token !== ADMIN_PASSWORD) redirect("/admin/login");

  const searchParams = await props.searchParams;
  const { from, to } = searchParams;

  // Summary
  const visits = await getCount("track:page_view");
  const funnelEnter = await getCount("track:funnel_enter");
  const submitted = await getCount("track:funnel_submitted");
  const convVisit = visits ? ((submitted / visits) * 100).toFixed(1) : "0";
  const convFunnel = funnelEnter ? ((submitted / funnelEnter) * 100).toFixed(1) : "0";

  // Daily traffic (last 30 days)
  const days: { date: string; 방문: number; 제출: number; 전환율: number }[] = [];
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const day = d.toISOString().slice(0, 10);

    if (from && day < from) continue;
    if (to && day > to) continue;

    const v = await getCount(`track:page_view:${day}`);
    const s = await getCount(`track:funnel_submitted:${day}`);
    days.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      방문: v,
      제출: s,
      전환율: v ? Math.round((s / v) * 1000) / 10 : 0,
    });
  }

  // Button clicks
  const btnHero = await getCount("track:btn_hero_apply");
  const btnBottom = await getCount("track:btn_bottom_apply");
  const maxBtn = Math.max(btnHero, btnBottom, 1);

  // Funnel
  const funnelSteps: number[] = [];
  for (let i = 1; i <= 7; i++) funnelSteps.push(await getCount(`track:funnel_step_${i}`));
  funnelSteps.push(submitted);

  // Responses
  const responses = await getResponses();

  const cardStyle = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12, padding: "20px 24px",
  };

  const sectionTitle = (text: string) => (
    <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 16 }}>{text}</div>
  );

  // Distribution analysis
  const distFields: { label: string; key: string; options: string[] }[] = [
    { label: "성별", key: "gender", options: ["남성", "여성"] },
    { label: "연령대", key: "ageGroup", options: ["20대", "30대", "40대", "50대", "60대", "70대 이상"] },
    { label: "거주 지역", key: "region", options: ["서울", "경기", "인천", "강원", "충청권", "호남권", "영남권", "제주", "기타"] },
    { label: "유입 경로", key: "source", options: ["인스타그램", "틱톡", "스레드", "유튜브", "지인 소개", "기타"] },
    { label: "관심 연금", key: "pension", options: ["국민연금", "퇴직연금", "IRP", "연금저축", "연금보험", "주택연금", "기타"] },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #071510, #0D1F17)",
      fontFamily: "'Noto Sans KR',sans-serif", color: "#ddd", padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 12, color: S.green, fontWeight: 700, letterSpacing: 2 }}>ADMIN DASHBOARD</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>연금 종합 상담</div>
          </div>
          <a href="/" style={{ fontSize: 13, color: "#888", textDecoration: "none" }}>&larr; 사이트로</a>
        </div>

        {/* Controls */}
        <Suspense fallback={null}>
          <AdminControls />
        </Suspense>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, margin: "24px 0" }}>
          {[
            { label: "사이트 방문", value: visits, color: "#1B6B4A" },
            { label: "폼 진입", value: funnelEnter, color: "#2E9B6E" },
            { label: "제출 완료", value: submitted, color: "#E8A838" },
            { label: "방문→제출", value: `${convVisit}%`, color: "#fff" },
            { label: "폼 전환율", value: `${convFunnel}%`, color: "#fff" },
          ].map(c => (
            <div key={c.label} style={cardStyle}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: c.color }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* Traffic Chart */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          {sectionTitle("일별 트래픽")}
          <TrafficChart data={days} />
        </div>

        {/* Button Clicks */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          {sectionTitle("버튼 클릭수")}
          {[
            { label: "Hero CTA", value: btnHero },
            { label: "하단 CTA", value: btnBottom },
          ].map(b => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 80, fontSize: 12, color: "#aaa" }}>{b.label}</div>
              <div style={{ flex: 1, height: 20, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(b.value / maxBtn) * 100}%`, background: `linear-gradient(90deg,${S.green},${S.greenLight})`, borderRadius: 4 }} />
              </div>
              <div style={{ width: 40, fontSize: 13, fontWeight: 700, color: "#fff", textAlign: "right" }}>{b.value}</div>
            </div>
          ))}
        </div>

        {/* Funnel */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          {sectionTitle("상담 폼 퍼널")}
          {["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "제출"].map((label, i) => {
            const val = funnelSteps[i];
            const prev = i > 0 ? funnelSteps[i - 1] : val;
            const drop = prev > 0 ? Math.round(((prev - val) / prev) * 100) : 0;
            const maxF = Math.max(...funnelSteps, 1);
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <div style={{ width: 50, fontSize: 12, color: "#aaa" }}>{label}</div>
                <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(val / maxF) * 100}%`, background: i === 7 ? S.accent : `linear-gradient(90deg,${S.green},${S.greenLight})`, borderRadius: 4 }} />
                </div>
                <div style={{ width: 40, fontSize: 12, fontWeight: 700, color: "#fff", textAlign: "right" }}>{val}</div>
                {i > 0 && drop > 0 && (
                  <div style={{ width: 45, fontSize: 11, color: "#e74c3c", textAlign: "right" }}>-{drop}%</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Distribution */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: 24 }}>
          {distFields.map(field => {
            const counts: Record<string, number> = {};
            field.options.forEach(o => { counts[o] = 0; });
            responses.forEach(r => {
              const val = r[field.key] || "";
              if (field.key === "pension") {
                val.split(",").map(v => v.trim()).forEach(v => { if (counts[v] !== undefined) counts[v]++; });
              } else {
                if (counts[val] !== undefined) counts[val]++;
              }
            });
            const maxC = Math.max(...Object.values(counts), 1);
            const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

            return (
              <div key={field.label} style={cardStyle}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{field.label}</div>
                {field.options.map(o => (
                  <div key={o} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 60, fontSize: 11, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o}</div>
                    <div style={{ flex: 1, height: 14, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(counts[o] / maxC) * 100}%`, background: S.green, borderRadius: 3 }} />
                    </div>
                    <div style={{ width: 24, fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "right" }}>{counts[o]}</div>
                    <div style={{ width: 32, fontSize: 10, color: "#888", textAlign: "right" }}>{Math.round((counts[o] / total) * 100)}%</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Responses Table */}
        <div style={{ ...cardStyle, overflowX: "auto" }}>
          {sectionTitle(`신청자 목록 (${responses.length}명)`)}
          {responses.length === 0 ? (
            <div style={{ color: "#666", fontSize: 13 }}>아직 신청자가 없습니다.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, color: "#ccc" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  {["시각", "이름", "전화", "성별", "연령대", "지역", "연금", "경로", "내용"].map(h => (
                    <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: "#888", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...responses].reverse().map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "8px 6px", whiteSpace: "nowrap" }}>{r.submittedAt || "-"}</td>
                    <td style={{ padding: "8px 6px" }}>{r.name || "-"}</td>
                    <td style={{ padding: "8px 6px", whiteSpace: "nowrap" }}>{r.phone || "-"}</td>
                    <td style={{ padding: "8px 6px" }}>{r.gender || "-"}</td>
                    <td style={{ padding: "8px 6px" }}>{r.ageGroup || "-"}</td>
                    <td style={{ padding: "8px 6px" }}>{r.region || "-"}</td>
                    <td style={{ padding: "8px 6px", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }}>{r.pension || "-"}</td>
                    <td style={{ padding: "8px 6px" }}>{r.source || "-"}</td>
                    <td style={{ padding: "8px 6px", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}>{r.content || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 32, color: "#555", fontSize: 12 }}>
          &copy; 연금박사 Admin Dashboard
        </div>
      </div>
    </div>
  );
}
