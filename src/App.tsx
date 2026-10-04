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

function Brand() {
  return (
    <a className="brand" href="/" aria-label="The Vibe Lab Creative Lab home">
      <span className="brand-name">THE VIBE LAB</span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-program">CREATIVE LAB</span>
    </a>
  );
}

function ApplyPlaceholder() {
  return (
    <div className="apply-placeholder">
      <header className="site-header">
        <Brand />
        <a className="text-link" href="/">
          <span aria-hidden="true">←</span> Back to the Creative Lab
        </a>
      </header>
      <main className="placeholder-main">
        <p className="eyebrow">THE VIBE LAB <span aria-hidden="true">✳</span> CREATIVE LAB</p>
        <h1>The application<br />form is next.</h1>
        <p className="placeholder-copy">
          This is the next step in the Creative Lab experience. The application form
          is not live yet.
        </p>
        <a className="button button-dark" href="/">
          Back to the Creative Lab <span className="button-arrow" aria-hidden="true">↗</span>
        </a>
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
  return path === "/apply" ? <ApplyPlaceholder /> : <LandingPage />;
}