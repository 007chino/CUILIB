// screens-player.jsx — Reproductor de clase
const { useState, useEffect, useRef } = React;

const YOUTUBE_IDS = { c1: 'YG0mbr7t1aQ' };

function ScreenPlayer({ course, lesson, onBack, onNext, onPrev, onPractice, onSelectLesson }) {
  const youtubeId = YOUTUBE_IDS[lesson.id] || null;
  const [speed] = useState('1.0X');
  const playerRef = useRef(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(e => console.error(e));
    } else {
      document.exitFullscreen();
    }
  };

  const submitComment = () => {
    if (!newComment.trim()) return;
    setComments([{name: 'Luis Angel', avatar: 'L', body: newComment.trim(), when: 'ahora'}, ...comments]);
    setNewComment('');
  };

  return (
    <div className="content fade-in" data-screen-label="04 Reproductor"
         style={{display:'grid', gridTemplateColumns:'1fr 360px', gap: 22, alignItems:'start'}}>
      <div style={{display:'flex', flexDirection:'column', gap: 18}}>
        {/* Header bar */}
        <div className="card card-pad row" style={{justifyContent:'space-between'}}>
          <div className="row gap-3">
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: `linear-gradient(135deg, ${course.color}, color-mix(in oklab, ${course.color} 100%, black 30%))`,
              color: 'white', display: 'grid', placeItems: 'center', padding: 8,
            }}>
              {GLYPHS[course.glyph]}
            </div>
            <div>
              <div className="muted" style={{fontSize: 12.5, fontWeight: 500}}>
                Clase 5 de 45 · {course.title}
              </div>
              <div style={{fontSize: 16, fontWeight: 700, marginTop: 2, letterSpacing:'-0.01em'}}>
                {lesson.title}
              </div>
            </div>
          </div>
          <div className="row gap-2">
            <button className="btn btn-secondary btn-sm" onClick={onPrev}>
              <Icon name="chevLeft" size={14}/> Anterior
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onNext}>
              Siguiente <Icon name="chevRight" size={14}/>
            </button>
            <button className="btn btn-primary btn-sm" onClick={onPractice}>
              <Icon name="pencil" size={14}/> Practicar
            </button>
          </div>
        </div>

        {/* Video player */}
        <div className="player" ref={playerRef}>
          <div className="frame" style={{ cursor: 'default', padding: 0, overflow: 'hidden' }}>
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <>
                <div className="grid-bg"/>
                <div style={{
                  position:'absolute', inset: 0, display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center', gap: 12, pointerEvents:'none',
                  background:'linear-gradient(135deg,#0f0e1a 0%,#1c1a28 100%)',
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius:'50%',
                    background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)',
                    display:'grid', placeItems:'center', color:'rgba(255,255,255,0.4)',
                  }}>
                    <Icon name="play" size={26}/>
                  </div>
                  <div style={{textAlign:'center', padding:'0 32px'}}>
                    <div style={{color:'rgba(255,255,255,0.7)', fontSize:14, fontWeight:600, lineHeight:1.4}}>
                      {lesson.title}
                    </div>
                    <div style={{color:'rgba(255,255,255,0.3)', fontSize:12, marginTop:6}}>
                      Próximamente disponible
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="controls" style={{ opacity: 0.35, pointerEvents: 'none' }}>
            <button className="ctrl-btn"><Icon name="play" size={16}/></button>
            <button className="ctrl-btn"><Icon name="back10" size={16}/></button>
            <button className="ctrl-btn"><Icon name="forward10" size={16}/></button>
            <span className="time">--:-- / --:--</span>
            <div className="seekbar"><div style={{width: '0%'}}/></div>
            <span className="speed">{speed}</span>
            <button className="ctrl-btn" style={{pointerEvents:'auto', opacity:1}} onClick={toggleFullscreen}>
              <Icon name="fullscreen" size={16}/>
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="card card-pad">
          <div className="row" style={{justifyContent:'space-between', marginBottom: 14}}>
            <div className="row gap-2">
              <Icon name="chat" size={16} style={{color:'var(--text-muted)'}}/>
              <span className="eyebrow">Comentarios</span>
              <span style={{fontSize: 11, color:'var(--text-dim)'}}>· {comments.length}</span>
            </div>
            <button className="btn btn-ghost btn-sm">Más recientes ▾</button>
          </div>

          <div className="row gap-3" style={{marginBottom: 18, alignItems:'flex-start'}}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              backgroundImage: 'url(assets/perfil.jpg)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              flexShrink: 0,
            }} aria-label="Luis Angel"/>
            <div style={{flex: 1}}>
              <input
                className="chat-input"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitComment()}
                placeholder="Comparte una duda o aporte..."
                style={{height: 40, fontSize: 13}}
              />
              {newComment && (
                <div className="row gap-2" style={{marginTop: 8, justifyContent: 'flex-end'}}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setNewComment('')}>Cancelar</button>
                  <button className="btn btn-primary btn-sm" onClick={submitComment}>Publicar</button>
                </div>
              )}
            </div>
          </div>

          {comments.length === 0 && (
            <div className="muted" style={{fontSize: 13, textAlign:'center', padding: '16px 0'}}>
              Sé el primero en comentar esta lección.
            </div>
          )}
          {comments.map((c, i) => (
            <div key={i} className="row gap-3" style={{padding: '12px 0', borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none', alignItems:'flex-start'}}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: ['#7c6cff','#34d399','#fbbf24','#f06a6a'][i % 4],
                color: '#fff', display: 'grid', placeItems: 'center',
                fontWeight: 700, fontSize: 13, flexShrink: 0,
              }}>{c.avatar}</div>
              <div style={{flex: 1}}>
                <div className="row gap-2" style={{marginBottom: 4}}>
                  <span style={{fontSize: 13.5, fontWeight: 600}}>{c.name}</span>
                  <span className="dim" style={{fontSize: 12}}>{c.when}</span>
                </div>
                <p style={{margin: 0, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.5}}>{c.body}</p>
                <div className="row gap-3" style={{marginTop: 8, fontSize: 12, color:'var(--text-muted)'}}>
                  <span style={{cursor:'pointer'}}>↑ Útil</span>
                  <span style={{cursor:'pointer'}}>Responder</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Temario */}
      <aside style={{position:'sticky', top: 92, display:'flex', flexDirection:'column', gap: 14}}>
        <div className="card" style={{padding: 0, overflow:'hidden'}}>
          <div style={{padding: '14px 18px', borderBottom: '1px solid var(--border-soft)'}}>
            <div className="eyebrow">Temario</div>
          </div>
          <div style={{padding: '6px 8px 14px'}}>
            {ARITMETICA_MODULES.map(m => (
              <TemarioModule key={m.id} module={m} currentLessonId={lesson.id} onSelectLesson={onSelectLesson}/>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function TemarioModule({ module, currentLessonId, onSelectLesson }) {
  const hasCurrent = module.lessons.some(l => l.id === currentLessonId);
  const [open, setOpen] = useState(hasCurrent);
  const completed = module.lessons.filter(l => l.done).length;

  return (
    <div style={{padding: '4px 4px'}}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems:'center', gap: 10,
          padding: '10px 12px', borderRadius: 10,
          background: open ? 'var(--accent-soft)' : 'transparent',
          color: open ? 'var(--text)' : 'var(--text-2)',
          cursor: 'pointer', fontWeight: 600, fontSize: 13.5,
          border: '1px solid', borderColor: open ? 'var(--accent-soft-2)' : 'transparent',
        }}
      >
        <span style={{transition: 'transform 200ms', transform: open ? 'rotate(90deg)' : 'none', display:'grid', placeItems:'center'}}>
          <Icon name="chev" size={14}/>
        </span>
        <span style={{flex: 1}}>{module.title}</span>
        <span style={{fontSize: 11, color: 'var(--text-muted)', fontWeight: 500}}>
          {completed}/{module.count}
        </span>
      </div>
      {open && (
        <div style={{padding: '4px 0 8px 14px', marginLeft: 14, borderLeft: '1px solid var(--border)'}}>
          {module.lessons.map(l => (
            <div key={l.id} className="row gap-3"
              onClick={() => onSelectLesson && onSelectLesson(l)}
              style={{
              padding: '8px 10px', fontSize: 13,
              color: l.id === currentLessonId ? 'var(--accent)' : (l.done ? 'var(--text-2)' : 'var(--text-muted)'),
              fontWeight: l.id === currentLessonId ? 600 : 500,
              cursor: 'pointer',
              borderRadius: 8,
              background: l.id === currentLessonId ? 'var(--accent-soft)' : 'transparent',
            }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: l.done ? 'var(--success)' : (l.id === currentLessonId ? 'var(--accent)' : 'var(--surface-3)'),
                border: l.done ? 'none' : '2px solid ' + (l.id === currentLessonId ? 'var(--accent)' : 'var(--border-strong)'),
                flexShrink: 0,
              }}/>
              <span style={{flex: 1, lineHeight: 1.35}}>{l.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

window.ScreenPlayer = ScreenPlayer;
