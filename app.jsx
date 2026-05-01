// app.jsx — responsive website: mobile-first on < 768px, full desktop on >= 768px

const { useState: aS, useEffect: aE, useRef: aR } = React;
const {
  themes: TH,
  fontPairs: FP,
  useReveal: uRev,
  useScrollProgress: uSP,
  Icon: AI,
} = window.MD;

const TWEAK_DEFAULTS = {
  dark: true,
  cardKind: "neuro",
  heroVariant: "editorial",
  fontPair: "editorial",
  animation: 100,
};

// ─── Viewport hook ────────────────────────────────────────────────────────────

function useViewport() {
  const [vw, setVw] = aS(() => window.innerWidth);
  aE(() => {
    const fn = () => setVw(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    isMobile: vw < 768,
    isTablet: vw >= 768 && vw < 1100,
    isDesktop: vw >= 1100,
  };
}

// ─── Mobile root (full-viewport, no frame) ────────────────────────────────────

function MobileSite({ tweaks, setTweak, onBook }) {
  const theme = TH[tweaks.dark ? "dark" : "light"];
  const fonts = FP[tweaks.fontPair] || FP.classical;
  const scrollRef = aR(null);
  uRev(scrollRef, tweaks.animation);
  const progress = uSP(scrollRef);

  const Hero =
    tweaks.heroVariant === "split"
      ? window.MDS.HeroSplit
      : tweaks.heroVariant === "numbers"
        ? window.MDS.HeroNumbers
        : window.MDS.HeroEditorial;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: theme.bg,
        overflow: "hidden",
      }}
    >
      <div
        ref={scrollRef}
        className="md-scroll no-scrollbar"
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          background: theme.bgGrad,
          color: theme.fg,
          paddingBottom: 110,
        }}
      >
        <Hero
          theme={theme}
          fonts={fonts}
          intensity={tweaks.animation}
          dark={tweaks.dark}
          onToggleDark={() => setTweak("dark", !tweaks.dark)}
          onBook={onBook}
        />
        <window.MDS.Sales
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
        />
        <window.MDS.Services
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
          intensity={tweaks.animation}
        />
        <window.MDS.Why
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
        />
        <window.MDS.Brands theme={theme} fonts={fonts} />
        <window.MDS.Location
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
        />
        <window.MDS.Contact
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
          onBook={onBook}
        />
      </div>
      <window.MDS.BottomNav
        theme={theme}
        fonts={fonts}
        scrollRef={scrollRef}
        progress={progress}
      />
    </div>
  );
}

function MobileRoot({ tweaks, setTweak, onBook }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MobileSite tweaks={tweaks} setTweak={setTweak} onBook={onBook} />
    </div>
  );
}

// ─── Desktop sticky header ────────────────────────────────────────────────────

