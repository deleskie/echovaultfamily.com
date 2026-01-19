import fr from "./locales/fr.js";
import es from "./locales/es.js";
import hu from "./locales/hu.js";

export const DEFAULT_LOCALE = "en";

export const LOCALE_CONFIG = {
  en: {
    label: "EN",
    hrefLang: "en",
    pathPrefix: ""
  },
  FR: {
    label: "FR",
    hrefLang: "fr",
    pathPrefix: "/FR"
  },
  ES: {
    label: "ES",
    hrefLang: "es",
    pathPrefix: "/ES"
  },
  HU: {
    label: "HU",
    hrefLang: "hu",
    pathPrefix: "/HU"
  }
};

export const SUPPORTED_LOCALES = Object.keys(LOCALE_CONFIG);
export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
);

export function normalizeLocale(locale) {
  if (!locale) return DEFAULT_LOCALE;
  if (LOCALE_CONFIG[locale]) return locale;

  const upper = String(locale).toUpperCase();
  if (LOCALE_CONFIG[upper]) return upper;

  const lower = String(locale).toLowerCase();
  if (LOCALE_CONFIG[lower]) return lower;

  return DEFAULT_LOCALE;
}

export function getLocaleConfig(locale) {
  return LOCALE_CONFIG[normalizeLocale(locale)];
}

