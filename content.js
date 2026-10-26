/*
  ─────────────────────────────────────────────────────────────
  PORTFOLIO CONTENT — the only file you need to edit.
  ─────────────────────────────────────────────────────────────

  Everything below is SAMPLE copy that shows the storytelling structure.
  Replace it with your real projects (max. 4 cases).

  IMAGES
  Drop your screens into /images/<case-slug>/ using the file names below.
  Until a file exists, a grey placeholder shows the expected path.

  `kind` sets the placeholder style and the default frame ratio:
    desktop (16:10) · mobile (16:10, phones) · wide (21:9) · tall (4:5)
    add "-dark" for a dark placeholder, e.g. "wide-dark".
  Add `ratio: "auto"` to show your real image at its natural ratio.

  BLOCKS you can put in a chapter's `blocks` array:
    { type: "image",   src, kind, caption, size: "full" | "wide" | "text" }
    { type: "pair",    items: [image, image] }
    { type: "trio",    items: [image, image, image] }
    { type: "stat",    value, label }
    { type: "quote",   text, by }
    { type: "list",    items: [{ title, text }] }
    { type: "compare", before: image, after: image, caption }
    { type: "metrics", items: [{ value, label }] }
    { type: "text",    body: ["paragraph", ...] }

  Chapters can be `dark: true` for a cinematic black scene.
  <em>…</em> in headings renders as plain Geist (no accent style).
*/