function DesktopStickyHeader({ theme, fonts, dark, isDesktop, onToggleDark, onBook }) {
  const hPad = isDesktop ? 80 : 48;
  return (
    <header
      className="md-desktop-header"
      style={{
        borderBottom: `0.5px solid ${theme.border}`,
        background: `${theme.bg}e6`,
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: `0 ${hPad}px`,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `conic-gradient(from 0deg, ${theme.gold}, ${theme.goldDeep}, ${theme.gold})`,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: theme.bg,
                display: "grid",
                placeItems: "center",
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontSize: 17,
                color: theme.gold,
              }}
            >
              M
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 17,
                color: theme.fg,
                lineHeight: 1,
              }}
            >
              Mobile Doctor
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                color: theme.fgMuted,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Hyderabad · Est. 2013
            </div>
          </div>
        </div>

        {/* Nav links — desktop only */}
        {isDesktop && (
          <nav
            style={{
              display: "flex",
              gap: 32,
              fontFamily: fonts.body,
              fontSize: 13,
              color: theme.fgMuted,
            }}
          >
            {[
              ["Shop", "#sec-sales"],
              ["Services", "#sec-services"],
              ["Trust", "#sec-why"],
              ["Visit", "#sec-location"],
              ["Contact", "#sec-contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  color: theme.fgMuted,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        {/* Right cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onToggleDark}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              cursor: "pointer",
              border: `0.5px solid ${theme.borderStrong}`,
              background: "transparent",
              display: "grid",
              placeItems: "center",
              color: theme.gold,
            }}
            aria-label="Toggle theme"
          >
            <AI name={dark ? "sun" : "moon"} size={18} stroke={1.4} />
          </button>
          <button
            onClick={onBook}
            style={{
              height: 44,
              padding: "0 22px",
              border: "none",
              cursor: "pointer",
              background: `linear-gradient(180deg, ${theme.gold}, ${theme.goldDeep})`,
              color: theme.navy,
              borderRadius: 999,
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 11.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: `0 8px 20px -8px ${theme.gold}88`,
            }}
          >
            Book Repair
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Desktop Hero ─────────────────────────────────────────────────────────────

function DesktopHero({ theme, fonts, intensity, isTablet, onBook }) {
  const hPad = isTablet ? 48 : 80;
  return (
    <div
      id="sec-hero"
      style={{
        padding: `90px ${hPad}px 90px`,
        position: "relative",
        overflow: "hidden",
        background: theme.bgGrad,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.gold}22, transparent 65%)`,
          filter: "blur(40px)",
          animation:
            intensity > 30 ? "md-float 9s ease-in-out infinite" : "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1.1fr 0.9fr",
          gap: 60,
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: theme.gold,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ width: 24, height: 0.5, background: theme.gold }} />
            Sales · Service · Repair
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 400,
              color: theme.fg,
              fontSize: isTablet ? 64 : 84,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "24px 0 0",
            }}
          >
            Don't{" "}
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              delay
            </span>
            —repair
            <br />
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: theme.gold,
              }}
            >
              today.
            </span>
          </h1>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 17,
              color: theme.fgMuted,
              lineHeight: 1.6,
              marginTop: 28,
              maxWidth: 420,
            }}
          >
            Hyderabad's quietly obsessive mobile repair atelier. Genuine parts,
            certified hands, an unhurried pace, and a warranty that means
            something.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            <button
              onClick={onBook}
              style={{
                height: 56,
                padding: "0 28px",
                border: "none",
                cursor: "pointer",
                background: `linear-gradient(180deg, ${theme.gold}, ${theme.goldDeep})`,
                color: theme.navy,
                borderRadius: 14,
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                boxShadow: `0 14px 30px -10px ${theme.gold}88`,
              }}
            >
              Book a Repair
            </button>
            <button
              style={{
                height: 56,
                padding: "0 24px",
                border: `0.5px solid ${theme.borderStrong}`,
                background: "transparent",
                cursor: "pointer",
                color: theme.fg,
                borderRadius: 14,
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              +91 98497 98969
            </button>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 28 }}>
            {[
              ["20+", "Years"],
              ["25k+", "Repairs"],
              ["15+", "Brands"],
              ["24h", "Turnaround"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 38,
                    color: theme.fg,
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9.5,
                    color: theme.fgMuted,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: 6,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            height: isTablet ? 380 : 540,
            border: `0.5px solid ${theme.borderStrong}`,
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
            marginTop: isTablet ? 40 : 0,
          }}
        >
          <img
            src={window.MD.IMG.repair1}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, transparent 50%, ${theme.bg}aa)`,
            }}
          />
          <div style={{ position: "absolute", left: 24, bottom: 24 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: theme.gold,
                letterSpacing: "0.25em",
              }}
            >
              —— THE REPAIR BENCH
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontSize: 26,
                color: theme.ivory,
                marginTop: 6,
              }}
            >
              Atelier 01
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Sales ─────────────────────────────────────────────────────────────

function DesktopSales({ theme, fonts, cardKind, isTablet }) {
  const hPad = isTablet ? 48 : 80;
  const products = [
    { n: "Smartphones", img: window.MD.IMG.smart, t: "NEW" },
    { n: "Earphones", img: window.MD.IMG.earbuds, t: "AUDIO" },
    { n: "Chargers", img: window.MD.IMG.charger, t: "POWER" },
    { n: "Cables", img: window.MD.IMG.cable, t: "CONNECT" },
    { n: "Screen Guards", img: window.MD.IMG.protector, t: "SHIELD" },
    { n: "Phone Cases", img: window.MD.IMG.cases, t: "COVER" },
  ];
  return (
    <div
      id="sec-sales"
      className="md-section-anchor"
      style={{
        padding: `${isTablet ? 70 : 90}px ${hPad}px`,
        borderTop: `0.5px solid ${theme.border}`,
      }}
    >
      <div
        style={{
          display: isTablet ? "block" : "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 50,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: theme.gold,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            02 — Sales
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: isTablet ? 48 : 64,
              color: theme.fg,
              margin: "14px 0 0",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            The{" "}
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              showroom
            </span>
            .
          </h2>
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 13,
            color: theme.fgMuted,
            maxWidth: 380,
            lineHeight: 1.6,
            marginTop: isTablet ? 20 : 0,
          }}
        >
          A curated catalogue of mobiles and accessories — sourced from
          authorised distributors, photographed under daylight.
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${isTablet ? 2 : 3}, 1fr)`,
          gap: 18,
        }}
      >
        {products.map((p) => (
          <div
            key={p.n}
            style={{
              ...window.MD.cardStyle(cardKind, theme),
              borderRadius: 22,
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div style={{ height: 240, position: "relative" }}>
              <img
                src={p.img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: theme.gold,
                  letterSpacing: "0.22em",
                  padding: "5px 9px",
                  background: `${theme.bg}cc`,
                  borderRadius: 999,
                }}
              >
                {p.t}
              </div>
            </div>
            <div
              style={{
                padding: "22px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 22,
                  color: theme.fg,
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `0.5px solid ${theme.borderStrong}`,
                  color: theme.fg,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <AI name="arrow" size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Services ──────────────────────────────────────────────────────────

function DesktopServices({ theme, fonts, cardKind, isTablet }) {
  const hPad = isTablet ? 48 : 80;
  const services = [
    {
      ic: "screen",
      n: "Display Repair",
      d: "Cracked glass, dead pixels, OLED replacement.",
    },
    {
      ic: "battery",
      n: "Battery Replace",
      d: "Genuine cells, certified lifecycle, warranty.",
    },
    {
      ic: "water",
      n: "Water Damage",
      d: "Ultrasonic restoration, board-level recovery.",
    },
    {
      ic: "tools",
      n: "A–Z Repairing",
      d: "From chip-off to chassis. Every fault, fixed.",
    },
  ];
  return (
    <div
      id="sec-services"
      className="md-section-anchor"
      style={{
        padding: `${isTablet ? 70 : 90}px ${hPad}px`,
        borderTop: `0.5px solid ${theme.border}`,
        background: theme.glass,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: theme.gold,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          03 — Services
        </div>
        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: isTablet ? 48 : 64,
            color: theme.fg,
            margin: "14px 0 0",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Quietly{" "}
          <span style={{ fontStyle: "italic", color: theme.gold }}>
            obsessive
          </span>{" "}
          repair work.
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${isTablet ? 2 : 4}, 1fr)`,
          gap: 18,
        }}
      >
        {services.map((s, i) => (
          <div
            key={s.n}
            style={{
              ...window.MD.cardStyle(cardKind, theme),
              borderRadius: 22,
              padding: 30,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `linear-gradient(145deg, ${theme.gold}33, transparent)`,
                border: `0.5px solid ${theme.borderStrong}`,
                color: theme.gold,
                display: "grid",
                placeItems: "center",
                marginBottom: 24,
              }}
            >
              <AI name={s.ic} size={26} stroke={1.3} />
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: theme.gold,
                letterSpacing: "0.22em",
              }}
            >
              0{i + 1}
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 22,
                color: theme.fg,
                marginTop: 8,
                lineHeight: 1.15,
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 13,
                color: theme.fgMuted,
                lineHeight: 1.55,
                marginTop: 10,
              }}
            >
              {s.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Why (NEW) ────────────────────────────────────────────────────────

function DesktopWhy({ theme, fonts, cardKind, isTablet }) {
  const hPad = isTablet ? 48 : 80;
  const points = [
    "Experienced & certified technicians",
    "Genuine replacement parts",
    "Fast turnaround times",
    "Competitive, transparent pricing",
    "Complete repair tools & consumables",
    "Service-with-warranty, in writing",
    "Every smartphone brand supported",
  ];
  return (
    <div
      id="sec-why"
      className="md-section-anchor"
      style={{
        padding: `${isTablet ? 70 : 90}px ${hPad}px`,
        borderTop: `0.5px solid ${theme.border}`,
        background: theme.bgGrad,
      }}
    >
      <div style={{ marginBottom: 60 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: theme.gold,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          04 — Why us
        </div>
        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: isTablet ? 48 : 64,
            color: theme.fg,
            margin: "14px 0 0",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          The Hyderabad standard for{" "}
          <span style={{ fontStyle: "italic", color: theme.gold }}>repair</span>
          .
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
          gap: isTablet ? 40 : 60,
          alignItems: "start",
        }}
      >
        {/* Quote card */}
        <div
          style={{
            ...window.MD.cardStyle(cardKind, theme),
            borderRadius: 28,
            padding: "36px 36px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 20,
              fontFamily: fonts.display,
              fontStyle: "italic",
              fontSize: 130,
              color: theme.gold,
              opacity: 0.12,
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            "
          </div>
          <p
            style={{
              fontFamily: fonts.display,
              fontSize: 22,
              lineHeight: 1.45,
              color: theme.fg,
              fontStyle: "italic",
              margin: 0,
              letterSpacing: "-0.01em",
              position: "relative",
              zIndex: 1,
            }}
          >
            At Mobile Doctor, we're committed to providing the highest quality
            mobile repair services in Hyderabad. Our experienced technicians use
            only genuine parts and the latest repair techniques.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                flexShrink: 0,
                background: theme.gold,
                color: theme.navy,
                display: "grid",
                placeItems: "center",
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontSize: 20,
              }}
            >
              M
            </div>
            <div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14,
                  color: theme.fg,
                  fontWeight: 500,
                }}
              >
                The Mobile Doctor Promise
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: theme.fgMuted,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                Hyderabad · Since 2013
              </div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div>
          {points.map((p, i) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "20px 0",
                borderBottom: `0.5px solid ${theme.border}`,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: theme.gold,
                  letterSpacing: "0.2em",
                  width: 30,
                  flexShrink: 0,
                }}
              >
                0{i + 1}
              </div>
              <div
                style={{
                  flex: 1,
                  fontFamily: fonts.body,
                  fontSize: 15,
                  color: theme.fg,
                  lineHeight: 1.4,
                }}
              >
                {p}
              </div>
              <AI name="check" size={18} stroke={1.4} color={theme.gold} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Brands ────────────────────────────────────────────────────────────

function DesktopBrands({ theme, fonts, isTablet }) {
  const brands = [
    "iPhone",
    "Pixel",
    "Samsung",
    "iQOO",
    "OnePlus",
    "Asus",
    "Vivo",
    "Oppo",
    "MI",
    "Motorola",
    "realme",
    "Redme",
    "POCO",
    "Xiaomi",
    "Nothing",
  ];
  const row = [...brands, ...brands];
  return (
    <div
      style={{
        padding: `${isTablet ? 70 : 90}px 0`,
        borderTop: `0.5px solid ${theme.border}`,
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: theme.gold,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          05 — Trust
        </div>
        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: isTablet ? 40 : 56,
            color: theme.fg,
            margin: "14px 0 0",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Every brand,{" "}
          <span style={{ fontStyle: "italic", color: theme.gold }}>
            under one roof
          </span>
          .
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
          animation: "md-marquee 36s linear infinite",
        }}
      >
        {row.map((b, i) => (
          <div
            key={i}
            style={{
              padding: "24px 50px",
              borderRight: `0.5px solid ${theme.border}`,
              fontFamily: fonts.display,
              fontStyle: i % 2 ? "normal" : "italic",
              fontSize: 42,
              color: theme.fg,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: theme.gold,
              }}
            />
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop Location (NEW) ────────────────────────────────────────────────────

function DesktopLocation({ theme, fonts, cardKind, isTablet }) {
  const hPad = isTablet ? 48 : 80;
  const mapH = isTablet ? 320 : 420;
  return (
    <div
      id="sec-location"
      className="md-section-anchor"
      style={{
        padding: `${isTablet ? 70 : 90}px ${hPad}px`,
        borderTop: `0.5px solid ${theme.border}`,
      }}
    >
      <div style={{ marginBottom: 60 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: theme.gold,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          06 — Location
        </div>
        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: isTablet ? 48 : 64,
            color: theme.fg,
            margin: "14px 0 0",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Find the{" "}
          <span style={{ fontStyle: "italic", color: theme.gold }}>
            atelier
          </span>
          .
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1.1fr 0.9fr",
          gap: isTablet ? 40 : 60,
          alignItems: "start",
        }}
      >
        {/* Map panel */}
        <div
          style={{
            ...window.MD.cardStyle(cardKind, theme),
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              height: mapH,
              background: `linear-gradient(135deg, ${theme.navyMid}, ${theme.navy})`,
              backgroundImage: `
              linear-gradient(${theme.border} 0.5px, transparent 0.5px),
              linear-gradient(90deg, ${theme.border} 0.5px, transparent 0.5px),
              linear-gradient(135deg, ${theme.navyMid}, ${theme.navy})
            `,
              backgroundSize: "32px 32px, 32px 32px, 100% 100%",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 360 240"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: "absolute", inset: 0 }}
            >
              <path
                d="M-10 80 Q 100 100 180 90 T 380 130"
                stroke={theme.gold}
                strokeOpacity="0.3"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M40 -10 Q 80 80 100 130 T 140 260"
                stroke={theme.gold}
                strokeOpacity="0.2"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M-10 180 Q 120 160 220 170 T 380 200"
                stroke={theme.gold}
                strokeOpacity="0.25"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M260 -10 Q 240 80 250 130 T 280 260"
                stroke={theme.gold}
                strokeOpacity="0.18"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            {/* Animated pin */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "48%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: `1px solid ${theme.gold}`,
                  animation: "md-pulse-ring 2.4s ease-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: `1px solid ${theme.gold}`,
                  animation: "md-pulse-ring 2.4s ease-out 1.2s infinite",
                }}
              />
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: theme.gold,
                  color: theme.navy,
                  display: "grid",
                  placeItems: "center",
                  boxShadow: `0 10px 24px -4px ${theme.gold}`,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <AI name="pin" size={22} stroke={1.6} />
              </div>
            </div>

            {/* Corner coords */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 20,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: theme.gold,
                letterSpacing: "0.2em",
              }}
            >
              17.5544° N
            </div>
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 20,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: theme.gold,
                letterSpacing: "0.2em",
              }}
            >
              78.4905° E
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 20,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: theme.fgMuted,
                letterSpacing: "0.2em",
              }}
            >
              HYD · KOMPALLY
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: theme.gold,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              VISIT THE STUDIO
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 34,
                color: theme.fg,
                lineHeight: 1.15,
                margin: "12px 0 0",
                letterSpacing: "-0.01em",
              }}
            >
              Under Kompally Bridge
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 15,
                color: theme.fgMuted,
                lineHeight: 1.65,
                marginTop: 10,
              }}
            >
              via Gundlapochampally Village,
              <br />
              Hyderabad, Telangana
            </div>
          </div>

          {/* Hours card */}
          <div
            style={{
              ...window.MD.cardStyle(cardKind, theme),
              borderRadius: 18,
              padding: "18px 22px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <AI name="clock" size={22} color={theme.gold} stroke={1.4} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14,
                  color: theme.fg,
                }}
              >
                Open today · 10:00 — 21:00
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9.5,
                  color: theme.fgMuted,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                Mon — Sun · Walk-ins welcome
              </div>
            </div>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#67e09b",
                boxShadow: "0 0 14px #67e09b",
                flexShrink: 0,
              }}
            />
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 14 }}>
            <button
              style={{
                flex: 1,
                height: 52,
                border: `0.5px solid ${theme.borderStrong}`,
                background: "transparent",
                color: theme.fg,
                borderRadius: 14,
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <AI name="arrow" size={16} /> Directions
            </button>
            <button
              style={{
                flex: 1,
                height: 52,
                border: "none",
                background: `linear-gradient(180deg, ${theme.gold}, ${theme.goldDeep})`,
                color: theme.navy,
                borderRadius: 14,
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: `0 12px 28px -10px ${theme.gold}88`,
              }}
            >
              <AI name="phone" size={16} stroke={1.6} /> Call now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Contact (NEW) ─────────────────────────────────────────────────────

function DesktopContact({ theme, fonts, cardKind, isTablet, onBook }) {
  const hPad = isTablet ? 48 : 80;
  const contacts = [
    { ic: "phone", l: "Call", v: "+91 80084 04707" },
    { ic: "whats", l: "WhatsApp", v: "+91 98497 98969" },
    { ic: "mail", l: "Email", v: "mobiledoctor@gmail.com" },
  ];
  return (
    <div
      id="sec-contact"
      className="md-section-anchor"
      style={{
        padding: `${isTablet ? 70 : 90}px ${hPad}px`,
        borderTop: `0.5px solid ${theme.border}`,
        background: theme.glass,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: theme.gold,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          07 — Contact
        </div>
        <h2
          style={{
            fontFamily: fonts.display,
            fontSize: isTablet ? 48 : 64,
            color: theme.fg,
            margin: "14px 0 0",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Speak to the{" "}
          <span style={{ fontStyle: "italic", color: theme.gold }}>Doctor</span>
          .
        </h2>
      </div>

      {/* Contact cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "repeat(3, 1fr)",
          gap: 18,
          marginBottom: 28,
        }}
      >
        {contacts.map((c) => (
          <div
            key={c.l}
            style={{
              ...window.MD.cardStyle(cardKind, theme),
              borderRadius: 22,
              padding: "32px 28px",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `linear-gradient(145deg, ${theme.gold}33, transparent)`,
                border: `0.5px solid ${theme.borderStrong}`,
                color: theme.gold,
                display: "grid",
                placeItems: "center",
                marginBottom: 22,
              }}
            >
              <AI name={c.ic} size={24} stroke={1.4} />
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                color: theme.fgMuted,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {c.l}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 18,
                color: theme.fg,
                marginTop: 8,
                fontWeight: 500,
                lineHeight: 1.25,
              }}
            >
              {c.v}
            </div>
            {c.v2 && (
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  color: theme.fgMuted,
                  marginTop: 6,
                }}
              >
                {c.v2}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Closing promise card */}
      <div
        style={{
          padding: isTablet ? "40px 36px" : "52px 60px",
          background: `linear-gradient(145deg, ${theme.gold}, ${theme.goldDeep})`,
          borderRadius: 28,
          color: theme.navy,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: isTablet ? "flex-start" : "space-between",
          flexDirection: isTablet ? "column" : "row",
          gap: isTablet ? 28 : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            bottom: -40,
            fontFamily: fonts.display,
            fontStyle: "italic",
            fontSize: 180,
            color: theme.navy,
            opacity: 0.06,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            pointerEvents: "none",
          }}
        >
          Repair.
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: isTablet ? "100%" : 560,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.25em",
              opacity: 0.7,
            }}
          >
            —— THE PROMISE
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontStyle: "italic",
              fontSize: isTablet ? 38 : 52,
              lineHeight: 1.05,
              marginTop: 14,
            }}
          >
            Don't delay—
            <br />
            repair it today.
          </div>
          <div
            style={{
              marginTop: 16,
              fontFamily: fonts.body,
              fontSize: 15,
              opacity: 0.85,
              lineHeight: 1.55,
            }}
          >
            We answer every call before it rings out. Drop in, dial in, or have
            us pick it up.
          </div>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexShrink: 0,
            alignSelf: isTablet ? "flex-start" : "center",
          }}
        >
          <button
            onClick={onBook}
            style={{
              height: 56,
              padding: "0 28px",
              border: "none",
              background: theme.navy,
              color: theme.gold,
              borderRadius: 14,
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Book Pickup
          </button>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              opacity: 0.7,
            }}
          >
            FREE · ABOVE ₹1,000
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Footer ────────────────────────────────────────────────────────────

function DesktopFooter({ theme, fonts, isTablet }) {
  const hPad = isTablet ? 48 : 80;
  return (
    <div
      style={{
        padding: `${isTablet ? 60 : 70}px ${hPad}px ${isTablet ? 40 : 50}px`,
        borderTop: `0.5px solid ${theme.border}`,
        display: "grid",
        gridTemplateColumns: isTablet ? "repeat(2, 1fr)" : "1.4fr 1fr 1fr 1fr",
        gap: isTablet ? 28 : 40,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: fonts.display,
            fontStyle: "italic",
            fontSize: 34,
            color: theme.gold,
          }}
        >
          Mobile Doctor.
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 13,
            color: theme.fgMuted,
            lineHeight: 1.7,
            marginTop: 14,
            maxWidth: 320,
          }}
        >
          Under Kompally Bridge, via Gundlapochampally Village, Hyderabad.
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: theme.gold,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Call
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            color: theme.fg,
            marginTop: 10,
          }}
        >
          +91 80084 04707
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            color: theme.fg,
            marginTop: 4,
          }}
        >
          +91 98497 98969
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: theme.gold,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Mail
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            color: theme.fg,
            marginTop: 10,
          }}
        >
          mobiledoctor@gmail.com
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: theme.gold,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Hours
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            color: theme.fg,
            marginTop: 10,
          }}
        >
          10:00 — 21:00
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 13,
            color: theme.fgMuted,
            marginTop: 4,
          }}
        >
          Mon — Sun
        </div>
      </div>
    </div>
  );
}

