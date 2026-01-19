import { useRef, useState } from "react";
import { useI18n } from "./I18nProvider";

const MAILCHIMP_ACTION = process.env.NEXT_PUBLIC_MAILCHIMP_FORM_ACTION;
const MAILCHIMP_HONEYPOT_NAME = process.env.NEXT_PUBLIC_MAILCHIMP_HONEYPOT_NAME;
const MAILCHIMP_NOTE_FIELD = process.env.NEXT_PUBLIC_MAILCHIMP_NOTE_FIELD;

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toMailchimpJsonpUrl(actionUrl) {
  const url = new URL(actionUrl);
  url.pathname = url.pathname.replace(/\/subscribe\/post$/, "/subscribe/post-json");
  return url;
}

function requiresConfirmationFromMessage(message) {
  const normalized = String(message || "").toLowerCase();
  return normalized.includes("confirm") || normalized.includes("almost finished");
}

export default function WaitlistCTA() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");
  const [requireConfirmation, setRequireConfirmation] = useState(false);
  const activeScriptRef = useRef(null);

  const cleanupMailchimpScript = () => {
    const script = activeScriptRef.current;
    if (script) {
      script.remove();
      activeScriptRef.current = null;
    }
  };

  const submitViaMailchimp = () => {
    const trimmedEmail = email.trim();
    const trimmedNote = note.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setError(t.waitlist.errorFallback);
      return;
    }

    setStatus("submitting");
    setError("");

    cleanupMailchimpScript();

    const callbackName = `ev_mailchimp_${Date.now()}`;

    const url = toMailchimpJsonpUrl(MAILCHIMP_ACTION);
    url.searchParams.set("EMAIL", trimmedEmail);

    if (MAILCHIMP_NOTE_FIELD && trimmedNote) {
      url.searchParams.set(MAILCHIMP_NOTE_FIELD, trimmedNote);
    }

    if (MAILCHIMP_HONEYPOT_NAME) {
      url.searchParams.set(MAILCHIMP_HONEYPOT_NAME, "");
    }

    url.searchParams.set("c", callbackName);

    window[callbackName] = (payload) => {
      try {
        const result = payload?.result;
        const message = stripHtml(payload?.msg);

        if (result === "success") {
          setRequireConfirmation(requiresConfirmationFromMessage(message));
          setStatus("success");
          setEmail("");
          setNote("");
          return;
        }

        setStatus("error");
        setError(message || t.waitlist.errorFallback);
      } finally {
        try {
          delete window[callbackName];
        } catch {
          window[callbackName] = undefined;
        }

        cleanupMailchimpScript();
      }
    };

    const script = document.createElement("script");
    script.src = url.toString();
    script.async = true;
    script.onerror = () => {
      setStatus("error");
      setError(t.waitlist.errorFallback);

      try {
        delete window[callbackName];
      } catch {
        window[callbackName] = undefined;
      }

      cleanupMailchimpScript();
    };

    activeScriptRef.current = script;
    document.body.appendChild(script);
  };

  const submitViaServer = async () => {
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, note })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || "Could not save your details");
      }

      setRequireConfirmation(Boolean(payload.requireConfirmation));
      setStatus("success");
      setEmail("");
      setNote("");
    } catch (err) {
      setStatus("error");
      setError(err.message || t.waitlist.errorFallback);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    if (MAILCHIMP_ACTION) {
      submitViaMailchimp();
      return;
    }

    await submitViaServer();
  };

  return (
    <section
      id="waitlist"
      className="section section-muted waitlist-section"
      aria-labelledby="waitlist-heading"
    >
      <div className="content waitlist">
        <div className="waitlist-copy">
          <h2 id="waitlist-heading" className="section-title">
            {t.waitlist.heading}
          </h2>
          <p className="lead">
            {t.waitlist.lead}
          </p>
          <p className="waitlist-next-steps">
            {t.waitlist.nextSteps}{" "}
            <a
              className="waitlist-mail-link"
              href="mailto:hello@echovault-ai.com?subject=EchoVault%20Project%20Timing"
            >
              hello@echovault-ai.com
            </a>
            .
          </p>
        </div>
        {status === "success" ? (
          <div className="waitlist-form waitlist-success">
            {requireConfirmation ? (
              <>
                <p className="waitlist-success-title">{t.waitlist.successNeedConfirmTitle}</p>
                <p className="waitlist-success-text">
                  {t.waitlist.successNeedConfirmText}
                </p>
                <p className="waitlist-success-text">
                  If you&apos;re using Gmail, check Spam and Promotions. If you find it there, open the email and click
                  &quot;Not spam&quot; (and optionally add hello@echovault-ai.com to your contacts) so future updates land in
                  your inbox.
                </p>
              </>
            ) : (
              <>
                <p className="waitlist-success-title">{t.waitlist.successTitle}</p>
                <p className="waitlist-success-text">
                  {t.waitlist.successText}
                </p>
              </>
            )}
            <p className="waitlist-success-text">
              {t.waitlist.successFollowup}{" "}
              <a href="mailto:hello@echovault-ai.com?subject=EchoVault%20Project%20Timing">
                hello@echovault-ai.com
              </a>
              .
            </p>
          </div>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="waitlist-email">
              {t.waitlist.emailLabel}
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              placeholder={t.waitlist.emailPlaceholder}
              className="waitlist-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="visually-hidden" htmlFor="waitlist-note">
              {t.waitlist.noteLabel}
            </label>
            <input
              id="waitlist-note"
              type="text"
              placeholder={t.waitlist.notePlaceholder}
              className="waitlist-input"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <button
              type="submit"
              className="button button-primary button-full"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? t.waitlist.buttonSubmitting : t.waitlist.button}
            </button>
            <p className="waitlist-footnote">
              {t.waitlist.footnote}
            </p>
            {status === "error" && (
              <p className="waitlist-error" role="status">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
