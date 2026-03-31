"use client";

import { useEffect } from "react";

function track(event: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event }),
  }).catch(() => {});
}

const S = {
  green: "#1B6B4A",
  greenLight: "#2E9B6E",
  accent: "#E8A838",
  dark: "#0D1F17",
  font: "'Noto Sans KR','Apple SD Gothic Neo',sans-serif",
};

const disclaimerStyle = {
  fontSize: 11,
  color: "#aaa",
  lineHeight: 1.6,
  marginTop: 8,
  wordBreak: "keep-all" as const,
};

export default function PensionConsultingPage() {
  useEffect(() => {
    track("page_view");
  }, []);

  return (
    <div style={{ fontFamily: S.font, color: "#2d2d2d", lineHeight: 1.7, overflowX: "hidden" }}>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #071510 0%, #0D1F17 40%, #1B6B4A 100%)",
        color: "#fff",
        padding: "80px 20px 70px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "140%", height: "140%",
          background: "radial-gradient(circle at 30% 40%, rgba(232,168,56,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <img src="/logo1.png" alt="연금박사" style={{ height: 80, margin: "0 auto 32px", display: "block" }}
            onError={e => (e.currentTarget.style.display = "none")} />

          <div style={{
            display: "inline-block", background: "rgba(232,168,56,0.15)", border: `1px solid ${S.accent}`,
            color: S.accent, fontSize: 13, fontWeight: 700, padding: "6px 20px",
            borderRadius: 50, marginBottom: 24, letterSpacing: 1,
          }}>
            연금 종합 상담 센터
          </div>

          <h1 style={{
            fontSize: "clamp(26px, 6vw, 46px)", fontWeight: 900, lineHeight: 1.25,
            marginBottom: 24, wordBreak: "keep-all",
          }}>
            연금 개시에 대해<br />
            <span style={{ color: S.accent }}>99%가 착각하는 것</span>
          </h1>

          <div style={{
            fontSize: "clamp(14px, 3.5vw, 17px)", color: "rgba(255,255,255,0.75)",
            lineHeight: 1.85, wordBreak: "keep-all",
          }}>
            연금 수령에도 <strong style={{ color: "#fff" }}>순서</strong>가 있습니다.<br />
            각각의 연금별로 언제, 어떻게 받는 게 좋은지<br />
            <span style={{ color: "#fff", fontWeight: 700 }}>
              연금 박사가 알려드립니다.
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION — 상담 CTA (Hero 하단)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #f5faf7 0%, #edf7f0 100%)",
        padding: "80px 20px",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "20px 24px",
            borderLeft: `4px solid ${S.green}`, marginBottom: 32,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: `linear-gradient(135deg, ${S.green}, ${S.greenLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0, color: "#fff", fontWeight: 800,
            }}>
              👨‍💼
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1a2e24" }}>
                20명의 연금 전문가가 맞춤 설계를 도와드립니다
              </div>
              <div style={{
                display: "inline-block", background: "rgba(27,107,74,0.1)",
                color: S.green, fontSize: 11, fontWeight: 700, padding: "2px 10px",
                borderRadius: 10, marginTop: 4,
              }}>
                무료 상담
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{
              fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900,
              color: "#1a2e24", marginBottom: 16, wordBreak: "keep-all",
            }}>
              연금, 받는 순서가 중요합니다
            </h2>
            <p style={{
              fontSize: 15, color: "#666", lineHeight: 1.8,
              wordBreak: "keep-all",
            }}>
              국민연금, 퇴직연금, IRP, 연금보험, 주택연금...<br />
              여러 연금을 가지고 계시다면<br />
              <strong style={{ color: "#333" }}>뭐부터 먼저 받을지, 순서와 시기를 결정하셔야 합니다.</strong>
            </p>
          </div>

          <div style={{
            background: "#fff", borderRadius: 20, padding: "36px 32px",
            border: `2px solid ${S.green}`, textAlign: "center",
            boxShadow: "0 8px 32px rgba(27,107,74,0.12)",
          }}>
            <div style={{ fontSize: 12, color: S.green, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
              무료 맞춤 상담
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a2e24", marginBottom: 8 }}>
              전문가가 직접 설계해드립니다
            </div>
            <div style={{ fontSize: 13, color: "#999", marginBottom: 28 }}>
              버튼 하나로 신청 완료 — 부담 없이 시작하세요.
            </div>

            <a
              href="/contact"
              onClick={() => track("btn_hero_apply")}
              style={{
                display: "inline-block", padding: "18px 56px", fontSize: 18, fontWeight: 800,
                color: "#fff", textDecoration: "none", borderRadius: 50,
                background: `linear-gradient(135deg, ${S.green}, ${S.greenLight})`,
                boxShadow: "0 8px 32px rgba(27,107,74,0.4)",
                transition: "transform 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              무료 상담 신청하기 &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — 문제 제기 (잘못된 판단)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #071510 0%, #0D1F17 100%)",
        color: "#fff", padding: "80px 20px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 900,
            textAlign: "center", marginBottom: 12, wordBreak: "keep-all",
          }}>
            대부분이 이렇게<br />
            <span style={{ color: S.accent }}>잘못 판단합니다</span>
          </h2>
          <div style={{ width: 40, height: 3, background: S.accent, margin: "0 auto 48px", borderRadius: 2 }} />

          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: "32px 28px", marginBottom: 32, textAlign: "center",
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>&#10060;</div>
            <div style={{
              fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, color: "#fff",
              lineHeight: 1.6, wordBreak: "keep-all", marginBottom: 16,
            }}>
              &ldquo;60세, 65세, 70세가 되면<br />
              모든 연금을 한 번에 다 개시해야 한다&rdquo;
            </div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, wordBreak: "keep-all" }}>
              이렇게 생각하시는 분들이 대부분입니다.<br />
              하지만 <strong style={{ color: S.accent }}>그렇지 않습니다.</strong>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 48 }}>
            {["국민연금", "퇴직연금", "IRP", "연금저축", "연금보험", "주택연금"].map(name => (
              <div key={name} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, padding: "16px 12px", textAlign: "center",
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{name}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: `linear-gradient(135deg, rgba(232,168,56,0.15), rgba(232,168,56,0.08))`,
            border: `1px solid ${S.accent}`, borderRadius: 16, padding: "28px 32px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, color: "#fff",
              lineHeight: 1.6, wordBreak: "keep-all",
            }}>
              여러 연금이 있다면<br />
              <span style={{ color: S.accent, fontSize: "clamp(18px, 4.5vw, 24px)" }}>
                뭐부터 먼저 받을지, 순서가 중요합니다
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — 핵심 원칙 (정답 공개)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #fff 0%, #f5faf7 100%)",
        padding: "80px 20px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 900,
            textAlign: "center", marginBottom: 12, color: "#1a2e24", wordBreak: "keep-all",
          }}>
            연금 수령의<br />
            <span style={{ color: S.green }}>핵심 원칙</span>
          </h2>
          <div style={{ width: 40, height: 3, background: S.green, margin: "0 auto 48px", borderRadius: 2 }} />

          <div style={{
            background: `linear-gradient(135deg, rgba(27,107,74,0.08), rgba(27,107,74,0.03))`,
            border: `2px solid ${S.green}`,
            borderRadius: 20, padding: "36px 32px", marginBottom: 40,
            boxShadow: "0 8px 32px rgba(27,107,74,0.12)", textAlign: "center",
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>&#128161;</div>
            <div style={{
              fontSize: "clamp(18px, 4.5vw, 26px)", fontWeight: 900, color: "#1a2e24",
              lineHeight: 1.4, wordBreak: "keep-all", marginBottom: 20,
            }}>
              좋은 연금은 <span style={{ color: S.green }}>최대한 늦게</span><br />
              안 좋은 연금은 <span style={{ color: "#c0392b" }}>최대한 빨리</span>
            </div>
            <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8, wordBreak: "keep-all" }}>
              이것이 연금을 효과적으로 수령하는 핵심 원칙입니다.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 40 }}>
            <div style={{
              background: "#fff", border: `2px solid ${S.green}`, borderRadius: 16, padding: "28px 24px",
              boxShadow: "0 4px 20px rgba(27,107,74,0.08)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: S.green, marginBottom: 16, letterSpacing: 1 }}>
                &#9989; 좋은 연금 (늦게 받기)
              </div>
              {["수익률이 높은 연금", "세금이 적은 연금", "평생 주는 연금"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: S.green, flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: "#333", fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: "#fff", border: "2px solid #e74c3c", borderRadius: 16, padding: "28px 24px",
              boxShadow: "0 4px 20px rgba(231,76,60,0.08)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#e74c3c", marginBottom: 16, letterSpacing: 1 }}>
                &#10060; 안 좋은 연금 (빨리 받기)
              </div>
              {["수익률이 낮은 연금", "세금이 높은 연금", "기간 한정 연금"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e74c3c", flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: "#333", fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: "#f8f9fa", borderRadius: 16, padding: "28px 28px",
            border: "1px solid #eee",
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1a2e24", marginBottom: 12 }}>
              &#128200; 주식 투자와 같은 원리입니다
            </div>
            <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8, wordBreak: "keep-all" }}>
              손실 나는 종목은 빨리 팔고, 수익 나는 종목은 계속 보유하는 것이 정석이듯이
              연금도 마찬가지입니다. <strong style={{ color: "#333" }}>안 좋은 연금은 빨리 빼서 쓰고,
              좋은 연금은 오래 묶혀두는 것이 훨씬 더 좋은 포트폴리오</strong>가 됩니다.
            </div>
            <p style={disclaimerStyle}>
              (상기 내용은 설계사 개인 의견이며 계약 체결에 따른 이익 또는 손실은 보험계약자 등에게 귀속됩니다)
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — 연금별 전략 (5종 카드)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #f5faf7 0%, #edf7f0 100%)",
        padding: "80px 20px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 900,
            textAlign: "center", marginBottom: 12, color: "#1a2e24", wordBreak: "keep-all",
          }}>
            연금별 개시 전략,<br />
            <span style={{ color: S.green }}>이렇게 다릅니다</span>
          </h2>
          <div style={{ width: 40, height: 3, background: S.green, margin: "0 auto 48px", borderRadius: 2 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* 카드 1: 국민연금 */}
            <div style={{
              background: `linear-gradient(135deg, rgba(27,107,74,0.08), rgba(27,107,74,0.03))`,
              border: `2px solid ${S.green}`, borderRadius: 16, padding: "28px 28px",
              boxShadow: "0 4px 20px rgba(27,107,74,0.12)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, width: 52, height: 52, display: "flex", alignItems: "center",
                  justifyContent: "center", background: "rgba(27,107,74,0.15)", color: S.green,
                  borderRadius: 14, flexShrink: 0,
                }}>
                  01
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1a2e24", marginBottom: 10, wordBreak: "keep-all" }}>
                    국민연금
                  </div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8, wordBreak: "keep-all", marginBottom: 12 }}>
                    조기 수령 시 <strong style={{ color: "#e74c3c" }}>연 -6%</strong> 감액,
                    연기 수령 시 <strong style={{ color: S.green }}>연 +7.2%</strong> 증가합니다.
                    1년 묶히면 7.2%를 더 주는 셈이죠.
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    <span style={{ background: "rgba(231,76,60,0.1)", color: "#e74c3c", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      조기 수령: 연 -6% 감액
                    </span>
                    <span style={{ background: "rgba(27,107,74,0.1)", color: S.green, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      연기 수령: 연 +7.2% 증가
                    </span>
                  </div>
                  <div style={{
                    background: "rgba(27,107,74,0.08)", borderRadius: 10, padding: "12px 16px",
                    border: `1px solid rgba(27,107,74,0.2)`,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: S.green, marginBottom: 4 }}>
                      &#128218; 연금 박사 추천
                    </div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, wordBreak: "keep-all" }}>
                      건강이 괜찮고 유족이 있다면, <strong>5년 연기하여 70세부터</strong> 받으시는 것이 가장 유리합니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 2: 퇴직연금 */}
            <div style={{
              background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: "28px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, width: 52, height: 52, display: "flex", alignItems: "center",
                  justifyContent: "center", background: "#f8f9fa", color: "#666",
                  borderRadius: 14, flexShrink: 0,
                }}>
                  02
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1a2e24", marginBottom: 10, wordBreak: "keep-all" }}>
                    퇴직연금
                  </div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8, wordBreak: "keep-all", marginBottom: 12 }}>
                    핵심은 <strong style={{ color: "#333" }}>퇴직소득세율</strong>입니다.
                    20년 근속 1억 퇴직금의 세율은 1.1%에 불과합니다.
                    세율이 낮다면 일시금 수령 후 다른 연금에 재투자하는 것이 더 유리할 수 있습니다.
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ background: "#f8f9fa", color: "#555", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      세율 낮으면 → 일시금 OK
                    </span>
                    <span style={{ background: "#f8f9fa", color: "#555", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      세율 높으면 → IRP 연금 수령
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 3: 연금저축 & IRP */}
            <div style={{
              background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: "28px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, width: 52, height: 52, display: "flex", alignItems: "center",
                  justifyContent: "center", background: "#f8f9fa", color: "#666",
                  borderRadius: 14, flexShrink: 0,
                }}>
                  03
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1a2e24", marginBottom: 10, wordBreak: "keep-all" }}>
                    연금저축 & IRP
                  </div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8, wordBreak: "keep-all", marginBottom: 12 }}>
                    운용을 잘해서 수익이 나고 있다면 천천히 개시하세요.
                    하지만 운용을 못하거나 저금리 예금으로만 운용 중이라면 빨리 인출하세요.
                  </div>
                  <div style={{
                    background: "rgba(232,168,56,0.08)", borderRadius: 10, padding: "12px 16px",
                    border: "1px solid rgba(232,168,56,0.2)",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: S.accent, marginBottom: 4 }}>
                      &#9888;&#65039; 주의사항
                    </div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, wordBreak: "keep-all" }}>
                      잔고가 1억 이상이면 빨리 인출 시작하세요. 연간 세제혜택 한도가 <strong>1,500만원</strong>이라
                      늦으면 다 못 빼쓸 수 있습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 4: 연금보험 */}
            <div style={{
              background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: "28px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, width: 52, height: 52, display: "flex", alignItems: "center",
                  justifyContent: "center", background: "#f8f9fa", color: "#666",
                  borderRadius: 14, flexShrink: 0,
                }}>
                  04
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1a2e24", marginBottom: 10, wordBreak: "keep-all" }}>
                    연금보험
                  </div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8, wordBreak: "keep-all", marginBottom: 12 }}>
                    핵심은 <strong style={{ color: "#333" }}>최저보증이율</strong>입니다.
                    연단리 7~8% 최저보증 상품은 묶혀뒀다가 천천히 개시하세요.
                    0.5~1%짜리는 빨리 개시하는 게 낫습니다.
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ background: "rgba(27,107,74,0.1)", color: S.green, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      고이율 → 종신연금으로 평생
                    </span>
                    <span style={{ background: "rgba(231,76,60,0.1)", color: "#e74c3c", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      저이율 → 확정기간으로 빨리
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 5: 주택연금 */}
            <div style={{
              background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: "28px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, width: 52, height: 52, display: "flex", alignItems: "center",
                  justifyContent: "center", background: "#f8f9fa", color: "#666",
                  borderRadius: 14, flexShrink: 0,
                }}>
                  05
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1a2e24", marginBottom: 10, wordBreak: "keep-all" }}>
                    주택연금
                  </div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8, wordBreak: "keep-all", marginBottom: 12 }}>
                    가입 시점의 <strong style={{ color: "#333" }}>집값</strong>이 연금액을 결정합니다.
                    같은 집도 가격이 높을 때 가입하면 더 많은 연금을 받을 수 있습니다.
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ background: "#f8f9fa", color: "#555", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      집값 상승 중 → 천천히 가입
                    </span>
                    <span style={{ background: "#f8f9fa", color: "#555", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      집값 정체/하락 → 빨리 가입
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <p style={disclaimerStyle}>
              (상기 내용은 일반적인 연금 전략 정보이며, 개인별 상황에 따라 최적의 전략이 달라질 수 있습니다)
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — 요약/결론
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #fff 0%, #f8f6f0 100%)",
        padding: "80px 20px",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(22px, 5vw, 34px)", fontWeight: 900,
            textAlign: "center", color: "#1a2e24", marginBottom: 12,
            wordBreak: "keep-all",
          }}>
            개시 시점만 잘 맞춰도<br />
            <span style={{ color: S.green }}>연금액이 훨씬 늘어납니다</span>
          </h2>
          <div style={{ width: 40, height: 3, background: S.green, margin: "0 auto 48px", borderRadius: 2 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                icon: "&#128176;",
                title: "같은 연금으로 더 많이 받기",
                desc: "연금 개시 시점과 순서를 최적화하면, 같은 연금이라도 수령액이 크게 달라집니다. 좋은 연금은 늦추고, 안 좋은 연금은 빨리 받으세요.",
              },
              {
                icon: "&#128202;",
                title: "세금은 줄이고, 수익은 높이고",
                desc: "연금별 세금 구조를 이해하면 불필요한 세금을 줄일 수 있습니다. 퇴직소득세율, 연금소득세율을 꼼꼼히 따져보세요.",
              },
              {
                icon: "&#9201;",
                title: "시기를 놓치면 되돌릴 수 없습니다",
                desc: "연금 개시는 한 번 결정하면 되돌리기 어렵습니다. 전문가와 미리 상담하고 최적의 타이밍에 개시하세요.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: "flex", alignItems: "flex-start", gap: 16,
                background: "#fff", border: "1px solid #eee", borderRadius: 16,
                padding: "24px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  fontSize: 26, width: 48, height: 48, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "rgba(27,107,74,0.08)", borderRadius: 12, flexShrink: 0,
                }} dangerouslySetInnerHTML={{ __html: icon }} />
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#1a2e24", marginBottom: 6, wordBreak: "keep-all" }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.7, wordBreak: "keep-all" }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — 하단 CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #f5faf7 0%, #edf7f0 100%)",
        padding: "80px 20px",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "20px 24px",
            borderLeft: `4px solid ${S.green}`, marginBottom: 32,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: `linear-gradient(135deg, ${S.green}, ${S.greenLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0, color: "#fff", fontWeight: 800,
            }}>
              👨‍💼
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1a2e24" }}>
                20명의 연금 전문가가 맞춤 설계를 도와드립니다
              </div>
              <div style={{
                display: "inline-block", background: "rgba(27,107,74,0.1)",
                color: S.green, fontSize: 11, fontWeight: 700, padding: "2px 10px",
                borderRadius: 10, marginTop: 4,
              }}>
                무료 상담
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{
              fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900,
              color: "#1a2e24", marginBottom: 16, wordBreak: "keep-all",
            }}>
              고민되시죠?<br />
              전문가에게 맡기세요.
            </h2>
            <p style={{
              fontSize: 15, color: "#666", lineHeight: 1.8,
              wordBreak: "keep-all",
            }}>
              국민연금, 퇴직연금, IRP, 연금보험, 주택연금...<br />
              어떤 연금을 언제 개시해야 할지<br />
              <strong style={{ color: "#333" }}>연금 전문가가 최적의 순서를 설계해 드립니다.</strong>
            </p>
          </div>

          <div style={{
            background: "#fff", borderRadius: 20, padding: "36px 32px",
            border: `2px solid ${S.green}`, textAlign: "center",
            boxShadow: "0 8px 32px rgba(27,107,74,0.12)",
          }}>
            <div style={{ fontSize: 12, color: S.green, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
              무료 맞춤 상담
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a2e24", marginBottom: 8 }}>
              전문가가 직접 설계해드립니다
            </div>
            <div style={{ fontSize: 13, color: "#999", marginBottom: 28 }}>
              버튼 하나로 신청 완료 — 부담 없이 시작하세요.
            </div>

            <a
              href="/contact"
              onClick={() => track("btn_bottom_apply")}
              style={{
                display: "inline-block", padding: "18px 56px", fontSize: 18, fontWeight: 800,
                color: "#fff", textDecoration: "none", borderRadius: 50,
                background: `linear-gradient(135deg, ${S.green}, ${S.greenLight})`,
                boxShadow: "0 8px 32px rgba(27,107,74,0.4)",
                transition: "transform 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              무료 상담 신청하기 &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: "#111", color: "#555", padding: "40px 20px 32px",
        textAlign: "center", fontSize: 12, lineHeight: 1.8,
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, padding: "16px 20px", marginBottom: 20,
            textAlign: "left",
          }}>
            <p style={{ color: "#888", wordBreak: "keep-all", margin: 0 }}>
              보험계약자가 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서
              &#9312;질병이력, 연령증가 등으로 가입이 거절되거나 보험료가 인상될 수 있습니다
              &#9313;가입상품에 따라 새로운 면책기간 적용 및 보장제한 등 기타 불이익이 발생할 수 있습니다
            </p>
          </div>

          <p style={{ wordBreak: "keep-all", marginBottom: 16, color: "#666" }}>
            본 페이지는 연금 종합 상담에 대한 일반적인 정보 제공을 목적으로 하며,
            실제 연금 조건은 각 상품 약관을 기준으로 합니다.
            개인별 상황에 따라 최적의 전략이 달라질 수 있습니다.
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, marginTop: 16 }}>
            <p style={{ color: "#777", marginBottom: 4 }}>
              (주)엠금융서비스 보험대리점 (등록번호 2009028021호)
            </p>
            <p style={{ color: "#777", marginBottom: 12 }}>
              설계사 이영주 (등록번호 20010173010013호)
            </p>
            <p style={{ color: S.green, fontWeight: 700 }}>
              엠금융서비스 준법 심의필 26-xx-xxx (2026-xx-xx~2027-xx-xx)
            </p>
          </div>

          <p style={{ marginTop: 16, color: "#444" }}>
            &copy; 연금박사. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
