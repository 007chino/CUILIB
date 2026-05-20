// screens-quiz.jsx — Práctica / Quiz con GAZAPITO
const { useState, useEffect, useRef } = React;

// ── TypewriterText ─────────────────────────────────────────────
function TypewriterText({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{displayed}</span>;
}

// ── ExplicacionAnimada ─────────────────────────────────────────
function ExplicacionAnimada({ step }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      marginTop: 14,
      padding: '16px 18px',
      borderRadius: 14,
      background: 'color-mix(in oklab, var(--warning) 8%, transparent)',
      border: '1px solid color-mix(in oklab, var(--warning) 30%, transparent)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--warning)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="sparkle" size={14}/> Así se resuelve
      </div>
      {step.diagram && (
        <div style={{ marginBottom: 10 }}>
          <DiagramaChat tipo={step.diagram} />
        </div>
      )}
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-2)' }}>
        <TypewriterText text={step.explanation || ''} />
      </p>
    </div>
  );
}

function ScreenQuiz({ moduleId, onExit, onBack, user }) {
  const steps = (() => {
    const pool = (QUIZ_BY_MODULE && QUIZ_BY_MODULE[moduleId]) || [];
    return pool.length > 0 ? pool : QUIZ_STEPS;
  })();

  const [stepIdx, setStepIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [filled, setFilled] = useState({});
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | null
  const [done, setDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const step = steps[stepIdx];
  const total = steps.length;

  // Reset per-step state
  useEffect(() => { setFilled({}); setPicked(null); setResult(null); }, [stepIdx]);

  const onComprobar = () => {
    if (step.type === 'fill-two') {
      const a = filled.slot0, b = filled.slot1;
      if (!a || !b) return;
      const c0 = a === step.diagrams[0].answer;
      const c1 = b === step.diagrams[1].answer;
      const ok = c0 && c1;
      setResult(ok ? 'correct' : 'wrong');
      if (!ok) setHearts(h => Math.max(0, h - 1));
    } else {
      if (!picked) return;
      const ok = picked === step.answer;
      setResult(ok ? 'correct' : 'wrong');
      if (!ok) setHearts(h => Math.max(0, h - 1));
    }
  };

  const onContinuar = () => {
    if (result === 'correct') setCorrectCount(c => c + 1);
    if (stepIdx + 1 >= total) { setDone(true); return; }
    setStepIdx(i => i + 1);
  };

  const onSaltar = () => {
    if (stepIdx + 1 >= total) { setDone(true); return; }
    setStepIdx(i => i + 1);
  };

  const usedAnswer = (opt) => {
    if (step.type !== 'fill-two') return false;
    return Object.values(filled).includes(opt);
  };

  const pickFor = (opt) => {
    if (step.type !== 'fill-two') return;
    // fill first empty slot
    if (!filled.slot0) setFilled({ ...filled, slot0: opt });
    else if (!filled.slot1) setFilled({ ...filled, slot1: opt });
  };

  return (
    <div className="content fade-in" data-screen-label="05 Práctica"
      style={{ padding: '20px 28px 36px', maxWidth: 'none' }}>
      <div className="quiz-shell">
        {/* Left: GAZAPITO */}
        <GazapitoChat onBack={onBack} userName={user?.displayName || user?.email?.split('@')[0]} />

        {/* Right: Quiz card */}
        {!done ? (
          <div className="quiz-card">
            <div className="quiz-hd">
              <button className="icon-btn" onClick={onExit} style={{ width: 38, height: 38 }}>
                <Icon name="x" size={16} />
              </button>
              <div className="quiz-progress">
                {steps.map((_, i) => (
                  <div key={i} className={i < stepIdx ? 'filled' : (i === stepIdx ? 'current' : '')} />
                ))}
              </div>
              <div className="hearts">
                <span style={{ fontSize: 18, fontWeight: 800 }}>{hearts}</span>
                <Icon name="heart" size={20} />
              </div>
            </div>

            {/* Question */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                Pregunta {stepIdx + 1} de {total}
              </div>
              <h2 className="h2" style={{ fontSize: 22, fontWeight: 600 }}>{step.prompt}</h2>
            </div>

            {/* Body */}
            {step.type === 'fill-two' ? (
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, justifyItems: 'center', marginBottom: 28 }}>
                  {step.diagrams.map((d, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <DiagramSVG kind={d.kind}
                        correct={result === 'correct' || (result === 'wrong' && filled['slot' + i] === d.answer)}
                        wrong={result === 'wrong' && filled['slot' + i] !== d.answer} />
                      <div className="row gap-2" style={{ marginTop: 16, justifyContent: 'center' }}>
                        <span style={{ fontSize: 13.5, color: 'var(--text-muted)', fontWeight: 500 }}>Diagrama de:</span>
                        <span
                          className={`drop-slot ${filled['slot' + i] ? 'filled' : ''}`}
                          onClick={() => setFilled(f => { const n = { ...f }; delete n['slot' + i]; return n; })}
                          style={{
                            color: result === 'wrong' && filled['slot' + i] !== d.answer ? 'var(--danger)' :
                              result === 'correct' || (result === 'wrong' && filled['slot' + i] === d.answer) ? 'var(--success)' : 'var(--text)'
                          }}
                        >
                          {filled['slot' + i] || ' '}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row gap-3" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                  {step.options.map(opt => (
                    <span key={opt}
                      className={`answer-chip ${usedAnswer(opt) ? 'used' : ''}`}
                      onClick={() => !usedAnswer(opt) && pickFor(opt)}>
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 560, margin: '12px auto 0', width: '100%' }}>
                  {step.options.map(opt => {
                    let cls = 'answer-chip';
                    if (result && opt === step.answer) cls += ' correct';
                    else if (result === 'wrong' && opt === picked) cls += ' wrong';
                    else if (picked === opt && !result) cls += ' selected';
                    return (
                      <span key={opt} className={cls}
                        onClick={() => !result && setPicked(opt)}
                        style={{
                          padding: '0 16px', height: 56, fontSize: 15,
                          ...(picked === opt && !result ? {
                            borderColor: 'var(--accent)',
                            background: 'var(--accent-soft)',
                            color: 'var(--text)',
                          } : {})
                        }}>
                        {opt}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Result feedback */}
            {result === 'correct' && (
              <div style={{
                marginTop: 18, padding: '14px 18px', borderRadius: 14,
                background: 'color-mix(in oklab, var(--success) 14%, transparent)',
                border: '1px solid var(--success)',
                color: 'var(--success)', fontWeight: 600, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Icon name="check" size={18}/>
                <span>¡Correcto! Buen trabajo, sigue así.</span>
              </div>
            )}
            {result === 'wrong' && (
              <>
                <div style={{
                  marginTop: 18, padding: '10px 16px', borderRadius: 10,
                  background: 'color-mix(in oklab, var(--danger) 12%, transparent)',
                  border: '1px solid var(--danger)',
                  color: 'var(--danger)', fontWeight: 600, fontSize: 13.5,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <Icon name="x" size={16}/>
                  <span>Respuesta incorrecta — la correcta era <strong>"{step.answer || step.diagrams.map(d => d.answer).join(' / ')}"</strong></span>
                </div>
                {step.explanation && <ExplicacionAnimada step={step} />}
              </>
            )}

            {/* Footer */}
            <div style={{
              marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--border-soft)',
              display: 'flex', justifyContent: 'space-between', gap: 12
            }}>
              <button className="btn btn-secondary" onClick={onExit}>
                Volver al curso
              </button>
              <div className="row gap-3">
                <button className="btn btn-ghost" onClick={onSaltar} disabled={result}>
                  Saltar
                </button>
                {!result ? (
                  <button className="btn btn-primary" onClick={onComprobar}
                    disabled={step.type === 'fill-two' ? (!filled.slot0 || !filled.slot1) : !picked}>
                    Comprobar
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={onContinuar}>
                    Continuar <Icon name="chevRight" size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <QuizDone correct={correctCount} total={total} hearts={hearts} onExit={onExit} onRetry={() => { setDone(false); setStepIdx(0); setHearts(3); setCorrectCount(0); setResult(null); }} />
        )}
      </div>
    </div>
  );
}

function DiagramSVG({ kind, correct, wrong }) {
  const color = correct ? 'var(--success)' : wrong ? 'var(--danger)' : 'currentColor';
  if (kind === 'venn') {
    return (
      <svg width="180" height="140" viewBox="0 0 180 140" style={{ color: 'var(--text-2)' }}>
        <circle cx="70" cy="70" r="46" fill="none" stroke={color} strokeWidth="2.5" />
        <circle cx="110" cy="70" r="46" fill="none" stroke={color} strokeWidth="2.5" />
        <text x="50" y="74" fontSize="11" fill="var(--text-muted)" fontFamily="var(--ff)">A</text>
        <text x="125" y="74" fontSize="11" fill="var(--text-muted)" fontFamily="var(--ff)">B</text>
      </svg>
    );
  }
  // carroll
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" style={{ color: 'var(--text-2)' }}>
      <rect x="30" y="20" width="120" height="100" fill="none" stroke={color} strokeWidth="2.5" />
      <line x1="90" y1="20" x2="90" y2="120" stroke={color} strokeWidth="2.5" />
      <line x1="30" y1="70" x2="150" y2="70" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}

function QuizDone({ correct, total, hearts, onExit, onRetry }) {
  const pct = Math.round(correct / total * 100);
  return (
    <div className="quiz-card" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{
        width: 88, height: 88, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent), #5a48ee)',
        display: 'grid', placeItems: 'center', color: 'white',
        boxShadow: '0 16px 40px rgba(124,108,255,0.4)',
        marginBottom: 24,
      }}>
        <Icon name="trophy" size={42} />
      </div>
      <h2 className="h1" style={{ fontSize: 28 }}>¡Práctica completada!</h2>
      <p className="muted" style={{ maxWidth: 360, margin: '10px 0 28px', lineHeight: 1.5 }}>
        Respondiste {correct} de {total} preguntas correctas. Sigue practicando para dominar la teoría de conjuntos.
      </p>
      <div className="row gap-4" style={{ marginBottom: 30 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{pct}%</div>
          <div className="muted" style={{ fontSize: 12.5 }}>Precisión</div>
        </div>
        <div style={{ width: 1, background: 'var(--border)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--danger)' }}>{hearts} ♥</div>
          <div className="muted" style={{ fontSize: 12.5 }}>Vidas restantes</div>
        </div>
        <div style={{ width: 1, background: 'var(--border)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--warning)' }}>+45</div>
          <div className="muted" style={{ fontSize: 12.5 }}>XP ganados</div>
        </div>
      </div>
      <div className="row gap-3">
        <button className="btn btn-secondary" onClick={onExit}>Volver al curso</button>
        <button className="btn btn-primary" onClick={onRetry}>Volver a practicar</button>
      </div>
    </div>
  );
}

// ── Diagrama labels ────────────────────────────────────────────
const DIAGRAM_LABELS = {
  venn:         'Diagrama de Venn — A y B',
  union:        'Unión: A ∪ B',
  interseccion: 'Intersección: A ∩ B',
  diferencia:   'Diferencia: A − B',
  complemento:  "Complemento: A'",
  carroll:      'Diagrama de Carroll',
  cardinalidad: 'Cardinalidad de un conjunto',
  conjuntos:    'Notación de conjunto',
};

// ── Detectar tipo de diagrama por keywords ──────────────────────
function detectDiagram(txt) {
  const t = txt.toLowerCase();
  if (t.includes('uni') || t.includes('∪'))                          return 'union';
  if (t.includes('intersec') || t.includes('∩'))                     return 'interseccion';
  if (t.includes('diferen') || t.includes('a - b') || t.includes('a-b')) return 'diferencia';
  if (t.includes('complem'))                                          return 'complemento';
  if (t.includes('venn'))                                             return 'venn';
  if (t.includes('carroll'))                                          return 'carroll';
  if (t.includes('cardinalidad') || t.includes('n('))                return 'cardinalidad';
  if (t.includes('conjunto'))                                         return 'conjuntos';
  return null;
}

// ── DiagramaChat — SVGs animados por tipo ──────────────────────
function DiagramaChat({ tipo }) {
  const acc  = 'var(--accent)';
  const accF = 'rgba(124,108,255,0.28)';
  const mut  = 'var(--text-muted)';
  const txt2 = 'var(--text-2)';
  const surf = 'var(--surface-2)';
  const ff   = 'var(--ff)';
  const sw   = 2.2;

  let svgContent;

  if (tipo === 'union') {
    svgContent = (
      <>
        <circle cx="82" cy="68" r="46" fill={accF} stroke={acc} strokeWidth={sw}/>
        <circle cx="138" cy="68" r="46" fill={accF} stroke={acc} strokeWidth={sw}/>
        <text x="58"  y="72" fontSize="13" fill={txt2} fontFamily={ff} fontWeight="700">A</text>
        <text x="152" y="72" fontSize="13" fill={txt2} fontFamily={ff} fontWeight="700">B</text>
        <text x="110" y="130" fontSize="11" fill={mut} fontFamily={ff} textAnchor="middle">A ∪ B — todo lo de A y B</text>
      </>
    );
  } else if (tipo === 'interseccion') {
    svgContent = (
      <>
        <defs><clipPath id="gz-ci"><circle cx="82" cy="68" r="46"/></clipPath></defs>
        <circle cx="82"  cy="68" r="46" fill={surf} stroke={acc} strokeWidth={sw}/>
        <circle cx="138" cy="68" r="46" fill={surf} stroke={acc} strokeWidth={sw}/>
        <circle cx="138" cy="68" r="46" fill={accF} strokeWidth="0" clipPath="url(#gz-ci)"/>
        <text x="54"  y="72" fontSize="13" fill={txt2} fontFamily={ff} fontWeight="700">A</text>
        <text x="152" y="72" fontSize="13" fill={txt2} fontFamily={ff} fontWeight="700">B</text>
        <text x="110" y="130" fontSize="11" fill={mut} fontFamily={ff} textAnchor="middle">A ∩ B — elementos comunes</text>
      </>
    );
  } else if (tipo === 'diferencia') {
    svgContent = (
      <>
        <defs><clipPath id="gz-cd"><circle cx="82" cy="68" r="46"/></clipPath></defs>
        <circle cx="82"  cy="68" r="46" fill={accF} strokeWidth="0"/>
        <circle cx="138" cy="68" r="46" fill={surf} strokeWidth="0" clipPath="url(#gz-cd)"/>
        <circle cx="82"  cy="68" r="46" fill="none" stroke={acc} strokeWidth={sw}/>
        <circle cx="138" cy="68" r="46" fill="none" stroke={mut} strokeWidth={sw}/>
        <text x="54"  y="72" fontSize="13" fill={txt2} fontFamily={ff} fontWeight="700">A</text>
        <text x="152" y="72" fontSize="13" fill={mut}  fontFamily={ff} fontWeight="700">B</text>
        <text x="110" y="130" fontSize="11" fill={mut} fontFamily={ff} textAnchor="middle">A − B — en A pero no en B</text>
      </>
    );
  } else if (tipo === 'complemento') {
    svgContent = (
      <>
        <defs>
          <mask id="gz-cm">
            <rect x="8" y="8" width="204" height="112" fill="white"/>
            <circle cx="110" cy="64" r="44" fill="black"/>
          </mask>
        </defs>
        <rect x="8" y="8" width="204" height="112" rx="6" fill="none" stroke={mut} strokeWidth={sw}/>
        <rect x="8" y="8" width="204" height="112" rx="6" fill={accF} mask="url(#gz-cm)"/>
        <circle cx="110" cy="64" r="44" fill={surf} stroke={acc} strokeWidth={sw}/>
        <text x="110" y="69" fontSize="14" fill={txt2} fontFamily={ff} textAnchor="middle" fontWeight="700">A</text>
        <text x="16"  y="22" fontSize="10" fill={mut}  fontFamily={ff}>U</text>
        <text x="110" y="133" fontSize="11" fill={mut} fontFamily={ff} textAnchor="middle">A' — todo lo que no pertenece a A</text>
      </>
    );
  } else if (tipo === 'carroll') {
    svgContent = (
      <>
        <rect x="30" y="18" width="160" height="100" rx="4" fill={surf} stroke={acc} strokeWidth={sw}/>
        <line x1="110" y1="18" x2="110" y2="118" stroke={acc} strokeWidth={sw}/>
        <line x1="30"  y1="68" x2="190" y2="68"  stroke={acc} strokeWidth={sw}/>
        <text x="70"  y="48"  fontSize="12" fill={txt2} fontFamily={ff} textAnchor="middle" fontWeight="700">B</text>
        <text x="150" y="48"  fontSize="12" fill={txt2} fontFamily={ff} textAnchor="middle" fontWeight="700">B'</text>
        <text x="18"  y="48"  fontSize="12" fill={mut}  fontFamily={ff} textAnchor="middle">A</text>
        <text x="18"  y="100" fontSize="12" fill={mut}  fontFamily={ff} textAnchor="middle">A'</text>
        <text x="110" y="133" fontSize="11" fill={mut}  fontFamily={ff} textAnchor="middle">Diagrama de Lewis Carroll</text>
      </>
    );
  } else if (tipo === 'cardinalidad') {
    svgContent = (
      <>
        <ellipse cx="110" cy="66" rx="88" ry="50" fill={accF} stroke={acc} strokeWidth={sw}/>
        <text x="58"  y="58" fontSize="15" fill={txt2} fontFamily={ff} fontWeight="700">1</text>
        <text x="88"  y="50" fontSize="15" fill={txt2} fontFamily={ff} fontWeight="700">2</text>
        <text x="122" y="56" fontSize="15" fill={txt2} fontFamily={ff} fontWeight="700">3</text>
        <text x="70"  y="82" fontSize="15" fill={txt2} fontFamily={ff} fontWeight="700">4</text>
        <text x="110" y="86" fontSize="15" fill={txt2} fontFamily={ff} fontWeight="700">5</text>
        <text x="145" y="76" fontSize="15" fill={txt2} fontFamily={ff} fontWeight="700">6</text>
        <text x="110" y="133" fontSize="11" fill={mut} fontFamily={ff} textAnchor="middle">n(A) = 6 elementos</text>
      </>
    );
  } else if (tipo === 'conjuntos') {
    svgContent = (
      <>
        <rect x="14" y="30" width="192" height="68" rx="14" fill={accF} stroke={acc} strokeWidth={sw}/>
        <text x="110" y="70" fontSize="17" fill={txt2} fontFamily={ff} textAnchor="middle" fontWeight="700">
          A = {'{'}1, 2, 3, 4{'}'}
        </text>
        <text x="110" y="130" fontSize="11" fill={mut} fontFamily={ff} textAnchor="middle">Notación de conjunto por extensión</text>
      </>
    );
  } else {
    svgContent = (
      <>
        <circle cx="82"  cy="68" r="46" fill="none" stroke={acc} strokeWidth={sw}/>
        <circle cx="138" cy="68" r="46" fill="none" stroke={acc} strokeWidth={sw}/>
        <text x="58"  y="72" fontSize="13" fill={txt2} fontFamily={ff} fontWeight="700">A</text>
        <text x="152" y="72" fontSize="13" fill={txt2} fontFamily={ff} fontWeight="700">B</text>
        <text x="110" y="130" fontSize="11" fill={mut} fontFamily={ff} textAnchor="middle">Diagrama de Venn</text>
      </>
    );
  }

  return (
    <div style={{
      marginTop: 10,
      background: 'var(--surface-3)',
      borderRadius: 12,
      padding: '10px 8px 6px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      border: '1px solid var(--border-soft)',
    }}>
      <svg width="220" height="140" viewBox="0 0 220 140">{svgContent}</svg>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2, fontWeight: 500 }}>
        {DIAGRAM_LABELS[tipo] || tipo}
      </div>
    </div>
  );
}

// ── GazapitoChat ───────────────────────────────────────────────
function GazapitoChat({ onBack, userName }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: BARTUCHA_GREETING(userName), diagram: null },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, isTyping]);

  const callGeminiAPI = async (historyMsgs) => {
    const API_KEY = window.GEMINI_API_KEY;
    if (!API_KEY) return null;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    let validMsgs = [...historyMsgs];
    while (validMsgs.length > 0 && validMsgs[0].from === 'bot') validMsgs.shift();

    const contents = [];
    for (const m of validMsgs) {
      const role = m.from === 'bot' ? 'model' : 'user';
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += '\n' + m.text;
      } else {
        contents.push({ role, parts: [{ text: m.text }] });
      }
    }

    const systemInstruction = {
      parts: [{ text: `Eres GAZAPITO, un conejito amigable y tutor experto en matemáticas y teoría de conjuntos.
Responde SIEMPRE con un JSON válido (sin bloques de código, sin texto extra) con exactamente estos campos:
- "texto": tu respuesta en español, breve y alentadora, con emojis (🐇, 📚, ✨)
- "diagrama": el tipo de diagrama más útil, o null si no aplica. Valores: "venn", "union", "interseccion", "diferencia", "complemento", "carroll", "cardinalidad", "conjuntos", null
Ejemplo: {"texto": "La unión incluye todo lo de A y B 🐇✨", "diagrama": "union"}` }]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents, systemInstruction,
          generationConfig: { temperature: 0.7, responseMimeType: 'application/json' },
        }),
      });
      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        const raw = data.candidates[0].content.parts[0].text;
        try {
          const clean = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
          const parsed = JSON.parse(clean);
          return { texto: parsed.texto || raw, diagrama: parsed.diagrama || null };
        } catch {
          return { texto: raw, diagrama: null };
        }
      }
    } catch (err) {
      console.error('Gemini API error:', err);
    }
    return null;
  };

  const send = async (txt) => {
    if (!txt.trim() || isTyping) return;
    const ms = [...messages, { from: 'you', text: txt, diagram: null }];
    setMessages(ms);
    setInput('');
    setIsTyping(true);

    const result = await callGeminiAPI(ms);

    if (result) {
      setMessages([...ms, { from: 'bot', text: result.texto, diagram: result.diagrama }]);
      setIsTyping(false);
    } else {
      setTimeout(() => {
        const low = txt.toLowerCase();
        let reply = BARTUCHA_REPLIES.default;
        if (low.includes('pista') || low.includes('ayud'))                                        reply = BARTUCHA_REPLIES.pista;
        else if (low.includes('repas'))                                                            reply = BARTUCHA_REPLIES.repasar;
        else if (low.includes('por qué') || low.includes('porque') || low.includes('por que'))    reply = BARTUCHA_REPLIES.porque;
        else if (low.includes('hola') || low.includes('buenas'))                                   reply = BARTUCHA_REPLIES.hola;
        else if (low.includes('entend'))                                                            reply = BARTUCHA_REPLIES.ayuda;
        setMessages([...ms, { from: 'bot', text: reply, diagram: detectDiagram(txt) }]);
        setIsTyping(false);
      }, 700);
    }
  };

  return (
    <div className="chat-side">
      <div className="chat-hd">
        <div className="avatar">
          <span style={{ display: 'block', width: 22, height: 22, color: 'white' }}
            className="cuilib-glyph"
            dangerouslySetInnerHTML={{ __html: (window.CUILIB_SVGS || {})['logo-mark'] || '' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>GAZAPITO</div>
          <div className="muted" style={{ fontSize: 11.5 }}>Tu tutor siempre disponible</div>
        </div>
        <div className="row gap-2" style={{ fontSize: 11.5, color: 'var(--success)', fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
          En línea
        </div>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            <span style={{ whiteSpace: 'pre-wrap' }}>{m.text}</span>
            {m.diagram && m.diagram !== 'null' && (
              <DiagramaChat tipo={m.diagram} />
            )}
          </div>
        ))}
        {isTyping && (
          <div className="bubble bot" style={{ opacity: 0.7 }}>
            <span style={{ display: 'inline-block', animation: 'blink 1.4s infinite both' }}>.</span>
            <span style={{ display: 'inline-block', animation: 'blink 1.4s infinite both', animationDelay: '0.2s' }}>.</span>
            <span style={{ display: 'inline-block', animation: 'blink 1.4s infinite both', animationDelay: '0.4s' }}>.</span>
          </div>
        )}
      </div>

      <div className="chat-input-wrap">
        <input
          className="chat-input"
          placeholder="Preguntar a GAZAPITO..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
        />
        <div className="chat-quick">
          <span className="qc" onClick={() => send('Explícame la unión de conjuntos')}>A ∪ B</span>
          <span className="qc" onClick={() => send('Explícame la intersección')}>A ∩ B</span>
          <span className="qc" onClick={() => send('Explícame la diferencia A-B')}>A − B</span>
          <span className="qc" onClick={() => send('Explícame el complemento')}>A′</span>
          <span className="qc" onClick={() => send('Muéstrame el diagrama de Carroll')}>Carroll</span>
          <span className="qc" onClick={() => send('Dame una pista')}>Pista 🐇</span>
        </div>
      </div>
    </div>
  );
}

window.ScreenQuiz = ScreenQuiz;
