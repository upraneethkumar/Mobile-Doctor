// sections.jsx — Mobile Doctor section components

const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;
const { Icon: I, cardStyle: cs, IMG: IM } = window.MD;

// ─── Reusable bits ────────────────────────────────────────────
function Eyebrow({ children, theme }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9.5,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: theme.gold,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ width: 18, height: 0.5, background: theme.gold }} />
      {children}
    </div>
  );
}

function GoldRule({ theme, w = 40 }) {
  return (
    <div
      style={{
        width: w,
        height: 0.5,
        background: `linear-gradient(90deg, transparent, ${theme.gold}, transparent)`,
        margin: "14px auto",
      }}
    />
  );
}

function SectionTitle({ eyebrow, title, theme, fonts, align = "left" }) {
  return (
    <div className="reveal" style={{ textAlign: align, marginBottom: 24 }}>
      <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 400,
          fontSize: 38,
          lineHeight: 1.02,
          margin: "14px 0 0",
          letterSpacing: "-0.02em",
          color: theme.fg,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─── HERO variants ────────────────────────────────────────────
function HeroEditorial({
  theme,
  fonts,
  intensity,
  dark,
  onToggleDark,
  onBook,
}) {
  return (
    <section
      data-screen-label="01 Hero"
      style={{
        padding: "20px 22px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* atmospheric gold orb */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.gold}33 0%, transparent 65%)`,
          filter: "blur(20px)",
          pointerEvents: "none",
          animation:
            intensity > 30 ? "md-float 8s ease-in-out infinite" : "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: `conic-gradient(from 0deg, ${theme.gold}, ${theme.goldDeep}, ${theme.gold})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 0 1px ${theme.borderStrong}`,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: theme.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontSize: 14,
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
                fontSize: 14,
                color: theme.fg,
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              Mobile Doctor
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                color: theme.fgMuted,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Est. Hyderabad
            </div>
          </div>
        </div>
        <button
          onClick={onToggleDark}
          style={{
            width: 36,
            height: 36,
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
          <I name={dark ? "sun" : "moon"} size={16} stroke={1.4} />
        </button>
      </div>

      <div className="reveal" style={{ position: "relative", zIndex: 2 }}>
        <Eyebrow theme={theme}>Sales · Service · Repair</Eyebrow>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            color: theme.fg,
            fontSize: 60,
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            margin: "20px 0 0",
          }}
        >
          Don't{" "}
          <span
            style={{ fontStyle: "italic", color: theme.gold, fontWeight: 300 }}
          >
            delay
          </span>{" "}
          —
          <br /> {/* This moves Repair to the next line */}
          Repair{" "}
          <span style={{ color: theme.gold, fontWeight: 500 }}>today</span>
        </h1>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            lineHeight: 1.6,
            color: theme.fgMuted,
            margin: "24px 0 28px",
            maxWidth: 280,
          }}
        >
          Hyderabad's quietly obsessive mobile repair atelier. Genuine parts,
          certified hands, an unhurried pace, and a warranty that means
          something.
        </p>
      </div>

      {/* Stat chips */}
      <div
        className="reveal"
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 28,
          position: "relative",
          zIndex: 2,
        }}
      >
        {[
          ["20+", "Years"],
          ["25k+", "Repairs"],
          ["15+", "Brands"],
        ].map(([n, l]) => (
          <div
            key={l}
            style={{
              ...cs("glass", theme),
              borderRadius: 14,
              padding: "12px 14px",
              flex: 1,
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 22,
                color: theme.fg,
                lineHeight: 1,
              }}
            >
              {n}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                color: theme.fgMuted,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="reveal reveal-fast"
        style={{ display: "flex", gap: 10, position: "relative", zIndex: 2 }}
      >
        <button
          style={{
            flex: 1,
            height: 52,
            border: "none",
            cursor: "pointer",
            background: `linear-gradient(180deg, ${theme.gold}, ${theme.goldDeep})`,
            color: theme.navy,
            borderRadius: 14,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            boxShadow: `0 12px 30px -10px ${theme.gold}88, inset 0 1px 0 rgba(255,255,255,0.4)`,
            position: "relative",
            overflow: "hidden",
          }}
          onClick={onBook}
        >
          Book a Repair
        </button>
        <button
          onClick={() => {
            window.location.href = "tel:+919849798969";
          }}
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            cursor: "pointer",
            background: "transparent",
            border: `0.5px solid ${theme.borderStrong}`,
            color: theme.fg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <I name="phone" size={18} stroke={1.3} />
        </button>
      </div>

      {/* hero image strip */}
      <div
        className="reveal reveal-slow"
        style={{ marginTop: 32, position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 22,
            overflow: "hidden",
            height: 220,
            border: `0.5px solid ${theme.border}`,
            boxShadow: `0 30px 60px -30px rgba(0,0,0,0.6)`,
          }}
        >
          <img
            src={IM.repair1}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(0.9) contrast(1.05)",
            }}
            loading="lazy"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, transparent 40%, ${theme.bg}cc 100%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8.5,
                  color: theme.gold,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                —— Atelier 01
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontStyle: "italic",
                  fontSize: 18,
                  color: theme.ivory,
                  marginTop: 4,
                }}
              >
                The repair bench
              </div>
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: theme.ivory,
                opacity: 0.7,
              }}
            >
              01 / 03
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          animation:
            intensity > 30 ? "md-float 2.4s ease-in-out infinite" : "none",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: theme.fgMuted,
            letterSpacing: "0.3em",
          }}
        >
          SCROLL
        </div>
        <div
          style={{
            width: 0.5,
            height: 28,
            background: `linear-gradient(${theme.gold}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}

function HeroSplit({ theme, fonts, intensity, dark, onToggleDark, onBook }) {
  return (
    <section
      data-screen-label="01 Hero"
      style={{ padding: "72px 22px 28px", position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 36,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontStyle: "italic",
            fontSize: 22,
            color: theme.gold,
          }}
        >
          Md.
        </div>
        <button
          onClick={onToggleDark}
          style={{
            width: 36,
            height: 36,
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
          <I name={dark ? "sun" : "moon"} size={16} stroke={1.4} />
        </button>
      </div>
      <Eyebrow theme={theme}>Repair Studio · Hyderabad</Eyebrow>
      <h1
        style={{
          fontFamily: fonts.display,
          fontSize: 56,
          lineHeight: 0.98,
          color: theme.fg,
          margin: "16px 0 0",
          letterSpacing: "-0.025em",
        }}
      >
        Don't{" "}
        <span style={{ fontStyle: "italic", color: theme.gold }}>delay</span>
        —repair it <span style={{ fontStyle: "italic" }}>today</span>.
      </h1>
      <div
        className="reveal"
        style={{
          margin: "32px -22px 0",
          height: 360,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${theme.navyMid}, ${theme.navy})`,
        }}
      >
        <img
          src={IM.phone}
          alt=""
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%,-50%) ${intensity > 50 ? "rotate(-8deg)" : ""}`,
            height: "110%",
            objectFit: "cover",
            filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.6))",
            animation:
              intensity > 30 ? "md-float 6s ease-in-out infinite" : "none",
          }}
          loading="lazy"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 30%, transparent 30%, ${theme.bg} 90%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 22,
            bottom: 22,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: theme.gold,
            letterSpacing: "0.25em",
          }}
        >
          SAME-DAY · GENUINE PARTS · WARRANTY
        </div>
      </div>
      <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
        <button
          onClick={onBook}
          style={{
            flex: 1,
            height: 52,
            border: "none",
            cursor: "pointer",
            background: theme.gold,
            color: theme.navy,
            borderRadius: 14,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Book Repair
        </button>
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
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Visit Shop
        </button>
      </div>
    </section>
  );
}

function HeroNumbers({ theme, fonts, intensity, dark, onToggleDark, onBook }) {
  return (
    <section
      data-screen-label="01 Hero"
      style={{ padding: "72px 22px 28px", position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 56,
        }}
      >
        <div
          style={{ fontFamily: fonts.display, fontSize: 18, color: theme.fg }}
        >
          Mobile{" "}
          <span style={{ fontStyle: "italic", color: theme.gold }}>Doctor</span>
        </div>
        <button
          onClick={onToggleDark}
          style={{
            width: 36,
            height: 36,
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
          <I name={dark ? "sun" : "moon"} size={16} stroke={1.4} />
        </button>
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: theme.fgMuted,
          letterSpacing: "0.3em",
        }}
      >
        —— FOUNDED 2013
      </div>
      <h1
        style={{
          fontFamily: fonts.display,
          fontSize: 132,
          lineHeight: 0.85,
          color: theme.gold,
          margin: "20px 0 0",
          letterSpacing: "-0.05em",
          fontWeight: 300,
        }}
      >
        18<span style={{ fontStyle: "italic" }}>k</span>+
      </h1>
      <div
        style={{
          fontFamily: fonts.display,
          fontStyle: "italic",
          fontSize: 22,
          color: theme.fg,
          marginTop: 8,
        }}
      >
        devices saved.
      </div>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: 14,
          lineHeight: 1.6,
          color: theme.fgMuted,
          margin: "28px 0",
        }}
      >
        Don't delay — repair it today. The most trusted mobile repair atelier in
        Hyderabad. Genuine parts. Certified hands. Lifetime workmanship.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onBook}
          style={{
            flex: 1,
            height: 52,
            border: "none",
            cursor: "pointer",
            background: theme.gold,
            color: theme.navy,
            borderRadius: 14,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Book a Repair →
        </button>
      </div>
      <div
        className="reveal"
        style={{
          marginTop: 32,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        <img
          src={IM.repair2}
          style={{
            width: "100%",
            height: 140,
            objectFit: "cover",
            borderRadius: 14,
            border: `0.5px solid ${theme.border}`,
          }}
          loading="lazy"
        />
        <img
          src={IM.repair3}
          style={{
            width: "100%",
            height: 140,
            objectFit: "cover",
            borderRadius: 14,
            border: `0.5px solid ${theme.border}`,
          }}
          loading="lazy"
        />
      </div>
    </section>
  );
}

window.MDS = window.MDS || {};
Object.assign(window.MDS, {
  Eyebrow,
  GoldRule,
  SectionTitle,
  HeroEditorial,
  HeroSplit,
  HeroNumbers,
});
