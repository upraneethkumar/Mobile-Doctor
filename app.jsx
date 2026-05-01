// app.jsx — wraps the mobile site in iOS frame, with desktop preview + tweaks

const { useState: aS, useEffect: aE, useRef: aR } = React;
const { themes: TH, fontPairs: FP, useReveal: uRev, useScrollProgress: uSP, Icon: AI } = window.MD;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "cardKind": "neuro",
  "heroVariant": "editorial",
  "fontPair": "editorial",
  "animation": 100,
  "showFrame": true
}/*EDITMODE-END*/;

function MobileSite({ tweaks, setTweak }) {
  const theme = TH[tweaks.dark ? 'dark' : 'light'];
  const fonts = FP[tweaks.fontPair] || FP.classical;
  const scrollRef = aR(null);
  uRev(scrollRef, tweaks.animation);
  const progress = uSP(scrollRef);

  const Hero = tweaks.heroVariant === 'split' ? window.MDS.HeroSplit
             : tweaks.heroVariant === 'numbers' ? window.MDS.HeroNumbers
             : window.MDS.HeroEditorial;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: theme.bg, overflow: 'hidden' }}>
      <window.MDS.DeliveryRibbon theme={theme} fonts={fonts} />
      <div ref={scrollRef} className="md-scroll no-scrollbar" style={{
        width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden',
        background: theme.bgGrad,
        color: theme.fg,
        paddingBottom: 110,
      }}>
        <Hero theme={theme} fonts={fonts} intensity={tweaks.animation} dark={tweaks.dark} onToggleDark={() => setTweak('dark', !tweaks.dark)} />
        <window.MDS.Sales theme={theme} fonts={fonts} cardKind={tweaks.cardKind} />
        <window.MDS.Services theme={theme} fonts={fonts} cardKind={tweaks.cardKind} intensity={tweaks.animation} />
        <window.MDS.Why theme={theme} fonts={fonts} cardKind={tweaks.cardKind} />
        <window.MDS.Brands theme={theme} fonts={fonts} />
        <window.MDS.Location theme={theme} fonts={fonts} cardKind={tweaks.cardKind} />
        <window.MDS.Contact theme={theme} fonts={fonts} cardKind={tweaks.cardKind} />
      </div>
      <window.MDS.BottomNav theme={theme} fonts={fonts} scrollRef={scrollRef} progress={progress} />
    </div>
  );
}

function StageBackground({ dark }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: -1,
      background: dark
        ? 'radial-gradient(circle at 30% 20%, #15203b 0%, transparent 50%), radial-gradient(circle at 80% 90%, #0a1326 0%, transparent 60%), #050b18'
        : 'radial-gradient(circle at 30% 20%, #faf6ec 0%, transparent 50%), radial-gradient(circle at 80% 90%, #ede2c8 0%, transparent 60%), #f5ecd9',
    }} />
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <StageBackground dark={tweaks.dark} />

      {/* Stage */}
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px 40px',
      }}>
        {tweaks.showFrame ? (
          <IOSDevice width={402} height={874} dark={tweaks.dark}>
            <div style={{ height: '100%', position: 'relative' }}>
              <MobileSite tweaks={tweaks} setTweak={setTweak} />
            </div>
          </IOSDevice>
        ) : (
          <div style={{
            width: 402, height: 874, borderRadius: 32, overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)', position: 'relative',
          }}>
            <MobileSite tweaks={tweaks} setTweak={setTweak} />
          </div>
        )}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakToggle label="Dark mode" value={tweaks.dark} onChange={v => setTweak('dark', v)} />
        <TweakRadio label="Card style" value={tweaks.cardKind} options={[
          { value: 'glass', label: 'Glass' },
          { value: 'flat', label: 'Flat' },
          { value: 'neuro', label: 'Neuro' },
        ]} onChange={v => setTweak('cardKind', v)} />
        <TweakSection label="Composition" />
        <TweakSelect label="Hero variant" value={tweaks.heroVariant} options={[
          { value: 'editorial', label: 'Editorial (default)' },
          { value: 'split', label: 'Split image' },
          { value: 'numbers', label: 'Big numbers' },
        ]} onChange={v => setTweak('heroVariant', v)} />
        <TweakSelect label="Type pairing" value={tweaks.fontPair} options={[
          { value: 'classical', label: 'Cormorant × Inter' },
          { value: 'editorial', label: 'Fraunces × Inter' },
          { value: 'couture', label: 'Playfair × Inter' },
          { value: 'modern', label: 'Inter only (modern)' },
        ]} onChange={v => setTweak('fontPair', v)} />
        <TweakSection label="Motion" />
        <TweakSlider label="Animation intensity" value={tweaks.animation} min={0} max={100} step={10} onChange={v => setTweak('animation', v)} />
        <TweakToggle label="iOS frame" value={tweaks.showFrame} onChange={v => setTweak('showFrame', v)} />
      </TweaksPanel>
    </>
  );
}

