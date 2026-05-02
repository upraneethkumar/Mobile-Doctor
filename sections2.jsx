// sections2.jsx — sales, services, why, brands, location, contact, footer

const { Icon: I2, cardStyle: cs2, IMG: IM2 } = window.MD;
const { Eyebrow: Eb, GoldRule: GR, SectionTitle: ST } = window.MDS;

// ─── BOOKING MODAL ────────────────────────────────────────────
function BookingModal({ theme, fonts, isMobile, dark, open, onClose }) {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    brand: "",
    issue: "",
    note: "",
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first =
      modalRef.current &&
      modalRef.current.querySelector("input, select, textarea");
    if (first) first.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.brand) e.brand = "Select your device brand";
    if (!form.issue) e.issue = "Select the issue type";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    const parts = [
      "Hi, I'd like to book a repair at Mobile Doctor.",
      "Name: " + form.name.trim(),
      "Phone: " + form.phone.trim(),
      "Device: " + form.brand,
      "Issue: " + form.issue,
    ];
    if (form.note.trim()) parts.push("Note: " + form.note.trim());
    window.open(
      "https://wa.me/919849798969?text=" + encodeURIComponent(parts.join("\n")),
      "_blank",
      "noopener",
    );
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", brand: "", issue: "", note: "" });
      onClose();
    }, 2200);
  };

  const inp = {
    width: "100%",
    height: 46,
    padding: "0 14px",
    border: "0.5px solid " + theme.borderStrong,
    borderRadius: 12,
    background: theme.bg,
    color: theme.fg,
    fontFamily: fonts.body,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    marginTop: 6,
    display: "block",
  };
  const lbl = {
    display: "block",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    color: theme.fgMuted,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginTop: 16,
  };
  const err = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9,
    color: "#e05a5a",
    letterSpacing: "0.08em",
    marginTop: 4,
  };

  const sheet = isMobile
    ? {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: "92vh",
        borderRadius: "22px 22px 0 0",
        overflowY: "auto",
        padding: "28px 22px 52px",
        background: theme.bg,
        border: "0.5px solid " + theme.borderStrong,
        borderBottom: "none",
        boxShadow: "0 -20px 60px -10px rgba(0,0,0,0.5)",
        zIndex: 1001,
        animation: "md-rise 0.28s cubic-bezier(.2,.7,.2,1)",
      }
    : {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 480,
        maxHeight: "85vh",
        borderRadius: 24,
        overflowY: "auto",
        padding: "36px 40px 44px",
        background: theme.bg,
        border: "0.5px solid " + theme.borderStrong,
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
        zIndex: 1001,
        animation: "md-rise 0.22s cubic-bezier(.2,.7,.2,1)",
      };

  const brands = [
    "Apple",
    "Samsung",
    "OnePlus",
    "Xiaomi / Redmi",
    "POCO",
    "Vivo",
    "Oppo",
    "realme",
    "iQOO",
    "Motorola",
    "Asus",
    "Nothing",
    "Other",
  ];
  const issues = [
    "Screen Damage",
    "Battery Replacement",
    "Camera Issue",
    "Charging Port",
    "Speaker / Mic",
    "Water Damage",
    "Software Issue",
    "Other",
  ];

  return (
    <div>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: dark ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.45)",
          zIndex: 1000,
          animation: "md-fade 0.18s ease",
        }}
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book a Repair"
        style={sheet}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: theme.gold,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              BOOK A REPAIR · HYDERABAD
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontSize: 28,
                color: theme.fg,
                lineHeight: 1.1,
                marginTop: 8,
              }}
            >
              Let's fix it.
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "0.5px solid " + theme.borderStrong,
              background: "transparent",
              color: theme.fgMuted,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ color: theme.gold, marginBottom: 12 }}>
              <I2 name="check" size={36} stroke={1.4} color={theme.gold} />
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontSize: 22,
                color: theme.fg,
              }}
            >
              Opening WhatsApp...
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: theme.fgMuted,
                letterSpacing: "0.18em",
                marginTop: 10,
              }}
            >
              YOUR BOOKING REQUEST IS READY
            </div>
          </div>
        ) : (
          <div>
            <label style={lbl}>Your Name</label>
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              style={inp}
            />
            {errors.name && <div style={err}>{errors.name}</div>}

            <label style={lbl}>Mobile Number</label>
            <input
              type="tel"
              placeholder="10-digit number"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              style={inp}
            />
            {errors.phone && <div style={err}>{errors.phone}</div>}

            <label style={lbl}>Device Brand</label>
            <select
              value={form.brand}
              onChange={(e) => update("brand", e.target.value)}
              style={{ ...inp, appearance: "none", WebkitAppearance: "none" }}
            >
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option
                  key={b}
                  value={b}
                  style={{ background: theme.bg, color: theme.fg }}
                >
                  {b}
                </option>
              ))}
            </select>
            {errors.brand && <div style={err}>{errors.brand}</div>}

            <label style={lbl}>Issue Type</label>
            <select
              value={form.issue}
              onChange={(e) => update("issue", e.target.value)}
              style={{ ...inp, appearance: "none", WebkitAppearance: "none" }}
            >
              <option value="">Select issue</option>
              {issues.map((iss) => (
                <option
                  key={iss}
                  value={iss}
                  style={{ background: theme.bg, color: theme.fg }}
                >
                  {iss}
                </option>
              ))}
            </select>
            {errors.issue && <div style={err}>{errors.issue}</div>}

            <label style={lbl}>Additional Note (optional)</label>
            <textarea
              placeholder="Any details about your device or issue..."
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              style={{
                ...inp,
                height: 80,
                padding: "12px 14px",
                resize: "vertical",
              }}
            />

            <button
              onClick={submit}
              style={{
                width: "100%",
                height: 52,
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(180deg, " +
                  theme.gold +
                  ", " +
                  theme.goldDeep +
                  ")",
                color: theme.navy,
                borderRadius: 14,
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                boxShadow: "0 12px 30px -10px " + theme.gold + "88",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 24,
              }}
            >
              <I2 name="whats" size={18} stroke={1.4} color={theme.navy} />
              Send via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 02 SALES ─────────────────────────────────────────────────
function Sales({ theme, fonts, cardKind }) {
  const products = [
    {
      n: "Smartphones",
      sub: "Flagship & mid",
      img: IM2.smart,
      big: true,
      t: "NEW",
    },
    { n: "Earphones", sub: "TWS · Bluetooth", img: IM2.earbuds, t: "AUDIO" },
    { n: "Chargers", sub: "Fast & GaN", img: IM2.charger, t: "POWER" },
    { n: "Cables", sub: "Type-C · Lightning", img: IM2.cable, t: "CABLES" },
    {
      n: "Screen Guards",
      sub: "Tempered glass",
      img: IM2.protector,
      t: "SHIELD",
    },
    { n: "Phone Cases", sub: "Premium covers", img: IM2.cases, t: "COVER" },
    { n: "Camera Lenses", sub: "Macro · Wide", img: IM2.lens, t: "OPTIC" },
    { n: "Accessories", sub: "Full ecosystem", img: IM2.acc, t: "ALL" },
  ];
  return (
    <section
      id="sec-sales"
      data-screen-label="02 Sales"
      style={{ padding: "60px 22px 40px", position: "relative" }}
    >
      <ST
        eyebrow="02 — Sales"
        title={
          <>
            The{" "}
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              showroom
            </span>
            .
          </>
        }
        theme={theme}
        fonts={fonts}
      />
      <p
        className="reveal"
        style={{
          fontFamily: fonts.body,
          fontSize: 13.5,
          color: theme.fgMuted,
          lineHeight: 1.6,
          marginBottom: 26,
        }}
      >
        A curated catalogue of mobiles and accessories — sourced from authorised
        distributors, photographed under daylight, and waiting on the shelf.
      </p>

      {/* Featured tile */}
      <div
        className="reveal"
        style={{
          ...cs2(cardKind, theme),
          borderRadius: 22,
          overflow: "hidden",
          marginBottom: 12,
          position: "relative",
        }}
      >
        <div style={{ position: "relative", height: 220 }}>
          <img
            src={products[0].img}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, transparent 35%, ${theme.bg}f0)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: theme.gold,
              letterSpacing: "0.25em",
              padding: "6px 10px",
              border: `0.5px solid ${theme.gold}`,
              borderRadius: 999,
            }}
          >
            {products[0].t}
          </div>
          <div
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 24,
                  color: theme.ivory,
                }}
              >
                {products[0].n}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: theme.gold,
                  letterSpacing: "0.18em",
                  marginTop: 4,
                }}
              >
                {products[0].sub}
              </div>
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: theme.gold,
                color: theme.navy,
                display: "grid",
                placeItems: "center",
              }}
            >
              <I2 name="arrow" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Two-up tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {products.slice(1).map((p, i) => (
          <div
            key={p.n}
            className="reveal"
            style={{
              ...cs2(cardKind, theme),
              borderRadius: 18,
              overflow: "hidden",
              position: "relative",
              transitionDelay: `${i * 0.04}s`,
            }}
          >
            <div
              style={{ height: 110, position: "relative", overflow: "hidden" }}
            >
              <img
                src={p.img}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.92)",
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 7.5,
                  color: theme.gold,
                  letterSpacing: "0.2em",
                  padding: "3px 7px",
                  background: `${theme.bg}cc`,
                  borderRadius: 999,
                }}
              >
                {p.t}
              </div>
            </div>
            <div style={{ padding: "10px 12px 14px" }}>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 16,
                  color: theme.fg,
                  lineHeight: 1.1,
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 11,
                  color: theme.fgMuted,
                  marginTop: 2,
                }}
              >
                {p.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="reveal"
        style={{
          marginTop: 22,
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: theme.fgMuted,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
        }}
      >
        + the complete ecosystem in stock
      </div>
    </section>
  );
}

