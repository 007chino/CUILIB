// screens-extras.jsx — Mis rutas, Progreso, Notificaciones, Pasar el rato
const { useState: cUseState, useEffect: cUseEffect, useRef: cUseRef } = React;

function ScreenRutas({ onNavigate, onOpenCourse }) {
  const routes = [
    {
      id: 'sm', name: 'Admisión San Marcos', area: 'Letras y Humanidades',
      progress: 0.34, days: 62, courses: 8, examDate: '15 Jul',
      featured: true, color: 'var(--c-purple)',
    },
    {
      id: 'uni', name: 'Admisión UNI', area: 'Ciencias e Ingeniería',
      progress: 0.12, days: 95, courses: 10, examDate: '17 Ago',
      color: 'var(--c-blue)',
    },
    {
      id: 'cuilib', name: 'Ruta general CUILIB', area: 'Preparación integral',
      progress: 0.58, days: null, courses: 14, examDate: null,
      color: 'var(--c-mint)',
    },
  ];
  const milestones = [
    { id: 1, title: 'Diagnóstico inicial', done: true },
    { id: 2, title: 'Aritmética: Conjuntos y numeración', done: true },
    { id: 3, title: 'Aritmética: Divisibilidad y razones', done: true },
    { id: 4, title: 'Álgebra: Polinomios y ecuaciones', done: false, current: true },
    { id: 5, title: 'Simulacro intermedio', done: false },
    { id: 6, title: 'Geometría plana', done: false },
    { id: 7, title: 'Razonamiento verbal y matemático', done: false },
    { id: 8, title: 'Simulacro final', done: false },
  ];

  return (
    <div className="content fade-in" data-screen-label="06 Mis Rutas">
      <section>
        <span className="eyebrow">Tu camino</span>
        <h1 className="h1" style={{marginTop: 6}}>Mis rutas</h1>
        <p className="muted" style={{maxWidth: 540, marginTop: 6, fontSize: 14.5}}>
          Sigue una ruta diseñada por nuestros tutores o crea la tuya combinando los cursos
          que necesitas.
        </p>
      </section>

      {/* Featured route */}
      <section>
        <h2 className="h2" style={{marginBottom: 14}}>Tu ruta activa</h2>
        {routes.filter(r => r.featured).map(r => (
          <div key={r.id} className="card" style={{padding: 0, overflow:'hidden'}}>
            <div style={{
              padding: '24px 28px',
              background: `linear-gradient(135deg, ${r.color}22, transparent)`,
              borderBottom: '1px solid var(--border-soft)',
              display:'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems:'center',
            }}>
              <div>
                <div className="eyebrow" style={{color: r.color}}>{r.area}</div>
                <h2 className="h1" style={{fontSize: 26, margin: '8px 0 6px'}}>{r.name}</h2>
                <div className="row gap-4" style={{color:'var(--text-muted)', fontSize: 13.5, marginTop: 10}}>
                  <span><Icon name="clock" size={12}/> {r.days} días para el examen</span>
                  <span><Icon name="video" size={12}/> {r.courses} cursos</span>
                  <span><Icon name="target" size={12}/> Examen {r.examDate}</span>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize: 44, fontWeight: 800, color: 'var(--accent)', lineHeight: 1}}>
                  {Math.round(r.progress * 100)}%
                </div>
                <div className="muted" style={{fontSize: 12.5, marginTop: 4}}>completado</div>
              </div>
            </div>
            <div style={{padding: '24px 28px'}}>
              <div className="eyebrow" style={{marginBottom: 18}}>Próximos hitos</div>
              <div style={{position:'relative', paddingLeft: 18}}>
                <div style={{position:'absolute', left: 11, top: 8, bottom: 8, width: 2, background:'var(--border)'}}/>
                {milestones.map(m => (
                  <div key={m.id} className="row gap-3" style={{padding: '10px 0', position:'relative'}}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: m.done ? 'var(--success)' : m.current ? 'var(--accent)' : 'var(--surface-3)',
                      border: m.current ? '3px solid var(--accent-soft-2)' : 'none',
                      display: 'grid', placeItems:'center', color: 'white', flexShrink: 0,
                      marginLeft: -19,
                      boxShadow: m.current ? '0 0 0 4px var(--bg)' : '0 0 0 4px var(--surface)',
                    }}>
                      {m.done && <Icon name="check" size={11} stroke={3}/>}
                    </span>
                    <span style={{
                      fontSize: 14,
                      color: m.done ? 'var(--text-muted)' : 'var(--text)',
                      fontWeight: m.current ? 600 : 500,
                      textDecoration: m.done ? 'line-through' : 'none',
                      opacity: m.done ? 0.7 : 1,
                      flex: 1,
                    }}>{m.title}</span>
                    {m.current && (
                      <span className="chip active" style={{height: 24}}>En progreso</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="h2" style={{marginBottom: 14}}>Otras rutas</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 16}}>
          {routes.filter(r => !r.featured).map(r => (
            <div key={r.id} className="card card-pad" style={{display:'flex', flexDirection:'column', gap: 14}}>
              <div className="row gap-3">
                <div style={{width: 44, height: 44, borderRadius: 12,
                  background: r.color, color:'white', display:'grid', placeItems:'center',
                  fontWeight: 700}}>
                  <Icon name="route" size={18}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize: 15, fontWeight: 700}}>{r.name}</div>
                  <div className="muted" style={{fontSize: 12.5}}>{r.area}</div>
                </div>
              </div>
              <div className="route-progress"><div style={{width: `${r.progress*100}%`}}/></div>
              <div className="row gap-3" style={{justifyContent:'space-between'}}>
                <span className="muted" style={{fontSize: 12.5}}>{Math.round(r.progress*100)}% completado · {r.courses} cursos</span>
                <button className="btn btn-soft btn-sm">Cambiar a esta ruta</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ScreenProgreso({ onNavigate }) {
  const week = ['L','M','M','J','V','S','D'];
  const heat = [0.6, 1, 0.4, 0.8, 1, 0.3, 0.7]; // intensity of completion
  return (
    <div className="content fade-in" data-screen-label="07 Mi Progreso">
      <section>
        <span className="eyebrow">Tu evolución</span>
        <h1 className="h1" style={{marginTop: 6}}>Mi progreso</h1>
      </section>

      <section style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 16}}>
        <Stat icon="flame"  num="12" lbl="Días de racha" accent="#ff6b3d"/>
        <Stat icon="clock"  num="47h" lbl="Tiempo este mes" accent="#7c6cff"/>
        <Stat icon="trophy" num="6" lbl="Logros" accent="#fbbf24"/>
        <Stat icon="bolt"   num="2,340" lbl="XP totales" accent="#34d399"/>
      </section>

      <section style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 16}}>
        <div className="card card-pad">
          <div className="row" style={{justifyContent:'space-between', marginBottom: 18}}>
            <h3 className="h3">Actividad esta semana</h3>
            <span className="muted" style={{fontSize: 12.5}}>11 — 17 mayo</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap: 8, alignItems:'end', height: 160}}>
            {heat.map((h, i) => (
              <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 8}}>
                <div style={{
                  width: '100%', height: `${h*100}%`,
                  background: i === 4 ? 'var(--accent)' : `color-mix(in oklab, var(--accent) ${Math.round(h*80)}%, var(--surface-3))`,
                  borderRadius: 8,
                  minHeight: 8,
                }}/>
                <span className="muted" style={{fontSize: 12, fontWeight: 600}}>{week[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <h3 className="h3" style={{marginBottom: 16}}>Logros recientes</h3>
          {[
            { icon: 'flame',   color:'#ff6b3d', title:'Racha de fuego', desc:'10 días consecutivos' },
            { icon: 'check',   color:'#34d399', title:'Maestro de conjuntos', desc:'Completaste 5 lecciones' },
            { icon: 'sparkle', color:'#7c6cff', title:'Primera práctica', desc:'8/8 en tu primer quiz' },
          ].map((a, i) => (
            <div key={i} className="row gap-3" style={{padding: '12px 0', borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none'}}>
              <div style={{width: 38, height: 38, borderRadius: 10,
                background: a.color + '22', color: a.color,
                display:'grid', placeItems:'center'}}>
                <Icon name={a.icon} size={18}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize: 13.5, fontWeight: 600}}>{a.title}</div>
                <div className="muted" style={{fontSize: 12}}>{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="h2" style={{marginBottom: 14}}>Por curso</h2>
        <div className="card" style={{padding: 0, overflow: 'hidden'}}>
          {CUILIB_COURSES.filter(c => c.progress > 0).map((c, i) => (
            <div key={c.id} className="row gap-4" style={{
              padding: '14px 18px',
              borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none',
            }}>
              <div style={{width: 36, height: 36, borderRadius: 10,
                background: c.color, color:'white', display:'grid', placeItems:'center',
                padding: 6, flexShrink: 0}}>
                {GLYPHS[c.glyph]}
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div className="row" style={{justifyContent:'space-between', marginBottom: 6}}>
                  <span style={{fontSize: 14, fontWeight: 600}}>{c.title}</span>
                  <span style={{fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500}}>
                    {Math.round(c.progress*100)}%
                  </span>
                </div>
                <div className="route-progress" style={{height: 6}}>
                  <div style={{width: `${c.progress*100}%`, background: c.color}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ScreenNotificaciones() {
  const items = [
    { type: 'achievement', title: 'Nuevo logro desbloqueado', desc:'Completaste 10 días de racha 🔥', when:'hace 2h', accent:'#ff6b3d', icon:'flame', unread: true },
    { type: 'lesson',      title: 'Nueva lección publicada', desc:'Álgebra: Polinomios y ecuaciones cuadráticas', when:'hace 5h', accent:'#7c6cff', icon:'video', unread: true },
    { type: 'reminder',    title: 'Tu sesión diaria te espera', desc:'Mantén tu racha — 5 minutos bastan', when:'hace 1d', accent:'#fbbf24', icon:'bell', unread: true },
    { type: 'route',       title: 'Ruta actualizada', desc:'Tu ruta de admisión SM se actualizó con 2 lecciones más', when:'hace 2d', accent:'#34d399', icon:'route' },
    { type: 'comment',     title: 'Karla respondió tu comentario', desc:'"Gracias por la ayuda con cardinalidad..."', when:'hace 3d', accent:'#f06a6a', icon:'chat' },
  ];
  return (
    <div className="content fade-in" data-screen-label="08 Notificaciones" style={{maxWidth: 760}}>
      <section>
        <span className="eyebrow">Tu actividad</span>
        <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
          <h1 className="h1" style={{marginTop: 6}}>Notificaciones</h1>
          <button className="btn btn-ghost btn-sm">Marcar todas como leídas</button>
        </div>
      </section>
      <section>
        <div className="card" style={{padding: 0, overflow: 'hidden'}}>
          {items.map((n, i) => (
            <div key={i} className="row gap-3" style={{
              padding: '16px 20px',
              borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none',
              background: n.unread ? 'color-mix(in oklab, var(--accent) 4%, transparent)' : 'transparent',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: n.accent + '22', color: n.accent,
                display:'grid', placeItems:'center', flexShrink: 0,
              }}>
                <Icon name={n.icon} size={18}/>
              </div>
              <div style={{flex:1}}>
                <div className="row" style={{justifyContent:'space-between', marginBottom: 4}}>
                  <span style={{fontSize: 14, fontWeight: 600}}>{n.title}</span>
                  <span className="dim" style={{fontSize: 12}}>{n.when}</span>
                </div>
                <p style={{margin:0, fontSize: 13.5, color: 'var(--text-muted)'}}>{n.desc}</p>
              </div>
              {n.unread && <span style={{width: 8, height: 8, borderRadius: '50%', background:'var(--accent)', flexShrink: 0}}/>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ScreenPasar({ onOpenCourse }) {
  return (
    <div className="content fade-in" data-screen-label="09 Pasar el rato">
      <section>
        <span className="eyebrow">Aprende relajado</span>
        <h1 className="h1" style={{marginTop: 6}}>Pasar el rato</h1>
        <p className="muted" style={{maxWidth: 560, marginTop: 6}}>
          Píldoras cortas, datos curiosos y juegos rápidos para mantener la cabeza ágil entre clase y clase.
        </p>
      </section>

      <section style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16}}>
        {[
          { title: 'Datazo del día', tag:'2 min', body:'¿Sabías que el cero fue inventado de forma independiente en al menos tres civilizaciones distintas?', color:'var(--c-amber)' },
          { title: 'Mini-reto', tag:'30 seg', body:'¿Cuál es el siguiente número en la secuencia: 2, 6, 12, 20, 30, ___?', color:'var(--c-purple)' },
          { title: 'Cápsula histórica', tag:'3 min', body:'La revolución de Hipatia: la primera mujer matemática reconocida.', color:'var(--c-mint)' },
        ].map((c, i) => (
          <div key={i} className="card" style={{padding: 0, overflow: 'hidden', cursor:'pointer'}}>
            <div style={{
              height: 110, background: `linear-gradient(135deg, ${c.color}, color-mix(in oklab, ${c.color} 100%, black 25%))`,
              position: 'relative',
              display:'grid', placeItems:'center', color:'white',
            }}>
              <span style={{
                position: 'absolute', top: 12, right: 12,
                padding: '4px 10px', fontSize: 11, fontWeight: 600,
                background: 'rgba(0,0,0,0.32)', borderRadius: 999,
              }}>{c.tag}</span>
              <Icon name="sparkle" size={32}/>
            </div>
            <div style={{padding: 18}}>
              <div style={{fontSize: 15, fontWeight: 700, marginBottom: 6}}>{c.title}</div>
              <p style={{margin: 0, fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.5}}>{c.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="h2" style={{marginBottom: 14}}>Juegos rápidos</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12}}>
          {[
            {n:'Cálculo mental', t:'3 min', c:'var(--c-orange)'},
            {n:'Memoria histórica', t:'5 min', c:'var(--c-cobalt)'},
            {n:'Anagramas', t:'2 min', c:'var(--c-green)'},
            {n:'Mapas del mundo', t:'4 min', c:'var(--c-amber)'},
          ].map((g, i) => (
            <div key={i} className="card card-pad row gap-3" style={{cursor:'pointer'}}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: g.c, color:'white', display:'grid', placeItems:'center',
              }}>
                <Icon name="bolt" size={18}/>
              </div>
              <div>
                <div style={{fontSize: 13.5, fontWeight: 600}}>{g.n}</div>
                <div className="muted" style={{fontSize: 12}}>{g.t}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

window.ScreenRutas = ScreenRutas;
window.ScreenProgreso = ScreenProgreso;
window.ScreenNotificaciones = ScreenNotificaciones;
window.ScreenPasar = ScreenPasar;