// Desktop preview shows the same content but in a wider browser-like canvas
function DesktopPreview({ tweaks }) {
  const theme = TH[tweaks.dark ? 'dark' : 'light'];
  const fonts = FP[tweaks.fontPair] || FP.classical;
  return (
    <div style={{
      width: 'min(1180px, 96vw)', borderRadius: 14, overflow: 'hidden',
      background: theme.bg, color: theme.fg,
      boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
      border: `0.5px solid ${theme.border}`,
    }}>
      {/* fake browser chrome */}
      <div style={{
        height: 40, background: tweaks.dark ? '#0c1428' : '#ede2c8',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 6,
        borderBottom: `0.5px solid ${theme.border}`,
      }}>
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        <div style={{
          flex: 1, marginLeft: 16, height: 24, borderRadius: 6,
          background: tweaks.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: `0.5px solid ${theme.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: theme.fgMuted, letterSpacing: '0.1em',
        }}>mobiledoctor.in</div>
      </div>

      <DesktopHero theme={theme} fonts={fonts} intensity={tweaks.animation} />
      <DesktopSales theme={theme} fonts={fonts} cardKind={tweaks.cardKind} />
      <DesktopServices theme={theme} fonts={fonts} cardKind={tweaks.cardKind} />
      <DesktopBrands theme={theme} fonts={fonts} />
      <DesktopFooter theme={theme} fonts={fonts} />
    </div>
  );
}

function DesktopHero({ theme, fonts, intensity }) {
  return (
    <div style={{
      padding: '70px 80px 90px', position: 'relative', overflow: 'hidden',
      background: theme.bgGrad,
    }}>
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.gold}22, transparent 65%)`, filter: 'blur(40px)',
        animation: intensity > 30 ? 'md-float 9s ease-in-out infinite' : 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 80, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${theme.gold}, ${theme.goldDeep}, ${theme.gold})`,
            display: 'grid', placeItems: 'center',
          }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: theme.bg, display: 'grid', placeItems: 'center', fontFamily: fonts.display, fontStyle: 'italic', fontSize: 17, color: theme.gold }}>M</div>
          </div>
          <div>
            <div style={{ fontFamily: fonts.display, fontSize: 18, color: theme.fg, lineHeight: 1 }}>Mobile Doctor</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: theme.fgMuted, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 3 }}>Hyderabad · Est. 2013</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, fontFamily: fonts.body, fontSize: 13, color: theme.fgMuted }}>
          {['Shop', 'Services', 'About', 'Visit'].map(l => <div key={l} style={{ cursor: 'pointer' }}>{l}</div>)}
          <button style={{
            height: 40, padding: '0 18px', border: 'none', cursor: 'pointer',
            background: theme.gold, color: theme.navy, borderRadius: 999,
            fontFamily: fonts.body, fontWeight: 600, fontSize: 11.5, letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>Book Repair</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: theme.gold, letterSpacing: '0.32em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 0.5, background: theme.gold }} />
            Sales · Service · Repair
          </div>
          <h1 style={{
            fontFamily: fonts.display, fontWeight: 400, color: theme.fg,
            fontSize: 84, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '24px 0 0',
          }}>
            Don't <span style={{ fontStyle: 'italic', color: theme.gold }}>delay</span>—repair<br/>
            it <span style={{ fontStyle: 'italic', fontWeight: 500, background: `linear-gradient(90deg, ${theme.gold}, ${theme.goldDeep}, ${theme.gold})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', backgroundSize: '200% 100%', animation: intensity > 30 ? 'md-shimmer 4s linear infinite' : 'none' }}>today.</span>
          </h1>
          <p style={{ fontFamily: fonts.body, fontSize: 17, color: theme.fgMuted, lineHeight: 1.6, marginTop: 28, maxWidth: 420 }}>
            Hyderabad's quietly obsessive mobile repair atelier. Genuine parts, certified hands, an unhurried pace, and a warranty that means something.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
            <button style={{
              height: 56, padding: '0 28px', border: 'none', cursor: 'pointer',
              background: `linear-gradient(180deg, ${theme.gold}, ${theme.goldDeep})`, color: theme.navy,
              borderRadius: 14, fontFamily: fonts.body, fontWeight: 600, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
              boxShadow: `0 14px 30px -10px ${theme.gold}88`,
            }}>Book a Repair</button>
            <button style={{
              height: 56, padding: '0 24px', border: `0.5px solid ${theme.borderStrong}`, background: 'transparent', cursor: 'pointer',
              color: theme.fg, borderRadius: 14, fontFamily: fonts.body, fontWeight: 500, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>+91 80084 04707</button>
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 28 }}>
            {[['12+', 'Years'], ['18k+', 'Repairs'], ['9', 'Brands'], ['24h', 'Turnaround']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: fonts.display, fontSize: 38, color: theme.fg, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: theme.fgMuted, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden', height: 540,
          border: `0.5px solid ${theme.borderStrong}`, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)',
        }}>
          <img src={window.MD.IMG.repair1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 50%, ${theme.bg}aa)` }} />
          <div style={{ position: 'absolute', left: 24, bottom: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: theme.gold, letterSpacing: '0.25em' }}>—— THE REPAIR BENCH</div>
            <div style={{ fontFamily: fonts.display, fontStyle: 'italic', fontSize: 26, color: theme.ivory, marginTop: 6 }}>Atelier 01</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopSales({ theme, fonts, cardKind }) {
  const products = [
    { n: 'Smartphones', img: window.MD.IMG.smart, t: 'NEW' },
    { n: 'Earphones', img: window.MD.IMG.earbuds, t: 'AUDIO' },
    { n: 'Chargers', img: window.MD.IMG.charger, t: 'POWER' },
    { n: 'Cables', img: window.MD.IMG.cable, t: 'CONNECT' },
    { n: 'Screen Guards', img: window.MD.IMG.protector, t: 'SHIELD' },
    { n: 'Phone Cases', img: window.MD.IMG.cases, t: 'COVER' },
  ];
  return (
    <div style={{ padding: '90px 80px', borderTop: `0.5px solid ${theme.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 50 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: theme.gold, letterSpacing: '0.32em', textTransform: 'uppercase' }}>02 — Sales</div>
          <h2 style={{ fontFamily: fonts.display, fontSize: 64, color: theme.fg, margin: '14px 0 0', letterSpacing: '-0.02em', lineHeight: 1 }}>The <span style={{ fontStyle: 'italic', color: theme.gold }}>showroom</span>.</h2>
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: theme.fgMuted, maxWidth: 380, lineHeight: 1.6 }}>
          A curated catalogue of mobiles and accessories — sourced from authorised distributors, photographed under daylight.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {products.map(p => (
          <div key={p.n} style={{
            ...window.MD.cardStyle(cardKind, theme), borderRadius: 22, overflow: 'hidden', cursor: 'pointer',
          }}>
            <div style={{ height: 240, position: 'relative' }}>
              <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: theme.gold, letterSpacing: '0.22em', padding: '5px 9px', background: `${theme.bg}cc`, borderRadius: 999 }}>{p.t}</div>
            </div>
            <div style={{ padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: fonts.display, fontSize: 22, color: theme.fg }}>{p.n}</div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: `0.5px solid ${theme.borderStrong}`, color: theme.fg, display: 'grid', placeItems: 'center' }}>
                <AI name="arrow" size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopServices({ theme, fonts, cardKind }) {
  const services = [
    { ic: 'screen',  n: 'Display Repair', d: 'Cracked glass, dead pixels, OLED replacement.' },
    { ic: 'battery', n: 'Battery Replace', d: 'Genuine cells, certified lifecycle, warranty.' },
    { ic: 'water',   n: 'Water Damage',  d: 'Ultrasonic restoration, board-level recovery.' },
    { ic: 'tools',   n: 'A–Z Repairing',  d: 'From chip-off to chassis. Every fault, fixed.' },
  ];
  return (
    <div style={{ padding: '90px 80px', borderTop: `0.5px solid ${theme.border}`, background: theme.glass }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: theme.gold, letterSpacing: '0.32em', textTransform: 'uppercase' }}>03 — Services</div>
        <h2 style={{ fontFamily: fonts.display, fontSize: 64, color: theme.fg, margin: '14px 0 0', letterSpacing: '-0.02em', lineHeight: 1 }}>Quietly <span style={{ fontStyle: 'italic', color: theme.gold }}>obsessive</span> repair work.</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {services.map((s, i) => (
          <div key={s.n} style={{
            ...window.MD.cardStyle(cardKind, theme), borderRadius: 22, padding: 30,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: `linear-gradient(145deg, ${theme.gold}33, transparent)`,
              border: `0.5px solid ${theme.borderStrong}`, color: theme.gold,
              display: 'grid', placeItems: 'center', marginBottom: 24,
            }}><AI name={s.ic} size={26} stroke={1.3} /></div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: theme.gold, letterSpacing: '0.22em' }}>0{i + 1}</div>
            <div style={{ fontFamily: fonts.display, fontSize: 22, color: theme.fg, marginTop: 8, lineHeight: 1.15 }}>{s.n}</div>
            <div style={{ fontFamily: fonts.body, fontSize: 13, color: theme.fgMuted, lineHeight: 1.55, marginTop: 10 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopBrands({ theme, fonts }) {
  const brands = ['iPhone', 'Pixel', 'Samsung', 'iQOO', 'Vivo', 'Oppo', 'MI', 'Moto', 'realme'];
  const row = [...brands, ...brands];
  return (
    <div style={{ padding: '90px 0', borderTop: `0.5px solid ${theme.border}`, overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: theme.gold, letterSpacing: '0.32em', textTransform: 'uppercase' }}>05 — Trust</div>
        <h2 style={{ fontFamily: fonts.display, fontSize: 56, color: theme.fg, margin: '14px 0 0', letterSpacing: '-0.02em', lineHeight: 1 }}>Every brand, <span style={{ fontStyle: 'italic', color: theme.gold }}>under one roof</span>.</h2>
      </div>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content', animation: 'md-marquee 36s linear infinite' }}>
        {row.map((b, i) => (
          <div key={i} style={{ padding: '24px 50px', borderRight: `0.5px solid ${theme.border}`, fontFamily: fonts.display, fontStyle: i % 2 ? 'normal' : 'italic', fontSize: 42, color: theme.fg, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: theme.gold }} />
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopFooter({ theme, fonts }) {
  return (
    <div style={{
      padding: '70px 80px 50px', borderTop: `0.5px solid ${theme.border}`,
      display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40,
    }}>
      <div>
        <div style={{ fontFamily: fonts.display, fontStyle: 'italic', fontSize: 34, color: theme.gold }}>Mobile Doctor.</div>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: theme.fgMuted, lineHeight: 1.7, marginTop: 14, maxWidth: 320 }}>
          Under Kompally Bridge, via Gundlapochampally Village, Hyderabad.
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: theme.gold, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Call</div>
        <div style={{ fontFamily: fonts.body, fontSize: 14, color: theme.fg, marginTop: 10 }}>+91 80084 04707</div>
        <div style={{ fontFamily: fonts.body, fontSize: 14, color: theme.fg, marginTop: 4 }}>+91 98497 98969</div>
      </div>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: theme.gold, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Mail</div>
        <div style={{ fontFamily: fonts.body, fontSize: 14, color: theme.fg, marginTop: 10 }}>mobiledoctor@gmail.com</div>
      </div>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: theme.gold, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Hours</div>
        <div style={{ fontFamily: fonts.body, fontSize: 14, color: theme.fg, marginTop: 10 }}>10:00 — 21:00</div>
        <div style={{ fontFamily: fonts.body, fontSize: 13, color: theme.fgMuted, marginTop: 4 }}>Mon — Sun</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
