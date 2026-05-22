// app.jsx — main App with routing, tweaks
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#7c6cff",
  "cardStyle": "illustration",
  "radius": "default",
  "density": "regular",
  "iconStroke": 1.7,
  "geminiKey": ""
}/*EDITMODE-END*/;

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState('inicio');
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    return FB_onAuthChange(user => {
      setAuthUser(user);
      setAuthReady(true);
    });
  }, []);

  // Apply theme + density + radius + accent globally
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-theme', t.theme);
    r.setAttribute('data-density', t.density);
    r.setAttribute('data-radius', t.radius);
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--accent-hover', shiftHue(t.accent, 10, 5));
    r.style.setProperty('--accent-soft', hexAlpha(t.accent, 0.14));
    r.style.setProperty('--accent-soft-2', hexAlpha(t.accent, 0.22));
    r.style.setProperty('--accent-ring', hexAlpha(t.accent, 0.35));
  }, [t.theme, t.density, t.radius, t.accent]);

  // Sincroniza Gemini API key con window para que GazapitoChat la use
  useEffect(() => {
    window.GEMINI_API_KEY = t.geminiKey || '';
  }, [t.geminiKey]);

  const openCourse = (course) => {
    setCurrentCourse(course);
    setRoute('detalle');
  };

  const playLesson = (lesson) => {
    setCurrentLesson(lesson || ARITMETICA_MODULES[1].lessons[4]);
    if (!currentCourse) setCurrentCourse(CUILIB_COURSES[0]);
    setRoute('player');
  };

  const goPractice = () => {
    if (!currentCourse) setCurrentCourse(CUILIB_COURSES[0]);
    const module = currentLesson
      ? ARITMETICA_MODULES.find(m => m.lessons.some(l => l.id === currentLesson.id))
      : null;
    setCurrentModuleId(module?.id || 'conjuntos');
    setRoute('quiz');
  };

  const navigate = (key) => {
    if (key === 'quiz') return setRoute('quiz');
    setRoute(key);
  };

  let crumbs = [];
  let showTopSearch = true;
  switch (route) {
    case 'inicio':   crumbs = ['Inicio']; break;
    case 'cursos':   crumbs = ['Cursos']; break;
    case 'detalle':  crumbs = [{ label: 'Cursos', onClick: () => setRoute('cursos') }, currentCourse?.title || '']; break;
    case 'player':
      crumbs = [
        { label: 'Cursos', onClick: () => setRoute('cursos') },
        { label: currentCourse?.title || '', onClick: () => setRoute('detalle') },
        'Reproductor',
      ];
      showTopSearch = false;
      break;
    case 'quiz':     crumbs = []; showTopSearch = false; break;
    case 'rutas':    crumbs = ['Mis rutas']; break;
    case 'progreso': crumbs = ['Mi progreso']; break;
    case 'notif':    crumbs = ['Notificaciones']; break;
    case 'pasar':    crumbs = ['Pasar el rato']; break;
    case 'practica': crumbs = ['Práctica']; break;
    case 'admin':    crumbs = ['Administrador']; break;
  }

  const sidebarActive = (() => {
    if (route === 'detalle' || route === 'player') return 'cursos';
    if (route === 'quiz') return 'practica';
    return route;
  })();

  const collapsedSidebar = route === 'quiz';

  if (!authReady) return (
    <div style={{minHeight:'100vh', background:'var(--bg)', display:'grid', placeItems:'center'}}>
      <div className="muted" style={{fontSize:14}}>Cargando…</div>
    </div>
  );
  if (!authUser) return <ScreenLogin />;

  const isAdmin = authUser.email === window.ADMIN_EMAIL;

  return (
    <div className={`app ${collapsedSidebar ? 'collapsed' : ''}`}>
      <Sidebar
        route={sidebarActive}
        onNavigate={navigate}
        collapsed={collapsedSidebar}
        theme={t.theme}
        onToggleTheme={() => setTweak('theme', t.theme === 'dark' ? 'light' : 'dark')}
        user={authUser}
        onLogout={() => FB_logout()}
        isAdmin={isAdmin}
      />
      <main className="main">
        {route !== 'quiz' && (
          <Topbar crumbs={crumbs} search={search}
                  onSearch={(v) => { setSearch(v); if (route !== 'cursos' && v) setRoute('cursos'); }}/>
        )}

        {route === 'inicio' && (
          <ScreenInicio onNavigate={navigate} onOpenCourse={openCourse} cardStyle={t.cardStyle} user={authUser}/>
        )}
        {route === 'cursos' && (
          <ScreenCursos onOpenCourse={openCourse} cardStyle={t.cardStyle} search={search}/>
        )}
        {route === 'detalle' && currentCourse && (
          <ScreenDetalle
            course={currentCourse}
            onBack={() => setRoute('cursos')}
            onPlay={playLesson}
            onPractice={goPractice}
          />
        )}
        {route === 'player' && currentCourse && currentLesson && (
          <ScreenPlayer
            course={currentCourse}
            lesson={currentLesson}
            onBack={() => setRoute('detalle')}
            onSelectLesson={(lesson) => setCurrentLesson(lesson)}
            onNext={() => {
              const idx = TEMARIO_FLAT.findIndex(l => l.id === currentLesson.id);
              setCurrentLesson(TEMARIO_FLAT[Math.min(TEMARIO_FLAT.length - 1, idx + 1)]);
            }}
            onPrev={() => {
              const idx = TEMARIO_FLAT.findIndex(l => l.id === currentLesson.id);
              setCurrentLesson(TEMARIO_FLAT[Math.max(0, idx - 1)]);
            }}
            onPractice={goPractice}
            user={authUser}
          />
        )}
        {route === 'quiz' && (
          <ScreenQuiz
            moduleId={currentModuleId || 'conjuntos'}
            onExit={() => setRoute('detalle')}
            onBack={() => setRoute('detalle')}
            user={authUser}
          />
        )}
        {route === 'rutas'    && <ScreenRutas onNavigate={navigate} onOpenCourse={openCourse}/>}
        {route === 'progreso' && <ScreenProgreso onNavigate={navigate}/>}
        {route === 'notif'    && <ScreenNotificaciones/>}
        {route === 'pasar'    && <ScreenPasar onOpenCourse={openCourse}/>}
        {route === 'practica' && <ScreenPracticaIntro onStart={goPractice}/>}
        {route === 'admin' && isAdmin && <ScreenAdmin user={authUser}/>}
      </main>

      <BottomNav route={sidebarActive} onNavigate={navigate}/>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme"/>
        <TweakRadio label="Modo" value={t.theme}
                    options={['dark', 'light']}
                    onChange={v => setTweak('theme', v)}/>
        <TweakColor label="Color de acento" value={t.accent}
                    options={['#7c6cff', '#5b8def', '#34d399', '#ff6b3d', '#f06a6a']}
                    onChange={v => setTweak('accent', v)}/>

        <TweakSection label="Layout"/>
        <TweakRadio label="Densidad" value={t.density}
                    options={['compact', 'regular', 'comfy']}
                    onChange={v => setTweak('density', v)}/>
        <TweakRadio label="Radio" value={t.radius}
                    options={['square', 'default', 'round']}
                    onChange={v => setTweak('radius', v)}/>

        <TweakSection label="Cards"/>
        <TweakRadio label="Estilo de cards" value={t.cardStyle}
                    options={['flat', 'illustration', 'gradient']}
                    onChange={v => setTweak('cardStyle', v)}/>

        <TweakSection label="Iconos"/>
        <TweakSlider label="Grosor de iconos" value={t.iconStroke}
                     min={1} max={2.4} step={0.1} unit="px"
                     onChange={v => setTweak('iconStroke', v)}/>

        <TweakSection label="IA · GAZAPITO"/>
        <TweakText label="Gemini API Key" type="password"
                   value={t.geminiKey}
                   placeholder="Pega tu key aquí"
                   onChange={v => setTweak('geminiKey', v)}/>
        {t.geminiKey
          ? <div style={{fontSize:11, color:'#34d399', fontWeight:600}}>✓ IA activa</div>
          : <div style={{fontSize:11, color:'rgba(41,38,27,.45)'}}>Sin key → respuestas estáticas</div>
        }
      </TweaksPanel>
    </div>
  );
}

