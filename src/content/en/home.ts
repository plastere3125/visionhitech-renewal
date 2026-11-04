/**
 * Homepage copy for both concepts. Layout lives in src/concepts/*; only words live here.
 * Headlines are positioning statements; every factual line is traceable to the inventory.
 */
export const homeA = {
  meta: {
    title: "VISION HITECH — Video Security Cameras & Recorders, Made in Korea",
    description:
      "IP cameras, NVRs, HD analog cameras, hybrid DVRs and VMS designed and manufactured in Korea by Visionhitech Co., Ltd. since 1997.",
  },
  hero: {
    eyebrow: "VISION HITECH · Video Security",
    title: ["Video security hardware,", "engineered in Korea."],
    body: "IP cameras, NVRs and VMS — designed and manufactured by VISION HITECH since 1997.",
    primary: "Explore Products",
    secondary: "Product Inquiry",
    tabsLabel: "Featured hardware",
  },
  heroProducts: [
    { slug: "vnn64lu4ar", label: "4K Bullet", callouts: ["3840 × 2160 UHD 4K", "2.7–13.5mm motorized, 5× zoom", "IP67 · IK10", "50M Smart IR"] },
    { slug: "vnv15lu4ar", label: "4K Dome", callouts: ["3840 × 2160 UHD 4K", "Perfect Anti-IR Reflection", "Ultra STARLUX", "Advanced ROI"] },
    { slug: "vnp36d5var", label: "36× PTZ", callouts: ["6–216mm optical ×36 AF zoom", "IR distance up to 300M", "1/2″ SONY STARVIS CMOS", "IP66"] },
    { slug: "vr16s", label: "16CH NVR", callouts: ["Realtime 16CH H.265", "480fps@4K2K recording", "4K/30 HDMI output", "NDAA Compliant"] },
  ],
  intro: {
    label: "Product line",
    title: "Cameras, recorders and software.",
    lead: "Seven product families from one Korean manufacturer.",
    link: "All products",
  },
  bento: {
    label: "Products & Solutions",
    title: "From lens to recorder.",
    cards: {
      ipCamera: { title: "IP Camera", body: "2MP to 4K UHD. Bullet, dome, PTZ, panoramic.", cta: "Browse IP cameras" },
      aiVision: { title: "AI Vision", body: "In-house video analysis R&D since 2018.", cta: "AI Vision" },
      nvr: { title: "NVR", body: "4–16CH H.265 PoE.", cta: "View NVR" },
      technology: { title: "Ultra STARLUX", body: "Full colour at 0.1 lux.", cta: "Technology" },
      transportation: { title: "Transportation", body: "Airports, roads and vehicles.", cta: "Transportation" },
      videoSecurity: { title: "Video Security", body: "Capture, record, manage.", cta: "Video Security" },
      marine: { title: "Vision Marine", body: "Imaging for vessels.", cta: "Vision Marine" },
    },
  },
  featured: {
    label: "Featured products",
    title: "Featured hardware.",
    more: "More products",
    all: "All products",
  },
  technology: {
    label: "Imaging technology",
    title: "See the difference.",
    body: "VISION HITECH test footage. Drag to compare.",
    tabs: ["wdr", "ultra-starlux", "advanced-roi", "smart-ir"],
    more: "All technologies",
  },
  solutions: {
    label: "Solutions",
    title: "Where VISION HITECH cameras work.",
  },
  why: {
    label: "Why VISION HITECH",
    title: "Built, tested and supported by the manufacturer.",
    statement:
      "VISION HITECH designs and manufactures IP cameras, HD analog cameras, NVRs and hybrid DVRs in Korea — with its own low-light, image-tuning and autofocus technologies.",
    pillars: [
      { title: "Designed and made in Korea", body: "Korean-origin design and manufacture. NDAA compliant models." },
      { title: "In-house R&D since 2003", body: "Own technology for low light, video tuning and AF zoom." },
      { title: "Tested for harsh conditions", body: "IP69K water intrusion, IP68 immersion and transport vibration testing." },
      { title: "Manufacturer warranty & RMA", body: "Published warranty policy with DOA and RMA process." },
    ],
  },
  media: { label: "Media Center", title: "News", all: "Media Center" },
  support: {
    label: "Support",
    title: "Everything after the purchase order.",
    cards: [
      { title: "Technical Documents", body: "Datasheets, manuals, drawings, firmware.", href: "/support/#technical-documents" },
      { title: "Download", body: "Utilities, VMS, compliance files.", href: "/support/#download" },
      { title: "Warranty & RMA", body: "27 / 15 / 9-month policy, DOA and RMA.", href: "/support/#warranty" },
      { title: "Certificate & Compliance", body: "CE, FCC, E-Mark, IP rating, NDAA.", href: "/support/#certificate-compliance" },
    ],
  },
  cta: {
    title: "Talk to the VISION HITECH sales team.",
    body: "Project quotes, documents and samples — directly from the manufacturer in Korea.",
    primary: "Product Inquiry",
    secondary: "Contact",
  },

  /**
   * Revision 03 — client feedback (Webpage_Layout_대강.xlsx, 2026-11-03).
   * Titles marked CLIENT are copied verbatim from the client file. Descriptions are condensed from
   * verified VISION HITECH statements (solutions.ts / technology.ts / site.ts / company.ts).
   */
  r3: {
    hero: {
      srTitle: "VISION HITECH — video surveillance solutions, designed and manufactured in Korea",
      label: "Solution",
      ctas: { explore: "Explore Products", inquiry: "Inquiry", download: "Download" },
      pause: "Pause slideshow",
      play: "Play slideshow",
      tabsLabel: "Solutions",
      slides: [
        {
          // CLIENT ①
          title: "End-to-end Video Surveillance Solution",
          short: "End-to-end",
          body: "Cameras, recorders and video management software from one Korean manufacturer.",
          href: "/solutions/video-security/",
          bg: "env-logistics-dusk",
          visual: "chain",
        },
        {
          // CLIENT ②
          title: "Ultra Low Light 24/7 Color Solution",
          short: "Ultra Low Light",
          body: "Ultra STARLUX — full colour in as low as 0.1 lux darkness.",
          href: "/solutions/technology/",
          bg: "env-crossroads",
          visual: "lux",
        },
        {
          // CLIENT ③
          title: "Zoom Modules",
          short: "Zoom Modules",
          body: "6–216mm optical 36× AF zoom, F1.5, with a 1/2″ SONY STARVIS CMOS.",
          href: "/products/#zoom-module",
          bg: "env-marine-day",
          visual: "zoom",
        },
        {
          // CLIENT ④ — identical to ① in the client file. NEEDS CLIENT CONFIRMATION (CLIENT_FEEDBACK_REVISION.md).
          title: "End-to-end Video Surveillance Solution",
          short: "End-to-end",
          body: "Capture, record and manage — IP and HD analog cameras, NVRs, hybrid DVRs and VMS.",
          href: "/solutions/video-security/",
          bg: "env-city-night",
          visual: "vms",
        },
      ],
    },
    solution: {
      label: "Solution",
      title: "Solution",
      cards: [
        { title: "End-to-end Video Surveillance Solution", body: "Cameras, recorders and video management software from one manufacturer.", href: "/solutions/video-security/" },
        { title: "Ultra Low Light 24/7 Color Solution", body: "Full colour in as low as 0.1 lux darkness with Ultra STARLUX.", href: "/solutions/technology/" },
        { title: "Zoom Modules", body: "6–216mm optical 36× AF zoom with a 1/2″ SONY STARVIS CMOS.", href: "/products/#zoom-module" },
        // CLIENT title. Body limited to verified facts — no AI features are claimed.
        { title: "Edge AI Video Solution", body: "In-house video analysis since 2018, with deep learning-based AI cameras in development.", href: "/solutions/ai-vision/" },
      ],
      compareLabels: ["Normal · 0.1 lux", "Ultra STARLUX · 0.1 lux"],
    },
    why: {
      label: "Why Visionhitech",
      title: "Why Visionhitech Co., Ltd.",
      // CLIENT-PROVIDED titles (see FACT_CHECK.md §Revision 03).
      items: [
        { title: "Korea's Best R&D Power", href: "/company/#history" },
        { title: "Korea's Largest OEM/ODM Manufacturer", href: "/company/#location" },
        { title: "Severe Quality Control", href: "/company/#quality" },
        { title: "Stable & Long-Term Business", href: "/company/#history" },
      ],
      caption: "Head office & factory — Bucheon, Korea",
    },
    network: {
      label: "Products",
      title: "Network Products",
      cards: [
        { title: "IP Camera", body: "Network cameras from 2MP to 4K UHD — bullet, dome, PTZ and panoramic.", href: "/products/#ip-camera", cat: "ip-camera" },
        { title: "NVR", body: "NDAA compliant H.265 PoE recorders, 4 to 16 channels.", href: "/products/#nvr", cat: "nvr" },
        { title: "Software", body: "NVR C/S video management software for small and midsize sites.", href: "/products/#software", cat: "software" },
        { title: "Zoom Module", body: "6–216mm optical 36× AF zoom, F1.5, 2MP 1/2″ SONY STARVIS CMOS.", href: "/products/#zoom-module", cat: "zoom-module" },
        { title: "Accessory", body: "Junction boxes, mounts and adaptors.", href: "/products/#accessory", cat: "accessory" },
      ],
    },
    analog: {
      label: "Products",
      title: "HD Analog Products",
      cards: [
        { title: "AHD/ TVI Cameras", body: "2MP and 5MP HD analog bullet, dome and miniature cameras.", href: "/products/#hd-analog-camera", cat: "hd-analog-camera" },
        { title: "DVR", body: "NDAA compliant H.265 hybrid DVRs, self-adaptive TVI/AHD/CVI/CVBS.", href: "/products/#dvr", cat: "dvr" },
        { title: "Software", body: "Video management software and setup utilities.", href: "/products/#software", cat: "software" },
        { title: "Accessory", body: "Wall, ceiling and pole mounts and a PTZ controller.", href: "/products/#accessory", cat: "accessory" },
      ],
    },
    special: {
      label: "Products",
      title: "Special Camera",
      cards: [
        {
          title: "Transportation Camera",
          body: "E-Mark approved vehicle models and long-range cameras for roads and airports.",
          href: "/solutions/transportation/",
          bg: "env-train",
          product: "vci70131",
          productNote: "VCI70131 · E-Mark approved",
          alt: "Passenger train interior",
          credit: "Photo: Trougnouf, CC BY 4.0",
        },
        {
          title: "Marine Camera",
          body: "Engine-room camera since 2018, products tested for water, immersion and vibration.",
          href: "/solutions/vision-marine/",
          bg: "env-engine-room",
          product: "vnv23194ar",
          productNote: "VNV23194AR · related model",
          alt: "Ship engine room",
          credit: "Photo: LEE 003, CC BY 4.0",
        },
      ],
    },
    application: {
      label: "Application",
      title: "Application",
      // CLIENT placeholders — real names NEEDS CLIENT CONFIRMATION. Do not invent names.
      items: ["A", "B", "C", "D", "E"].map((t) => ({ title: t, href: "/solutions/" })),
      credit: "Photo: Martin Damboldt, CC0",
    },
    support: {
      label: "Support",
      title: "Support",
    },
    news: {
      label: "Media Center",
      title: "What's new?",
      credit: "Photo: Andreas Levers, CC BY 2.0 (monochrome)",
    },
    footer: {
      inquiryTitle: "Product Inquiry",
      inquiryBody: "Project quotes, documents and samples — directly from the manufacturer in Korea.",
      inquiry: "Product Inquiry",
      contact: "Contact",
      follow: "Follow",
    },
  },
};

