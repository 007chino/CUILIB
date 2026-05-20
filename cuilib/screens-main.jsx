// screens.jsx — All page screens
const { useState: cUseState, useEffect: cUseEffect, useRef: cUseRef } = React;

// ─── INICIO (Dashboard) ─────────────────────────────────────────
function ScreenInicio({ onNavigate, onOpenCourse, cardStyle, user }) {
  const firstCourse = CUILIB_COURSES[0];
  const recommended = CUILIB_COURSES.slice(0, 4);

  return (
    <div className="content fade-in" data-screen-label="01 Inicio">
      {/* Welcome row */}
      <section>
        <div className="row gap-3" style={{ marginBottom: 6 }}>
          <span className="eyebrow">Bienvenido a CUILIB</span>
        </div>
        <h1 className="h1">Hola, Luis Angel 
</h1>
        <p className="muted" style={{ margin: '6px 0 0', maxWidth: 520, fontSize: 14.5 }}>
          Empieza tu primer curso y construye tu racha de estudio.
        </p>
      </section>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <Stat icon="flame" num="0" lbl="Días de racha" accent="#ff6b3d" />
        <Stat icon="clock" num="0" lbl="Minutos este mes" accent="#7c6cff" />
        <Stat icon="check" num="0" lbl="Lecciones completadas" accent="#34d399" />
        <Stat icon="trophy" num="0" lbl="Logros desbloqueados" accent="#fbbf24" />
      </section>

      {/* Continue */}
      <section>
        <div className="sect-hd">
          <div>
            <span className="eyebrow">Por dónde empezar</span>
            <h2 className="h2" style={{ marginTop: 6 }}>Comienza con {firstCourse.title}</h2>
          </div>
        </div>
        <ContinueBanner course={firstCourse} onOpen={onOpenCourse} />
      </section>

      {/* Recommended */}
      <section>
        <div className="sect-hd">
          <h2 className="h2">Recomendados para ti</h2>
          <span className="link" onClick={() => onNavigate('cursos')}>Ver todos →</span>
        </div>
        <div className="grid-courses">
          {recommended.map((c) => <CourseCard key={c.id} course={c} style={cardStyle} onOpen={onOpenCourse} />
          )}
        </div>
      </section>

      {/* Practice card */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <PracticeBanner onPractice={() => onNavigate('quiz')} />
        <RouteWidget onOpen={() => onNavigate('rutas')} />
      </section>
    </div>);

}

function ContinueBanner({ course, onOpen }) {
  const pct = Math.round(course.progress * 100);
  return (
    <div className="card" style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(260px, 1fr) 1.6fr',
      gap: 0,
      padding: 0,
      overflow: 'hidden',
      borderColor: 'var(--border)'
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${course.color}, color-mix(in oklab, ${course.color} 100%, black 30%))`,
        position: 'relative',
        minHeight: 200,
        display: 'grid', placeItems: 'center',
        color: 'rgba(255,255,255,0.95)',
        padding: 24
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18,
          background: 'radial-gradient(80% 60% at 20% 20%, white, transparent 60%)' }} />
        <div style={{ width: 130, height: 130, position: 'relative' }}>{GLYPHS[course.glyph]}</div>
      </div>
      <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="row gap-3" style={{ color: 'var(--text-muted)', fontSize: 12.5, fontWeight: 500 }}>
          <span>Teoría de conjuntos</span>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <span>Clase 5 de 45</span>
        </div>
        <h3 className="h2" style={{ margin: 0, lineHeight: 1.2 }}>{course.title}: Operaciones entre conjuntos</h3>
        <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
          Continúa explorando las operaciones entre conjuntos: unión, intersección, diferencia y complemento.
        </p>
        <div style={{ marginTop: 'auto' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="muted" style={{ fontSize: 12.5 }}>Progreso del curso</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--accent)' }}>{pct}%</span>
          </div>
          <div className="route-progress" style={{ height: 6, marginBottom: 16 }}>
            <div style={{ width: `${pct}%` }} />
          </div>
          <div className="row gap-3">
            <button className="btn btn-primary" onClick={() => onOpen(course)}>
              <Icon name="play" size={14} /> Continuar curso
            </button>
            <button className="btn btn-secondary">
              <Icon name="pencil" size={14} /> Practicar
            </button>
          </div>
        </div>
      </div>
    </div>);

}

function PracticeBanner({ onPractice }) {
  return (
    <div className="card" style={{
      padding: 24,
      background: 'linear-gradient(135deg, var(--surface), var(--surface-2))',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180,
        background: 'radial-gradient(circle, var(--accent-soft-2), transparent 70%)',
        borderRadius: '50%' }} />
      <div style={{ position: 'relative' }}>
        <span className="eyebrow" style={{ color: 'var(--accent)' }}>
          <Icon name="sparkle" size={12} /> Práctica diaria
        </span>
        <h3 className="h2" style={{ margin: '10px 0 8px' }}>5 minutos de práctica con GAZAPITO</h3>
        <p className="muted" style={{ margin: '0 0 18px', fontSize: 14, maxWidth: 380 }}>
          Resuelve 8 preguntas adaptadas a tu nivel. Te ayudo si te trabas.
        </p>
        <button className="btn btn-primary" onClick={onPractice}>
          <Icon name="bolt" size={14} /> Empezar práctica
        </button>
      </div>
    </div>);

}

function RouteWidget({ onOpen }) {
  return (
    <div className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 className="h3">Tu ruta: Admisión San Marcos</h3>
        <Icon name="route" size={18} style={{ color: 'var(--text-muted)' }} />
      </div>
      <div className="row gap-3" style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
        <span>Examen en</span>
        <strong style={{ color: 'var(--text)' }}>62 días</strong>
        <span>·</span>
        <strong style={{ color: 'var(--accent)' }}>34% completo</strong>
      </div>
      <div className="route-progress"><div style={{ width: '34%' }} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, marginTop: 4 }}>
        {Array.from({ length: 12 }).map((_, i) =>
        <div key={i} style={{
          height: 18, borderRadius: 3,
          background: i < 4 ? 'var(--accent)' : i < 6 ? 'var(--accent-soft-2)' : 'var(--surface-3)'
        }} />
        )}
      </div>
      <button className="btn btn-soft btn-sm" onClick={onOpen}>Ver mi ruta completa</button>
    </div>);

}

// ─── CURSOS ─────────────────────────────────────────────────────
function ScreenCursos({ onOpenCourse, cardStyle, search }) {
  const [tab, setTab] = cUseState('all');
  const [viewMode, setViewMode] = cUseState('grid'); // 'grid' | 'list'
  const [sortOpen, setSortOpen] = cUseState(false);
  const [sortBy, setSortBy] = cUseState('default');
  const cats = [{ id: 'all', label: 'Todos' }, ...CUILIB_CATEGORIES];

  const SORT_OPTIONS = [
    { id: 'default',  label: 'Orden por defecto' },
    { id: 'alpha',    label: 'Nombre A → Z' },
    { id: 'videos',   label: 'Más videos' },
    { id: 'hours',    label: 'Más horas' },
  ];

  const sortFn = (a, b) => {
    if (sortBy === 'alpha')  return a.title.localeCompare(b.title);
    if (sortBy === 'videos') return b.videos - a.videos;
    if (sortBy === 'hours')  return b.hours - a.hours;
    return 0;
  };

  const filteredAll = CUILIB_COURSES
    .filter((c) => !search || c.title.toLowerCase().includes(search.toLowerCase()))
    .sort(sortFn);

  const byCat = cats.filter((c) => c.id !== 'all').map((c) => ({
    cat: c,
    courses: filteredAll.filter((x) => x.cat === c.id && (tab === 'all' || tab === c.id))
  })).filter((b) => b.courses.length > 0);

  return (
    <div className="content fade-in" data-screen-label="02 Cursos" onClick={() => sortOpen && setSortOpen(false)}>
      <section>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <span className="eyebrow">Catálogo</span>
            <h1 className="h1" style={{ marginTop: 6 }}>Cursos</h1>
          </div>
          <div className="row gap-2" style={{ position: 'relative' }}>
            <button
              className="icon-btn"
              title={viewMode === 'grid' ? 'Cambiar a vista lista' : 'Cambiar a vista cuadrícula'}
              style={{ background: viewMode === 'list' ? 'var(--accent-soft)' : undefined, color: viewMode === 'list' ? 'var(--accent)' : undefined }}
              onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
            >
              <Icon name={viewMode === 'grid' ? 'grid' : 'grid'} size={16} />
            </button>
            <button
              className="icon-btn"
              title="Ordenar cursos"
              style={{ background: sortBy !== 'default' ? 'var(--accent-soft)' : undefined, color: sortBy !== 'default' ? 'var(--accent)' : undefined }}
              onClick={(e) => { e.stopPropagation(); setSortOpen(o => !o); }}
            >
              <Icon name="filter" size={16} />
            </button>
            {sortOpen && (
              <div onClick={e => e.stopPropagation()} style={{
                position: 'absolute', top: 44, right: 0, zIndex: 100,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow)',
                minWidth: 200, padding: '6px 0',
              }}>
                {SORT_OPTIONS.map(o => (
                  <div key={o.id}
                    onClick={() => { setSortBy(o.id); setSortOpen(false); }}
                    style={{
                      padding: '9px 16px', fontSize: 13.5, cursor: 'pointer',
                      color: sortBy === o.id ? 'var(--accent)' : 'var(--text-2)',
                      fontWeight: sortBy === o.id ? 700 : 400,
                      background: sortBy === o.id ? 'var(--accent-soft)' : 'transparent',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    {sortBy === o.id && <Icon name="check" size={13}/>}
                    {o.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="row gap-2" style={{ flexWrap: 'wrap' }}>
          {cats.map((c) =>
          <span key={c.id}
          className={`chip ${tab === c.id ? 'active' : ''}`}
          onClick={() => setTab(c.id)}>
              {c.label}
            </span>
          )}
        </div>
      </section>

      {byCat.map(({ cat, courses }) =>
      <section key={cat.id}>
          <div className="sect-hd">
            <h2 className="h2">{cat.label}</h2>
            <span className="muted" style={{ fontSize: 13 }}>{courses.length} cursos</span>
          </div>
          {viewMode === 'grid' ? (
            <div className="grid-courses">
              {courses.map((c) => <CourseCard key={c.id} course={c} style={cardStyle} onOpen={onOpenCourse} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {courses.map((c) => (
                <div key={c.id} className="card card-pad row" style={{ gap: 16, cursor: 'pointer', justifyContent: 'flex-start' }} onClick={() => onOpenCourse(c)}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: `linear-gradient(135deg, ${c.color}, color-mix(in oklab, ${c.color} 100%, black 30%))`,
                    color: 'rgba(255,255,255,0.95)', display: 'grid', placeItems: 'center', padding: 8,
                  }}>{GLYPHS[c.glyph]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700 }}>{c.title}</div>
                    <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{c.videos} videos · {c.hours}h</div>
                  </div>
                  <button className="btn btn-soft btn-sm">Ver curso</button>
                </div>
              ))}
            </div>
          )}
      </section>
      )}

      {byCat.length === 0 &&
      <div className="card card-pad center" style={{ padding: '60px 20px' }}>
          <Icon name="search" size={32} style={{ color: 'var(--text-dim)', marginBottom: 12 }} />
          <h3 className="h3">No encontramos cursos</h3>
          <p className="muted">Intenta con otro término o cambia el filtro.</p>
        </div>
      }
    </div>);

}

// ─── DETALLE DE CURSO ───────────────────────────────────────────
function ScreenDetalle({ course, onPlay, onPractice, onBack }) {
  const [openModule, setOpenModule] = cUseState('conjuntos');

  return (
    <div className="content fade-in" data-screen-label="03 Detalle">
      <div className="row gap-2">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="chevLeft" size={14} /> Cursos
        </button>
        <span className="dim">/</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{course.title}</span>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
        <div>
          <div className="hero">
            <div className="hero-cover" style={{
              background: `linear-gradient(160deg, ${course.color}, color-mix(in oklab, ${course.color} 100%, black 30%))`
            }}>
              <div className="glyph" style={{ width: 120, height: 120, color: 'rgba(255,255,255,0.95)' }}>
                {GLYPHS[course.glyph]}
              </div>
            </div>
            <div>
              <div className="row gap-2" style={{ flexWrap: 'wrap', marginBottom: 16 }}>
                <span className="chip"><Icon name="video" size={12} /> {course.videos} videos</span>
                <span className="chip"><Icon name="clock" size={12} /> {course.hours} horas de contenido</span>
                <span className="chip"><Icon name="trophy" size={12} /> Certificado al finalizar</span>
              </div>
              <h1 className="h1" style={{ fontSize: 36, lineHeight: 1.05 }}>{course.title}</h1>
              <div className="rating" style={{ marginTop: 14 }}>
                <span className="muted" style={{ fontSize: 13 }}>Sin valoraciones aún</span>
              </div>
              <p style={{ marginTop: 18, color: 'var(--text-2)', maxWidth: 620, lineHeight: 1.6, fontSize: 14.5, textWrap: 'pretty' }}>
                {(COURSE_DESCRIPTIONS && COURSE_DESCRIPTIONS[course.id]) || `Explora los contenidos de ${course.title} con lecciones estructuradas y práctica guiada por GAZAPITO.`}
              </p>
            </div>
          </div>

          {/* Modules */}
          <section style={{ marginTop: 32 }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 className="h2">Temario</h2>
              {course.id === 'aritmetica' && (
                <span className="muted" style={{ fontSize: 13 }}>
                  {ARITMETICA_MODULES.reduce((s, m) => s + m.count, 0)} lecciones
                </span>
              )}
            </div>

            {course.id === 'aritmetica' ? (
              ARITMETICA_MODULES.map((m) => (
                <div key={m.id} className={`acc-item ${openModule === m.id ? 'open' : ''}`}>
                  <div className="acc-hd" onClick={() => setOpenModule(openModule === m.id ? null : m.id)}>
                    <span className="chev"><Icon name="chev" size={16} /></span>
                    <span className="title">{m.title}</span>
                    <span className="count">{m.count} {m.count === 1 ? 'lección' : 'lecciones'}</span>
                  </div>
                  <div className="acc-body">
                    <div className="acc-body-inner">
                      {m.lessons.map((l, idx) => (
                        <div key={l.id} className="lesson-row" style={{ cursor: 'pointer' }} onClick={() => onPlay(l)}>
                          <div className={`lesson-num ${l.done ? 'done' : ''}`}>
                            {l.done ? <Icon name="check" size={12} /> : idx + 1}
                          </div>
                          <div className="lesson-thumb">
                            <div className="play-ico"><Icon name="play" size={12} /></div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div className="lesson-title">{l.title}</div>
                            <div className="lesson-meta">
                              <span className="pill"><Icon name="clock" size={11} /> {l.duration}</span>
                              {l.done && <span className="pill done"><Icon name="check" size={11} /> Completado</span>}
                              {l.current && <span className="pill" style={{ color: 'var(--accent)', background: 'var(--accent-soft)' }}>En curso</span>}
                            </div>
                          </div>
                          <button className="btn btn-soft btn-sm" onClick={(e) => { e.stopPropagation(); onPractice(); }}>
                            <Icon name="pencil" size={12} /> Practicar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card card-pad" style={{ textAlign: 'center', padding: '44px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--surface-3)', display: 'grid', placeItems: 'center', color: 'var(--text-dim)' }}>
                  <Icon name="clock" size={24} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-2)' }}>Temario en preparación</div>
                <p className="muted" style={{ maxWidth: 340, fontSize: 13.5, lineHeight: 1.5 }}>
                  Estamos produciendo las lecciones de <strong>{course.title}</strong>. Pronto estará disponible con videos, ejercicios y práctica guiada.
                </p>
                <span className="chip" style={{ color: 'var(--accent)', background: 'var(--accent-soft)', fontWeight: 600 }}>
                  Próximamente — {course.videos} lecciones · {course.hours}h
                </span>
              </div>
            )}
          </section>
        </div>

        {/* Right column: video card */}
        <aside style={{ position: 'sticky', top: 92, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 14 }}>
            <div style={{
              aspectRatio: '16/10', borderRadius: 'var(--r)',
              background: 'radial-gradient(80% 60% at 50% 40%, #1a1830, #07060e 70%)',
              display: 'grid', placeItems: 'center',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(124,108,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,108,255,0.06) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'radial-gradient(circle at 50% 50%, #000 30%, transparent 70%)'
              }} />
              <div style={{ width: 60, height: 60, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                display: 'grid', placeItems: 'center', color: 'white', cursor: 'pointer' }}>
                <Icon name="play" size={20} />
              </div>
            </div>
            <div style={{ padding: '14px 4px 4px' }}>
              <button className="btn btn-primary btn-block btn-lg" onClick={() => onPlay()}>
                <Icon name="play" size={14} /> Continuar curso
              </button>
              <div className="row gap-3" style={{ marginTop: 10, justifyContent: 'space-around' }}>
                <button className="btn btn-ghost btn-sm">
                  <Icon name="plus" size={14} /> Agregar a mi ruta
                </button>
                <button className="btn btn-ghost btn-sm" onClick={onPractice}>
                  <Icon name="pencil" size={14} /> Practicar
                </button>
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="eyebrow" style={{ marginBottom: 10 }}>Lo que aprenderás</div>
            {[
            'Operaciones entre conjuntos y diagramas',
            'Sistemas de numeración y cambio de base',
            'Lógica proposicional y tablas de verdad',
            'Divisibilidad: MCD y MCM'].
            map((t, i) =>
            <div key={i} className="row gap-2" style={{ padding: '6px 0', fontSize: 13 }}>
                <span style={{ color: 'var(--success)' }}><Icon name="check" size={14} stroke={2} /></span>
                <span>{t}</span>
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>);

}

window.ScreenInicio = ScreenInicio;
window.ScreenCursos = ScreenCursos;
window.ScreenDetalle = ScreenDetalle;