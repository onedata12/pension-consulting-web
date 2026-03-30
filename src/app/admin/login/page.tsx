"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErr(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #071510, #0D1F17)",
      fontFamily: "'Noto Sans KR',sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20, padding: "40px 36px", width: 360,
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: "#1B6B4A", fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>ADMIN</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>관리자 로그인</div>
        </div>

        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="비밀번호"
          autoFocus
          style={{
            width: "100%", padding: "16px", borderRadius: 12, fontSize: 16,
            border: err ? "1.5px solid #e74c3c" : "1.5px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.08)", color: "#fff",
            boxSizing: "border-box", outline: "none", fontFamily: "inherit",
            marginBottom: err ? 8 : 20,
          }}
        />
        {err && <div style={{ color: "#e74c3c", fontSize: 13, marginBottom: 16 }}>비밀번호가 틀렸습니다.</div>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", padding: 16, fontSize: 16, fontWeight: 700,
            borderRadius: 12, border: "none", cursor: loading ? "wait" : "pointer",
            background: loading ? "#555" : "linear-gradient(135deg, #1B6B4A, #2E9B6E)",
            color: "#fff", boxShadow: "0 4px 16px rgba(27,107,74,0.3)",
          }}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
}
