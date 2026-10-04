import { useRef, useState, type FormEvent } from "react";

const disciplines = [
  "Photography",
  "Videography",
  "Video Editing",
  "Graphic Design",
  "Content Creation",
  "Social Media Management",
  "Event Hosting",
  "Event Coordination",
  "Logistics",
  "Guest Relations",
  "Decoration & Styling",
  "Music/DJ",
  "Marketing & Partnerships",
  "Technical Support",
  "General Volunteer",
];

// Temporary demo recipient in Nigerian local format; replace it with Esther's number.
const WHATSAPP_RECIPIENT = "07043400958";

// WhatsApp click-to-chat needs international digits; convert the supplied Nigerian local format.
function toWhatsAppPhone(number: string) {
  const digits = number.replace(/\D/g, "");
  return digits.startsWith("0") ? "234" + digits.slice(1) : digits;
}

function Brand() {
  return (
    <a className="brand" href="/" aria-label="The Vibe Lab Creative Lab home">
      <span className="brand-name">THE VIBE LAB</span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-program">CREATIVE LAB</span>
    </a>
  );
}

type FormErrors = {
  name: string;
  email: string;
  interests: string;
};

function ApplyPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstInterestRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FormErrors>({ name: "", email: "", interests: "" });
  const [whatsappHref, setWhatsappHref] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const interests = formData.getAll("interests").map(String);
    const nextErrors: FormErrors = {
      name: name ? "" : "Please enter your name.",
      email: emailRef.current?.validity.valid
        ? ""
        : email
          ? "Please enter a valid email address."
          : "Please enter your email address.",
      interests: interests.length ? "" : "Choose at least one area of interest.",
    };

    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (nextErrors.interests) {
      firstInterestRef.current?.focus();
      return;
    }

    const message = [
      "VIBE LAB — CREATIVE LAB APPLICATION",
      "",
      "Full name: " + name,
      "Email: " + email,
      "",
      "Creative interests:",
      ...interests.map((interest) => "- " + interest),
    ].join("\n");
    const href = "https://wa.me/" + toWhatsAppPhone(WHATSAPP_RECIPIENT) + "?text=" + encodeURIComponent(message);

    setWhatsappHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="apply-placeholder">
      <header className="site-header">
        <Brand />
        <a className="text-link" href="/">
          <span aria-hidden="true">←</span> Back to the Creative Lab
        </a>
      </header>
      <main className="placeholder-main apply-main">
        <p className="eyebrow">THE VIBE LAB <span aria-hidden="true">✳</span> CREATIVE LAB</p>
        <div className="apply-intro">
          <h1>Apply to<br />join us.</h1>
          <div className="apply-guidance">
            <p>Tell us your name, email, and what you’re interested in bringing to the Creative Lab.</p>
            <p>Your answers will open as a WhatsApp message. Review and send it there to complete the handoff. Nothing is stored on this site.</p>
          </div>
        </div>

        <form className="application-form" onSubmit={handleSubmit} noValidate>
          <div className="apply-fields-row">
            <div className="apply-field">
              <label htmlFor="applicant-name">Full name <span aria-hidden="true">*</span></label>
              <input
                ref={nameRef}
                id="applicant-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "applicant-name-error" : undefined}
                onChange={(event) => {
                  if (event.currentTarget.value.trim()) {
                    setErrors((current) => ({ ...current, name: "" }));
                  }
                }}
              />
              {errors.name && <p className="apply-error" id="applicant-name-error" role="alert">{errors.name}</p>}
            </div>

            <div className="apply-field">
              <label htmlFor="applicant-email">Email address <span aria-hidden="true">*</span></label>
              <input
                ref={emailRef}
                id="applicant-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "applicant-email-error" : undefined}
                onChange={(event) => {
                  if (event.currentTarget.validity.valid) {
                    setErrors((current) => ({ ...current, email: "" }));
                  }
                }}
              />
              {errors.email && <p className="apply-error" id="applicant-email-error" role="alert">{errors.email}</p>}
            </div>
          </div>

          <fieldset className="apply-interests" aria-describedby={errors.interests ? "applicant-interests-error" : "applicant-interests-hint"} aria-invalid={Boolean(errors.interests)}>
            <legend>What are you interested in? <span aria-hidden="true">*</span></legend>
            <p className="apply-field-hint" id="applicant-interests-hint">Choose all that fit.</p>
            <div className="apply-interest-list">
              {disciplines.map((discipline, index) => (
                <label className="apply-interest-option" key={discipline}>
                  <input
                    ref={index === 0 ? firstInterestRef : undefined}
                    type="checkbox"
                    name="interests"
                    value={discipline}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setErrors((current) => ({ ...current, interests: "" }));
                      }
                    }}
                  />
                  <span>{discipline}</span>
                </label>
              ))}
            </div>
            {errors.interests && <p className="apply-error" id="applicant-interests-error" role="alert">{errors.interests}</p>}
          </fieldset>

          <button className="button button-dark apply-submit" type="submit">
            Continue to WhatsApp <span className="button-arrow" aria-hidden="true">↗</span>
          </button>

          {whatsappHref && (
            <div className="apply-status" role="status" aria-live="polite">
              <p>WhatsApp should open with your answers ready. Review the message and send it there to complete your application.</p>
              <a href={whatsappHref} target="_blank" rel="noreferrer">If it didn’t open, open your message here ↗</a>
            </div>
          )}
        </form>
      </main>
      <footer className="site-footer">
        <Brand />
        <p>Experiences. Creativity. Good Vibes.</p>
      </footer>
    </div>
  );
}
function LandingPage() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Brand />
        <a className="button button-small" href="/apply">
          Apply <span className="button-arrow" aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main-content">
        <section className="hero page-gutter" aria-labelledby="hero-title">
          <div className="eyebrow hero-eyebrow">
            <span>THE VIBE LAB</span>
            <span className="eyebrow-symbol" aria-hidden="true">✳</span>
            <span>CREATIVE LAB</span>
          </div>

          <div className="hero-layout">
            <h1 id="hero-title" className="hero-title">
              <span>Creativity,</span>
              <span className="hero-title-indent">in <mark>good</mark></span>
              <span>company.</span>
            </h1>

            <div className="hero-aside">
              <p className="hero-tagline">
                Experiences.<br />
                Creativity.<br />
                <span>Good Vibes.</span>
              </p>
              <p className="hero-copy">
                Bring what you do to a community of creatives who want to contribute,
                collaborate, and grow with The Vibe Lab.
              </p>
              <a className="button button-dark" href="/apply">
                Apply to Join <span className="button-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-foot" aria-hidden="true">
            <span>IDEAS / PEOPLE / GOOD ENERGY</span>
            <span>MAKE IT TOGETHER <span className="down-arrow">↓</span></span>
          </div>
        </section>

        <section className="about-section page-gutter" id="about" aria-labelledby="about-title">
          <div className="section-label">
            <span className="eyebrow">01 / THE CREATIVE LAB</span>
            <span className="section-rule" aria-hidden="true" />
          </div>
          <div className="about-layout">
            <h2 id="about-title">Different skills.<br /><span>One shared space.</span></h2>
            <p>
              The Creative Lab brings together people with different creative and
              event-related skills who want to contribute, collaborate, and grow
              with The Vibe Lab.
            </p>
          </div>
        </section>

        <section className="disciplines-section page-gutter" aria-labelledby="disciplines-title">
          <div className="disciplines-heading">
            <p className="eyebrow">02 / BRING WHAT YOU DO</p>
            <h2 id="disciplines-title">Many ways<br />to be part of it.</h2>
            <p className="disciplines-note">
              Different interests, skills, and ways to contribute belong in the mix.
            </p>
          </div>
          <ul className="discipline-list" aria-label="Creative Lab interests">
            {disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        </section>

        <section className="closing-section page-gutter" aria-labelledby="closing-title">
          <p className="eyebrow">YOUR MOVE <span aria-hidden="true">✳</span></p>
          <div className="closing-layout">
            <h2 id="closing-title">
              Bring your skill.<br />
              Bring your energy.<br />
              <span>Let’s create.</span>
            </h2>
            <a className="button button-dark" href="/apply">
              Apply to Join <span className="button-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer page-gutter">
        <Brand />
        <p>Experiences. Creativity. Good Vibes.</p>
        <a className="footer-top" href="#main-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/apply" ? <ApplyPage /> : <LandingPage />;
}
