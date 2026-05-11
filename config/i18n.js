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
  fr: {
    label: "FR",
    hrefLang: "fr",
    pathPrefix: "/fr"
  },
  es: {
    label: "ES",
    hrefLang: "es",
    pathPrefix: "/es"
  },
  hu: {
    label: "HU",
    hrefLang: "hu",
    pathPrefix: "/hu"
  }
};

export const SUPPORTED_LOCALES = Object.keys(LOCALE_CONFIG);
export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
);

export function normalizeLocale(locale) {
  if (!locale) return DEFAULT_LOCALE;
  if (LOCALE_CONFIG[locale]) return locale;

  const lower = String(locale).toLowerCase();
  if (LOCALE_CONFIG[lower]) return lower;

  const upper = String(locale).toUpperCase();
  if (LOCALE_CONFIG[upper]) return upper;

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
  if (normalized && normalized !== DEFAULT_LOCALE) {
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
        storage: "Archive Plans",
        photoCare: "Photo Care",
        howItWorks: "How It Works",
        blog: "Blog"
      },
      actions: {
        talkHuman: "Talk with us",
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
        "EchoVault helps families record meaningful life stories, turn them into a private conversational archive, and return to them later through guided questions, transcripts, and an Echo built from their own words.",
      primaryCta: "Join the waitlist",
      secondaryCta: "Talk with us",
      meta:
        'Built for adult children, parents, and families who keep saying, "We should record this someday," and want a clear way to actually do it.',
      offerLabel: "Every EchoVault project includes:",
      offerItems: [
        {
          title: "Guided interview sessions",
          text: "Structured conversations that make it easier to capture real stories without turning it into a formal production."
        },
        {
          title: "A private conversational Echo",
          text:
            "A text-based Echo grounded in their recorded stories, transcripts, phrases, and way of explaining things. Original audio stays available separately."
        },
        {
          title: "Private family access",
          text: "A private family space where invited loved ones can return, listen, read, and ask questions."
        }
      ],
      visualCaption: "“Tell me about the moment you realized this really mattered to you.”"
    },
    trustBlock: {
      title: "How we handle your stories",
      intro:
        "EchoVault is for families, not ad targeting or engagement games. We treat every recording as part of a private family archive, not as content to be repurposed.",
      plainTitle: "In plain language",
      plainBody:
        "Your recordings are meant for you and the people you invite. We do not sell family story data, use it for ads, or put it in public demos without explicit permission. If you want to stop, we will explain what can be deleted, what can be exported, and what has already been shared with your family.",
      specsTitle: "If you speak more in specs",
      specsBody:
        "We use encrypted transport, private account access, least-privilege operational access, and export/deletion workflows for family materials. Raw recordings and transcripts are not used to train public AI models. Human review is limited to setup, support, restoration, and quality work tied to your project.",
      note:
        "If you have stricter requirements, such as retention windows, export formats, or access limits, ask before you start. We'd rather be precise than vague.",
      linkText: "Read our Trust & Safety overview."
    },
    waitlist: {
      heading: "Join the waitlist",
      lead:
        "EchoVault is in early availability with a small group of families. Join the waitlist and we'll send occasional updates, plus availability when new project slots open. If you want, add a note about who you're recording for and your timing.",
      nextSteps:
        "If you're trying to record soon, or you're considering a Legacy or Heirloom project, you can email us directly for a personal reply:",
      successNeedConfirmTitle: "One more step.",
      successNeedConfirmText:
        "Please check your email and confirm your subscription to finish joining the waitlist. We'll keep updates occasional and thoughtful.",
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
      metaTitle: "EchoVault – Record life stories and keep them close",
      metaDescription:
        "EchoVault helps families record life stories through guided interviews, create a private conversational Echo, and preserve transcripts, original recordings, and wisdom in one family archive.",
      ogDescription:
        "A clear, human way to record stories, preserve transcripts and original recordings, and give your family a private place to return to the people they love.",
      glance: {
        heading: "What EchoVault is",
        lead:
          "A guided way to record someone's life stories now and give your family a private place to return to them over time.",
        cards: [
          {
            title: "Gentle, guided interviews",
            text:
              "Simple guided conversations that help someone share real stories without feeling interviewed for a documentary."
          },
          {
            title: "A conversational Echo",
            text:
              "We use those interviews to build an Echo that reflects how they talk, explain, and remember, grounded in their own words."
          },
          {
            title: "Private family space",
            text:
              "An access-controlled space where loved ones can return to ask questions, listen, and revisit stories when they want to feel close again."
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
              "We guide your loved one through prompts that bring out real stories, values, and memories without putting them on the spot."
          },
          {
            title: "An Echo shaped by how they actually speak",
            text:
              "We build a tailored text Echo from their recorded stories, language, and perspective so future questions stay grounded in what they actually shared."
          },
          {
            title: "A private space for the people who need it",
            text:
              "Loved ones can come back anytime to ask questions, listen, and explore stories in a private family space you control."
          }
        ]
      },
      walkaway: {
        heading: "What you'll walk away with",
        lead:
          "At the end of an EchoVault project, your family has more than a one-time recording. You have a lasting archive you can come back to.",
        cards: [
          {
            title: "Recorded stories and transcripts",
            text:
              "Guided sessions saved in a private vault, plus readable transcripts you can skim, search, and revisit without scrubbing through hours of audio or video."
          },
          {
            title: "A conversational Echo space",
            text:
              "A tailored Echo built from those conversations, so loved ones can ask questions and explore different parts of their story over time."
          },
          {
            title: "Simple, private family access",
            text:
              "A private, access-controlled space you can share with the people who matter, without handing your family's memories to a social network."
          }
        ],
        timing:
          "Most families complete their recording sessions over a few weeks. Your Echo, transcripts, and family space are usually ready shortly after the last session, depending on the tier you choose."
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
        heading: "For the parts of a person photos can't keep",
        lead:
          "Photos matter. So do letters and videos. But many families miss the smaller things: how someone tells a story, explains a lesson, or answers a question in their own way.",
        p1:
          "EchoVault gives families a practical way to preserve those parts before they are lost. You record real conversations, organize them in one place, and keep a way to return to them later.",
        p2:
          "Some families use it before a diagnosis or big move. Others use it to document their own life before a new chapter, or to give kids a way to keep hearing stories and values for years."
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
          "Most families start too late: after a diagnosis, a scare, or a loss. EchoVault is built for the moment before that.",
        cards: [
          {
            title: "Memories are clearest in the middle",
            text:
              "The best stories often live in everyday memory, not just milestone events. Capturing them now means more detail, more voice, and more of what makes them themselves."
          },
          {
            title: "Grief is harder when there's nothing to return to",
            text:
              "When someone is gone, families search old voicemails, videos, and scraps of conversation. Having something real to return to makes those hard moments less empty."
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
              "EchoVault is not about replacing people. It's about preserving their words, original recordings, and perspective in a way that feels respectful, grounded, and honest."
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
          "EchoVault started with a question I couldn't shake: what would my kids really have of me if I lost my voice, or if I were gone, beyond a few photos and whatever happened to survive in the cloud?",
        p1:
          'I grew up on Tron, cyberpunk, and the early internet, then spent decades building the real "Grid"—networks, data centers, AI systems. When my dad died at 59, years ago now, there was no gentle, structured way to keep asking him the small, ordinary questions that only show up over time. For years, my work stayed focused on networks and infrastructure, while this question sat in the background and never quite went away.',
        p2:
          "EchoVault is my attempt to solve that for other families: a careful way to record real conversations, turn them into a useful conversational archive, and give the people you love a private space to keep learning from you. Not immortality. Not sci-fi. Just something real they can come back to.",
        cta: "Read the full origin story"
      }
    },
    tierPreview: {
      heading: "Three ways to preserve a life story",
      lead:
        "Whether you want a simple recording session or a deeper multi-session archive, EchoVault has a tier that matches the depth of story you want to capture.",
      cards: [
        {
          title: "Gift – $99",
          body:
            "A clear, approachable starting point with a focused interview, a curated question set, original recordings, transcripts, and a foundational Echo for close family.",
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
            "A deeper, multi-session project with richer story capture, stronger modeling, and private access for the people who will return to it most.",
          bestForLabel: "Best for:",
          bestFor: "families planning a dedicated legacy project this year or coordinating across time zones."
        },
        {
          title: "Heirloom – $5000",
          body:
            "A concierge-level experience designed to become part of your family's long-term archive alongside letters, albums, and keepsakes.",
          bestForLabel: "Best for:",
          bestFor:
            "once-in-a-generation stories you want to preserve with white-glove care and share across generations."
        }
      ],
      cta: "See pricing and tiers"
    },
    pricing: {
      metaTitle: "EchoVault Pricing – Gift, Legacy, Heirloom",
      metaDescription:
        "Choose the EchoVault tier that fits the depth of story you want to preserve, from a focused gift session to a concierge-level family archive.",
      ogDescription:
        "Three EchoVault tiers for recording stories, preserving transcripts and original recordings, and creating a private family archive: Gift, Legacy, and Heirloom.",
      hero: {
        title: "Choose the level of story you want to preserve.",
        subtitle:
          "From a single guided session to a multi-part family archive, each tier includes structured recording, a private Echo space, and hosting up front.",
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
            "A focused, approachable way to capture a meaningful snapshot of someone's story in a single sitting.",
          emotion:
            'Best for first-timers or the "we should record this while we can" weekend you do not want to miss.',
          features: [
            "25–40 guided questions in one 60–90 minute session",
            "Gentle, AI-guided interview flow tuned for first-timers",
            "Foundational text Echo you can revisit for everyday questions",
            "Original recording and transcript access",
            "Private hosting with a family link you control"
          ],
          highlight:
            "Ideal for birthdays, holidays, or a calm weekend session when you want to leave with something real you can share quickly.",
          mailSubject: "EchoVault Gift Tier",
          mailtoLabel: "Talk to us about the Gift Tier"
        },
        {
          id: "legacy",
          name: "Legacy Tier",
          price: "$499",
          originalPrice: "$750",
          hosting: "18 months of included access, then optional renewal",
          description:
            "A deeper project for families who want a fuller record of stories, values, and turning points.",
          emotion:
            "Great for siblings coordinating across time zones or anyone planning multi-part conversations without rushing the process.",
          features: [
            "120–200 curated questions across multiple sessions",
            "Deep interview sequence and fuller text Echo modeling",
            "Original audio and transcript archive",
            "Optional synthetic voice integration only with explicit consent when available",
            "Private hosting and access for your family",
            "Family sharing with guidance on who to invite when"
          ],
          highlight:
            "Best for families planning a dedicated legacy project or recording a loved one's story ahead of a big transition.",
          mailSubject: "EchoVault Legacy Project",
          mailtoLabel: "Plan a Legacy Project",
          badge: "Most Popular"
        },
        {
          id: "heirloom",
          name: "Heirloom Tier",
          price: "$5000",
          hosting: "20-year hosting included",
          description:
            "A white-glove, multi-session experience designed to become part of your family's long-term archive.",
          emotion:
            "For generational preservation with concierge handling and long-term stewardship.",
          features: [
            "250–400 questions across multiple planned sessions",
            "White-glove interview planning and scheduling",
            "Concierge-level editing and polishing",
            "Hosting for the Echo, recordings, transcripts, and archive outputs",
            "Archive-friendly outputs you can pass down alongside letters and photos"
          ],
          highlight:
            "For the once-in-a-generation story you want preserved with extra care, structure, and long-term access.",
          mailSubject: "EchoVault Heirloom Tier",
          mailtoLabel: "Talk to us about the Heirloom Tier"
        }
      ],
      guidance: {
        title: "Not sure where to start?",
        lead:
          "Tell us who you're recording for, your timing, and how deep you want to go. We'll help you choose the right tier.",
        primaryCta: "Get help choosing",
        secondaryCta: "Talk with us"
      },
      trustNote:
        "Heirloom includes 20-year hosting. If EchoVault ever exits, families retain access to their materials and downloads remain available.",
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
            values: ["12 months included access", "18 months included access", "20 years included"]
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
        lead: "Plan your EchoVault project or reach out with any question. A real person will help.",
        primaryCta: "Plan a project",
        secondaryCta: "Talk with us"
      }
    },
    howItWorksPage: {
      metaTitle: "How EchoVault Works – Record, build, return",
      metaDescription:
        "See how EchoVault helps families record stories, build a private conversational Echo from transcripts and recordings, and return to those stories through guided prompts and family access.",
      ogDescription:
        "A clear, human-centered process for recording stories, building a private Echo, and giving families something real to return to.",
      hero: {
        title: "How EchoVault Works, Step by Step",
        subtitle:
          "EchoVault turns live conversations into a private family archive. We keep the process calm, clear, and structured so you can focus on the person, not the technology.",
        support:
          "Three basic steps: record the story, build the Echo, and give your family a safe place to return to it.",
        primaryCta: "Plan a project",
        secondaryCta: "See FAQs"
      },
      journey: {
        intro: "The process is simple on purpose.",
        heading: "From conversation to family archive",
        stepLabel: "Step"
      },
      steps: [
        {
          title: "Record Their Story",
          description:
            "We guide your loved one through thoughtful prompts about childhood, turning points, values, and the details that make their story theirs. You can be present, join remotely, or let them record on their own schedule.",
          note:
            "Most families start with one 60 to 90 minute session and add more over a few weeks for deeper projects."
        },
        {
          title: "We Build Their Echo",
          description:
            "We use those conversations to build a text Echo that reflects their perspective, phrasing, and way of explaining things. The result is grounded in their own words, not a generic template.",
          note:
            "We usually prepare the first version shortly after the sessions wrap, then refine it with you as needed."
        },
        {
          title: "Come Back Anytime",
          description:
            "Family members can return whenever they want, asking questions, revisiting memories, or exploring new topics in a private family space.",
          note:
            "Families often describe it as a grounded way to revisit stories when they want to feel close again."
        }
      ],
      roles: {
        heading: "Who's involved in a project",
        copy:
          "Most projects involve three roles. You do not need every detail figured out before you start. We'll help you decide who fits where.",
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
        secondaryCta: "Talk with us"
      },
      trust: {
        heading: "Built with trust built in",
        copy:
          "From consent to access control to deletion, you stay in control. We explain the boundaries in plain language and keep family access intentional."
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
              "EchoVault is built around consent, privacy, and clear access. We do not sell family story data, use it for ads, or train public AI models on raw recordings or transcripts. If you have specific requirements, ask before starting and we'll walk through access, export, and deletion details."
          },
          {
            question: "Is this weird?",
            answer:
              "It’s new, and it’s emotional, but it doesn’t have to be strange. EchoVault is about preserving real stories in their own words, not pretending someone is still here. Most families describe it as a comforting, human way to stay connected."
          },
          {
            question: "How is this different from just recording video?",
            answer:
              "Video is valuable, but it is fixed. An Echo lets you keep asking new questions over time and explore different parts of someone's story long after the original sessions are over. Many families use both together."
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
          "Record the stories, original audio, and perspective you do not want to lose, with a process that stays clear and respectful.",
        primaryCta: "Plan a project",
        secondaryCta: "See pricing"
      }
    },
    trustPage: {
      metaTitle: "EchoVault Trust & Safety",
      metaDescription:
        "How EchoVault approaches consent, privacy, access, and data handling for family story projects. Plain language first, with technical detail available on request.",
      ogDescription:
        "How EchoVault handles consent, privacy, access, and family story data in plain language.",
      title: "Trust & Safety",
      lead:
        "EchoVault is built around a simple standard: family stories should be handled with consent, clear access, and no surprises. This page states the boundaries we use for recordings, transcripts, Echo data, family access, and support work.",
      optimize: {
        heading: "What we optimize for",
        cards: [
          {
            title: "Consent first",
            text:
              "The person being recorded should always understand what is happening, what is being captured, and what they can skip. We design the experience to avoid pressure and surprise."
          },
          {
            title: "Private by default",
            text:
              "Family stories are not content. Our goal is a private space where access is intentionally granted, not something that leaks into feeds, search results, or public demos."
          },
          {
            title: "Clarity over fine print",
            text:
              "We explain what happens to recordings, transcripts, and Echo data in plain language before a project starts. If a feature is not live yet, we say so."
          }
        ]
      },
      access: {
        heading: "Access and sharing",
        body:
          "EchoVault is designed around invited access. You decide who can listen, who can read transcripts, and who can interact with the Echo. The goal is a controlled family space, not a public profile. We can also help remove invitations or pause access if family circumstances change."
      },
      security: {
        heading: "Security and infrastructure",
        body:
          "We use encrypted transport, private account access, least-privilege operational access, and export/deletion workflows for family materials. Raw recordings and transcripts are not used to train public AI models. Human review is limited to setup, support, restoration, and quality work connected to your project."
      },
      retention: {
        heading: "Retention and deletion",
        body:
          "Families should stay in control. You can ask us to pause access, revoke invitations, export materials, or delete recordings and derived Echo data. Before a paid project starts, we will confirm what is included, what can be exported, and what deletion means for materials already shared with invited family members."
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
            title: "No misleading framing",
            text:
              "EchoVault is about preserving stories in their own words, not pretending someone is still here. We keep boundaries explicit and avoid mystical or misleading claims."
          },
          {
            title: "No surprise use",
            text:
              "If we introduce new features that change what is stored or how it is used, we will explain it plainly and ask for consent where it changes the project. Families should not need a lawyer to understand the basics."
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
  fr,
  es,
  hu
};

export function getTranslations(locale) {
  const normalized = normalizeLocale(locale);
  return TRANSLATIONS[normalized] || TRANSLATIONS[DEFAULT_LOCALE];
}