export const homeB = {
  meta: {
    title: "VISION HITECH — Intelligent Vision System",
    description:
      "From capture to response: VISION HITECH cameras, recorders and VMS form one video system, designed and manufactured in Korea since 1997.",
  },
  hero: {
    eyebrow: "Intelligent Vision System",
    title: ["Intelligent vision,", "from camera to security."],
    body: "One video chain by VISION HITECH — capture, data, analysis, response.",
    primary: "Explore the system",
    secondary: "Product Inquiry",
    feedLabel: "CAM 01 · 4K DEMO",
    frameLabel: "ROI",
  },
  chain: {
    label: "Camera → Vision → Intelligence",
    title: "Four stages. One manufacturer.",
    steps: [
      {
        id: "capture",
        code: "01",
        name: "Capture",
        title: "Light becomes usable video.",
        points: ["Ultra STARLUX — full colour at 0.1 lux", "Real WDR 120dB", "Motorized AF zoom up to 36× (PTZ)", "4K UHD 3840 × 2160"],
        product: "vnv15lu4ar",
      },
      {
        id: "data",
        code: "02",
        name: "Video Data",
        title: "Only the bits that matter.",
        points: ["Smart H.265 / H.264", "Ultra-Smart Rate Control", "Advanced ROI — 10Mbps → 1Mbps demo", "Triple-streaming at real-time 30 fps"],
        product: "vnn64lu4ar",
      },
      {
        id: "analysis",
        code: "03",
        name: "Analysis",
        title: "Recording and analysis.",
        points: ["480fps@4K2K recording (VR16S)", "Motion detection on IP cameras", "Intelligent object based motion detection (PTZ)", "In-house server-based video analysis (2018)"],
        product: "vr16s",
      },
      {
        id: "response",
        code: "04",
        name: "Security Response",
        title: "Operators see it, anywhere.",
        points: ["NVR C/S VMS — up to 128 cameras per Client Live", "Alarm Manager · E-map · Watchdog", "Dynamic event push to iOS and Android", "Self-diagnostic health checking"],
        product: "nvr-cs-vms",
      },
    ],
  },
  bento: {
    label: "Technology",
    title: "The technology inside the camera.",
  },
  ecosystem: {
    label: "Product ecosystem",
    title: "Every part of the chain.",
    body: "Select a node to see how VISION HITECH products connect.",
  },
  ai: {
    label: "AI Vision",
    title: "Video analysis, built in-house.",
    body: "From its 2018 server-based video analysis solution to deep learning-based AI camera development.",
    slotsTitle: "AI Vision",
    slots: ["Analytics functions", "Edge / server architecture", "Supported models", "Deployment references"],
    imageCaption: "VISION HITECH 4K demonstration image.",
  },
  applications: { label: "Applications", title: "Video security in the field." },
  mobility: { label: "Transportation / Vision Marine", title: "On the road. At sea." },
  featured: { label: "Featured products", title: "Model index", all: "All products" },
  support: { label: "Support / Download", title: "Documentation and service." },
  media: { label: "Media", title: "Updates" },
  contact: {
    label: "Contact / Product inquiry",
    title: "Specify a system with our engineers.",
    body: "Tell us about your site and the models you need.",
  },
};