// ─── 03 SERVICES ──────────────────────────────────────────────
function Services({ theme, fonts, cardKind, intensity, onBook }) {
  const services = [
    {
      ic: "screen",
      n: "Display Repair",
      d: "Cracked glass, dead pixels, OLED replacement.",
      step: "01",
    },
    {
      ic: "battery",
      n: "Battery Replace",
      d: "Genuine cells, certified lifecycle, warranty.",
      step: "02",
    },
    {
      ic: "water",
      n: "Water Damage",
      d: "Ultrasonic restoration, board-level recovery.",
      step: "03",
    },
    {
      ic: "tools",
      n: "A–Z Repairing",
      d: "From chip-off to chassis. Every fault, fixed.",
      step: "04",
    },
    {
      ic: "sparkle",
      n: "General Service",
      d: "Deep clean, port repair, software tune-up.",
      step: "05",
    },
  ];
  return (
    <section
      id="sec-services"
      data-screen-label="03 Services"
      style={{ padding: "60px 22px 40px", position: "relative" }}
    >
      <ST
        eyebrow="03 — Services"
        title={
          <>
            Quietly{" "}
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              obsessive
            </span>
            <br />
            repair work.
          </>
        }
        theme={theme}
        fonts={fonts}
      />
      <p
        className="reveal"
        style={{
          fontFamily: fonts.body,
          fontSize: 13.5,
          color: theme.fgMuted,
          lineHeight: 1.6,
          marginBottom: 28,
        }}
      >
        Each device passes through a six-stage diagnostic before a single screw
        turns. Patience is part of the price.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {services.map((s, i) => (
          <div
            key={s.n}
            className="reveal"
            onClick={onBook}
            style={{
              ...cs2(cardKind, theme),
              borderRadius: 18,
              padding: "18px 18px 18px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              position: "relative",
              overflow: "hidden",
              transitionDelay: `${i * 0.05}s`,
              cursor: "pointer",
            }}
          >
            {/* step number watermark */}
            <div
              style={{
                position: "absolute",
                right: -8,
                top: -22,
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontSize: 110,
                color: theme.fg,
                opacity: 0.04,
                letterSpacing: "-0.05em",
                pointerEvents: "none",
                lineHeight: 1,
              }}
            >
              {s.step}
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                flexShrink: 0,
                background: `linear-gradient(145deg, ${theme.gold}22, transparent)`,
                border: `0.5px solid ${theme.borderStrong}`,
                display: "grid",
                placeItems: "center",
                color: theme.gold,
                animation:
                  intensity > 60
                    ? `md-float ${3 + i * 0.2}s ease-in-out infinite`
                    : "none",
              }}
            >
              <I2 name={s.ic} size={22} stroke={1.3} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: theme.gold,
                    letterSpacing: "0.2em",
                  }}
                >
                  {s.step}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 18,
                    color: theme.fg,
                    lineHeight: 1.1,
                  }}
                >
                  {s.n}
                </div>
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 12,
                  color: theme.fgMuted,
                  lineHeight: 1.5,
                  marginTop: 4,
                }}
              >
                {s.d}
              </div>
            </div>
            <div style={{ color: theme.fgDim }}>
              <I2 name="arrow" size={16} stroke={1.2} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="reveal"
        style={{
          marginTop: 24,
          padding: "20px",
          borderRadius: 18,
          ...cs2(cardKind, theme),
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: theme.gold,
            display: "grid",
            placeItems: "center",
            color: theme.navy,
            flexShrink: 0,
          }}
        >
          <I2 name="truck" size={20} stroke={1.4} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: theme.gold,
              letterSpacing: "0.22em",
            }}
          >
            COMPLIMENTARY
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 18,
              color: theme.fg,
              lineHeight: 1.1,
              marginTop: 2,
            }}
          >
            Free home pickup & delivery
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 11.5,
              color: theme.fgMuted,
              marginTop: 4,
            }}
          >
            On all repairs above ₹1,000 — within 6KM radius.
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 04 WHY ───────────────────────────────────────────────────
function Why({ theme, fonts, cardKind }) {
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
    <section
      id="sec-why"
      data-screen-label="04 Why"
      style={{ padding: "60px 22px 40px", position: "relative" }}
    >
      <ST
        eyebrow="04 — Why us"
        title={
          <>
            The Hyderabad
            <br />
            standard for{" "}
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              repair
            </span>
            .
          </>
        }
        theme={theme}
        fonts={fonts}
      />

      <div
        className="reveal"
        style={{
          ...cs2(cardKind, theme),
          borderRadius: 22,
          padding: 22,
          marginBottom: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontFamily: fonts.display,
            fontStyle: "italic",
            fontSize: 80,
            color: theme.gold,
            opacity: 0.18,
            lineHeight: 1,
          }}
        >
          "
        </div>
        <p
          style={{
            fontFamily: fonts.display,
            fontSize: 19,
            lineHeight: 1.4,
            color: theme.fg,
            fontStyle: "italic",
            margin: 0,
            letterSpacing: "-0.005em",
          }}
        >
          At Mobile Doctor, we're committed to providing the highest quality
          mobile repair services in Hyderabad. Our experienced technicians use
          only genuine parts and the latest repair techniques.
        </p>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: theme.gold,
              color: theme.navy,
              display: "grid",
              placeItems: "center",
              fontFamily: fonts.display,
              fontStyle: "italic",
              fontSize: 16,
            }}
          >
            M
          </div>
          <div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 12,
                color: theme.fg,
                fontWeight: 500,
              }}
            >
              The Mobile Doctor Promise
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                color: theme.fgMuted,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Hyderabad · Since 2013
            </div>
          </div>
        </div>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {points.map((p, i) => (
          <li
            key={p}
            className="reveal"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 0",
              borderBottom: `0.5px solid ${theme.border}`,
              transitionDelay: `${i * 0.04}s`,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: theme.gold,
                letterSpacing: "0.2em",
                width: 30,
              }}
            >
              0{i + 1}
            </div>
            <div
              style={{
                flex: 1,
                fontFamily: fonts.body,
                fontSize: 13.5,
                color: theme.fg,
                lineHeight: 1.4,
              }}
            >
              {p}
            </div>
            <I2 name="check" size={16} stroke={1.4} color={theme.gold} />
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── 05 BRANDS ────────────────────────────────────────────────
function Brands({ theme, fonts }) {
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
    <section
      id="sec-brands"
      data-screen-label="05 Brands"
      style={{ padding: "60px 0 40px", position: "relative" }}
    >
      <div style={{ padding: "0 22px" }}>
        <ST
          eyebrow="05 — Trust"
          title={
            <>
              Every brand,
              <br />
              <span style={{ fontStyle: "italic", color: theme.gold }}>
                under one roof
              </span>
              .
            </>
          }
          theme={theme}
          fonts={fonts}
        />
      </div>

      {/* marquee */}
      <div
        className="reveal"
        style={{ marginTop: 14, overflow: "hidden", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 30,
            background: `linear-gradient(90deg, ${theme.bg}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 30,
            background: `linear-gradient(-90deg, ${theme.bg}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 0,
            whiteSpace: "nowrap",
            width: "max-content",
            animation: "md-marquee 30s linear infinite",
          }}
        >
          {row.map((b, i) => (
            <div
              key={i}
              style={{
                padding: "20px 28px",
                borderRight: `0.5px solid ${theme.border}`,
                fontFamily: fonts.display,
                fontStyle: i % 2 === 0 ? "italic" : "normal",
                fontSize: 26,
                color: theme.fg,
                letterSpacing: "-0.01em",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: theme.gold,
                }}
              />
              {b}
            </div>
          ))}
        </div>
      </div>
      {/* second row reverse */}
      <div
        className="reveal"
        style={{ overflow: "hidden", position: "relative", marginTop: 0 }}
      >
        <div
          style={{
            display: "flex",
            gap: 0,
            whiteSpace: "nowrap",
            width: "max-content",
            animation: "md-marquee 38s linear infinite reverse",
          }}
        >
          {row.map((b, i) => (
            <div
              key={i}
              style={{
                padding: "20px 28px",
                borderRight: `0.5px solid ${theme.border}`,
                fontFamily: fonts.display,
                fontWeight: 300,
                fontSize: 26,
                color: theme.fgMuted,
                letterSpacing: "-0.01em",
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "0 22px",
          marginTop: 28,
          fontFamily: fonts.body,
          fontSize: 13,
          color: theme.fgMuted,
          lineHeight: 1.6,
          textAlign: "center",
        }}
        className="reveal"
      >
        Authorised parts. Brand-trained hands. Every smartphone deserves the
        same care.
      </div>
    </section>
  );
}

// ─── 06 LOCATION ──────────────────────────────────────────────
function Location({ theme, fonts, cardKind }) {
  return (
    <section
      id="sec-location"
      data-screen-label="06 Location"
      style={{ padding: "60px 22px 40px", position: "relative" }}
    >
      <ST
        eyebrow="06 — Location"
        title={
          <>
            Find the{" "}
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              atelier
            </span>
            .
          </>
        }
        theme={theme}
        fonts={fonts}
      />

      <div
        className="reveal"
        style={{
          ...cs2(cardKind, theme),
          borderRadius: 22,
          overflow: "hidden",
        }}
      >
        {/* Stylised map grid */}
        <div
          style={{
            position: "relative",
            height: 240,
            background: `linear-gradient(135deg, ${theme.navyMid}, ${theme.navy})`,
            backgroundImage: `
            linear-gradient(${theme.border} 0.5px, transparent 0.5px),
            linear-gradient(90deg, ${theme.border} 0.5px, transparent 0.5px),
            linear-gradient(135deg, ${theme.navyMid}, ${theme.navy})
          `,
            backgroundSize: "24px 24px, 24px 24px, 100% 100%",
          }}
        >
          {/* faux roads */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 360 240"
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
          {/* pin */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "48%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 80,
                height: 80,
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
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `1px solid ${theme.gold}`,
                animation: "md-pulse-ring 2.4s ease-out 1.2s infinite",
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: theme.gold,
                color: theme.navy,
                display: "grid",
                placeItems: "center",
                boxShadow: `0 8px 20px -4px ${theme.gold}`,
                position: "relative",
                zIndex: 2,
              }}
            >
              <I2 name="pin" size={18} stroke={1.6} />
            </div>
          </div>
          {/* corner coords */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8.5,
              color: theme.gold,
              letterSpacing: "0.2em",
            }}
          >
            17.5544° N
          </div>
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8.5,
              color: theme.gold,
              letterSpacing: "0.2em",
            }}
          >
            78.4905° E
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8.5,
              color: theme.fgMuted,
              letterSpacing: "0.2em",
            }}
          >
            HYD · KOMPALLY
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: theme.gold,
              letterSpacing: "0.22em",
            }}
          >
            VISIT THE STUDIO
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 22,
              color: theme.fg,
              lineHeight: 1.2,
              marginTop: 8,
            }}
          >
            Under Kompally Bridge
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 13,
              color: theme.fgMuted,
              lineHeight: 1.55,
              marginTop: 6,
            }}
          >
            via Gundlapochampally Village,
            <br />
            Hyderabad, Telangana
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              style={{
                flex: 1,
                height: 44,
                border: `0.5px solid ${theme.borderStrong}`,
                background: "transparent",
                color: theme.fg,
                borderRadius: 12,
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <I2 name="arrow" size={14} /> Directions
            </button>
            <button
              onClick={() => {
                window.location.href = "tel:+918008404707";
              }}
              style={{
                flex: 1,
                height: 44,
                border: "none",
                cursor: "pointer",
                background: theme.gold,
                color: theme.navy,
                borderRadius: 12,
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: 11.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <I2 name="phone" size={14} stroke={1.6} /> Call now
            </button>
          </div>
        </div>
      </div>

      {/* Hours strip */}
      <div
        className="reveal"
        style={{
          marginTop: 14,
          ...cs2(cardKind, theme),
          borderRadius: 16,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <I2 name="clock" size={18} color={theme.gold} stroke={1.4} />
        <div style={{ flex: 1 }}>
          <div
            style={{ fontFamily: fonts.body, fontSize: 12, color: theme.fg }}
          >
            Open today · 10:00 — 21:00
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: theme.fgMuted,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            Mon — Sun · Walk-ins welcome
          </div>
        </div>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#67e09b",
            boxShadow: "0 0 12px #67e09b",
          }}
        />
      </div>
    </section>
  );
}

// ─── 07 CONTACT ───────────────────────────────────────────────
function Contact({ theme, fonts, cardKind, onBook }) {
  return (
    <section
      id="sec-contact"
      data-screen-label="07 Contact"
      style={{ padding: "60px 22px 40px", position: "relative" }}
    >
      <ST
        eyebrow="07 — Contact"
        title={
          <>
            Speak to the{" "}
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              Doctor
            </span>
            .
          </>
        }
        theme={theme}
        fonts={fonts}
      />

      <div
        className="reveal"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {[
          {
            ic: "phone",
            l: "Call",
            v: "+91 98497 98969",
            href: "tel:+919849798969",
          },
          {
            ic: "whats",
            l: "WhatsApp",
            v: "+91 80084 04707",
            href: "https://wa.me/918008404707",
          },
          {
            ic: "mail",
            l: "Email",
            v: "mobiledoctor@gmail.com",
            href: "mailto:mobiledoctor@gmail.com",
          },
        ].map((c, i) => (
          <div
            key={c.l}
            className="reveal"
            onClick={() => {
              if (c.href.startsWith("http"))
                window.open(c.href, "_blank", "noopener");
              else window.location.href = c.href;
            }}
            style={{
              ...cs2(cardKind, theme),
              borderRadius: 16,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              transitionDelay: `${i * 0.05}s`,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `linear-gradient(145deg, ${theme.gold}33, transparent)`,
                border: `0.5px solid ${theme.borderStrong}`,
                color: theme.gold,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <I2 name={c.ic} size={18} stroke={1.4} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
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
                  fontSize: 14,
                  color: theme.fg,
                  marginTop: 3,
                  fontWeight: 500,
                }}
              >
                {c.v}
              </div>
              {c.v2 && (
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 13,
                    color: theme.fgMuted,
                    marginTop: 2,
                  }}
                >
                  {c.v2}
                </div>
              )}
            </div>
            <I2 name="arrow" size={16} color={theme.fgDim} stroke={1.2} />
          </div>
        ))}
      </div>

      {/* Closing card */}
      <div
        className="reveal"
        style={{
          marginTop: 22,
          padding: "28px 22px",
          background: `linear-gradient(145deg, ${theme.gold}, ${theme.goldDeep})`,
          borderRadius: 22,
          color: theme.navy,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
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
            fontSize: 32,
            lineHeight: 1,
            marginTop: 12,
          }}
        >
          Don't delay—
          <br />
          Repair today.
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: fonts.body,
            fontSize: 12.5,
            opacity: 0.85,
            lineHeight: 1.5,
          }}
        >
          We answer every call before it rings out. Drop in, dial in, or have us
          pick it up.
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            onClick={onBook}
            style={{
              height: 44,
              padding: "0 20px",
              border: "none",
              background: theme.navy,
              color: theme.gold,
              borderRadius: 12,
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: 11.5,
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
              fontSize: 9,
              letterSpacing: "0.2em",
              opacity: 0.7,
            }}
          >
            FREE · ABOVE ₹1,000
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="reveal"
        style={{
          marginTop: 36,
          paddingTop: 24,
          borderTop: `0.5px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontStyle: "italic",
              fontSize: 16,
              color: theme.fg,
            }}
          >
            Mobile Doctor
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8.5,
              color: theme.fgMuted,
              letterSpacing: "0.22em",
            }}
          >
            EST. 2012
          </div>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8.5,
            color: theme.fgDim,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: 14,
            lineHeight: 1.7,
          }}
        >
          © 2026 Mobile Doctor · Hyderabad
          <br />
          Crafted with patience.
        </div>
      </div>
    </section>
  );
}

// ─── BOTTOM NAV (sticky) ──────────────────────────────────────
function BottomNav({ theme, fonts, scrollRef, progress }) {
  const items = [
    { id: "sec-sales", l: "Shop", ic: "case" },
    { id: "sec-services", l: "Service", ic: "tools" },
    { id: "sec-why", l: "Trust", ic: "shield" },
    { id: "sec-location", l: "Visit", ic: "pin" },
    { id: "sec-contact", l: "Call", ic: "phone" },
  ];
  const go = (id) => {
    const root = scrollRef.current;
    const el = root && root.querySelector("#" + id);
    if (el && root)
      root.scrollTo({ top: el.offsetTop - 12, behavior: "smooth" });
  };
  return (
    <div
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        bottom: 26,
        zIndex: 30,
        borderRadius: 22,
        padding: "8px 6px",
        background: `${theme.bg}cc`,
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        border: `0.5px solid ${theme.borderStrong}`,
        boxShadow: `0 20px 50px -10px rgba(0,0,0,0.6), inset 0 1px 0 ${theme.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* progress indicator */}
      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          top: 4,
          height: 1,
          background: theme.border,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${theme.gold}, ${theme.goldDeep})`,
            transition: "width 0.2s ease-out",
          }}
        />
      </div>
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => go(it.id)}
          style={{
            flex: 1,
            height: 48,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            color: theme.fg,
            padding: 0,
          }}
        >
          <I2 name={it.ic} size={17} stroke={1.4} />
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 7.5,
              color: theme.fgMuted,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {it.l}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Free delivery floating ribbon ────────────────────────────
function DeliveryRibbon({ theme, fonts }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 12,
        right: 12,
        zIndex: 25,
        borderRadius: 999,
        padding: "8px 14px",
        background: `${theme.bg}d8`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `0.5px solid ${theme.borderStrong}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: theme.gold,
          color: theme.navy,
          display: "grid",
          placeItems: "center",
        }}
      >
        <I2 name="truck" size={13} stroke={1.6} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 11,
            color: theme.fg,
            fontWeight: 500,
            lineHeight: 1.1,
          }}
        >
          Free home delivery
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            color: theme.gold,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          Bills above ₹1,000
        </div>
      </div>
      <I2 name="arrow" size={13} color={theme.fg} stroke={1.4} />
    </div>
  );
}

Object.assign(window.MDS, {
  BookingModal,
  Sales,
  Services,
  Why,
  Brands,
  Location,
  Contact,
  BottomNav,
  DeliveryRibbon,
});
