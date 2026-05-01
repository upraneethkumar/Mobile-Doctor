// site.jsx — Mobile Doctor mobile site content
// Premium repair studio — deep navy + ivory + champagne gold

const { useState, useEffect, useRef, useMemo, useCallback, Fragment } = React;

// ─── Theme tokens ────────────────────────────────────────────
const themes = {
  dark: {
    bg: '#08101f',
    bgGrad: 'radial-gradient(120% 70% at 50% 0%, #14213d 0%, #0a1428 50%, #060c19 100%)',
    fg: '#f3ead4',
    fgMuted: 'rgba(243,234,212,0.62)',
    fgDim: 'rgba(243,234,212,0.4)',
    border: 'rgba(212,179,109,0.18)',
    borderStrong: 'rgba(212,179,109,0.4)',
    glass: 'rgba(255,250,235,0.04)',
    glassStrong: 'rgba(255,250,235,0.07)',
    gold: '#d4b36d',
    goldDeep: '#b89548',
    ivory: '#f3ead4',
    navy: '#0a1428',
    navyMid: '#14213d',
    accent: '#d4b36d',
  },
  light: {
    bg: '#faf6ec',
    bgGrad: 'radial-gradient(120% 70% at 50% 0%, #ffffff 0%, #f5ecd9 50%, #ede2c8 100%)',
    fg: '#0a1428',
    fgMuted: 'rgba(10,20,40,0.62)',
    fgDim: 'rgba(10,20,40,0.4)',
    border: 'rgba(184,149,72,0.22)',
    borderStrong: 'rgba(184,149,72,0.45)',
    glass: 'rgba(255,255,255,0.5)',
    glassStrong: 'rgba(255,255,255,0.7)',
    gold: '#a8853e',
    goldDeep: '#8a6b29',
    ivory: '#0a1428',
    navy: '#f5ecd9',
    navyMid: '#ede2c8',
    accent: '#a8853e',
  },
};