// ─── Desktop layout (composes all desktop sections) ───────────────────────────

function DesktopLayout({ tweaks, setTweak, onBook }) {
  const { isTablet, isDesktop } = useViewport();
  const theme = TH[tweaks.dark ? "dark" : "light"];
  const fonts = FP[tweaks.fontPair] || FP.classical;

  return (
    <div
      style={{ background: theme.bgGrad, color: theme.fg, minHeight: "100vh" }}
    >
      <DesktopStickyHeader
        theme={theme}
        fonts={fonts}
        dark={tweaks.dark}
        isDesktop={isDesktop}
        onToggleDark={() => setTweak("dark", !tweaks.dark)}
        onBook={onBook}
      />
      <main>
        <DesktopHero
          theme={theme}
          fonts={fonts}
          intensity={tweaks.animation}
          isTablet={isTablet}
          onBook={onBook}
        />
        <DesktopSales
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
          isTablet={isTablet}
        />
        <DesktopServices
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
          isTablet={isTablet}
        />
        <DesktopWhy
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
          isTablet={isTablet}
        />
        <DesktopBrands theme={theme} fonts={fonts} isTablet={isTablet} />
        <DesktopLocation
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
          isTablet={isTablet}
        />
        <DesktopContact
          theme={theme}
          fonts={fonts}
          cardKind={tweaks.cardKind}
          isTablet={isTablet}
          onBook={onBook}
        />
        <DesktopFooter theme={theme} fonts={fonts} isTablet={isTablet} />
      </main>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { isMobile } = useViewport();
  const [bookOpen, setBookOpen] = aS(false);
  const onBook = () => setBookOpen(true);

  const modal = (
    <window.MDS.BookingModal
      theme={TH[tweaks.dark ? "dark" : "light"]}
      fonts={FP[tweaks.fontPair] || FP.editorial}
      isMobile={isMobile}
      dark={tweaks.dark}
      open={bookOpen}
      onClose={() => setBookOpen(false)}
    />
  );

  if (isMobile) return <React.Fragment>{modal}<MobileRoot tweaks={tweaks} setTweak={setTweak} onBook={onBook} /></React.Fragment>;
  return <React.Fragment>{modal}<DesktopLayout tweaks={tweaks} setTweak={setTweak} onBook={onBook} /></React.Fragment>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
