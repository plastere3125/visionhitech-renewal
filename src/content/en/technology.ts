/**
 * VISION HITECH imaging technologies.
 * Text condensed from https://visionhitechsecurity.com/news/vision-technology/* — no new claims added.
 * `compare` pairs use VISION HITECH's own demonstration images, with the captions used on the current site.
 */
export interface TechCompare {
  before: { src: string; label: string };
  after: { src: string; label: string };
}

export interface Technology {
  id: string;
  name: string;
  group: "Low light" | "Streaming" | "Image tuning" | "Hardware" | "Compliance";
  line: string;
  body: string;
  compare?: TechCompare;
  image?: string;
  source: string;
}

const SRC = "https://visionhitechsecurity.com/news/vision-technology/";

export const technologies: Technology[] = [
  {
    id: "ultra-starlux",
    name: "Ultra STARLUX",
    group: "Low light",
    line: "Full colour down to 0.1 lux. True Day/Night B/W with IR below that.",
    body: "An ultra-sensitive STARVIS sensor, a high-end ISP and VISION HITECH's own video tuning. At below 0.1 lux the camera turns to True DN mode and displays a B/W image with IR illumination on automatic.",
    compare: {
      before: { src: "/images/site/lux-normal-01.webp", label: "Normal cam at 0.1 lux" },
      after: { src: "/images/site/lux-ustarlux-01.webp", label: "U-Starlux cam at 0.1 lux" },
    },
    source: `${SRC}low-light-technologies/`,
  },
  {
    id: "color-night",
    name: "Color-Night",
    group: "Low light",
    line: "See through near-zero darkness in full colour without IR.",
    body: "A large F-stop lens, a highly sensitive sensor and a high-end ISP, completed by VISION HITECH's video tuning. It avoids IR over-exposure, IR glare and IR reflection.",
    compare: {
      before: { src: "/images/site/colornight-ir.webp", label: "IR image in normal Day&Night" },
      after: { src: "/images/site/colornight-on.webp", label: "Color-Night technology" },
    },
    source: `${SRC}color-night-technology/`,
  },
  {
    id: "wdr",
    name: "Real WDR (120dB)",
    group: "Image tuning",
    line: "Bright and dark areas of one scene, both captured accurately.",
    body: "Long exposure for bright areas and short exposure for dark areas are combined, so details inside high-contrast scenes stay readable.",
    compare: {
      before: { src: "/images/site/wdr-normal.webp", label: "Normal image" },
      after: { src: "/images/site/wdr-on.webp", label: "WDR image (120dB)" },
    },
    source: `${SRC}smart-video-tuning-technologies/`,
  },
  {
    id: "advanced-roi",
    name: "Advanced ROI",
    group: "Streaming",
    line: "Highest quality where it matters. The background stays alive.",
    body: "The region of interest is processed at the highest bit rate while the rest of the scene is compressed more, reducing file size for transmission and storage.",
    compare: {
      before: { src: "/images/site/roi-normal.webp", label: "Normal Image (10Mbps)" },
      after: { src: "/images/site/roi-advanced.webp", label: "Advanced ROI (1Mbps)" },
    },
    source: `${SRC}smart-video-streaming-technologies/`,
  },
  {
    id: "smart-ir",
    name: "Smart IR",
    group: "Low light",
    line: "IR adjusted to object distance — faces are not washed out.",
    body: "Smart IR automatically controls the amount of IR illumination according to the distance of the object, producing recognizable images at night.",
    compare: {
      before: { src: "/images/site/smartir-normal.webp", label: "Normal IR Camera" },
      after: { src: "/images/site/smartir-on.webp", label: "Smart-IR camera" },
    },
    source: `${SRC}low-light-technologies/`,
  },
  {
    id: "usrc",
    name: "Ultra-Smart Rate Control",
    group: "Streaming",
    line: "Smart bit-rate control for full-HD streaming at lower bandwidth.",
    body: "USRC adjusts the bit rate within a scene, keeping usable high-quality video while reducing bandwidth and storage cost.",
    source: `${SRC}smart-video-streaming-technologies/`,
  },
  {
    id: "triple-streaming",
    name: "Triple-streaming",
    group: "Streaming",
    line: "All codecs at real-time 30 fps.",
    body: "Real-time processing for all three streams gives integrators flexibility for live view, recording and mobile streaming.",
    image: "/images/site/triple-stream.webp",
    source: `${SRC}smart-video-streaming-technologies/`,
  },
  {
    id: "true-dn",
    name: "True Day & Night",
    group: "Image tuning",
    line: "Mechanical ICR filter with focus-shift compensation.",
    body: "The IR-cut filter blocks IR light by day for true colour and is removed at night so the camera receives IR light, with focus maintained 24/7.",
    compare: {
      before: { src: "/images/site/truedn-day.webp", label: "True color at day" },
      after: { src: "/images/site/truedn-night.webp", label: "True BW at night" },
    },
    source: `${SRC}smart-video-tuning-technologies/`,
  },
  {
    id: "heat",
    name: "Enhanced Heat Dissipation",
    group: "Hardware",
    line: "Internal heat from sensor and ISP released outward.",
    body: "A precise heat-dissipation mechanism reduces failure rate and performance degradation over time.",
    image: "/images/site/heat-dissipation.webp",
    source: `${SRC}smart-hardware-technologies/`,
  },
  {
    id: "af-zoom",
    name: "Quick & Precise Auto-focus & Zoom",
    group: "Hardware",
    line: "VISION HITECH's own autofocus zoom algorithm on motorized lenses.",
    body: "The camera finds and sets the exact focal point almost immediately, so zoomed-in megapixel images stay sharp.",
    image: "/images/site/zoom-10x.webp",
    source: `${SRC}smart-hardware-technologies/`,
  },
  {
    id: "sd-slot",
    name: "Waterproof SD-Card Slot",
    group: "Hardware",
    line: "Replace the SD card without compromising waterproofing.",
    body: "Listed as a patented feature on applicable VISION HITECH IP cameras.",
    image: "/images/site/sd-slot.webp",
    source: `${SRC}smart-hardware-technologies/`,
  },
  {
    id: "network-indicator",
    name: "Smart Network Indication",
    group: "Hardware",
    line: "Power and network status of each camera, diagnosed from a distance.",
    body: "Status indication helps installers verify power and connection on site.",
    image: "/images/site/network-indicator.webp",
    source: `${SRC}smart-hardware-technologies/`,
  },
  {
    id: "anti-ir-reflection",
    name: "Anti-IR Reflection",
    group: "Hardware",
    line: "No more IR glare from scratches, dust and raindrops.",
    body: "Solves IR reflection problems caused by window contamination, heavy rain and work-site dust on dome cameras.",
    source: `${SRC}smart-hardware-technologies/`,
  },
  {
    id: "ndaa",
    name: "NDAA Compliant",
    group: "Compliance",
    line: "Korean-origin design and manufacture.",
    body: "The design and manufacture of the product are of Korean origin and fully comply with the NDAA protocol.",
    image: "/images/site/ndaa.webp",
    source: `${SRC}ndaa/`,
  },
];

export function tech(id: string): Technology {
  const t = technologies.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown technology ${id}`);
  return t;
}