const fontPairs = {
  classical: { display: "'Cormorant Garamond', 'Playfair Display', serif", body: "'Inter Tight', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
  editorial: { display: "'Fraunces', 'Cormorant Garamond', serif", body: "'Inter Tight', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
  modern:    { display: "'Inter Tight', system-ui, sans-serif", body: "'Inter Tight', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
  couture:   { display: "'Playfair Display', serif", body: "'Inter Tight', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
};

// ─── Reveal-on-scroll hook ────────────────────────────────────
function useReveal(rootRef, intensity = 100) {
  useEffect(() => {
    if (!rootRef.current) return;
    const els = rootRef.current.querySelectorAll('.reveal');
    // Mark everything visible immediately so above-the-fold content paints
    els.forEach(el => el.classList.add('in'));
    if (intensity === 0) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        } else if (intensity > 70) {
          // re-trigger on scroll back at high intensity
          e.target.classList.remove('in');
          requestAnimationFrame(() => e.target.classList.add('in'));
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [intensity]);
}

// ─── Scroll-progress hook for the inner site ──────────────────
function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? el.scrollTop / max : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

// ─── Iconography (custom, never copied) ───────────────────────
const Icon = ({ name, size = 22, stroke = 1.5, color = 'currentColor' }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'phone':    return <svg {...props}><rect x="6" y="2" width="12" height="20" rx="2.5"/><line x1="11" y1="18.5" x2="13" y2="18.5"/></svg>;
    case 'tools':    return <svg {...props}><path d="M14 6l2-2 4 4-2 2-4-4zm-2 2L4 16v4h4l8-8"/></svg>;
    case 'battery':  return <svg {...props}><rect x="2" y="8" width="18" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="15"/><path d="M6 10v6M9 10v6M12 10v6"/></svg>;
    case 'water':    return <svg {...props}><path d="M12 3s7 8 7 13a7 7 0 01-14 0c0-5 7-13 7-13z"/></svg>;
    case 'screen':   return <svg {...props}><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M9 6l6 6m0-6l-6 6"/></svg>;
    case 'sparkle':  return <svg {...props}><path d="M12 3v6m0 6v6m-9-9h6m6 0h6M5.6 5.6l4.2 4.2m4.4 4.4l4.2 4.2M5.6 18.4l4.2-4.2m4.4-4.4l4.2-4.2"/></svg>;
    case 'check':    return <svg {...props}><path d="M4 12l5 5L20 6"/></svg>;
    case 'arrow':    return <svg {...props}><path d="M5 12h14m-6-6l6 6-6 6"/></svg>;
    case 'arrowDn':  return <svg {...props}><path d="M12 5v14m-6-6l6 6 6-6"/></svg>;
    case 'truck':    return <svg {...props}><path d="M2 7h11v9H2zm11 3h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
    case 'star':     return <svg {...props} fill={color} stroke="none"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"/></svg>;
    case 'pin':      return <svg {...props}><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'mail':     return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>;
    case 'whats':    return <svg {...props}><path d="M21 11.5a8.5 8.5 0 11-15.6 4.7L3 21l4.9-2.3A8.5 8.5 0 0121 11.5z"/><path d="M9 9c.3 1.5 2 4 4.5 5 .5.2 1.4.3 1.8-.2.3-.4.5-.7.7-1 .2-.3 0-.7-.3-.9l-1.2-.5c-.3-.1-.6 0-.8.2l-.3.4c-1-.5-1.7-1.2-2.2-2.2l.4-.3c.2-.2.3-.5.2-.8L11.3 8c-.2-.3-.6-.5-.9-.3-.3.2-.6.4-1 .7-.5.4-.4 1.3-.4 1.6z"/></svg>;
    case 'clock':    return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'shield':   return <svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'gear':     return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>;
    case 'bolt':     return <svg {...props}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>;
    case 'cable':    return <svg {...props}><path d="M9 2v4h6V2M12 6v4M6 14a6 6 0 0012 0v-4H6v4zM12 18v4"/></svg>;
    case 'cam':      return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7l1.5-2h3L15 7"/></svg>;
    case 'case':     return <svg {...props}><rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="12" cy="6.5" r="1"/><rect x="9" y="9" width="6" height="9" rx="1.5"/></svg>;
    case 'ear':      return <svg {...props}><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M7 14V8a5 5 0 0110 0v6"/></svg>;
    case 'plug':     return <svg {...props}><path d="M9 2v6m6-6v6M7 8h10v3a5 5 0 01-10 0V8zm5 8v6"/></svg>;
    case 'menu':     return <svg {...props}><path d="M4 7h16M4 12h10M4 17h16"/></svg>;
    case 'sun':      return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
    case 'moon':     return <svg {...props}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>;
    default: return null;
  }
};

// ─── Card chrome variants ─────────────────────────────────────
function cardStyle(style, theme) {
  if (style === 'glass') return {
    background: theme.glass,
    border: `0.5px solid ${theme.border}`,
    backdropFilter: 'blur(20px) saturate(140%)',
    WebkitBackdropFilter: 'blur(20px) saturate(140%)',
    boxShadow: `inset 0 1px 0 ${theme.borderStrong}, 0 30px 60px -30px rgba(0,0,0,0.6)`,
  };
  if (style === 'neuro') return {
    background: `linear-gradient(145deg, ${theme.glassStrong}, ${theme.glass})`,
    border: `0.5px solid ${theme.border}`,
    boxShadow: `8px 8px 24px rgba(0,0,0,0.35), -2px -2px 6px ${theme.borderStrong}`,
  };
  // flat
  return {
    background: theme.glass,
    border: `0.5px solid ${theme.border}`,
    boxShadow: 'none',
  };
}

// ─── Image URLs (Unsplash, royalty-free hot-link) ─────────────
const IMG = {
  hero1: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=900&q=80&auto=format&fit=crop',
  hero2: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=900&q=80&auto=format&fit=crop',
  hero3: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900&q=80&auto=format&fit=crop',
  repair1: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&q=80&auto=format&fit=crop',
  repair2: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=900&q=80&auto=format&fit=crop',
  repair3: 'https://images.unsplash.com/photo-1591290619762-c7d6c1ce8839?w=900&q=80&auto=format&fit=crop',
  phone:   'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&q=80&auto=format&fit=crop',
  earbuds: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80&auto=format&fit=crop',
  charger: 'https://images.unsplash.com/photo-1583394293214-28a4b0028e44?w=600&q=80&auto=format&fit=crop',
  cable:   'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&q=80&auto=format&fit=crop',
  protector:'https://images.unsplash.com/photo-1610792516775-01de03eae630?w=600&q=80&auto=format&fit=crop',
  cases:   'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80&auto=format&fit=crop',
  lens:    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80&auto=format&fit=crop',
  acc:     'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=600&q=80&auto=format&fit=crop',
  smart:   'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80&auto=format&fit=crop',
  shop:    'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=900&q=80&auto=format&fit=crop',
  technician:'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80&auto=format&fit=crop',
  display: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=900&q=80&auto=format&fit=crop',
};

window.MD = { themes, fontPairs, useReveal, useScrollProgress, Icon, cardStyle, IMG };
