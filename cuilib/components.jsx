// components.jsx — Sidebar, Topbar, CourseCard, etc.
const { useState: cUseState, useEffect: cUseEffect, useRef: cUseRef, Fragment: cFragment } = React;

const NAV = [
  { id: 'inicio',  label: 'Inicio',        icon: 'home'      },
  { id: 'cursos',  label: 'Cursos',        icon: 'video'     },
  { id: 'practica',label: 'Práctica',      icon: 'paperclip' },
  { id: 'pasar',   label: 'Pasar el rato', icon: 'check'     },
  { id: 'rutas',   label: 'Mis rutas',     icon: 'route'     },
  { id: 'progreso',label: 'Mi progreso',   icon: 'rewind'    },
  { id: 'notif',   label: 'Notificaciones',icon: 'bell', badge: '3' },
];

function Sidebar({ route, onNavigate, collapsed, theme, onToggleTheme, user, onLogout, isAdmin }) {
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Usuario';
  const inicial = displayName[0].toUpperCase();

  return (
    <aside className="sidebar" data-screen-label="Sidebar">
      <div className="brand">
        {collapsed
          ? <span className="brand-mark-only" aria-label="cuilib"
                  dangerouslySetInnerHTML={{ __html: (window.CUILIB_SVGS||{})['logo-mark'] || '' }}/>
          : <span className="brand-logo" aria-label="cuilib"
                  dangerouslySetInnerHTML={{ __html: (window.CUILIB_SVGS||{})['logo'] || '' }}/>
        }
      </div>

      <nav className="nav">
        {NAV.map(item => (
          <div
            key={item.id}
            className={`nav-item ${route === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            title={item.label}
          >
            <span className="ico"><Icon name={item.icon}/></span>
            <span className="label">{item.label}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </div>
        ))}
        {isAdmin && (
          <div
            className={`nav-item ${route === 'admin' ? 'active' : ''}`}
            onClick={() => onNavigate('admin')}
            title="Administrador"
          >
            <span className="ico"><Icon name="settings"/></span>
            <span className="label">Administrador</span>
          </div>
        )}
      </nav>

      <div style={{flex:1}}/>

      {!collapsed && (
        <button
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: 12, width: '100%', justifyContent: 'flex-start', color: 'var(--text-muted)' }}
          onClick={onToggleTheme}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14}/>
          <span style={{ marginLeft: 6, fontWeight: 500 }}>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
        </button>
      )}

      {collapsed && (
        <button
          className="icon-btn"
          style={{ marginBottom: 12, margin: '0 auto 12px auto', border: 'none', background: 'transparent', boxShadow: 'none' }}
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18}/>
        </button>
      )}

      {!collapsed && (
        <button
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: 8, width: '100%', justifyContent: 'flex-start', color: 'var(--text-muted)', fontSize: 12 }}
          onClick={onLogout}
        >
          <Icon name="chevLeft" size={14}/>
          <span style={{ marginLeft: 6, fontWeight: 500 }}>Cerrar sesión</span>
        </button>
      )}

      <div className="user-card" onClick={() => onNavigate('progreso')}>
        <div className="avatar" style={{
          backgroundImage: 'none',
          background: 'var(--accent)',
          display: 'grid', placeItems: 'center',
          color: 'white', fontWeight: 700, fontSize: 14,
        }}>
          {inicial}
        </div>
        {!collapsed && (
          <div className="meta">
            <div className="name">{displayName}</div>
            <div className="plan">{isAdmin ? 'Administrador' : 'Estudiante'}</div>
          </div>
        )}
      </div>
    </aside>
  );
}

function Topbar({ crumbs = [], onSearch, search = '' }) {
  return (
    <header className="topbar" data-screen-label="Topbar">
      <div className="crumbs">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          const label = typeof c === 'object' ? c.label : c;
          const onClick = typeof c === 'object' ? c.onClick : null;
          return (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep"><Icon name="chev" size={14}/></span>}
              <span
                className={isLast ? 'here' : ''}
                onClick={onClick || undefined}
                style={onClick ? { cursor: 'pointer', opacity: 0.7, transition: 'opacity 0.15s' } : undefined}
                onMouseEnter={onClick ? e => e.target.style.opacity = 1 : undefined}
                onMouseLeave={onClick ? e => e.target.style.opacity = 0.7 : undefined}
              >
                {label}
              </span>
            </React.Fragment>
          );
        })}
      </div>
      <div className="spacer"/>
      <div className="search">
        <span className="ico"><Icon name="search" size={16}/></span>
        <input
          placeholder="Buscar cursos o clases"
          value={search}
          onChange={e => onSearch && onSearch(e.target.value)}
        />
      </div>
      <button className="icon-btn" title="Notificaciones">
        <Icon name="bell" size={18}/>
        <span className="dot"/>
      </button>
    </header>
  );
}

function CourseCard({ course, style = 'illustration', onOpen, large = false }) {
  const glyph = GLYPHS[course.glyph];
  return (
    <div
      className={`course-card style-${style}`}
      style={{ '--c': course.color }}
      onClick={() => onOpen && onOpen(course)}
    >
      {style !== 'flat' && <div className="shape-tl"/>}
      <div className="corner-glyph">{glyph}</div>
      <div className="meta">10 clases</div>
      <div className="play" onClick={(e) => { e.stopPropagation(); onOpen && onOpen(course); }}>
        <Icon name="play" size={14}/>
      </div>
      <div className="body">
        <div className="title">{course.title}</div>
        <div className="progress">
          <div style={{ width: `${Math.round(course.progress*100)}%` }}/>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, num, lbl, accent }) {
  return (
    <div className="stat">
      <div className="ico-wrap" style={accent ? { background: accent + '22', color: accent } : null}>
        <Icon name={icon} size={20}/>
      </div>
      <div>
        <div className="num">{num}</div>
        <div className="lbl">{lbl}</div>
      </div>
    </div>
  );
}

function Stars({ value = 5, max = 5 }) {
  return (
    <span className="stars">
      {Array.from({length: max}).map((_, i) =>
        <Icon key={i} name="star" size={16} stroke={0}/>
      )}
    </span>
  );
}

window.Sidebar = Sidebar;
window.Topbar = Topbar;
window.CourseCard = CourseCard;
window.Stat = Stat;
window.Stars = Stars;
window.NAV = NAV;