window.PORTFOLIO = {
  profile: {
    name: "Tanya Tarkan",
    role: "Product Designer",
    statement: "A product designer who <span class=\"light\">thinks in systems</span>, prototypes with AI, and tests it with users.",
    current: "Currently leading design at <a class=\"brand-link\" href=\"https://www.easyjet.com/en\" target=\"_blank\" rel=\"noopener\">easyJet</a>.",
    about: [
      "I’m a Staff Product Designer at easyJet, leading design across high-stakes customer journeys and products: managing bookings, handling disruption, rebuilding the My Account dashboard and defining the loyalty programme from the ground up. I also mentor designers and keep the quality bar high across the team.",
      "I combine behavioural science and data with a strong eye for visual craft, and co-create solutions with PMs and engineers."
    ],
    experience: [
      { company: "easyJet", role: "Staff Product Designer", years: "2020 — Now" },
      { company: "Bamboo Group", role: "Product Designer", years: "Mar 2018 — Jan 2020" },
      { company: "EPAM", role: "Experience Designer", years: "Jul 2015 — Mar 2018" },
      { company: "Terra Marketing Gr.", role: "Visual Designer", years: "Mar 2014 — Jul 2015" }
    ],
    skills: [
      "AI-assisted product design",
      "AI prototyping (Claude Code, Lovable)",
      "End-to-end product design",
      "UI & interaction design",
      "Data-informed design",
      "User research",
      "Usability testing",
      "WCAG 2.2"
    ]
  },

  cases: [
    /* ───────────────────────── CASE 01 ───────────────────────── */
    {
      slug: "basket-checkout",
      title: "Checkout in <em>under</em> a minute",
      client: "Basket",
      year: "2025",
      tags: "Mobile · E-commerce",
      summary: "Redesigned the checkout of a grocery delivery app used by 1.2M people a week — from seven screens to one that already knows what you want.",
      hook: "Every Friday at 6 pm, 40,000 carts were abandoned at the last step. This is the story of the screen that brought them back.",
      impact: "+18% checkout conversion",
      role: "Lead Product Designer — research, interaction, UI, prototyping",
      team: "1 PM · 4 engineers · 1 researcher · 14 weeks",
      challenge: "Checkout took 3m 40s on average and lost 31% of the people who reached it.",
      outcome: "+18% conversion and a 52-second median time to order.",
      cover: { src: "images/basket-checkout/cover.jpg", kind: "mobile-dark" },
      chapters: [
        {
          id: "setup",
          label: "The setup",
          heading: "A loyal audience, quietly leaving at the very last step.",
          body: [
            "Basket’s customers loved the product. They built carts every week, often the same one. But at checkout, something broke: a third of them walked away.",
            "The existing flow had grown feature by feature for four years. Seven screens, four of which asked for information we already had."
          ],
          blocks: [
            { type: "image", src: "images/basket-checkout/before.jpg", kind: "mobile", caption: "The original checkout — seven screens, with delivery, payment and substitutions split apart." }
          ]
        },
        {
          id: "conflict",
          label: "The conflict",
          heading: "The data said “price”. People said something else.",
          body: [
            "Leadership believed delivery fees were the problem, and a discount test was already planned. Before we spent the margin, I asked for two weeks to look closer."
          ],
          blocks: [
            { type: "stat", value: "31%", label: "of people who reached checkout never finished — peaking at rush hour, on mobile, with full carts." }
          ]
        },
        {
          id: "turning-point",
          label: "Turning point",
          heading: "Nobody abandons a cart. They abandon a <em>decision</em>.",
          body: [
            "Twelve interviews and a one-week diary study showed the same pattern: people weren’t put off by the price. They were exhausted by re-deciding things — the slot, the address, the substitutions — every single week."
          ],
          blocks: [
            { type: "quote", text: "I know what I want. I just don’t want to think about delivery slots again.", by: "Participant 7, weekly shopper" },
            { type: "list", items: [
              { title: "Assume, then confirm", text: "Pre-fill every choice from the last order. Make changing it one tap away." },
              { title: "One screen, no dead ends", text: "Everything needed to pay is visible at once. Nothing hides behind a “Next”." },
              { title: "The slot is the hero", text: "Time is the real decision, so it gets the most space and the clearest feedback." }
            ] }
          ]
        },
        {
          id: "craft",
          label: "The craft",
          heading: "Forty prototypes, three directions, one bet.",
          body: [
            "I explored three models — a guided wizard, an editable summary, and a ‘one-tap reorder’. Each was tested with five participants in a clickable prototype on their own phones.",
            "The editable summary won on speed and on confidence: people finished faster and felt more in control, because nothing was hidden."
          ],
          blocks: [
            { type: "pair", items: [
              { src: "images/basket-checkout/explore-1.jpg", kind: "tall", caption: "Direction A — guided wizard" },
              { src: "images/basket-checkout/explore-2.jpg", kind: "tall", caption: "Direction B — editable summary" }
            ] },
            { type: "image", src: "images/basket-checkout/flow.jpg", kind: "wide", caption: "Flow map: from 7 screens and 23 inputs to 1 screen and 3 confirmations." }
          ]
        },
        {
          id: "reveal",
          label: "The reveal",
          dark: true,
          heading: "Checkout, collapsed into one confident screen.",
          body: [
            "Your usual slot, address and payment are already in place. Substitution preferences are learned, not asked. The total updates live, so there are no surprises at the end."
          ],
          blocks: [
            { type: "image", src: "images/basket-checkout/final-hero.jpg", kind: "wide-dark", size: "full" },
            { type: "compare",
              before: { src: "images/basket-checkout/compare-before.jpg", kind: "mobile-dark" },
              after:  { src: "images/basket-checkout/compare-after.jpg",  kind: "mobile-dark" },
              caption: "Drag to compare — before and after." },
            { type: "trio", items: [
              { src: "images/basket-checkout/detail-1.jpg", kind: "tall-dark", caption: "Slot picker with live availability" },
              { src: "images/basket-checkout/detail-2.jpg", kind: "tall-dark", caption: "Smart substitutions" },
              { src: "images/basket-checkout/detail-3.jpg", kind: "tall-dark", caption: "Order confirmed" }
            ] }
          ]
        },
        {
          id: "resolution",
          label: "Resolution",
          heading: "Shipped to 100% after a two-week A/B test.",
          body: [
            "The discount test was cancelled. The new checkout outperformed it in the first week — without spending any margin."
          ],
          blocks: [
            { type: "metrics", items: [
              { value: "+18%", label: "Checkout conversion" },
              { value: "52s", label: "Median time to order, from 3m 40s" },
              { value: "−27%", label: "Support tickets about delivery" },
              { value: "4.7★", label: "App rating, from 4.2" }
            ] }
          ]
        },
        {
          id: "epilogue",
          label: "Epilogue",
          heading: "What I’d do differently.",
          body: [
            "I’d bring engineering into the diary-study readouts sooner. When they heard customers in their own words, technical trade-offs became product decisions — and the build went twice as fast."
          ]
        }
      ]
    },

    /* ───────────────────────── CASE 02 ───────────────────────── */
    {
      slug: "ledgerly-reconciliation",
      title: "Two million rows that read like <em>ten</em>",
      client: "Ledgerly",
      year: "2024",
      tags: "B2B SaaS · Data-heavy",
      summary: "Turned a spreadsheet-like reconciliation tool for finance teams into a workspace that surfaces only what needs a human.",
      hook: "Finance teams spent the last four days of every month staring at rows that were already correct.",
      impact: "−63% time to close",
      role: "Senior Product Designer — discovery, UX, UI, design QA",
      team: "1 PM · 6 engineers · 1 data scientist · 5 months",
      challenge: "Accountants reviewed every transaction manually, even though 94% matched automatically.",
      outcome: "Month-end close went from 4 days to 1.5 days for pilot customers.",
      cover: { src: "images/ledgerly-reconciliation/cover.jpg", kind: "desktop-dark" },
      chapters: [
        {
          id: "setup",
          label: "The setup",
          heading: "A powerful engine, hidden behind a wall of data.",
          body: [
            "Ledgerly’s matching engine was excellent. But the interface showed everything — matched, unmatched and uncertain — in one endless table, so no one trusted it."
          ],
          blocks: [
            { type: "image", src: "images/ledgerly-reconciliation/before.jpg", kind: "desktop", caption: "The original table: 40 columns, no hierarchy, no sense of ‘done’." }
          ]
        },
        {
          id: "conflict",
          label: "The conflict",
          heading: "Accuracy wasn’t the problem. <em>Trust</em> was.",
          body: [
            "Shadowing six accountants at month-end, I watched them re-check matches the system was 99.8% sure about — because they couldn’t see why it was sure."
          ],
          blocks: [
            { type: "stat", value: "94%", label: "of transactions were matched automatically — and still reviewed by hand." }
          ]
        },
        {
          id: "turning-point",
          label: "Turning point",
          heading: "Design for exceptions, not for rows.",
          blocks: [
            { type: "quote", text: "If it showed me why, I’d stop checking. I just need to sign my name under it.", by: "Financial controller, pilot customer" },
            { type: "list", items: [
              { title: "Show the reasoning", text: "Every match explains itself in one line." },
              { title: "Hide the done", text: "Confident matches collapse into a single, auditable total." },
              { title: "Queue the human work", text: "Exceptions become a prioritised to-do list." }
            ] }
          ]
        },
        {
          id: "craft",
          label: "The craft",
          heading: "From table to triage.",
          body: [
            "I prototyped with real anonymised data from day one — fake data hides the hard cases. Weekly sessions with pilot users shaped the density, keyboard shortcuts and the audit trail."
          ],
          blocks: [
            { type: "pair", items: [
              { src: "images/ledgerly-reconciliation/explore-1.jpg", kind: "desktop", caption: "Early triage model" },
              { src: "images/ledgerly-reconciliation/explore-2.jpg", kind: "desktop", caption: "Match explanation patterns" }
            ] }
          ]
        },
        {
          id: "reveal",
          label: "The reveal",
          dark: true,
          heading: "A workspace that tells you what’s left.",
          blocks: [
            { type: "image", src: "images/ledgerly-reconciliation/final-hero.jpg", kind: "wide-dark", size: "full" },
            { type: "image", src: "images/ledgerly-reconciliation/final-2.jpg", kind: "desktop-dark", caption: "Exception queue with inline match reasoning." }
          ]
        },
        {
          id: "resolution",
          label: "Resolution",
          heading: "Month-end, shortened by more than half.",
          blocks: [
            { type: "metrics", items: [
              { value: "−63%", label: "Time to close the month" },
              { value: "9/10", label: "Pilot customers renewed early" },
              { value: "3×", label: "More auto-matches approved in bulk" }
            ] }
          ]
        }
      ]
    },

    /* ───────────────────────── CASE 03 ───────────────────────── */
    {
      slug: "northwind-design-system",
      title: "One language for <em>nine</em> products",
      client: "Northwind",
      year: "2023",
      tags: "Design system · Platform",
      summary: "Built and rolled out a design system across nine product teams — and made adopting it the easiest option, not a mandate.",
      hook: "Nine teams. Nine button styles. One brand that customers could no longer recognise.",
      impact: "2× faster UI delivery",
      role: "Design System Lead — foundations, components, governance",
      team: "2 designers · 3 engineers · 9 product teams · 9 months",
      challenge: "Inconsistent UI across products slowed every team and confused customers moving between them.",
      outcome: "78% component coverage in 9 months; UI delivery twice as fast.",
      cover: { src: "images/northwind-design-system/cover.jpg", kind: "wide-dark" },
      chapters: [
        {
          id: "setup",
          label: "The setup",
          heading: "Growth had outpaced coherence.",
          body: [
            "After three acquisitions, Northwind had nine products and nine ways of doing everything. An audit found 41 shades of grey and 17 date pickers."
          ],
          blocks: [
            { type: "image", src: "images/northwind-design-system/audit.jpg", kind: "wide", caption: "The interface audit: every button across nine products, on one board." }
          ]
        },
        {
          id: "turning-point",
          label: "Turning point",
          heading: "A system people <em>want</em> to use.",
          body: [
            "Previous attempts failed because they were rules handed down. I treated the system as a product, with product teams as its customers."
          ],
          blocks: [
            { type: "list", items: [
              { title: "Start with pain", text: "First components were the ones teams rebuilt most." },
              { title: "Contribute, don’t request", text: "A clear path for teams to add to the system." },
              { title: "Measure adoption", text: "Coverage dashboards, shared every sprint." }
            ] }
          ]
        },
        {
          id: "reveal",
          label: "The reveal",
          dark: true,
          heading: "Foundations, components, and the docs that tie them together.",
          blocks: [
            { type: "image", src: "images/northwind-design-system/components.jpg", kind: "wide-dark", size: "full" },
            { type: "pair", items: [
              { src: "images/northwind-design-system/tokens.jpg", kind: "desktop-dark", caption: "Token architecture" },
              { src: "images/northwind-design-system/docs.jpg", kind: "desktop-dark", caption: "Documentation site" }
            ] }
          ]
        },
        {
          id: "resolution",
          label: "Resolution",
          heading: "Adoption by choice.",
          blocks: [
            { type: "metrics", items: [
              { value: "78%", label: "Component coverage in 9 months" },
              { value: "2×", label: "Faster UI delivery" },
              { value: "−60%", label: "Design QA issues" }
            ] }
          ]
        }
      ]
    },

    /* ───────────────────────── CASE 04 ───────────────────────── */
    {
      slug: "cove-onboarding",
      title: "Onboarding people who’d rather <em>not</em> be here",
      client: "Cove Health",
      year: "2022",
      tags: "Healthcare · Mobile & web",
      summary: "Redesigned onboarding for a mental-health service so that anxious first-time patients actually reach their first session.",
      hook: "The hardest part of getting help is asking for it. Our onboarding made it harder.",
      impact: "54% → 81% completion",
      role: "Product Designer — research, content design, UI",
      team: "1 PM · 3 engineers · 1 clinical advisor · 4 months",
      challenge: "Almost half of new patients dropped off before booking their first session.",
      outcome: "Onboarding completion rose from 54% to 81%.",
      cover: { src: "images/cove-onboarding/cover.jpg", kind: "mobile" },
      chapters: [
        {
          id: "setup",
          label: "The setup",
          heading: "A 34-question form between people and help.",
          body: [
            "Clinical intake needed a lot of information. The form asked for all of it up front, in clinical language, before showing a single therapist."
          ],
          blocks: [
            { type: "image", src: "images/cove-onboarding/before.jpg", kind: "mobile", caption: "The original intake: long, clinical and one-size-fits-all." }
          ]
        },
        {
          id: "turning-point",
          label: "Turning point",
          heading: "Earn the right to ask.",
          body: [
            "Together with our clinical advisor, we reordered the journey: show who could help first, then ask only what’s needed to match — the rest can wait until after booking."
          ],
          blocks: [
            { type: "quote", text: "I wanted to see a face before I told anyone how I was feeling.", by: "Research participant" }
          ]
        },
        {
          id: "reveal",
          label: "The reveal",
          dark: true,
          heading: "Gentle, short, and human.",
          blocks: [
            { type: "trio", items: [
              { src: "images/cove-onboarding/final-1.jpg", kind: "tall-dark", caption: "Meet therapists first" },
              { src: "images/cove-onboarding/final-2.jpg", kind: "tall-dark", caption: "Six questions, plain language" },
              { src: "images/cove-onboarding/final-3.jpg", kind: "tall-dark", caption: "Booked — what happens next" }
            ] }
          ]
        },
        {
          id: "resolution",
          label: "Resolution",
          heading: "More people reached their first session.",
          blocks: [
            { type: "metrics", items: [
              { value: "81%", label: "Onboarding completion, from 54%" },
              { value: "6", label: "Questions before booking, from 34" },
              { value: "+22%", label: "First sessions attended" }
            ] }
          ]
        }
      ]
    }
  ]
};
