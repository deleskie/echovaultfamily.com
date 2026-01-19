import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import { SITE_URL } from "@config/site";

const posts = [
  {
    href: "/blog/the-drummer-walking-home",
    title: "The Drummer Walking Home",
    description:
      "On the quiet after the noise, the walk back to ordinary life, and the small stories that disappear first.",
    meta: "Personal essay · 10 minute read"
  },
  {
    href: "/blog/small-town-snow",
    title: "Small Town Snow",
    description:
      "Snow as a setting: quiet streets, warm windows, and the memory of walking downtown when Christmas felt bigger than you.",
    meta: "Personal essay · 6 minute read"
  },
  {
    href: "/blog/echoes-in-the-grid",
    title: "Echoes in the Grid: Why I Built EchoVault",
    description:
      "A founder story about science fiction, networks, grief, and building EchoVault as a humane way to leave more of ourselves for the people who come after.",
    meta: "Founder story · 12 minute read"
  },
  {
    href: "/blog/we-should-have-recorded-this",
    title: 'The moment you realize "we should have recorded this"',
    description:
      'On the quiet, everyday moments when you suddenly understand how fragile a single conversation is, and how much future regret is hiding inside the sentence, "We should have recorded this."',
    meta: "Personal essay · 10 minute read"
  },
  {
    href: "/blog/designing-ai-for-grief-not-growth",
    title: "Designing AI for grief, not growth hacking",
    description:
      "Why EchoVault is built to feel slow, gentle, and consent first, and what changes when you design AI around real families instead of engagement graphs.",
    meta: "Product and ethics · 10 minute read"
  },
  {
    href: "/blog/what-families-want-from-a-digital-twin",
    title: 'What families actually want from a "digital twin"',
    description:
      "Spoiler: not science fiction. They want familiar phrases, honest stories, clear boundaries, and a place to keep talking to the people who shaped them.",
    meta: "Listening and insight · 9 minute read"
  }
];

export default function BlogIndexPage() {
  return (
    <>
      <Head>
        <title>EchoVault Blog – On memory, legacy, and AI</title>
        <meta
          name="description"
          content="Essays and reflections on digital legacy, family stories, grief, and the thoughtful use of AI to preserve what matters."
        />
        <meta property="og:title" content="EchoVault Blog – On memory, legacy, and AI" />
        <meta
          property="og:description"
          content="Perspectives on preserving stories, designing for grief, and building emotionally intelligent AI."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
      </Head>
      <Layout>
        <section className="section" aria-labelledby="blog-heading">
          <div className="content">
            <h1 id="blog-heading" className="page-title">
              EchoVault Journal
            </h1>
            <p className="lead">
              Long-form reflections on memory, grief, and what it means to build technology that helps families stay
              connected across time.
            </p>
            <div className="grid blog-list">
              {posts.map((post) => (
                <article key={post.href} className="card blog-card">
                  <Link href={post.href} className="blog-card-link" aria-label={`Read: ${post.title}`}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p className="blog-meta">{post.meta}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
