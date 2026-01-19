import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import { SITE_URL } from "@config/site";

export default function DesigningAiForGriefPage() {
  return (
    <>
      <Head>
        <title>Designing AI for grief, not growth hacking – EchoVault Journal</title>
        <meta
          name="description"
          content="Why EchoVault is built to feel slow, gentle, and consent first, and what changes when you design AI around real families instead of engagement graphs."
        />
        <meta
          property="og:title"
          content="Designing AI for grief, not growth hacking – EchoVault"
        />
        <meta
          property="og:description"
          content="A reflection on building technology for people in tender, unforgettable moments instead of optimizing for clicks."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}/blog/designing-ai-for-grief-not-growth`} />
        <meta property="og:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <link rel="canonical" href={`${SITE_URL}/blog/designing-ai-for-grief-not-growth`} />
      </Head>
      <Layout>
        <article className="blog-article">
          <header className="blog-hero blog-hero--grief">
            <div className="content blog-hero-inner">
              <p className="blog-hero-kicker">Product and ethics</p>
              <h1 className="blog-hero-title">Designing AI for grief, not growth hacking</h1>
              <p className="blog-hero-tagline">
                When you sit this close to people&apos;s hardest moments, engagement metrics stop being the most
                interesting thing in the room.
              </p>
              <p className="blog-article-meta">Approx. 10 minute read</p>
            </div>
          </header>
          <div className="content blog-article-body">
            <p>
              If you have spent any time in tech over the last decade, you have probably seen the same playbook
              recycled again and again. Ship fast. Instrument everything. Test the wording on every button. Optimize for
              engagement, retention, referral. Find the shortest path from curiosity to habit. If someone is still on
              the page after thirty seconds, figure out how to keep them for sixty.
            </p>
            <p>
              There is a kind of rush that comes with this work. You look at dashboards and watch numbers climb. You
              tweak a headline and the graph jumps up and to the right, and everyone claps. You run experiments with
              thousands of users and talk confidently about cohorts and funnels and churn.
            </p>
            <p>But grief does not care about funnels.</p>
            <p>
              Grief shows up on a Tuesday afternoon when a song comes on in the grocery store and you have to stand
              still for a minute because your chest hurts. It shows up on anniversaries you forget until they hit you in
              the middle of the day. It shows up when you go to call someone and realize you cannot.
            </p>
            <p>
              If you are going to build technology that sits anywhere near grief, technology that invites people to
              record and revisit the stories of people they love, you cannot simply copy the growth hacking playbook.
              Not if you want to be able to look the families you serve in the eye. Not if you want to sleep well.
            </p>
            <p>You have to design differently.</p>
            <p>
              Designing AI for grief starts with an uncomfortable admission. This is tender territory. You are stepping
              into moments that people will remember for the rest of their lives. You are asking them to bring their
              vulnerability, their fears, their love, their regret. You do not get to treat that as content.
            </p>
            <p>
              When someone sits down to record a session with EchoVault, they are not thinking about onboarding or
              activation. They are thinking, I hope I do not say the wrong thing. I hope this does not feel too heavy. I
              hope this is not weird for Mom. They might be thinking, I am not ready for this, and also, I cannot afford
              not to be.
            </p>
            <p>
              A growth focused product might respond with pressure. Complete your first session today. You are eighty
              percent of the way to capturing their legacy, just one more step. It would send reminders and nudges and
              prompts until people either complied or drifted away.
            </p>
            <p>
              An experience designed with grief in mind tries something gentler. It makes room for ambivalence. It says,
              it is okay to take a breath. It is okay to pause this and come back. It is okay if you are not sure how to
              start.
            </p>
            <p>
              Instead of asking, how do we get more, it asks, what is the minimum that would feel meaningful right now.
              Maybe that is ten questions, not two hundred. Maybe it is one story about how they met their partner, not
              a full biography. Maybe it is just getting them to say their own name, where they grew up, and something
              small they are proud of that no one knows.
            </p>
            <p>Building AI around grief also means you measure different things.</p>
            <p>
              You stop bragging about time spent in app as if more is always better. Sometimes the most respectful
              thing is for the technology to disappear quickly, to give people just enough structure to have the
              conversation and then get out of the way so they can sit together in whatever comes up.
            </p>
            <p>
              You stop treating sharing as a universal good. Instead of asking how many people shared something, you ask
              who needed to see this and who had permission to see this. You build controls that sound like real life:
              this is just for me, this is for our immediate family, this can be shared more widely later if we decide
              that is right. Those toggles are not database flags, they are promises.
            </p>
            <p>And you draw clear boundaries for the AI itself.</p>
            <p>
              You resist the temptation to make it dramatize or sensationalize stories just to sound interesting. You do
              not let it improvise fake memories or fill in gaps with confident guesses. You anchor it in what was
              actually said and recorded. You let it say, I do not know, instead of inventing an answer that might feel
              real and be completely untrue.
            </p>
            <p>
              You let the Echo mirror warmth and curiosity without pretending to be a psychic. You let it ask follow up
              questions that deepen a story, not drag someone into painful territory they did not sign up for. You let
              people set topics that are off limits, and you honor that.
            </p>
            <p>
              This kind of design is slower. It means saying no to features that might drive certain metrics but would
              leave a bad taste in the mouths of the people you claim to serve. It means sitting with uncomfortable
              trade offs. It means admitting that sometimes the numbers that are easy to graph are not the ones that
              matter most.
            </p>
            <p>How do you measure whether a product handled someone&apos;s grief well.</p>
            <p>
              You hear it in the way they talk about it afterward. It felt like we had permission to stop when we
              needed to. It did not try to push us into anything we were not ready for. It felt like it was there to
              help us listen, not to perform for us.
            </p>
            <p>
              You see it in the stories people tell about using it. Not, I spent six hours in this app last week, but,
              we finally had the conversation we had been avoiding for years and it felt softer than we expected. Not, I
              am obsessed with this tool, but, I am glad it was there when we needed it and I do not think about it when
              I do not.
            </p>
            <p>
              Designing AI for grief is not about building sad technology. It is about building honest technology.
              Honest about what it can and cannot do. Honest about the fact that no digital Echo will ever replace a
              person. Honest about the limits of memory and the ways we can support, not exploit, the people who are
              navigating loss or anticipating it.
            </p>
            <p>
              Growth still matters, in the sense that you want this to reach the families who need it. But growth is not
              the goal. The goal is to treat every session, every recording, every quiet night when someone logs in
              because they miss a voice, as something sacred.
            </p>
            <p>
              You cannot test your way into that with charts alone. You have to care your way into it. You have to talk
              to families. You have to sit with their stories. You have to be willing to leave money on the table when a
              particular feature would cross a line that matters more than revenue.
            </p>
            <p>
              The reward is subtle and important. You get to build something that people talk about not as an app, but
              as a part of their family story. You get to know that when someone opens EchoVault on a hard day, they are
              stepping into an experience that was designed for their dignity, not for your dashboard.
            </p>
            <p>
              If you&apos;re thinking about recording someone you love and want the process to feel this careful, you can{" "}
              <Link href="/how-it-works">see how EchoVault works</Link> or{" "}
              <Link href="/pricing">look at the tiers</Link> to find a starting point.
            </p>
            <p className="blog-back-link">
              <Link href="/blog">← Back to all essays</Link>
            </p>
          </div>
        </article>
      </Layout>
    </>
  );
}
