// icons.jsx — minimalist line icons, single stroke
const { createElement: h, useState, useEffect, useRef, useMemo, useCallback, Fragment } = React;

const Icon = ({ name, size = 20, stroke = 1.7, className, style }) => {
  const paths = {
    home:     <><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/></>,
    video:    <><rect x="2.5" y="6" width="14" height="12" rx="2.5"/><path d="m17 10 5-3v10l-5-3"/></>,
    paperclip:<path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 1 1 5 5L10.5 18a2 2 0 0 1-3-3l8-8"/>,
    check:    <><rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/></>,
    route:    <><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M6 8.5v3a4 4 0 0 0 4 4h4a4 4 0 0 1 0 0"/><path d="M15.5 18H8"/></>,
    rewind:   <><path d="m11 6-7 6 7 6"/><path d="m20 6-7 6 7 6"/></>,
    bell:     <><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7z"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    search:   <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    play:     <path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>,
    pause:    <><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/></>,
    skipBack: <path d="M19 5 9 12l10 7zM5 5v14"/>,
    skipNext: <path d="m5 5 10 7L5 19zM19 5v14"/>,
    chev:     <path d="m9 6 6 6-6 6"/>,
    chevDown: <path d="m6 9 6 6 6-6"/>,
    chevLeft: <path d="m15 6-6 6 6 6"/>,
    chevRight:<path d="m9 6 6 6-6 6"/>,
    plus:     <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    pencil:   <><path d="M4 20h4l11-11-4-4L4 16z"/><path d="m14 6 4 4"/></>,
    star:     <path d="m12 3 2.9 6 6.6.6-5 4.6 1.5 6.4L12 17l-6 3.6 1.5-6.4-5-4.6 6.6-.6z" fill="currentColor" stroke="none"/>,
    starOut:  <path d="m12 3 2.9 6 6.6.6-5 4.6 1.5 6.4L12 17l-6 3.6 1.5-6.4-5-4.6 6.6-.6z"/>,
    heart:    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="currentColor" stroke="none"/>,
    x:        <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
    sun:      <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></>,
    moon:     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    fullscreen: <><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></>,
    reset:    <><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></>,
    forward10:<><path d="M3 12a9 9 0 1 1 3 6.7"/><path d="M3 4v5h5"/><text x="9" y="16" fontSize="9" fontFamily="ui-monospace" fill="currentColor" stroke="none">10</text></>,
    back10:   <><path d="M21 12a9 9 0 1 0-3 6.7"/><path d="M21 4v5h-5"/><text x="6" y="16" fontSize="9" fontFamily="ui-monospace" fill="currentColor" stroke="none">10</text></>,
    sparkle:  <><path d="m12 4 1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7z"/><path d="m18 14 .8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></>,
    flame:    <path d="M12 3s4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 1-4-1 1-3 3-3 6a6 6 0 1 0 12 0c0-5-6-10-6-10z"/>,
    book:     <><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z"/><path d="M4 17h14"/></>,
    target:   <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
    clock:    <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    trophy:   <><path d="M8 4h8v5a4 4 0 1 1-8 0z"/><path d="M5 5H4a2 2 0 0 0 2 4"/><path d="M19 5h1a2 2 0 0 1-2 4"/><path d="M9 14h6v3H9z"/><path d="M8 20h8"/></>,
    chat:     <><path d="M4 5h16v11H8l-4 4z"/></>,
    bolt:     <path d="m13 3-9 12h7l-1 6 9-12h-7z"/>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.5-2-3.5-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.5L5.1 10.8A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2.1 1.5 2 3.5 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.5-2.1-1.5c0-.4.1-.8.1-1.2z"/></>,
    grid:     <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    filter:   <path d="M4 5h16l-6 8v6l-4-2v-4z"/>,
    bear: null,
  };
  const body = paths[name] || null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke}
         strokeLinecap="round" strokeLinejoin="round"
         className={className} style={style}>
      {body}
    </svg>
  );
};

// Bear glyph for bartucha / brand mark fallback
const BearGlyph = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="9" cy="8" r="4" fill="currentColor" opacity="0.85"/>
    <circle cx="23" cy="8" r="4" fill="currentColor" opacity="0.85"/>
    <circle cx="16" cy="18" r="11" fill="currentColor"/>
    <circle cx="11" cy="16" r="1.6" fill="#0b0a13"/>
    <circle cx="21" cy="16" r="1.6" fill="#0b0a13"/>
    <ellipse cx="16" cy="21" rx="2.6" ry="1.8" fill="#0b0a13"/>
  </svg>
);

window.Icon = Icon;
window.BearGlyph = BearGlyph;