function ScreenPracticaIntro({ onStart }) {
  return (
    <div className="content fade-in" data-screen-label="Práctica intro">
      <section>
        <span className="eyebrow">Práctica</span>
        <h1 className="h1" style={{marginTop: 6}}>Refuerza lo aprendido</h1>
        <p className="muted" style={{maxWidth: 560, marginTop: 6}}>
          Practica con ejercicios adaptados a tu nivel. GAZAPITO te acompaña.
        </p>
      </section>
      <section className="grid-auto-3">
        {[
          { t:'Conjuntos', d:'8 preguntas · 5 min', c:'var(--c-orange)' },
          { t:'Numeración', d:'10 preguntas · 8 min', c:'var(--c-purple)' },
          { t:'Lógica proposicional', d:'12 preguntas · 10 min', c:'var(--c-cobalt)' },
        ].map((p, i) => (
          <div key={i} className="card card-pad" style={{display:'flex', flexDirection:'column', gap: 12, cursor:'pointer'}} onClick={onStart}>
            <div style={{width: 44, height: 44, borderRadius: 12, background: p.c, color:'white', display:'grid', placeItems:'center'}}>
              <Icon name="pencil" size={20}/>
            </div>
            <div>
              <div style={{fontSize: 15, fontWeight: 700}}>{p.t}</div>
              <div className="muted" style={{fontSize: 13, marginTop: 2}}>{p.d}</div>
            </div>
            <button className="btn btn-primary btn-sm" style={{alignSelf: 'flex-start'}} onClick={(e) => { e.stopPropagation(); onStart(); }}>
              Empezar
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

// ── Auth helpers ────────────────────────────────────────────────
function _authErrMsg(code) {
  const map = {
    'auth/user-not-found':       'No existe una cuenta con ese correo.',
    'auth/wrong-password':       'Contraseña incorrecta.',
    'auth/invalid-credential':   'Correo o contraseña incorrectos.',
    'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
    'auth/weak-password':        'La contraseña debe tener al menos 6 caracteres.',
    'auth/invalid-email':        'Correo electrónico inválido.',
    'auth/too-many-requests':    'Demasiados intentos. Intenta más tarde.',
    'auth/network-request-failed': 'Sin conexión a internet.',
  };
  return map[code] || 'Ocurrió un error. Intenta de nuevo.';
}

function _MsgBox({ msg, ok }) {
  return (
    <div style={{
      fontSize: 13,
      color: ok ? 'var(--success)' : 'var(--danger)',
      background: ok
        ? 'color-mix(in oklab, var(--success) 12%, transparent)'
        : 'color-mix(in oklab, var(--danger) 12%, transparent)',
      border: ok
        ? '1px solid color-mix(in oklab, var(--success) 30%, transparent)'
        : '1px solid color-mix(in oklab, var(--danger) 30%, transparent)',
      borderRadius: 'var(--r-sm)', padding: '10px 14px',
    }}>
      {msg}
    </div>
  );
}

// ── Login / Registro / Recuperar ────────────────────────────────
function ScreenLogin() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const clr = () => { setError(''); setSuccess(''); };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) { setError('Completa todos los campos.'); return; }
    clr(); setLoading(true);
    try { await FB_login(email, pass); }
    catch (err) { setError(_authErrMsg(err.code)); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email || !pass || !pass2) { setError('Completa todos los campos.'); return; }
    if (pass !== pass2) { setError('Las contraseñas no coinciden.'); return; }
    if (pass.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    clr(); setLoading(true);
    try { await FB_register(email, pass, name.trim()); }
    catch (err) { setError(_authErrMsg(err.code)); }
    finally { setLoading(false); }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) { setError('Ingresa tu correo electrónico.'); return; }
    clr(); setLoading(true);
    try {
      await FB_resetPassword(email);
      setSuccess('Te enviamos un correo para restablecer tu contraseña.');
    }
    catch (err) { setError(_authErrMsg(err.code)); }
    finally { setLoading(false); }
  };

  const inp = {
    background: 'var(--surface-2)', border: '1px solid var(--border-strong)',
    borderRadius: 'var(--r)', color: 'var(--text)', fontSize: 14,
    padding: '12px 14px', width: '100%', outline: 'none',
    fontFamily: 'var(--ff)', boxSizing: 'border-box',
  };
  const lbl = { fontSize: 12.5, fontWeight: 600, color: 'var(--text-2)', display: 'block', marginBottom: 6 };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, var(--accent), #5a48ee)',
            display: 'inline-grid', placeItems: 'center',
            boxShadow: '0 8px 32px var(--accent-ring)', marginBottom: 16,
          }}>
            <span style={{ width: 28, height: 28, color: 'white' }}
              className="cuilib-glyph"
              dangerouslySetInnerHTML={{ __html: (window.CUILIB_SVGS || {})['logo-mark'] || '' }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>CUILIB</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Plataforma educativa</div>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: 28 }}>

          {mode === 'login' && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>Inicia sesión</h2>
              <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>Ingresa tus credenciales para continuar.</p>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={lbl}>Correo electrónico</label>
                  <input type="email" placeholder="ejemplo@correo.com" value={email}
                    onChange={e => { setEmail(e.target.value); clr(); }} style={inp} autoComplete="email"/>
                </div>
                <div>
                  <label style={lbl}>Contraseña</label>
                  <input type="password" placeholder="••••••••" value={pass}
                    onChange={e => { setPass(e.target.value); clr(); }} style={inp} autoComplete="current-password"/>
                </div>
                {error && <_MsgBox msg={error}/>}
                <button type="submit" className="btn btn-primary" style={{ height: 44, fontSize: 14, marginTop: 4 }} disabled={loading}>
                  {loading ? 'Entrando…' : 'Entrar'}
                </button>
              </form>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <span className="link" style={{ fontSize: 13 }} onClick={() => { clr(); setMode('reset'); }}>
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <span className="muted" style={{ fontSize: 13 }}>¿No tienes cuenta? </span>
                <span className="link" style={{ fontSize: 13 }} onClick={() => { clr(); setMode('register'); }}>Regístrate</span>
              </div>
            </>
          )}

          {mode === 'register' && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>Crear cuenta</h2>
              <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>Únete a CUILIB y empieza a aprender.</p>
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={lbl}>Nombre completo</label>
                  <input type="text" placeholder="Tu nombre" value={name}
                    onChange={e => { setName(e.target.value); clr(); }} style={inp} autoComplete="name"/>
                </div>
                <div>
                  <label style={lbl}>Correo electrónico</label>
                  <input type="email" placeholder="ejemplo@correo.com" value={email}
                    onChange={e => { setEmail(e.target.value); clr(); }} style={inp} autoComplete="email"/>
                </div>
                <div>
                  <label style={lbl}>Contraseña</label>
                  <input type="password" placeholder="Mínimo 6 caracteres" value={pass}
                    onChange={e => { setPass(e.target.value); clr(); }} style={inp} autoComplete="new-password"/>
                </div>
                <div>
                  <label style={lbl}>Confirmar contraseña</label>
                  <input type="password" placeholder="Repite tu contraseña" value={pass2}
                    onChange={e => { setPass2(e.target.value); clr(); }} style={inp} autoComplete="new-password"/>
                </div>
                {error && <_MsgBox msg={error}/>}
                <button type="submit" className="btn btn-primary" style={{ height: 44, fontSize: 14, marginTop: 4 }} disabled={loading}>
                  {loading ? 'Creando cuenta…' : 'Crear cuenta'}
                </button>
              </form>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <span className="muted" style={{ fontSize: 13 }}>¿Ya tienes cuenta? </span>
                <span className="link" style={{ fontSize: 13 }} onClick={() => { clr(); setMode('login'); }}>Inicia sesión</span>
              </div>
            </>
          )}

          {mode === 'reset' && (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>Recuperar contraseña</h2>
              <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
                Te enviaremos un correo para restablecer tu contraseña.
              </p>
              <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={lbl}>Correo electrónico</label>
                  <input type="email" placeholder="ejemplo@correo.com" value={email}
                    onChange={e => { setEmail(e.target.value); clr(); }} style={inp} autoComplete="email"/>
                </div>
                {error && <_MsgBox msg={error}/>}
                {success && <_MsgBox msg={success} ok/>}
                {!success && (
                  <button type="submit" className="btn btn-primary" style={{ height: 44, fontSize: 14, marginTop: 4 }} disabled={loading}>
                    {loading ? 'Enviando…' : 'Enviar correo'}
                  </button>
                )}
              </form>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <span className="link" style={{ fontSize: 13 }} onClick={() => { clr(); setMode('login'); }}>
                  ← Volver al inicio de sesión
                </span>
              </div>
            </>
          )}

        </div>

        <p className="muted" style={{ textAlign: 'center', fontSize: 12, marginTop: 20 }}>
          © 2026 CUILIB · Plataforma educativa peruana
        </p>
      </div>
    </div>
  );
}