export function getLocaleFromPath(asPath) {
  const [path = "/"] = String(asPath || "/").split(/[?#]/);
  const segment = path.replace(/^\/+/, "").split("/")[0];
  if (!segment) return DEFAULT_LOCALE;

  const normalized = normalizeLocale(segment);
  if (normalized !== DEFAULT_LOCALE) {
    return normalized;
  }

  return DEFAULT_LOCALE;
}

export function stripLocaleFromPath(asPath) {
  const [path = "/"] = String(asPath || "/").split(/[?#]/);
  const parts = path.split("/");
  const first = parts[1];
  const normalized = normalizeLocale(first);
  if (normalized && normalized !== DEFAULT_LOCALE && normalized === first.toUpperCase()) {
    const rest = parts.slice(2).join("/");
    return `/${rest}`.replace(/\/+$/, "") || "/";
  }

  if (normalized && normalized !== DEFAULT_LOCALE && normalized === first) {
    const rest = parts.slice(2).join("/");
    return `/${rest}`.replace(/\/+$/, "") || "/";
  }

  return path || "/";
}

export function localizePath(locale, path) {
  const { pathPrefix } = getLocaleConfig(locale);
  const normalizedPath = String(path || "/").startsWith("/") ? String(path || "/") : `/${path}`;

  if (!pathPrefix) return normalizedPath;
  if (normalizedPath === "/") return pathPrefix;
  return `${pathPrefix}${normalizedPath}`;
}

export function localizeHashLink(locale, hash) {
  const normalizedHash = String(hash || "").startsWith("#") ? String(hash || "") : `#${hash || ""}`;
  return `${localizePath(locale, "/")}${normalizedHash}`;
}

export function swapLocaleInPath(asPath, targetLocale) {
  const target = normalizeLocale(targetLocale);
  const url = String(asPath || "/");
  const [pathPart = "/", rest = ""] = url.split(/(?=[?#])/);
  const basePath = stripLocaleFromPath(pathPart) || "/";

  const nextPath = target === DEFAULT_LOCALE ? basePath : localizePath(target, basePath);
  return `${nextPath}${rest}`;
}

export function isLocalizedPath(basePath) {
  const normalized = (basePath || "/").replace(/\/+$/, "") || "/";
  if (normalized === "/blog" || normalized.startsWith("/blog/")) return true;
  return ["/", "/pricing", "/how-it-works", "/trust", "/legal", "/storage", "/photo-restoration"].includes(normalized);
}

export function getAlternateLinks(siteUrl, basePath) {
  const normalizedBase = (basePath || "/").replace(/\/+$/, "") || "/";
  return SUPPORTED_LOCALES.map((locale) => {
    const cfg = getLocaleConfig(locale);
    const href = `${siteUrl}${cfg.pathPrefix}${normalizedBase === "/" ? "/" : normalizedBase}`;
    return {
      locale,
      hrefLang: cfg.hrefLang,
      href
    };
  });
}

const TRANSLATIONS = {
  en: {
    languageName: "English",
    layout: {
      logoTagline: "Digital legacy, made warm.",
      nav: {
        home: "Home",
        pricing: "Pricing",
        storage: "Storage",
        photoCare: "Photo Care",
        howItWorks: "How It Works",
        blog: "Blog"
      },
      actions: {
        talkHuman: "Talk with a human",
        joinWaitlist: "Join the waitlist"
      },
      footer: {
        note:
          "Stories, voices, and wisdom that stay close—preserved with care, consent, and clarity.",
        navigate: "Navigate",
        legal: "Legal",
        terms: "Terms",
        privacy: "Privacy",
        trust: "Trust & Safety",
        contact: "Contact"
      }
    },
    themeToggle: {
      aria: "Toggle color mode",
      dark: "Dark",
      light: "Light"
    },
    hero: {
      title: "Preserve their story, in their own words.",
      subtitle:
        "EchoVault guides gentle, AI-supported interviews, turns them into a conversational Echo, and gives your family a private space to keep asking questions for years.",
      primaryCta: "Join our waitlist",
      secondaryCta: "Talk with a human first",
      meta:
        'Designed for adult children, new parents, and anyone who has ever said, "We should really record this someday"—and means it.',
      offerLabel: "Every EchoVault project includes:",
      offerItems: [
        {
          title: "Guided interview sessions",
          text: "Warm, structured conversations that make it easy to share real stories."
        },
        {
          title: "A trained Echo of their voice",
          text: "An Echo grounded in their own words, phrases, and way of explaining things."
        },
        {
          title: "Private family access",
          text: "A calm, access controlled space where loved ones can return to ask questions."
        }
      ],
      visualCaption: "“Tell me about the moment you realized this really mattered to you.”"
    },
    trustBlock: {
      title: "How we handle your stories",
      intro:
        "EchoVault is built for families first, not for ads or engagement graphs. We treat every recording as part of a private family archive, not content.",
      plainTitle: "In plain language",
      plainBody:
        "EchoVault is being built to keep your recordings private by default. Only you and the people you invite should be able to access them. We don't want your family's stories showing up in ads, training demos, or anywhere else you didn't intend. If you ever want to stop, talk to us and we'll explain in clear language what we can remove or delete and what's already been shared with your family.",
      specsTitle: "If you speak more in specs",
      specsBody:
        "We're implementing standard safeguards as the product matures: encrypted transport (TLS), encryption at rest, least-privilege access, and clear retention/deletion controls. We'll publish the exact details as we finalize infrastructure and hosting, and we'll answer any questions directly if you need specifics for your situation.",
      note:
        "If you have stricter requirements, for example specific retention windows or export formats, reach out. We'd rather talk through what's available now and what's in progress than gloss over the details.",
      linkText: "Read our Trust & Safety overview."
    },
    waitlist: {
      heading: "Join our waitlist",
      lead:
        "EchoVault is in early availability with a small group of families. Join the waitlist and we'll send occasional updates, plus availability when new project slots open. If you want, add a note about who you're recording for and your timing.",
      nextSteps:
        "If you're trying to record soon, or you're considering a Legacy or Heirloom project, you can skip the line and email us for a human reply:",
      successNeedConfirmTitle: "One more step.",
      successNeedConfirmText:
        "Please check your email and confirm your subscription to finish joining the waitlist. We'll keep updates occasional and human.",
      successTitle: "You're on the list.",
      successText:
        "Thank you for trusting us with this. We'll send occasional updates and reach out when new availability opens. You're welcome to share this page with anyone else who should be part of the conversation.",
      successFollowup: "If you need to talk through timing, email",
      emailLabel: "Email address",
      emailPlaceholder: "you@example.com",
      noteLabel: "How you'd like to use EchoVault",
      notePlaceholder: "Optional: recording with my mom this winter, planning a legacy project...",
      button: "Join the waitlist",
      buttonSubmitting: "Joining...",
      footnote:
        "We'll only use this to email EchoVault updates and availability. No spam, no sharing your email.",
      errorFallback: "Something went wrong, please try again in a moment."
    },
    home: {
      metaTitle: "EchoVault – Digital legacy that feels human",
      metaDescription:
        "EchoVault guides gentle, AI-supported interviews, turns them into a conversational Echo, and gives your family a private digital legacy space to keep asking questions for years.",
      ogDescription:
        "A warm, human way to record stories, build a conversational Echo, and give your family a private place to keep talking to the people they love, using AI for memory preservation, not sci-fi replacement.",
      glance: {
        heading: "In one glance: what EchoVault is",
        lead:
          "One guided way to capture stories now and give your family a calm place to keep talking to them over time.",
        cards: [
          {
            title: "Gentle, guided interviews",
            text:
              "Simple, AI-supported conversations that feel like sitting down with a curious, kind interviewer, not a stiff survey or interrogation."
          },
          {
            title: "A conversational Echo",
            text:
              "We use those interviews to build a tailored Echo that reflects how they talk, explain, and remember, grounded in their own words."
          },
          {
            title: "Private family space",
            text:
              "A calm, access-controlled space where loved ones can return to ask questions, listen, and explore stories whenever they need it most."
          }
        ]
      },
      who: {
        heading: "Who EchoVault is for",
        cards: [
          {
            title: "Adult children of aging parents",
            p1:
              'For the son or daughter who keeps thinking, "We should really record Dad\'s stories" and doesn\'t want to wait until there\'s a health scare to start.',
            commonMoment:
              "when a parent's health starts to change or you're quietly coordinating more of their day-to-day life."
          },
          {
            title: "New parents and growing families",
            p1:
              "For parents who want their kids to have a way to hear their voice, values, and life lessons long after the newborn blur, the busy years, and whatever comes next.",
            commonMoment:
              'around a first birthday, a big move, or that sudden "time is moving fast" feeling when you want to capture what life is like right now.'
          },
          {
            title: "Legacy planners and storytellers",
            p1:
              "For people who are already thinking about legacy, estate planning, memoirs, family archives, and want a living, conversational complement to written documents and photos.",
            commonMoment:
              "while updating wills or trusts, organizing old photos, or planning a memorial long before you hope it's needed."
          }
        ],
        commonMomentLabel: "Common moment:"
      },
      what: {
        heading: "What EchoVault actually does for your family",
        cards: [
          {
            title: "Guided conversations, not stiff questionnaires",
            text:
              "A gentle, conversational interviewer guides your loved one through questions that spark real stories, memories, and reflections, without putting them on the spot or making them feel like they're being \"recorded\" for posterity."
          },
          {
            title: "A living Echo of how they speak",
            text:
              "We build a tailored Echo from their words and patterns of speech so future conversations feel familiar, kind, and recognizably them, not a generic chatbot with their name on it."
          },
          {
            title: "A private space for the people who need it",
            text:
              'Loved ones can return anytime to ask questions, listen, and explore stories in a calm, private space designed for late-night "I wish I could ask them" moments.'
          }
        ]
      },
      walkaway: {
        heading: "What you'll walk away with",
        lead:
          "At the end of an EchoVault project, your family has more than a one-time recording. You have a living space you can keep returning to.",
        cards: [
          {
            title: "Recorded stories and transcripts",
            text:
              "Guided audio sessions saved in a private vault, plus readable transcripts you can skim, search, and revisit without scrubbing through hours of video."
          },
          {
            title: "A conversational Echo space",
            text:
              "A tailored Echo built from those conversations, so loved ones can ask questions, hear familiar turns of phrase, and explore different parts of their story over time."
          },
          {
            title: "Simple, private family access",
            text:
              "A calm, access-controlled space you can share with the people who need it most, without handing your family's memories to a social network."
          }
        ],
        timing:
          "Most families complete their recording sessions over a few weeks. Your Echo and private space are usually ready within a short time after the last session, depending on the tier you choose."
      },
      examples: {
        heading: "A quick look (examples)",
        lead:
          "These are simple illustrations of what families receive, meant to make the output easier to picture, not to represent final UI screenshots.",
        transcriptTitle: "Transcript snippet",
        transcriptPill: "Transcript",
        transcriptMeta: "Session 1",
        transcriptLines: [
          { speaker: "Interviewer", line: "Tell me about the place you grew up." },
          {
            speaker: "Storyteller",
            line: "A little house near the river. I can still remember the sound of the screen door."
          },
          { speaker: "Interviewer", line: "What did it teach you about family?" }
        ],
        chatTitle: "Echo conversation",
        chatBubbles: [
          { who: "user", text: "What was your first job?" },
          {
            who: "echo",
            text: "I was sixteen, washing dishes after school. It wasn't glamorous, but I loved the people."
          },
          { who: "user", text: "What do you want us to remember?" },
          {
            who: "echo",
            text:
              "That you don't have to be perfect. Be kind, show up, and call your family more than you think you should."
          }
        ],
        promptsTitle: "Five sample questions",
        promptsIntro:
          "These are examples of the kinds of prompts that help people open up. You can always skip, rephrase, or pause.",
        prompts: [
          "What do you wish you could tell your younger self?",
          "What was your happiest ordinary day?",
          "Who shaped you most, and why?",
          "What do you want your family to carry forward?",
          "What are the stories we should ask you about?"
        ]
      },
      story: {
        heading: "For the moments that photos can't hold",
        lead:
          "We can't hold on to every moment. But we can hold on to the way someone laughs when they tell a favorite story, the exact phrase they use when giving advice, and the small details that make them who they are.",
        p1:
          "EchoVault is built to feel less like technology and more like a gentle promise: that the voice and wisdom of the people you love will be within reach on the days when you miss them most, and on the quiet days when you just want to hear them talk about nothing in particular.",
        p2:
          "Some families use it to sit with a grandparent before a big move, others to document their own life before a new chapter, or to give kids a way to keep learning long after the moment passes."
      },
      voices: {
        heading: "Early families, in their words",
        quotes: [
          {
            quote:
              "After my dad's surgery, I kept thinking, 'What if we lose his stories?' EchoVault gave us a way to sit down, laugh, cry a little, and know we'd still be able to hear him tell those stories years from now.",
            meta: "Mara, 38, recorded with her father"
          },
          {
            quote:
              "We didn't want something sci-fi. We wanted Mom, the way she actually talks. The Echo isn't magic, but it feels like sitting down with her on a good day.",
            meta: "Daniel, 44, Legacy Tier"
          }
        ]
      },
      whyNow: {
        heading: 'Why now, not "someday"',
        lead:
          "Most families only start recording stories after a diagnosis, a scare, or a loss. EchoVault is built for the moment before that.",
        cards: [
          {
            title: "Memories are clearest in the middle",
            text:
              'The best stories often live in the ordinary middle of life, not at the very beginning or the very end. Capturing them now means more detail, more color, more "I can hear them saying this" later.'
          },
          {
            title: "Grief is harder when there's nothing to return to",
            text:
              "When someone is gone, we replay old voicemails, search for videos, and strain to remember conversations. Having a living Echo gives your family a gentle place to go when the missing feels sharp."
          }
        ],
        cta: "Join the waitlist"
      },
      care: {
        heading: "Built with care for real families",
        cards: [
          {
            title: "Consent at every step",
            text:
              "We design the experience so your loved one always knows what's happening, what's being recorded, and what they can skip. No dark patterns, no hidden fine print."
          },
          {
            title: "AI that stays in its lane",
            text:
              "EchoVault is not about replacing people. It's about preserving their words, voice, and perspective in a way that feels respectful, grounded, and honest."
          },
          {
            title: "Private by default",
            text:
              "Your stories live in a private vault. You decide who has access, and you can pause or delete things anytime."
          }
        ]
      },
      founder: {
        heading: "Why I built EchoVault",
        lead:
          "EchoVault started with a simple, lingering question I couldn't answer: what would my kids have of me if I lost my voice, or if I were gone, besides a few photos and whatever the cloud happened to save?",
        p1:
          'I grew up on Tron, cyberpunk, and the early internet, then spent decades building the real "Grid"—networks, data centers, AI systems. When my dad died at 59, years ago now, there was no gentle, structured way to keep asking him the small, ordinary questions that only show up over time. For years, my work stayed focused on networks and infrastructure, while this question sat in the background and never quite went away.',
        p2:
          "EchoVault is my attempt to do something about that for other families: a warm, careful way to record real conversations, turn them into a conversational Echo, and give the people you love a private space to keep learning from you. Not immortality. Not sci-fi. Just more of you available, over years, when they need it.",
        cta: "Read the full origin story"
      }
    },
    tierPreview: {
      heading: "Three ways to honor a life story",
      lead:
        "Whether you're gifting a simple recording session or planning a once-in-a-generation heirloom, EchoVault has a tier that matches the depth of story you want to capture.",
      cards: [
        {
          title: "Gift – $99",
          body:
            "A gentle introduction to EchoVault with a curated set of questions, a focused interview, and a foundational Echo you can share with close family.",
          bestForLabel: "Best for:",
          bestFor: "first-time storytellers, simple gifts, or a single weekend together."
        },
        {
          title: "Legacy – $750",
          extra: {
            label: "Founder Special:",
            text: "$499 for early families while EchoVault is in small-group availability."
          },
          body:
            "A deep, multi-chapter journey through a life story with richer modeling, more sessions, and private access for the people who need to hear those stories the most.",
          bestForLabel: "Best for:",
          bestFor: "families planning a dedicated legacy project this year or coordinating across time zones."
        },
        {
          title: "Heirloom – $5000",
          body:
            "A concierge-level experience designed to sit alongside photo albums, letters, and keepsakes as part of your family's long-term archive and tradition.",
          bestForLabel: "Best for:",
          bestFor:
            "once-in-a-generation stories you want to preserve with white-glove care and share across generations."
        }
      ],
      cta: "See tiers and plan a project"
    },
    pricing: {
      metaTitle: "EchoVault Pricing – Gift, Legacy, Heirloom",
      metaDescription:
        "Choose the EchoVault tier that matches the depth of digital legacy you want to preserve, from a thoughtful gift session to a concierge-level heirloom, all built from guided AI interviews and conversational Echoes.",
      ogDescription:
        "Three EchoVault tiers for preserving stories and voices with AI-guided interviews and a private Echo space: Gift, Legacy, and Heirloom.",
      hero: {
        title: "Invest once to keep their voice close.",
        subtitle:
          "Three ways to preserve the stories, laughter, and wisdom that matter. Included access up front, with optional renewal for ongoing hosting and updates.",
        ctaTiers: "See tiers",
        ctaHowItWorks: "See How It Works"
      },
      tiersAriaLabel: "EchoVault pricing tiers",
      badgeAriaLabel: "Most popular tier",
      iconAriaSuffix: "icon",
      founderSpecialLabel: "Founder Special",
      featuresHeading: "You get:",
      heirloomCalCta: "Book an Heirloom consult with the founder",
      tiers: [
        {
          id: "gift",
          name: "Gift Tier",
          price: "$99",
          hosting: "12 months of included access, then optional renewal",
          description:
            "A thoughtful, approachable way to capture a focused snapshot of someone’s story in a single sitting.",
          emotion:
            "Perfect for first-timers or the urgent “we should record this” weekend you don’t want to miss.",
          features: [
            "25–40 guided questions in one 60–90 minute session",
            "Gentle, AI-guided interview flow tuned for first-timers",
            "Foundational Echo you can revisit for everyday questions",
            "Private hosting with a family link you control"
          ],
          highlight:
            "Ideal for birthdays, holidays, or a calm weekend session. Leave with something you can share the same day.",
          mailtoHref: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@echovault-ai.com&su=EchoVault%20Gift%20Tier",
          mailtoLabel: "Talk to us about the Gift Tier"
        },
        {
          id: "legacy",
          name: "Legacy Tier",
          price: "$499",
          originalPrice: "$750",
          hosting: "18 months of included access, then optional renewal",
          description:
            "A deep, richly detailed portrait built for families who want a fuller record of stories, values, and turning points.",
          emotion:
            "Great for siblings coordinating across time zones or anyone planning multi-part conversations without rushing.",
          features: [
            "120–200 curated questions across multiple sessions",
            "Deep interview sequence and full persona modeling",
            "Optional voice integration (coming soon)",
            "Private hosting and access for your family",
            "Family sharing with guidance on who to invite when"
          ],
          highlight:
            "Best for families planning a dedicated Legacy project or capturing a loved one’s story ahead of a big transition.",
          mailtoHref: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@echovault-ai.com&su=EchoVault%20Legacy%20Project",
          mailtoLabel: "Plan a Legacy Project",
          badge: "Most Popular"
        },
        {
          id: "heirloom",
          name: "Heirloom Tier",
          price: "$5000",
          hosting: "20-year hosting included",
          description:
            "A white-glove, multi-session experience designed to become part of your family’s lasting archive and traditions.",
          emotion:
            "For generational preservation with concierge handling, something to pass down alongside letters and keepsakes.",
          features: [
            "250–400 questions across multiple planned sessions",
            "White-glove interview planning and scheduling",
            "Concierge-level editing and polishing",
            "Hosting for the Echo built to stay with your family",
            "Archive-friendly outputs you can pass down alongside letters and photos"
          ],
          highlight:
            "For the once-in-a-generation story you want to preserve with care, ready for family archives and future celebrations.",
          mailtoHref: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@echovault-ai.com&su=EchoVault%20Heirloom%20Tier",
          mailtoLabel: "Talk to us about the Heirloom Tier"
        }
      ],
      guidance: {
        title: "Not sure where to start?",
        lead:
          "Tell us who you're recording for and when you need it. We'll match you to the right tier.",
        primaryCta: "Help Me Choose",
        secondaryCta: "Talk to Support"
      },
      trustNote:
        "Heirloom includes 20-year hosting. If EchoVault exits, vaults are held in trust and downloads remain available.",
      compare: {
        title: "Compare tiers at a glance",
        copy:
          "Three distinct paths to preserve what matters. Scan the differences and choose the level of depth, support, and hosting that fits your family.",
        columns: [
          { id: "gift", name: "Gift" },
          { id: "legacy", name: "Legacy" },
          { id: "heirloom", name: "Heirloom" }
        ],
        rows: [
          {
            label: "Best for",
            values: [
              "First-time storytellers, simple gifts",
              "Families coordinating a full legacy project",
              "Multi-generational archives and white-glove support"
            ]
          },
          {
            label: "Time commitment",
            values: [
              "1 session, ~60–90 minutes",
              "Several sessions over a few weeks",
              "Multiple sessions with planning and review"
            ]
          },
          {
            label: "Hosting",
            values: ["12 months + 3-year archive", "18 months + 10-year archive", "20 years"]
          },
          {
            label: "Support",
            values: [
              "Email guidance and templates",
              "Light concierge support for setup",
              "Dedicated concierge and planning help"
            ]
          }
        ]
      },
      paths: {
        title: "Not sure which path to choose?",
        lead:
          "A few common starting points we see from families. Pick the one that sounds closest and we'll help you tune the details.",
        startWithLabel: "Start with:",
        cards: [
          {
            title: "If you have a gathering coming up",
            body:
              "You have a birthday, holiday, or weekend together in the next 3–6 weeks and want to leave with something real you can share.",
            startWith: "Gift Tier."
          },
          {
            title: "If you're planning a deeper project",
            body:
              "You're thinking about legacy this year: multiple conversations, more than one storyteller, or a fuller record of turning points and values.",
            startWith: "Legacy Tier."
          },
          {
            title: "If you're creating a family heirloom",
            body:
              "You want a white-glove, multi-session experience that can sit alongside photo albums, letters, and keepsakes as part of a long-term archive.",
            startWith: "Heirloom Tier."
          }
        ]
      },
      faq: {
        title: "Questions about commitments and logistics",
        items: [
          {
            question: "What if we need to reschedule?",
            answer:
              "Life happens. If someone gets sick, travel shifts, or the timing feels off, we'll work with you to move sessions where we can. The goal is a calm, present conversation, not forcing it to fit a calendar box."
          },
          {
            question: "What if they're nervous about technology?",
            answer:
              "That's common. We keep the interface simple, test microphones ahead of time, and move at their pace. You can be in the room, join remotely, or let them record on their own schedule. We never pressure someone who's uncomfortable."
          },
          {
            question: "What if we change our minds?",
            answer:
              "You stay in control. If EchoVault doesn't feel right, talk to us. We can stop further sessions, and we'll explain in plain language what we can remove or delete and what's already been shared with your family."
          },
          {
            question: "Do we have to decide the tier alone?",
            answer:
              "No. Tell us who you're recording for, what the timing looks like, and how deep you want to go. We'll recommend a starting tier and adjust with you. There's no penalty for starting smaller and expanding if it makes sense."
          }
        ],
        blogLinkText: "Read the founder's story behind EchoVault's tiers"
      },
      finalCta: {
        title: "Ready to begin?",
        lead: "Plan your EchoVault project or reach out with any question. Real humans will help.",
        primaryCta: "Plan a project",
        secondaryCta: "Talk with a human"
      }
    },
    howItWorksPage: {
      metaTitle: "How EchoVault Works — Guided, careful, human",
      metaDescription:
        "See exactly how EchoVault uses gentle, AI-supported interviews to capture stories, build a respectful conversational Echo, and keep your family connected to a loved one’s wisdom.",
      ogDescription:
        "A guided, human-centered way to record stories, build a conversational Echo with AI, and talk to them anytime in a private digital legacy space.",
      hero: {
        title: "How EchoVault Works, Step by Step",
        subtitle:
          "A guided, human-centered way to preserve the stories that matter. We keep the experience calm, clear, and respectful so you focus on the person, not the technology.",
        support:
          "EchoVault stays gentle, transparent, and human at every point. No surprises, no pressure.",
        primaryCta: "Plan a project",
        secondaryCta: "See FAQs"
      },
      journey: {
        intro: "EchoVault is designed to feel gentle, simple, and guided.",
        heading: "The EchoVault journey",
        stepLabel: "Step"
      },
      steps: [
        {
          title: "Record Their Story",
          description:
            "An AI-guided interviewer gently walks your loved one through thoughtful prompts about childhood, turning points, values, and the small details that make their story theirs. You can be present, join remotely, or let them record on their own schedule.",
          note:
            "Most families start with one 60–90 minute session (Gift), and add more over a few weeks for Legacy or Heirloom projects."
        },
        {
          title: "We Build Their Echo",
          description:
            "We use those conversations to train a tailored Echo that reflects their voice, perspective, and way of explaining things. We preserve their pace, their phrases, and the stories they choose to share.",
          note:
            "We usually prepare the first version of the Echo within a short time after your recording sessions wrap, then refine it with you."
        },
        {
          title: "Talk to Them Anytime",
          description:
            "Family members can return whenever they want, asking questions, revisiting memories, or exploring new topics with the Echo in a private, secure space. It’s designed to feel calm and always-available.",
          note:
            "Families often tell us it feels grounding, like having a quiet room they can step into when they need to hear that voice again."
        }
      ],
      roles: {
        heading: "Who's involved in an EchoVault project",
        copy:
          "Most EchoVault projects involve three roles. You don't need all the details figured out before you start. We'll help you decide who sits where.",
        cards: [
          {
            label: "The storyteller",
            title: "The person whose story we're capturing",
            body:
              "The storyteller is the person speaking: your parent, partner, grandparent, or you. They set the pace, choose what to share, and can always pause or skip questions. Our job is to make it feel like a calm, respectful conversation."
          },
          {
            label: "The organizer",
            title: "The person coordinating behind the scenes",
            body:
              "The organizer is often an adult child, partner, or close friend. They help with scheduling, logistics, and deciding who to invite. We give organizers clear guidance so they don't have to figure it out alone."
          },
          {
            label: "Family listeners",
            title: "The people who return to the Echo",
            body:
              "Family listeners are the people who come back later: kids, siblings, grandkids, close friends. They're the ones asking new questions, revisiting stories on hard days, and discovering pieces of the story they hadn't heard before."
          }
        ]
      },
      cta: {
        title: "Start Your First Recording",
        text:
          "Sit down with someone you love, keep it calm and guided, and leave with something you can return to anytime.",
        primaryCta: "Plan a project",
        secondaryCta: "Talk with a human"
      },
      trust: {
        heading: "Built for trust and care",
        copy:
          "From consent to access control to deletion, you stay in control. We keep everything in a calm, access-controlled space and explain every step in plain language."
      },
      faq: {
        heading: "Questions families often ask",
        primaryCta: "Plan a project",
        secondaryCta: "Ask us anything",
        blogLinkText: "Read the founder's story of why EchoVault exists",
        items: [
          {
            question: "Is this safe?",
            answer:
              "EchoVault is being built with safety, consent, and privacy as first principles. Our goal is a private, access-controlled space with industry-standard protections as the product matures. If you have specific requirements, ask and we’ll tell you what’s available now and what’s in progress."
          },
          {
            question: "Is this weird?",
            answer:
              "It’s new, and it’s emotional, but it doesn’t have to be strange. EchoVault is about preserving real stories in their own words, not pretending someone is still here. Most families describe it as a comforting, human way to stay connected."
          },
          {
            question: "How is this different from just recording video?",
            answer:
              "Video is wonderful, but it’s fixed. An Echo lets you keep asking new questions over time and explore different parts of someone’s story, even long after the original sessions are over. Many families use both together."
          },
          {
            question: "What happens if we change our minds?",
            answer:
              "You stay in control. If you decide EchoVault isn’t right for you, talk to us. We can remove access and explain what we can delete or remove today in clear language."
          }
        ]
      },
      footer: {
        title: "Ready when you are.",
        text:
          "Preserve the stories, laughter, and wisdom you don’t want to lose, gently, respectfully, and with the people you love.",
        primaryCta: "Plan a project",
        secondaryCta: "See pricing"
      }
    },
    trustPage: {
      metaTitle: "EchoVault Trust & Safety",
      metaDescription:
        "How EchoVault approaches consent, privacy, and safety for family stories and digital legacy projects. Plain language first, with technical detail available on request.",
      ogDescription:
        "EchoVault is built to keep family stories private, consent-first, and human. Read our trust and safety approach in plain language.",
      title: "Trust & Safety",
      lead:
        "EchoVault is an early-stage project. This page explains the principles we're building around and how we think about consent, privacy, and safety for family stories. We'll keep updating it as the product matures.",
      optimize: {
        heading: "What we optimize for",
        cards: [
          {
            title: "Consent first",
            text:
              "The person being recorded should always understand what's happening, what's being captured, and what they can skip. We design the experience to avoid pressure and surprise."
          },
          {
            title: "Private by default",
            text:
              "Family stories aren't content. Our goal is a private space where access is intentionally granted, not something that leaks into feeds or search results."
          },
          {
            title: "Clarity over fine print",
            text:
              "We aim to explain what happens to recordings, transcripts, and Echo data in plain language. If you want the technical details, we'll share them directly."
          }
        ]
      },
      access: {
        heading: "Access and sharing",
        body:
          "EchoVault is designed around invited access. You decide who can listen and who can interact with the Echo. The goal is a calm, controlled space for the people who need it, not a public profile."
      },
      security: {
        heading: "Security (in progress)",
        body:
          "As the product matures, we're implementing industry-standard safeguards like encryption in transit, encryption at rest, and least-privilege access. If you have specific requirements (for example, retention windows, export formats, or where data is hosted), email us and we'll tell you what's available now and what's still in progress."
      },
      retention: {
        heading: "Retention and deletion",
        body:
          "Families should stay in control. Our intent is to provide clear options for pausing access, revoking invitations, and deleting recordings and derived data when requested. If you're evaluating EchoVault for a real project, we'll walk through what that means today."
      },
      wont: {
        heading: "What we won't do",
        cards: [
          {
            title: "No ads, no engagement tricks",
            text:
              "We're not building a social network around your family's memories. The experience should feel calm and respectful, not optimized for clicks."
          },
          {
            title: "No sci-fi framing",
            text:
              "EchoVault is about preserving stories in their own words, not pretending someone is still here. We keep boundaries explicit and avoid mystical claims."
          },
          {
            title: "No surprise use",
            text:
              "If we ever introduce new features that change what's stored or how it's used, we will explain it plainly. Families shouldn't need a lawyer to understand the basics."
          }
        ]
      },
      cta: {
        primaryCta: "Ask a trust question",
        secondaryCta: "See pricing"
      }
    },
    legalPage: {
      metaTitle: "EchoVault – Legal & Credits",
      metaDescription:
        "Plain-language legal information, privacy notes, and third-party credits for the EchoVault marketing site.",
      ogDescription:
        "Legal information, privacy notes, and third-party credits, including references to films and brands mentioned in EchoVault stories.",
      title: "Legal & Credits",
      lead:
        "This page gives a simple, human-readable overview of EchoVault's legal notes, privacy stance, and how we reference other people's work in our stories and essays.",
      terms: {
        heading: "Terms (high level)",
        body:
          "EchoVault is an early-stage project focused on helping families preserve stories and voices. The marketing site does not itself create accounts or process payments. Any future product terms of use will be written in clear language and will live alongside the application, not just here."
      },
      privacy: {
        heading: "Privacy (high level)",
        body:
          "The public site is designed to collect as little information as possible. When you contact us or join a waitlist, we use that information only to respond about EchoVault. We do not sell your contact details or use them for unrelated marketing. Any future product privacy policy will spell out, in plain language, how recordings, transcripts, and Echo data are stored and controlled."
      },
      thirdParty: {
        heading: "Third-party marks and references",
        p1:
          "Our essays and founder stories occasionally mention films, books, and other brands that influenced the thinking behind EchoVault. These references are editorial only and do not imply endorsement or affiliation.",
        p2Prefix: "In particular,",
        p2Middle: "and",
        p2Suffix:
          "are trademarks of Disney Enterprises, Inc. and are used here for reference only."
      }
    }
  },
  FR: fr,
  ES: es,
  HU: hu
};

export function getTranslations(locale) {
  const normalized = normalizeLocale(locale);
  return TRANSLATIONS[normalized] || TRANSLATIONS[DEFAULT_LOCALE];
}
