import Head from "next/head";
import { useEffect } from "react";

const STORYTELLER_ONE_URL = "https://app.echovaultfamily.com/storyteller-one";

export default function StorytellerOneRedirectPage() {
  useEffect(() => {
    window.location.replace(STORYTELLER_ONE_URL);
  }, []);

  return (
    <>
      <Head>
        <title>EchoVault Storyteller</title>
        <meta name="robots" content="noindex, follow" />
        <meta httpEquiv="refresh" content={`0;url=${STORYTELLER_ONE_URL}`} />
        <link rel="canonical" href={STORYTELLER_ONE_URL} />
      </Head>
      <main style={styles.shell}>
        <section style={styles.card} aria-labelledby="storyteller-one-redirect-title">
          <p style={styles.kicker}>EchoVault</p>
          <h1 id="storyteller-one-redirect-title" style={styles.title}>
            Opening Storyteller.
          </h1>
          <p style={styles.copy}>If it does not open automatically, continue to the Storyteller page.</p>
          <a style={styles.button} href={STORYTELLER_ONE_URL}>
            Continue
          </a>
        </section>
      </main>
    </>
  );
}

const styles = {
  shell: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background: "#0e1117",
    color: "#f7efe3",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    width: "min(420px, 100%)",
    border: "1px solid rgba(247, 239, 227, 0.16)",
    borderRadius: "16px",
    padding: "28px",
    background: "rgba(255, 255, 255, 0.06)",
    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
  },
  kicker: {
    margin: "0 0 10px",
    color: "#cdbd9f",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    lineHeight: 1.05,
    letterSpacing: 0,
  },
  copy: {
    margin: "14px 0 22px",
    color: "rgba(247, 239, 227, 0.74)",
    fontSize: "16px",
    lineHeight: 1.5,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "44px",
    padding: "0 18px",
    borderRadius: "10px",
    background: "#f7efe3",
    color: "#11161d",
    fontWeight: 800,
    textDecoration: "none",
  },
};