// ── Panel de Administrador ──────────────────────────────────────
function ScreenAdmin({ user }) {
  const totalCursos = (window.CUILIB_COURSES || []).length;
  const totalLecciones = (window.TEMARIO_FLAT || []).length;
  const inicial = (user.displayName || user.email || '?')[0].toUpperCase();

  const [geminiKey, setGeminiKey] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cuilib_tweaks') || '{}');
      return saved.geminiKey || '';
    } catch { return ''; }
  });
  const [keySaved, setKeySaved] = useState(false);

  const saveKey = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('cuilib_tweaks') || '{}');
      saved.geminiKey = geminiKey.trim();
      localStorage.setItem('cuilib_tweaks', JSON.stringify(saved));
      window.GEMINI_API_KEY = saved.geminiKey;
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2500);
    } catch {}
  };

  return (
    <div className="content fade-in" data-screen-label="Administrador">
      <section>
        <span className="eyebrow">Panel de administrador</span>
        <h1 className="h1" style={{marginTop: 6}}>
          Bienvenido, {user.displayName || user.email.split('@')[0]}
        </h1>
        <p className="muted" style={{maxWidth: 560, marginTop: 6}}>
          Administra tu plataforma educativa desde aquí.
        </p>
      </section>

      <section className="grid-auto-3">
        <Stat icon="video"  num={totalCursos}    lbl="Cursos"       accent="var(--accent)"/>
        <Stat icon="book"   num={totalLecciones} lbl="Lecciones"    accent="var(--c-green)"/>
        <Stat icon="bolt"   num="1"              lbl="Video activo" accent="var(--c-orange)"/>
      </section>

      <section>
        <div className="eyebrow" style={{marginBottom:14}}>Tu cuenta de administrador</div>
        <div className="card card-pad">
          <div className="row gap-3">
            <div style={{
              width:44, height:44, borderRadius:'50%',
              background:'var(--accent)', color:'white',
              display:'grid', placeItems:'center', fontWeight:700, fontSize:16, flexShrink:0,
            }}>
              {inicial}
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600, fontSize:14}}>{user.displayName || 'Administrador'}</div>
              <div className="muted" style={{fontSize:12.5}}>{user.email}</div>
            </div>
            <span style={{
              fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:99,
              background:'var(--accent-soft)', color:'var(--accent)', letterSpacing:'0.03em',
            }}>ADMIN</span>
          </div>
        </div>
      </section>

      <section>
        <div className="eyebrow" style={{marginBottom:14}}>Gestión de usuarios</div>
        <div className="card card-pad row" style={{gap:16}}>
          <Icon name="settings" size={20} style={{color:'var(--text-muted)', flexShrink:0}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:14, fontWeight:600}}>Consola de Firebase</div>
            <div className="muted" style={{fontSize:13}}>
              Gestiona usuarios registrados, contraseñas y permisos
            </div>
          </div>
          <a
            href="https://console.firebase.google.com/project/cuilib/authentication/users"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            Abrir →
          </a>
        </div>
      </section>

      <section>
        <div className="eyebrow" style={{marginBottom:14}}>IA · GAZAPITO</div>
        <div className="card card-pad" style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="row gap-3">
            <div style={{
              width:44, height:44, borderRadius:12,
              background:'var(--accent-soft)', color:'var(--accent)',
              display:'grid', placeItems:'center', flexShrink:0,
            }}>
              <Icon name="bolt" size={20}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:600}}>Gemini API Key</div>
              <div className="muted" style={{fontSize:13}}>
                {window.GEMINI_API_KEY ? '✓ IA activa — GAZAPITO usa Gemini' : 'Sin key — GAZAPITO usa respuestas estáticas'}
              </div>
            </div>
            {window.GEMINI_API_KEY && (
              <span style={{fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:99,
                background:'color-mix(in oklab, var(--success) 15%, transparent)',
                color:'var(--success)'}}>ACTIVO</span>
            )}
          </div>
          <div style={{display:'flex', gap:10}}>
            <input
              type="password"
              placeholder="Pega tu Gemini API key aquí"
              value={geminiKey}
              onChange={e => { setGeminiKey(e.target.value); setKeySaved(false); }}
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              style={{
                flex:1, height:40, padding:'0 14px',
                background:'var(--surface-2)', border:'1px solid var(--border)',
                borderRadius:'var(--r)', color:'var(--text)',
                fontSize:13, outline:'none', fontFamily:'var(--ff-mono)',
              }}
            />
            <button className="btn btn-primary btn-sm" onClick={saveKey} style={{height:40, padding:'0 18px'}}>
              {keySaved ? '✓ Guardado' : 'Guardar'}
            </button>
          </div>
          {geminiKey && !keySaved && (
            <div className="muted" style={{fontSize:12}}>Presiona Guardar o Enter para activar.</div>
          )}
        </div>
      </section>
    </div>
  );
}

// helpers
function hexAlpha(hex, a) {
  const m = hex.replace('#','').match(/.{1,2}/g);
  if (!m || m.length < 3) return hex;
  const [r,g,b] = m.map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${a})`;
}
function shiftHue(hex, hueDelta, lightDelta) {
  const m = hex.replace('#','').match(/.{1,2}/g);
  if (!m || m.length < 3) return hex;
  let [r,g,b] = m.map(x => parseInt(x, 16));
  r = Math.min(255, r + lightDelta * 2);
  g = Math.min(255, g + lightDelta * 2);
  b = Math.min(255, b + lightDelta * 2);
  return `rgb(${r}, ${g}, ${b})`;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
