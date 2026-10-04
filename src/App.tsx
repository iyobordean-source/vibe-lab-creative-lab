import { useState, type FormEvent } from "react";

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

const applicationInterests = disciplines
  .map((discipline) => discipline === "Event Hosting" ? "Event Hosting (MC)" : discipline)
  .concat("Other");

const commitmentItems = [
  {
    value: "merit",
    label: "I understand acceptance is based on merit and availability.",
    messageLabel: "Acceptance based on merit and availability",
  },
  {
    value: "interview",
    label: "I may be invited for an interview or practical assessment.",
    messageLabel: "Interview/practical assessment acknowledgement",
  },
  {
    value: "respect",
    label: "I will treat members with respect.",
    messageLabel: "Respect acknowledgement",
  },
  {
    value: "conduct",
    label: "I understand repeated misconduct or absence may result in removal.",
    messageLabel: "Misconduct/absence acknowledgement",
  },
  {
    value: "professional",
    label: "I will represent The Vibe Lab professionally.",
    messageLabel: "Professional representation acknowledgement",
  },
];

type FormErrors = Record<string, string>;

function ApplicationError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p className="apply-error" id={id} role="alert">{message}</p>;
}

function ApplyPage() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [whatsappHref, setWhatsappHref] = useState("");
  const [otherInterestSelected, setOtherInterestSelected] = useState(false);
  const [workedOnEvents, setWorkedOnEvents] = useState("");

  function clearError(key: string) {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWhatsappHref("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const get = (key: string) => String(formData.get(key) ?? "").trim();
    const answer = (key: string) => get(key) || "Not provided";
    const selectedInterests = formData.getAll("interests").map(String);
    const selectedCommitments = new Set(formData.getAll("commitments").map(String));
    const nextErrors: FormErrors = {};

    const requiredFields: Array<[string, string]> = [
      ["fullName", "Enter your full name."],
      ["phone", "Enter your phone number."],
      ["age", "Choose your age range."],
      ["city", "Enter your city."],
      ["instagram", "Enter your Instagram handle."],
      ["experienceLevel", "Choose your experience level."],
      ["workedOnEvents", "Choose Yes or No."],
      ["whyJoin", "Tell us why you want to join."],
      ["strengths", "Tell us what strengths you would bring."],
      ["achievement", "Tell us about a project or achievement you’re proud of."],
      ["pressure", "Tell us how you handle pressure during events."],
      ["availability", "Choose your availability."],
      ["willingToVolunteer", "Choose Yes or No."],
      ["deadlineComfort", "Choose Yes or No."],
      ["whyChooseYou", "Tell us why we should choose you."],
    ];

    requiredFields.forEach(([key, message]) => {
      if (!get(key)) nextErrors[key] = message;
    });

    const email = get("email");
    const emailInput = form.querySelector<HTMLInputElement>("#applicant-email");
    if (email && emailInput && !emailInput.validity.valid) {
      nextErrors.email = "Enter a valid email address.";
    }

    for (const [key, selector, label] of [
      ["linkedin", "#applicant-linkedin", "LinkedIn"],
      ["portfolio", "#applicant-portfolio", "Portfolio or social link"],
    ]) {
      const value = get(key);
      const input = form.querySelector<HTMLInputElement>(selector);
      if (value && input && !input.validity.valid) {
        nextErrors[key] = "Enter a valid " + label + " URL, including https://.";
      }
    }

    if (!selectedInterests.length) {
      nextErrors.interests = "Choose at least one area of interest.";
    }
    if (selectedInterests.includes("Other") && !get("otherInterest")) {
      nextErrors.otherInterest = "Describe your other area of interest.";
    }
    if (get("workedOnEvents") === "Yes" && !get("eventDescription")) {
      nextErrors.eventDescription = "Tell us a little about the events you have worked on.";
    }
    if (selectedCommitments.size !== commitmentItems.length) {
      nextErrors.commitments = "Please accept all five commitments to continue.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      const firstInvalid = form.querySelector<HTMLElement>(
        'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]',
      );
      firstInvalid?.focus();
      return;
    }

    const workedAnswer = get("workedOnEvents");
    const message = [
      "NEW VIBE LAB CREW & CREATIVE LAB APPLICATION",
      "",
      "SECTION A — PERSONAL INFORMATION",
      "Full Name: " + answer("fullName"),
      "Phone: " + answer("phone"),
      "Email: " + answer("email"),
      "Age: " + answer("age"),
      "City: " + answer("city"),
      "Instagram: " + answer("instagram"),
      "LinkedIn: " + answer("linkedin"),
      "",
      "SECTION B — INTERESTS",
      ...selectedInterests.map((interest) => interest === "Other"
        ? "- Other: " + answer("otherInterest")
        : "- " + interest),
      "",
      "SECTION C — EXPERIENCE",
      "Experience Level: " + answer("experienceLevel"),
      "Worked on Events: " + workedAnswer,
      "Description: " + (workedAnswer === "Yes" ? answer("eventDescription") : "Not applicable"),
      "Portfolio/Social: " + answer("portfolio"),
      "Equipment: " + answer("equipment"),
      "",
      "SECTION D — ABOUT YOU",
      "Why do you want to join?",
      answer("whyJoin"),
      "",
      "Strengths:",
      answer("strengths"),
      "",
      "Project/Achievement:",
      answer("achievement"),
      "",
      "Handling Pressure:",
      answer("pressure"),
      "",
      "SECTION E — AVAILABILITY",
      "Availability: " + answer("availability"),
      "Willing to Volunteer: " + answer("willingToVolunteer"),
      "Comfortable with Deadlines: " + answer("deadlineComfort"),
      "",
      "SECTION F — COMMITMENT",
      ...commitmentItems.map((item) =>
        item.messageLabel + ": " + (selectedCommitments.has(item.value) ? "Yes" : "No")),
      "",
      "FINAL QUESTION",
      "Why should we choose you?",
      answer("whyChooseYou"),
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
        <p className="eyebrow">THE VIBE LAB <span aria-hidden="true">✳</span> CREW &amp; CREATIVE LAB</p>
        <div className="apply-intro">
          <h1 className="application-title">Crew &amp; Creative<br />Lab Application<br />Form</h1>
          <div className="apply-guidance">
            <p className="apply-welcome">Welcome!</p>
            <p>Thank you for your interest in joining The Vibe Lab Crew &amp; Creative Lab.</p>
            <p>Please complete this application honestly. Filling this form does not guarantee acceptance. Successful applicants may be invited for a short interview or practical assessment.</p>
            <p>Your answers will open as a WhatsApp draft for you to review and send. Nothing is stored on this site.</p>
          </div>
        </div>

        <form className="application-form" onSubmit={handleSubmit} noValidate>
          <section className="application-section" aria-labelledby="section-a-title">
            <div className="application-section-heading">
              <p className="eyebrow">SECTION A</p>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="section-a-title">Personal Information</h2>
            </div>
            <div className="apply-fields-grid">
              <div className="apply-field">
                <label htmlFor="applicant-name">Full Name <span className="required-mark" aria-hidden="true">*</span></label>
                <input id="applicant-name" name="fullName" type="text" autoComplete="name" required
                  aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "error-fullName" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("fullName")} />
                <ApplicationError id="error-fullName" message={errors.fullName} />
              </div>
              <div className="apply-field">
                <label htmlFor="applicant-phone">Phone Number <span className="required-mark" aria-hidden="true">*</span></label>
                <input id="applicant-phone" name="phone" type="tel" autoComplete="tel" required
                  aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "error-phone" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("phone")} />
                <ApplicationError id="error-phone" message={errors.phone} />
              </div>
              <div className="apply-field">
                <label htmlFor="applicant-email">Email Address <span className="apply-optional">(optional)</span></label>
                <input id="applicant-email" name="email" type="email" autoComplete="email"
                  aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined}
                  onChange={(event) => event.currentTarget.validity.valid && clearError("email")} />
                <ApplicationError id="error-email" message={errors.email} />
              </div>
              <div className="apply-field">
                <label htmlFor="applicant-age">Age <span className="required-mark" aria-hidden="true">*</span></label>
                <select id="applicant-age" name="age" required aria-invalid={Boolean(errors.age)}
                  aria-describedby={errors.age ? "error-age" : undefined}
                  onChange={(event) => event.currentTarget.value && clearError("age")}>
                  <option value="">Choose your age range</option>
                  <option value="18–20">18–20</option>
                  <option value="21–25">21–25</option>
                  <option value="26–30">26–30</option>
                  <option value="31+">31+</option>
                </select>
                <ApplicationError id="error-age" message={errors.age} />
              </div>
              <div className="apply-field">
                <label htmlFor="applicant-city">City <span className="required-mark" aria-hidden="true">*</span></label>
                <input id="applicant-city" name="city" type="text" autoComplete="address-level2" required
                  aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "error-city" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("city")} />
                <ApplicationError id="error-city" message={errors.city} />
              </div>
              <div className="apply-field">
                <label htmlFor="applicant-instagram">Instagram Handle <span className="required-mark" aria-hidden="true">*</span></label>
                <input id="applicant-instagram" name="instagram" type="text" autoCapitalize="none" required
                  aria-invalid={Boolean(errors.instagram)} aria-describedby={errors.instagram ? "error-instagram" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("instagram")} />
                <ApplicationError id="error-instagram" message={errors.instagram} />
              </div>
              <div className="apply-field">
                <label htmlFor="applicant-linkedin">LinkedIn <span className="apply-optional">(optional)</span></label>
                <input id="applicant-linkedin" name="linkedin" type="url" inputMode="url" placeholder="https://..."
                  aria-invalid={Boolean(errors.linkedin)} aria-describedby={errors.linkedin ? "error-linkedin" : undefined}
                  onChange={(event) => event.currentTarget.validity.valid && clearError("linkedin")} />
                <ApplicationError id="error-linkedin" message={errors.linkedin} />
              </div>
            </div>
          </section>

          <section className="application-section" aria-labelledby="section-b-title">
            <div className="application-section-heading">
              <p className="eyebrow">SECTION B</p>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="section-b-title">Your Interests</h2>
            </div>
            <fieldset className="apply-interests" aria-describedby={errors.interests ? "error-interests" : "interests-hint"} aria-invalid={Boolean(errors.interests)}>
              <legend>Select every area that interests you <span className="required-mark" aria-hidden="true">*</span></legend>
              <p className="apply-field-hint" id="interests-hint">Choose at least one. Select all that fit.</p>
              <div className="apply-interest-list">
                {applicationInterests.map((interest) => (
                  <label className="apply-interest-option" key={interest}>
                    <input type="checkbox" name="interests" value={interest}
                      checked={interest === "Other" ? otherInterestSelected : undefined}
                      aria-invalid={Boolean(errors.interests)}
                      onChange={(event) => {
                        if (interest === "Other") {
                          setOtherInterestSelected(event.currentTarget.checked);
                          if (!event.currentTarget.checked) clearError("otherInterest");
                        }
                        if (event.currentTarget.checked) clearError("interests");
                      }} />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
              <ApplicationError id="error-interests" message={errors.interests} />
            </fieldset>
            {otherInterestSelected && (
              <div className="apply-field apply-other-interest">
                <label htmlFor="other-interest">Tell us your other area of interest <span className="required-mark" aria-hidden="true">*</span></label>
                <input id="other-interest" name="otherInterest" type="text" required
                  aria-invalid={Boolean(errors.otherInterest)} aria-describedby={errors.otherInterest ? "error-otherInterest" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("otherInterest")} />
                <ApplicationError id="error-otherInterest" message={errors.otherInterest} />
              </div>
            )}
          </section>

          <section className="application-section" aria-labelledby="section-c-title">
            <div className="application-section-heading">
              <p className="eyebrow">SECTION C</p>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="section-c-title">Experience</h2>
            </div>
            <div className="apply-fields-grid">
              <div className="apply-field">
                <label htmlFor="experience-level">Experience Level <span className="required-mark" aria-hidden="true">*</span></label>
                <select id="experience-level" name="experienceLevel" required aria-invalid={Boolean(errors.experienceLevel)}
                  aria-describedby={errors.experienceLevel ? "error-experienceLevel" : undefined}
                  onChange={(event) => event.currentTarget.value && clearError("experienceLevel")}>
                  <option value="">Choose your experience level</option>
                  <option>Beginner</option>
                  <option>&lt;1 year</option>
                  <option>1–3 years</option>
                  <option>3+ years</option>
                </select>
                <ApplicationError id="error-experienceLevel" message={errors.experienceLevel} />
              </div>

              <fieldset className="apply-choice-group" aria-describedby={errors.workedOnEvents ? "error-workedOnEvents" : undefined} aria-invalid={Boolean(errors.workedOnEvents)}>
                <legend>Worked on events before? <span className="required-mark" aria-hidden="true">*</span></legend>
                <div className="apply-radio-list">
                  {["Yes", "No"].map((option) => (
                    <label className="apply-radio-option" key={option}>
                      <input type="radio" name="workedOnEvents" value={option} required checked={workedOnEvents === option}
                        aria-invalid={Boolean(errors.workedOnEvents)}
                        onChange={() => { setWorkedOnEvents(option); clearError("workedOnEvents"); }} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <ApplicationError id="error-workedOnEvents" message={errors.workedOnEvents} />
              </fieldset>

              <div className="apply-field apply-field-wide" hidden={workedOnEvents !== "Yes"}>
                <label htmlFor="event-description">If yes, describe the events you have worked on <span className="required-mark" aria-hidden="true">*</span></label>
                <textarea id="event-description" name="eventDescription" rows={4} required={workedOnEvents === "Yes"}
                  aria-invalid={Boolean(errors.eventDescription)} aria-describedby={errors.eventDescription ? "error-eventDescription" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("eventDescription")} />
                <ApplicationError id="error-eventDescription" message={errors.eventDescription} />
              </div>

              <div className="apply-field">
                <label htmlFor="applicant-portfolio">Portfolio/Social Link <span className="apply-optional">(optional)</span></label>
                <input id="applicant-portfolio" name="portfolio" type="url" inputMode="url" placeholder="https://..."
                  aria-invalid={Boolean(errors.portfolio)} aria-describedby={errors.portfolio ? "error-portfolio" : undefined}
                  onChange={(event) => event.currentTarget.validity.valid && clearError("portfolio")} />
                <ApplicationError id="error-portfolio" message={errors.portfolio} />
              </div>
              <div className="apply-field">
                <label htmlFor="equipment">Equipment Owned <span className="apply-optional">(optional)</span></label>
                <input id="equipment" name="equipment" type="text"
                  onChange={(event) => event.currentTarget.value.trim() && clearError("equipment")} />
                <ApplicationError id="error-equipment" message={errors.equipment} />
              </div>
            </div>
          </section>

          <section className="application-section" aria-labelledby="section-d-title">
            <div className="application-section-heading">
              <p className="eyebrow">SECTION D</p>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="section-d-title">About You</h2>
            </div>
            <div className="apply-fields-grid apply-about-grid">
              <div className="apply-field">
                <label htmlFor="why-join">Why do you want to join? <span className="required-mark" aria-hidden="true">*</span></label>
                <textarea id="why-join" name="whyJoin" rows={5} required aria-invalid={Boolean(errors.whyJoin)}
                  aria-describedby={errors.whyJoin ? "error-whyJoin" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("whyJoin")} />
                <ApplicationError id="error-whyJoin" message={errors.whyJoin} />
              </div>
              <div className="apply-field">
                <label htmlFor="strengths">What strengths would you bring? <span className="required-mark" aria-hidden="true">*</span></label>
                <textarea id="strengths" name="strengths" rows={5} required aria-invalid={Boolean(errors.strengths)}
                  aria-describedby={errors.strengths ? "error-strengths" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("strengths")} />
                <ApplicationError id="error-strengths" message={errors.strengths} />
              </div>
              <div className="apply-field">
                <label htmlFor="achievement">Project/achievement you’re proud of <span className="required-mark" aria-hidden="true">*</span></label>
                <textarea id="achievement" name="achievement" rows={5} required aria-invalid={Boolean(errors.achievement)}
                  aria-describedby={errors.achievement ? "error-achievement" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("achievement")} />
                <ApplicationError id="error-achievement" message={errors.achievement} />
              </div>
              <div className="apply-field">
                <label htmlFor="pressure">How do you handle pressure during events? <span className="required-mark" aria-hidden="true">*</span></label>
                <textarea id="pressure" name="pressure" rows={5} required aria-invalid={Boolean(errors.pressure)}
                  aria-describedby={errors.pressure ? "error-pressure" : undefined}
                  onChange={(event) => event.currentTarget.value.trim() && clearError("pressure")} />
                <ApplicationError id="error-pressure" message={errors.pressure} />
              </div>
            </div>
          </section>

          <section className="application-section" aria-labelledby="section-e-title">
            <div className="application-section-heading">
              <p className="eyebrow">SECTION E</p>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="section-e-title">Availability</h2>
            </div>
            <div className="apply-fields-grid">
              <div className="apply-field">
                <label htmlFor="availability">Availability <span className="required-mark" aria-hidden="true">*</span></label>
                <select id="availability" name="availability" required aria-invalid={Boolean(errors.availability)}
                  aria-describedby={errors.availability ? "error-availability" : undefined}
                  onChange={(event) => event.currentTarget.value && clearError("availability")}>
                  <option value="">Choose your availability</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Both</option>
                </select>
                <ApplicationError id="error-availability" message={errors.availability} />
              </div>

              <fieldset className="apply-choice-group" aria-describedby={errors.willingToVolunteer ? "error-willingToVolunteer" : undefined} aria-invalid={Boolean(errors.willingToVolunteer)}>
                <legend>Willing to volunteer? <span className="required-mark" aria-hidden="true">*</span></legend>
                <div className="apply-radio-list">
                  {["Yes", "No"].map((option) => (
                    <label className="apply-radio-option" key={option}>
                      <input type="radio" name="willingToVolunteer" value={option} required
                        aria-invalid={Boolean(errors.willingToVolunteer)}
                        onChange={() => clearError("willingToVolunteer")} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <ApplicationError id="error-willingToVolunteer" message={errors.willingToVolunteer} />
              </fieldset>

              <fieldset className="apply-choice-group" aria-describedby={errors.deadlineComfort ? "error-deadlineComfort" : undefined} aria-invalid={Boolean(errors.deadlineComfort)}>
                <legend>Comfortable with deadlines? <span className="required-mark" aria-hidden="true">*</span></legend>
                <div className="apply-radio-list">
                  {["Yes", "No"].map((option) => (
                    <label className="apply-radio-option" key={option}>
                      <input type="radio" name="deadlineComfort" value={option} required
                        aria-invalid={Boolean(errors.deadlineComfort)}
                        onChange={() => clearError("deadlineComfort")} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <ApplicationError id="error-deadlineComfort" message={errors.deadlineComfort} />
              </fieldset>
            </div>
          </section>

          <section className="application-section" aria-labelledby="section-f-title">
            <div className="application-section-heading">
              <p className="eyebrow">SECTION F</p>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="section-f-title">Commitment</h2>
            </div>
            <fieldset className="apply-commitments" aria-describedby={errors.commitments ? "error-commitments" : "commitments-hint"} aria-invalid={Boolean(errors.commitments)}>
              <legend>Please confirm each statement <span className="required-mark" aria-hidden="true">*</span></legend>
              <p className="apply-field-hint" id="commitments-hint">All five confirmations are required to continue.</p>
              <div className="apply-commitment-list">
                {commitmentItems.map((item) => (
                  <label className="apply-commitment-option" key={item.value}>
                    <input type="checkbox" name="commitments" value={item.value} required
                      aria-invalid={Boolean(errors.commitments)}
                      onChange={(event) => {
                        const selected = new FormData(event.currentTarget.form as HTMLFormElement).getAll("commitments");
                        if (selected.length === commitmentItems.length) clearError("commitments");
                      }} />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
              <ApplicationError id="error-commitments" message={errors.commitments} />
            </fieldset>
          </section>

          <section className="application-section application-final-question" aria-labelledby="final-question-title">
            <div className="application-section-heading">
              <p className="eyebrow">FINAL QUESTION</p>
              <span className="section-rule" aria-hidden="true" />
              <h2 id="final-question-title">Why should we choose you?</h2>
            </div>
            <div className="apply-field">
              <label htmlFor="why-choose-you">Your answer <span className="required-mark" aria-hidden="true">*</span></label>
              <textarea id="why-choose-you" name="whyChooseYou" rows={6} required aria-invalid={Boolean(errors.whyChooseYou)}
                aria-describedby={errors.whyChooseYou ? "error-whyChooseYou" : undefined}
                onChange={(event) => event.currentTarget.value.trim() && clearError("whyChooseYou")} />
              <ApplicationError id="error-whyChooseYou" message={errors.whyChooseYou} />
            </div>
          </section>

          <button className="button button-dark apply-submit" type="submit">
            Continue to WhatsApp <span className="button-arrow" aria-hidden="true">↗</span>
          </button>

          {whatsappHref && (
            <div className="apply-status" role="status" aria-live="polite">
              <p>WhatsApp should open with your complete application ready. Review it and press Send to submit. Nothing is stored on this site.</p>
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
