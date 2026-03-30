"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const S = { green: "#1B6B4A", greenLight: "#2E9B6E" };

export default function AdminControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");

  const [delFrom, setDelFrom] = useState("");
  const [delTo, setDelTo] = useState("");
  const [delFromHour, setDelFromHour] = useState("");
  const [delToHour, setDelToHour] = useState("");
  const [msg, setMsg] = useState("");

  const btnStyle = (primary = false) => ({
    padding: "10px 20px", fontSize: 13, fontWeight: 700 as const, borderRadius: 8,
    border: primary ? "none" : "1px solid rgba(255,255,255,0.15)",
    background: primary ? `linear-gradient(135deg,${S.green},${S.greenLight})` : "transparent",
    color: primary ? "#fff" : "#aaa",
    cursor: "pointer" as const,
  });

  const inputStyle = {
    padding: "10px 14px", fontSize: 13, borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)",
    color: "#fff", outline: "none", fontFamily: "inherit",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* 기간 필터 */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "20px 24px",
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>기간 필터</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={inputStyle} />
          <span style={{ color: "#666" }}>~</span>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} style={inputStyle} />
          <button style={btnStyle(true)} onClick={() => {
            if (from && to) router.push(`/admin?from=${from}&to=${to}`);
          }}>필터 적용</button>
          <button style={btnStyle()} onClick={() => { setFrom(""); setTo(""); router.push("/admin"); }}>초기화</button>
        </div>
      </div>

      {/* 기간 삭제 */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "20px 24px",
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>기간 삭제</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <input type="date" value={delFrom} onChange={e => setDelFrom(e.target.value)} style={inputStyle} />
          <span style={{ color: "#666" }}>~</span>
          <input type="date" value={delTo} onChange={e => setDelTo(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <select value={delFromHour} onChange={e => setDelFromHour(e.target.value)} style={inputStyle}>
            <option value="">시작 시간 (전체)</option>
            {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{i}시</option>)}
          </select>
          <span style={{ color: "#666" }}>~</span>
          <select value={delToHour} onChange={e => setDelToHour(e.target.value)} style={inputStyle}>
            <option value="">끝 시간 (전체)</option>
            {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{i}시</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...btnStyle(), color: "#e74c3c", borderColor: "#e74c3c" }} onClick={async () => {
            if (!delFrom || !delTo) return;
            if (!confirm(`${delFrom} ~ ${delTo} 데이터를 삭제하시겠습니까?`)) return;
            const body: Record<string, string> = { from: delFrom, to: delTo };
            if (delFromHour) body.fromHour = delFromHour;
            if (delToHour) body.toHour = delToHour;
            const res = await fetch("/api/admin/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await res.json();
            setMsg(`삭제 완료: ${data.deleted}개 키`);
            setTimeout(() => location.reload(), 1500);
          }}>기간 삭제</button>

          <button style={{ ...btnStyle(), color: "#e74c3c", borderColor: "#e74c3c" }} onClick={async () => {
            if (!confirm("전체 데이터를 초기화하시겠습니까?")) return;
            const res = await fetch("/api/admin/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
            const data = await res.json();
            setMsg(`전체 초기화 완료: ${data.deleted}개 키`);
            setTimeout(() => location.reload(), 1500);
          }}>전체 초기화</button>
        </div>
        {msg && <div style={{ marginTop: 10, color: "#2E9B6E", fontSize: 13 }}>{msg}</div>}
      </div>
    </div>
  );
}
