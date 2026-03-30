"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function track(event: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event }),
  }).catch(() => {});
}

const S = {
  green: "#1B6B4A", greenLight: "#2E9B6E", accent: "#E8A838", danger: "#c0392b",
};

function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (!digits.startsWith("01")) return null;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  return null;
}

export default function ContactPage() {
  const router = useRouter();

  const [formName, setFormName] = useState("");
  const [formGender, setFormGender] = useState("");
  const [formAgeGroup, setFormAgeGroup] = useState("");
  const [formRegion, setFormRegion] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formPensionTypes, setFormPensionTypes] = useState<string[]>([]);
  const [formContent, setFormContent] = useState("");
  const [formSource, setFormSource] = useState("");
  const [formPrivacy, setFormPrivacy] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [formStep, setFormStep] = useState(1);
  const totalFormSteps = 7;

  useEffect(() => {
    track(`funnel_step_${formStep}`);
  }, [formStep]);

  useEffect(() => {
    track("funnel_enter");
  }, []);

  const handleSubmit = () => {
    if (!formPhone.trim()) { setFormError("전화번호를 입력해 주세요."); return; }
    const normalized = normalizePhone(formPhone);
    if (!normalized) { setFormError("올바른 전화번호를 입력해 주세요. (예: 01012345678)"); return; }
    if (!formPrivacy) { setFormError("개인정보 수집·이용에 동의해 주세요."); return; }

    setFormSubmitted(true);
    track("funnel_submitted");

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formName,
        gender: formGender,
        ageGroup: formAgeGroup,
        region: formRegion,
        phone: normalized,
        pension: formPensionTypes.join(", "),
        content: formContent,
        source: formSource,
        submittedAt: new Date().toLocaleString("ko-KR"),
      }),
    }).catch(() => {});
  };

  const inputStyle = (hasError = false) => ({
    width: "100%",
    padding: "16px",
    borderRadius: 12,
    border: hasError ? `1.5px solid ${S.danger}` : "1.5px solid #e8e8e8",
    fontSize: 16,
    boxSizing: "border-box" as const,
    outline: "none",
    fontFamily: "inherit",
  });

  return (
    <div style={{ fontFamily: "'Noto Sans KR','Apple SD Gothic Neo',sans-serif", color: "#2d2d2d", lineHeight: 1.7, minHeight: "100vh", background: "linear-gradient(135deg,#f5faf7 0%,#edf7f0 100%)", padding: "60px 20px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>

        {formSubmitted ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", borderTop: `5px solid ${S.green}` }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ display: "inline-block", background: "rgba(39,174,96,0.1)", border: "1px solid #27ae60", color: "#27ae60", fontSize: 14, fontWeight: 700, padding: "6px 18px", borderRadius: 20, marginBottom: 16 }}>&#10003; 상담 신청 완료</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#1a2e24", marginBottom: 8, wordBreak: "keep-all" }}>담당 전문가가 순차적으로 연락드립니다</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, wordBreak: "keep-all" }}>
                24시간 내에 연금 전문가가 연락드릴 예정입니다.<br />
                <strong>감사합니다.</strong>
              </div>
            </div>
            <a href="/" style={{
              display: "block", textAlign: "center", padding: "16px", fontSize: 15, fontWeight: 700,
              color: S.green, textDecoration: "none", borderRadius: 12,
              border: `1.5px solid ${S.green}`, background: "rgba(27,107,74,0.05)",
              marginTop: 20,
            }}>
              메인으로 돌아가기
            </a>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", borderTop: `5px solid ${S.green}` }}>

            {/* 헤더 */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: S.green, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>연금 종합 무료 상담</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: "#1a2e24" }}>전문가가 직접 설계해드립니다</div>
            </div>

            {/* 진행 바 */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ height: 5, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(formStep / totalFormSteps) * 100}%`, background: `linear-gradient(90deg,${S.green},${S.greenLight})`, borderRadius: 4, transition: "width 0.4s ease" }} />
              </div>
            </div>

            {/* Step 1: 알게 된 경로 */}
            {formStep === 1 && (
              <div>
                <div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>알게 된 경로</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2e24", marginBottom: 28 }}>어떻게 알게 되셨어요?</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["인스타그램", "틱톡", "스레드", "유튜브", "지인 소개", "기타"].map(s => (
                    <button key={s} type="button"
                      onClick={() => { setFormSource(s); setTimeout(() => setFormStep(2), 280); }}
                      style={{ width: "100%", padding: "16px 20px", borderRadius: 12, border: formSource === s ? `2px solid ${S.green}` : "1.5px solid #e8e8e8", background: formSource === s ? "rgba(27,107,74,0.08)" : "#fafafa", color: formSource === s ? S.green : "#333", fontSize: 15, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: 관심 연금 + 상담 내용 */}
            {formStep === 2 && (
              <div>
                <div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>관심 연금</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2e24", marginBottom: 20 }}>상담 받고 싶은 연금</div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                  {["국민연금", "퇴직연금", "IRP", "연금저축", "연금보험", "주택연금", "기타"].map(p => {
                    const checked = formPensionTypes.includes(p);
                    return (
                      <button key={p} type="button"
                        onClick={() => setFormPensionTypes(prev => checked ? prev.filter(x => x !== p) : [...prev, p])}
                        style={{ padding: "10px 18px", borderRadius: 50, border: checked ? `2px solid ${S.green}` : "2px solid #ddd", background: checked ? "rgba(27,107,74,0.1)" : "#fff", color: checked ? S.green : "#555", fontSize: 14, fontWeight: checked ? 700 : 500, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" as const }}>
                        {p}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#333", marginBottom: 10 }}>
                    상담 받고 싶은 내용 <span style={{ fontSize: 12, fontWeight: 400, color: "#aaa" }}>(선택)</span>
                  </div>
                  <textarea
                    value={formContent}
                    onChange={e => setFormContent(e.target.value)}
                    placeholder="궁금한 점이나 상담 받고 싶은 내용을 간략히 작성해 주세요."
                    rows={3}
                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid #e8e8e8", fontSize: 14, boxSizing: "border-box", outline: "none", resize: "none", fontFamily: "inherit", color: "#333", background: "#fafafa" }}
                  />
                </div>

                <button type="button" onClick={() => setFormStep(3)}
                  style={{ width: "100%", padding: 16, fontSize: 16, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${S.green},${S.greenLight})`, color: "#fff", boxShadow: "0 4px 16px rgba(27,107,74,0.3)" }}>
                  다음 &rarr;
                </button>
              </div>
            )}

            {/* Step 3: 성별 */}
            {formStep === 3 && (
              <div>
                <div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>성별</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2e24", marginBottom: 28 }}>성별을 알려주세요</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["남성", "여성"].map(g => (
                    <button key={g} type="button"
                      onClick={() => { setFormGender(g); setTimeout(() => setFormStep(4), 280); }}
                      style={{ width: "100%", padding: "20px", borderRadius: 12, border: formGender === g ? `2px solid ${S.green}` : "1.5px solid #e8e8e8", background: formGender === g ? "rgba(27,107,74,0.08)" : "#fafafa", color: formGender === g ? S.green : "#333", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: 연령대 */}
            {formStep === 4 && (
              <div>
                <div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>연령대</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2e24", marginBottom: 28 }}>연령대를 선택해주세요</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["20대", "30대", "40대", "50대", "60대", "70대 이상"].map(a => (
                    <button key={a} type="button"
                      onClick={() => { setFormAgeGroup(a); setTimeout(() => setFormStep(5), 280); }}
                      style={{ width: "100%", padding: "16px 20px", borderRadius: 12, border: formAgeGroup === a ? `2px solid ${S.green}` : "1.5px solid #e8e8e8", background: formAgeGroup === a ? "rgba(27,107,74,0.08)" : "#fafafa", color: formAgeGroup === a ? S.green : "#333", fontSize: 15, fontWeight: 600, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: 거주 지역 */}
            {formStep === 5 && (
              <div>
                <div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>거주 지역</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2e24", marginBottom: 28 }}>거주 지역을 선택해주세요</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["서울", "경기", "인천", "강원", "충청권", "호남권", "영남권", "제주", "기타"].map(r => (
                    <button key={r} type="button"
                      onClick={() => { setFormRegion(r); setTimeout(() => setFormStep(6), 280); }}
                      style={{ flex: "1 1 calc(33% - 10px)", minWidth: 80, padding: "14px 10px", borderRadius: 12, border: formRegion === r ? `2px solid ${S.green}` : "1.5px solid #e8e8e8", background: formRegion === r ? "rgba(27,107,74,0.08)" : "#fafafa", color: formRegion === r ? S.green : "#333", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: 이름 */}
            {formStep === 6 && (
              <div>
                <div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>이름</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2e24", marginBottom: 4 }}>성함을 알려주세요</div>
                <div style={{ marginBottom: 24 }} />
                <input type="text" value={formName} onChange={e => { setFormName(e.target.value); setFormError(""); }}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      if (!formName.trim()) { setFormError("이름을 입력해 주세요."); return; }
                      setFormError(""); setFormStep(7);
                    }
                  }}
                  placeholder="홍길동"
                  autoFocus
                  style={{ ...inputStyle(!!formError), marginBottom: formError ? 8 : 16 }} />
                {formError && (
                  <div style={{ color: S.danger, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>&#9888; {formError}</div>
                )}
                <button type="button" onClick={() => {
                  if (!formName.trim()) { setFormError("이름을 입력해 주세요."); return; }
                  setFormError(""); setFormStep(7);
                }}
                  style={{ width: "100%", padding: 16, fontSize: 16, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${S.green},${S.greenLight})`, color: "#fff", boxShadow: "0 4px 16px rgba(27,107,74,0.3)" }}>
                  다음 &rarr;
                </button>
              </div>
            )}

            {/* Step 7: 전화번호 + 개인정보 동의 + 제출 */}
            {formStep === 7 && (
              <div>
                <div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>마지막 단계</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2e24", marginBottom: 12 }}>연락처를 남겨주세요</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 24, background: "#f8f9fa", borderRadius: 10, padding: "12px 14px" }}>
                  24시간 내에 연락드립니다.<br />
                  <span style={{ color: "#888" }}>담당 전문가가 일반 휴대폰 번호로 연락드릴 예정입니다. 부득이하게 전화를 받지 못하실 경우, 문자를 남겨드리며 해당 번호로 다시 연락 부탁드립니다.</span>
                </div>
                <input type="tel" value={formPhone}
                  onChange={e => { setFormPhone(e.target.value); setFormError(""); }}
                  placeholder="01012345678"
                  autoFocus
                  style={{ ...inputStyle(!!formError && formError.includes("전화")), marginBottom: formError ? 8 : 20 }} />
                {formError && formError.includes("전화") && (
                  <div style={{ color: S.danger, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>&#9888; {formError}</div>
                )}

                <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.7, marginBottom: 12, maxHeight: 80, overflowY: "auto", border: "1px solid #e8e8e8", borderRadius: 8, padding: "10px 12px", background: "#fff" }}>
                    <strong>[수집 항목]</strong> 이름, 전화번호, 성별, 연령대, 거주 지역, 관심 연금, 상담 내용<br />
                    <strong>[수집 목적]</strong> 연금 상담 서비스 제공 및 전문가 연결<br />
                    <strong>[수집 유효기간]</strong> 수집동의일로부터 3개월<br />
                    <strong>[보유 기간]</strong> 1년<br />
                    귀하는 개인정보 수집·이용을 거부할 권리가 있으며, 거부 시 상담 서비스 이용이 제한될 수 있습니다.
                  </div>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <input type="checkbox" checked={formPrivacy} onChange={e => { setFormPrivacy(e.target.checked); setFormError(""); }}
                      style={{ width: 18, height: 18, accentColor: S.green, cursor: "pointer" }} />
                    <span style={{ fontSize: 13, color: "#333", fontWeight: 600 }}>개인정보 수집·이용에 동의합니다 <span style={{ color: S.danger }}>*</span></span>
                  </label>
                </div>

                {formError && !formError.includes("전화") && (
                  <div style={{ background: "#fff5f5", border: "1px solid #fcc", borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: S.danger, fontSize: 13, fontWeight: 600 }}>
                    &#9888; {formError}
                  </div>
                )}

                <button type="button" onClick={handleSubmit}
                  style={{ display: "block", width: "100%", padding: 18, fontSize: 17, fontWeight: 800, borderRadius: 12, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${S.green},${S.greenLight})`, color: "#fff", boxShadow: "0 8px 24px rgba(27,107,74,0.35)" }}>
                  무료 상담 신청하기 &rarr;
                </button>
              </div>
            )}

            {/* 이전 버튼 */}
            {formStep > 1 && (
              <button type="button" onClick={() => { setFormStep(s => s - 1); setFormError(""); }}
                style={{ width: "100%", marginTop: 12, padding: "12px", fontSize: 14, fontWeight: 600, borderRadius: 12, border: "1.5px solid #e8e8e8", background: "transparent", color: "#aaa", cursor: "pointer" }}>
                &larr; 이전으로
              </button>
            )}

          </div>
        )}

        {/* 뒤로가기 */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button type="button" onClick={() => router.back()}
            style={{ fontSize: 13, color: "#bbb", background: "none", border: "none", cursor: "pointer" }}>
            &larr; 메인으로 돌아가기
          </button>
        </div>

      </div>
    </div>
  );
}
