/**
 * Solutions — structured with the EdgeDX-style depth template:
 * context → verified evidence → system flow → related VISION HITECH products → open content slots.
 *
 * NOTE (internal): VISION HITECH's current site has no dedicated pages for AI Vision, Transportation
 * or Vision Marine. Every `evidence` item below quotes or condenses an existing official statement
 * (source given). Everything else is an explicit `pending` slot kept in data for production planning — not rendered on client-facing pages.
 */
export interface Evidence {
  text: string;
  source: string;
}

export interface Solution {
  slug: "technology" | "ai-vision" | "video-security" | "transportation" | "vision-marine";
  name: string;
  index: string;
  status: "verified" | "partial" | "pending";
  headline: string;
  summary: string;
  context: string;
  evidence: Evidence[];
  flow: { step: string; detail: string }[];
  techIds: string[];
  productSlugs: string[];
  pending: string[];
  image: { src: string; alt: string; credit?: string };
}

const H = "https://visionhitechsecurity.com/about-visionhitech/ (History)";

export const solutions: Solution[] = [
  {
    slug: "technology",
    name: "Technology",
    index: "01",
    status: "verified",
    headline: "Imaging technology built in-house.",
    summary: "Low-light imaging, video tuning, smart streaming and ruggedized hardware developed by VISION HITECH's own R&D.",
    context:
      "VISION HITECH established its technology R&D Center in 2003. Its imaging technologies are applied across IP cameras, HD analog cameras and recorders.",
    evidence: [
      { text: "Established “Visionhitech technology R&D Center” (Feb 2003).", source: H },
      { text: "Patented “Smart Focus” tech (Jun 2011). Secured its own technology for AF zoom module (May 2019).", source: H },
      { text: "Developed Ultra Low-light Cameras, 2MP IP & HD (Mar 2019).", source: H },
      { text: "Ultra STARLUX: full colour in as low as 0.1 lux darkness.", source: "https://visionhitechsecurity.com/news/vision-technology/low-light-technologies/" },
    ],
    flow: [
      { step: "Sensor & optics", detail: "STARVIS sensors, large-aperture and motorized AF lenses" },
      { step: "Video tuning", detail: "Ultra STARLUX, Color-Night, Real WDR, True D/N" },
      { step: "Streaming", detail: "Smart H.265, Ultra-Smart Rate Control, Advanced ROI" },
      { step: "Hardware", detail: "Heat dissipation, anti-condensation, anti-IR reflection" },
    ],
    techIds: ["ultra-starlux", "color-night", "wdr", "advanced-roi", "usrc", "heat"],
    productSlugs: ["vnn64lu4ar", "vnv15lu4ar", "vnn32f7vyr", "vnv201tfar"],
    pending: ["Technology roadmap after 2020", "Current sensor / SoC platform statement"],
    image: { src: "/images/site/lux-ustarlux-10.webp", alt: "Ultra STARLUX demonstration image at 1.0 lux" },
  },
  {
    slug: "ai-vision",
    name: "AI Vision",
    index: "02",
    status: "pending",
    headline: "Video analysis — from R&D to product.",
    summary:
      "VISION HITECH developed its own server-based video analysis solution in 2018 and is developing deep learning-based AI camera series.",
    context:
      "AI Vision builds on VISION HITECH's video analysis R&D, 4K imaging and smart streaming — from the camera to the operator.",
    evidence: [
      { text: "Developed its own Server-based Video Analysis solution (Dec 2018).", source: H },
      {
        text: "“…continuing to make aggressive and seamless efforts to develop 4K UHD and deep learning-based AI camera series.”",
        source: "https://visionhitechsecurity.com/about-visionhitech/ceos-message/",
      },
      { text: "Intelligent Object based Motion Detection — listed on the VNP36D5VAR 36× IP PTZ camera.", source: "https://visionhitechsecurity.com/product/vnp36d5var/" },
      { text: "Motion Detection — listed on VISION HITECH IP camera models.", source: "Product pages" },
    ],
    flow: [
      { step: "Capture", detail: "VISION HITECH IP camera" },
      { step: "Stream", detail: "Smart H.265 / Advanced ROI" },
      { step: "Analyze", detail: "Server-based video analysis (in-house, 2018)" },
      { step: "Respond", detail: "Alarm Manager (NVR C/S) · event push (NVR)" },
    ],
    techIds: ["advanced-roi", "triple-streaming"],
    productSlugs: ["vnp36d5var", "vnn64lu4ar", "nvr-cs-vms"],
    pending: [
      "Supported analytics functions",
      "Edge vs. server processing architecture",
      "Supported camera models",
      "Performance / accuracy data (only if officially published)",
      "Deployment references",
    ],
    image: { src: "/images/site/uhd-street.webp", alt: "VISION HITECH 4K demonstration image of a city street" },
  },
  {
    slug: "video-security",
    name: "Video Security",
    index: "03",
    status: "verified",
    headline: "End-to-end video surveillance.",
    summary: "Cameras, recorders and video management software from one Korean manufacturer.",
    context:
      "Capture with IP and HD analog cameras, record with NVRs and hybrid DVRs, manage with NVR C/S — plus the accessories to install them.",
    evidence: [
      { text: "Scope of business: manufacture & supply of CCTV cameras and Recorders, System Integration (SI).", source: "https://visionhitechsecurity.com/about-visionhitech/" },
      { text: "Public local government supply agreements for 2MP IP cameras and HD CCTV (2014).", source: H },
      { text: "Long-range 10× bullet applicable to hotel, shopping center, parking lot, highway intersection, crossroad, city surveillance and airport.", source: "https://visionhitechsecurity.com/news/vision-technology/smart-hardware-technologies/" },
      { text: "Corridor View for lengthy hallways — school hallway, passenger boat, hotel.", source: "https://visionhitechsecurity.com/news/vision-technology/smart-video-tuning-technologies/" },
    ],
    flow: [
      { step: "Capture", detail: "IP · HD analog · PTZ · panoramic" },
      { step: "Record", detail: "NVR up to 16CH · hybrid DVR" },
      { step: "Manage", detail: "NVR C/S VMS · e-map · alarm manager" },
      { step: "Access", detail: "Web, PC and mobile viewers" },
    ],
    techIds: ["wdr", "smart-ir", "usrc", "true-dn"],
    productSlugs: ["vnn64c57ar", "vnv23lu4ar", "vr16s", "nvr-cs-vms"],
    pending: ["Industry-specific reference projects", "System design guide"],
    image: { src: "/images/site/wdr-on.webp", alt: "VISION HITECH WDR demonstration image of travellers in a bright terminal" },
  },
  {
    slug: "transportation",
    name: "Transportation",
    index: "04",
    status: "partial",
    headline: "Airports, roads and vehicles.",
    summary: "Long-range cameras for roads and intersections, airport supply history and E-Mark vehicle approvals.",
    context:
      "VISION HITECH cameras and recorders are applied in transport environments — airport terminals, roads and intersections, and vehicles with E-Mark approved models.",
    evidence: [
      { text: "Started supplying cameras & solution to Incheon International Airport (Sep 2018).", source: H },
      { text: "Vehicle Approval Authority (E-MARK) documents for VDA50SMTi and VCI70131.", source: "https://visionhitechsecurity.com/download/" },
      { text: "VNN63C57AR / VNN64C57AR: “It can zoom in a license plate number or human face at 50M away day and night.”", source: "https://visionhitechsecurity.com/product/vnn64c57ar/" },
      { text: "10× zoom bullet use cases include highway intersection, crossroad and airport.", source: "https://visionhitechsecurity.com/news/vision-technology/smart-hardware-technologies/" },
    ],
    flow: [
      { step: "Roadside / terminal", detail: "Long-range motorized zoom IP cameras" },
      { step: "On-vehicle", detail: "E-Mark approved models (VDA50SMTi, VCI70131)" },
      { step: "Record", detail: "NVR / hybrid DVR" },
      { step: "Operate", detail: "Central monitoring via VMS" },
    ],
    techIds: ["wdr", "smart-ir", "af-zoom"],
    productSlugs: ["vnn64c57ar", "vci70131", "vnp36d5var", "vr16s"],
    pending: [
      "Transportation product line and certifications (rail / bus / vehicle)",
      "Airport project details and approval for publication",
      "Traffic / LPR functions (not claimed until confirmed)",
    ],
    image: { src: "/images/env/env-crossroads.webp", alt: "Night-time long exposure of a road interchange", credit: "Adam Meek, CC BY 2.0" },
  },
  {
    slug: "vision-marine",
    name: "Vision Marine",
    index: "05",
    status: "partial",
    headline: "Cameras for vessels and harsh environments.",
    summary: "An engine-room camera launched in 2018, and products tested against water intrusion, immersion and transport vibration.",
    context:
      "Imaging for vessels and harsh environments: VISION HITECH developed an engine-room camera and tests its products against water intrusion, immersion and vibration.",
    evidence: [
      { text: "Launched an engine room camera (Apr 2018).", source: H },
      { text: "IP69K water intrusion test: 80℃ water sprayed at 80–100 BAR. IP68 immersion test.", source: "https://visionhitechsecurity.com/quality-management/" },
      { text: "Transportation vibration test against ship, plane and truck environments.", source: "https://visionhitechsecurity.com/quality-management/" },
      { text: "Anti-condensation sensor & heater on applicable IP cameras.", source: "Product pages" },
    ],
    flow: [
      { step: "Engine room / deck", detail: "Engine-room camera (2018)" },
      { step: "Protection", detail: "Water intrusion, immersion, vibration tested" },
      { step: "Record", detail: "On-board NVR / DVR" },
      { step: "Monitor", detail: "Bridge / control room viewing" },
    ],
    techIds: ["heat", "anti-ir-reflection", "true-dn"],
    productSlugs: ["vnv23194ar", "vnn64lu4ar", "vd16t"],
    pending: [
      "Vision Marine product line",
      "Marine class approvals (none claimed)",
      "Engine room camera specification",
      "Vessel references",
    ],
    image: { src: "/images/env/env-marine-night.webp", alt: "Container vessel at a port at night", credit: "Martin Damboldt, CC0" },
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
