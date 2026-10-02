/* ==========================================================================
   Annerie's Driving School — SITE CONTENT
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to change text, prices, phone
   numbers, testimonials, FAQs, opening hours and statistics.
   All details below are placeholders. Replace them with the real ones.
   ========================================================================== */

window.SITE = {

  /* ---------- Brand ---------- */
  brand: {
    name: "Annerie's Driving School",
    short: "Annerie's",
    blurb: "Patient, professional driving lessons across Gauteng. Learner's licence to driver's licence, at your pace.",
    legal: "Registered driving school. Instructors accredited by the Department of Transport."
  },

  /* ---------- Contact ---------- */
  contact: {
    phoneDisplay: "082 555 0147",
    phoneTel: "+27825550147",
    whatsapp: "27825550147",            // international format, no + or spaces
    email: "hello@anneriesdriving.co.za",
    address: {
      street: "14 Jacaranda Avenue",
      suburb: "Bedfordview",
      city: "Ekurhuleni",
      province: "Gauteng",
      postcode: "2007"
    },
    mapQuery: "Bedfordview, Gauteng, South Africa"   // used for the embedded map
  },

  /* Opening hours. days: 0 = Sunday ... 6 = Saturday. Times are South African time. */
  hours: [
    { label: "Monday to Friday", days: [1, 2, 3, 4, 5], open: "07:00", close: "18:00" },
    { label: "Saturday",         days: [6],               open: "08:00", close: "14:00" },
    { label: "Sunday",           days: [0],               closed: true }
  ],

  /* Contact form. Leave empty to send enquiries to WhatsApp instead.
     To receive them by email, create a free form at https://formspree.io
     and paste the endpoint here, e.g. "https://formspree.io/f/abcdwxyz" */
  formEndpoint: "",
  whatsappGreeting: "Hi Annerie's, I'd like to book a driving lesson.",

  /* ---------- Navigation ---------- */
  nav: [
    { id: "home",     label: "Welcome",         href: "index.html" },
    { id: "pricing",  label: "Pricing",         href: "pricing.html" },
    { id: "stories",  label: "Success Stories", href: "success-stories.html" },
    { id: "contact",  label: "Contact",         href: "contact.html" }
  ],
  navCta: { label: "Book a lesson", href: "contact.html" },

  /* ---------- Home page ---------- */
  home: {
    heroLines: ["Pass first time.", "Drive for life."],
    heroLead: "Friendly, dual-control lessons across Johannesburg, Ekurhuleni and Pretoria. We take you from learner's licence to driver's licence at a pace that suits you.",
    ctaPrimary:   { label: "Book a lesson",    href: "contact.html" },
    ctaSecondary: { label: "See our prices",   href: "pricing.html" },
    proof: "Rated 4.9 out of 5 by learners",
    servicesTitle: "Lessons for every kind of learner",
    servicesLead: "Pick the lesson that fits where you are now. You can change as you improve.",
    stepsTitle: "Your road to a licence",
    stepsLead: "Four steps, and we are with you for each one.",
    quotesTitle: "What our learners say",
    areasTitle: "Where we pick you up",
    areasLead: "Free pick-up and drop-off within these areas. Further out? Ask us.",
    faqTitle: "Questions we hear a lot",
    ctaBand: {
      title: "Your licence is closer than you think.",
      text: "Tell us where you are in the process and we will suggest the right first lesson.",
      button: { label: "Book your first lesson", href: "contact.html" }
    }
  },

  about: {
    title: "Meet Annerie",
    paragraphs: [
      "Annerie Botha has taught Gauteng drivers since 2011. She started the school after seeing too many learners rushed through lessons, then failed on tests they were ready for.",
      "Today she leads a team of four instructors who all teach the same way: calm, clear and never in a hurry."
    ],
    points: [
      "Registered instructors, accredited by the Department of Transport",
      "Dual-control cars with dash cameras",
      "Lessons in English and Afrikaans",
      "Female or male instructor, your choice"
    ]
  },

  /* ---------- Services (home page list) ---------- */
  services: [
    { code: "Theory",      name: "Learner's licence prep",       text: "Rules of the road, road signs and vehicle controls, taught in small groups before your K53 learner's test.", price: "R450 per session",  href: "contact.html" },
    { code: "Code 8 manual", name: "Beginner lessons",           text: "Start from the clutch. We begin on quiet roads and move to busier routes as you improve.",                       price: "R380 per hour",     href: "contact.html" },
    { code: "Code 8 auto", name: "Automatic lessons",            text: "Learn in a modern automatic with dual controls and build confidence faster.",                                    price: "R420 per hour",     href: "contact.html" },
    { code: "Gentle pace", name: "Nervous driver programme",     text: "Longer, calmer sessions on quiet routes with an instructor who never rushes you.",                              price: "R400 per hour",     href: "contact.html" },
    { code: "Experienced", name: "Refresher and highway driving", text: "Back after a break, or new to Gauteng's highways? Practise the N1, N3 and R21 with support.",                   price: "R400 per hour",     href: "contact.html" },
    { code: "Test day",    name: "Test-day package",             text: "A warm-up lesson, our car for your test and a mock K53 test the week before.",                                  price: "R1 150",            href: "contact.html" }
  ],

  steps: [
    { title: "Book your first lesson",     text: "Call, WhatsApp or fill in the form. We match you with an instructor and a pick-up spot." },
    { title: "Get your learner's licence", text: "We prepare you for the K53 learner's test and help you book it." },
    { title: "Learn on real roads",        text: "One-hour lessons that build from empty streets to traffic, hills and highways." },
    { title: "Pass your driving test",     text: "A mock K53 test first, then test day in our car with your instructor beside you." }
  ],

  areas: [
    "Bedfordview", "Edenvale", "Germiston", "Boksburg", "Benoni", "Kempton Park",
    "Alberton", "Sandton", "Rosebank", "Johannesburg South", "Midrand", "Centurion"
  ],

  /* ---------- Testimonials. tag is used by the filter on the Success Stories page ---------- */
  testimonials: [
    { name: "Naledi Mokoena",    place: "Germiston",    tag: "Manual",            stars: 5, text: "I failed my test twice with another school. Annerie spent two whole lessons on parallel parking and I passed first time. She never raised her voice once." },
    { name: "Pieter van Wyk",    place: "Edenvale",     tag: "Refresher",         stars: 5, text: "I had not driven in nine years after moving back from overseas. Two refresher lessons later I was on the N3 without sweaty palms." },
    { name: "Priya Naidoo",      place: "Boksburg",     tag: "Nervous drivers",   stars: 5, text: "I cried in my first lesson. By the fifth I was driving to the shops on my own. The pace was exactly right." },
    { name: "Sipho Dlamini",     place: "Kempton Park", tag: "Manual",            stars: 5, text: "I booked the Full Licence package. The mock test was harder than the real one, which is exactly why I passed." },
    { name: "Marelize Joubert",  place: "Bedfordview",  tag: "Learner's licence", stars: 5, text: "I passed my learner's on the first attempt. The practice questions matched the real test closely." },
    { name: "Kagiso Tshabalala", place: "Alberton",     tag: "Automatic",         stars: 5, text: "The dual controls made me brave enough to try roundabouts and busy intersections. My instructor explained everything before we got there." },
    { name: "Fatima Patel",      place: "Sandton",      tag: "Nervous drivers",   stars: 5, text: "I was scared of highways for years. Two lessons on the N1 and I now drive to work on it every day." },
    { name: "Johan Pretorius",   place: "Benoni",       tag: "Learner's licence", stars: 5, text: "I sent my daughter here for her learner's and lessons. She came back a more careful driver than I am." }
  ],

  /* ---------- FAQs. cat: "general" shows on Home, "pricing" shows on Pricing ---------- */
  faqs: [
    { cat: "general", q: "How many lessons will I need?", a: "Most beginners need 15 to 25 one-hour lessons. If you have driven before, 5 to 10 is common. After your first lesson we give you an honest estimate." },
    { cat: "general", q: "Do you collect me from home or work?", a: "Yes. Pick-up and drop-off is free within our service areas. We can also meet you at school, campus or the nearest testing centre." },
    { cat: "general", q: "Can I learn in my own car?", a: "You can for refresher lessons. For beginners we use our dual-control cars so your instructor can step in safely." },
    { cat: "general", q: "What do I bring to my first lesson?", a: "Your learner's licence (or ID if you are still preparing for it) and comfortable closed shoes. We provide everything else." },
    { cat: "general", q: "What if I need to reschedule?", a: "Just give us 24 hours' notice by phone or WhatsApp and there is no charge. Later than that, we charge half the lesson fee." },
    { cat: "general", q: "Do you teach people who are nervous?", a: "Yes, and we are good at it. Our nervous driver programme uses quiet routes, longer sessions and no pressure to move on before you are ready." },
    { cat: "pricing", q: "Are official test fees included?", a: "No. Learner's and driver's licence fees are paid to the Driving Licence Testing Centre. We help you book, but the official fee is separate." },
    { cat: "pricing", q: "Do I pay for packages upfront?", a: "You pay for the package before your first lesson. If you stop early, we refund unused lessons less the discount you received." },
    { cat: "pricing", q: "Do lesson packages expire?", a: "Packages are valid for 12 months from your first lesson." },
    { cat: "pricing", q: "Can I split the payment?", a: "Yes. For the 10 and 20 lesson packages you can pay in two instalments. Ask us when you book." }
  ],

  /* ---------- Pricing page ---------- */
  pricing: {
    title: "Prices you can plan around",
    lead: "Pay per lesson, or save with a package. No hidden fees, and every price is in rand including VAT.",
    rates: [
      { name: "Manual lesson",               detail: "60 minutes in a dual-control car",         price: 380, calc: "manual" },
      { name: "Automatic lesson",            detail: "60 minutes in a dual-control automatic",   price: 420, calc: "automatic" },
      { name: "Nervous driver lesson",       detail: "75 minutes on quiet routes, no rush",      price: 400 },
      { name: "Refresher or highway lesson", detail: "60 minutes, including N1, N3 and R21",     price: 400 },
      { name: "Learner's licence prep",      detail: "3-hour session, up to 4 learners",         price: 450 }
    ],
    /* Bulk discount applied by the calculator */
    discounts: [ { min: 10, pct: 5 }, { min: 20, pct: 10 }, { min: 30, pct: 15 } ],

    features: [
      "Learner's licence prep session",
      "Free pick-up and drop-off",
      "Mock K53 test",
      "Our car for your test day",
      "Written progress report"
    ],
    packages: [
      { name: "Starter",      lessons: 5,  price: 1800, note: "Good for refreshers and nervous first steps",  values: [false, true,  false, false, false] },
      { name: "Road Ready",   lessons: 10, price: 3500, note: "For learners who have already driven a little", values: [true,  true,  true,  false, false], badge: "Most popular" },
      { name: "Full Licence", lessons: 20, price: 6600, note: "From first lesson to test day",                 values: [true,  true,  true,  true,  true]  }
    ],
    extras: [
      { name: "Test-day package",                  detail: "Warm-up lesson plus our car for your test", price: "R1 150" },
      { name: "Single mock K53 test",              detail: "Full test route with written feedback",      price: "R300" },
      { name: "Learner's test booking help",       detail: "We book it with you and check your paperwork", price: "R250" },
      { name: "Pick-up outside our service areas", detail: "Per trip",                                    price: "R60" }
    ],
    payments: ["EFT", "Card at the lesson", "SnapScan", "Cash"],
    notes: [
      "Official learner's and driver's licence fees are paid to the testing centre and are not included.",
      "Lessons can be rescheduled free of charge with 24 hours' notice."
    ]
  },

  /* ---------- Success Stories page ---------- */
  stories: {
    title: "Learners we have put on the road",
    since: "Since 2011",
    total: 2847,
    stats: [
      { value: 2847, label: "learners licensed" },
      { value: 92,   label: "first-time pass rate", suffix: "%" },
      { value: 13,   label: "years teaching" },
      { value: 4.9,  label: "average rating out of 5", decimals: 1 }
    ],
    byYear: [
      { year: 2019, students: 214, pass: 86 },
      { year: 2020, students: 98,  pass: 84 },
      { year: 2021, students: 187, pass: 87 },
      { year: 2022, students: 276, pass: 89 },
      { year: 2023, students: 318, pass: 90 },
      { year: 2024, students: 341, pass: 91 },
      { year: 2025, students: 362, pass: 92 },
      { year: 2026, students: 290, pass: 93, note: "so far" }
    ],
    recent: [
      { name: "Thabo M.",    place: "Germiston",    when: "This week" },
      { name: "Lerato K.",   place: "Edenvale",     when: "This week" },
      { name: "Anika S.",    place: "Bedfordview",  when: "Last week" },
      { name: "Mohammed R.", place: "Benoni",       when: "Last week" },
      { name: "Zanele N.",   place: "Alberton",     when: "Last week" },
      { name: "Dewald V.",   place: "Boksburg",     when: "2 weeks ago" },
      { name: "Ayanda P.",   place: "Kempton Park", when: "2 weeks ago" },
      { name: "Chantal B.",  place: "Sandton",      when: "2 weeks ago" }
    ]
  },

  /* ---------- Contact page ---------- */
  contactPage: {
    title: "Let's get you driving",
    lead: "Send us a message and we will call you back within one working day. Prefer to talk now? Call or WhatsApp."
  }
};
