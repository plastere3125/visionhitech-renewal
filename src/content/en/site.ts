/**
 * English site copy — navigation, contact, shared UI labels.
 * Every factual value is sourced from visionhitechsecurity.com (see VISIONHITECH_CONTENT_INVENTORY.md).
 * Paths are concept-relative; components prefix them with route(concept, path).
 */
import type { CategoryId } from "@/data/products";

export interface NavLink {
  label: string;
  href: string;
  note?: string;
}
export interface NavGroup {
  id: string;
  label: string;
  href: string;
  intro: string;
  links: NavLink[];
}

export const site = {
  brand: {
    name: "VISION HITECH",
    legalName: "Visionhitech Co., Ltd.",
    established: "1997",
    tagline: "Video security, designed and manufactured in Korea since 1997.",
  },

  nav: [
    {
      id: "products",
      label: "Products",
      href: "/products/",
      intro: "IP cameras, recorders, HD analog cameras, software and installation accessories.",
      links: [
        { label: "IP Camera", href: "/products/#ip-camera" },
        { label: "NVR", href: "/products/#nvr" },
        { label: "HD Analog Camera", href: "/products/#hd-analog-camera" },
        { label: "DVR", href: "/products/#dvr" },
        { label: "Software", href: "/products/#software" },
        { label: "Accessory", href: "/products/#accessory" },
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      href: "/solutions/",
      intro: "Imaging technology and the application areas it serves.",
      links: [
        { label: "Technology", href: "/solutions/technology/" },
        { label: "AI Vision", href: "/solutions/ai-vision/" },
        { label: "Video Security", href: "/solutions/video-security/" },
        { label: "Transportation", href: "/solutions/transportation/" },
        { label: "Vision Marine", href: "/solutions/vision-marine/" },
      ],
    },
    {
      id: "support",
      label: "Support",
      href: "/support/",
      intro: "Documents, downloads, warranty and technical assistance.",
      links: [
        { label: "Technical Documents", href: "/support/#technical-documents" },
        { label: "Marketing Materials", href: "/support/#marketing-materials" },
        { label: "Download", href: "/support/#download" },
        { label: "Security Policy", href: "/support/#security-policy" },
        { label: "Certificate & Compliance", href: "/support/#certificate-compliance" },
        { label: "Warranty", href: "/support/#warranty" },
        { label: "Tech Support", href: "/support/#tech-support" },
        { label: "FAQ", href: "/support/#faq" },
      ],
    },
    {
      id: "media",
      label: "Media Center",
      href: "/media/",
      intro: "Announcements, events and channels.",
      links: [
        { label: "Notice", href: "/media/#notice" },
        { label: "Event", href: "/media/#event" },
        { label: "News Letter", href: "/media/#newsletter" },
        { label: "Youtube", href: "/media/#youtube" },
        { label: "LinkedIn", href: "/media/#linkedin" },
      ],
    },
    {
      id: "company",
      label: "Company",
      href: "/company/",
      intro: "Visionhitech Co., Ltd. — Bucheon, Korea. Established 1997.",
      links: [
        { label: "Our Mission", href: "/company/#mission" },
        { label: "History", href: "/company/#history" },
        { label: "Vision", href: "/company/#vision" },
        { label: "Organization", href: "/company/#organization" },
        { label: "Location", href: "/company/#location" },
        { label: "Contact", href: "/contact/" },
      ],
    },
  ] satisfies NavGroup[],

  categories: {
    "ip-camera": { label: "IP Camera", short: "IP", blurb: "Network cameras from 2MP to 4K UHD, plus panoramic, PTZ and covert specialty models." },
    nvr: { label: "NVR", short: "NVR", blurb: "NDAA compliant H.265 PoE network video recorders, 4 to 16 channels." },
    "hd-analog-camera": { label: "HD Analog Camera", short: "HD", blurb: "HD analog cameras including 2MP and 5MP models, bullet, dome and miniature types." },
    dvr: { label: "DVR", short: "DVR", blurb: "NDAA compliant H.265 hybrid DVRs, 4 to 16 channels, self-adaptive TVI/AHD/CVI/CVBS." },
    software: { label: "Software", short: "SW", blurb: "NVR C/S video management software for small and midsize installations." },
    accessory: { label: "Accessory", short: "ACC", blurb: "Junction boxes, wall / ceiling / pole mounts, adaptors and a PTZ controller." },
  } satisfies Record<CategoryId, { label: string; short: string; blurb: string }>,

  contact: {
    hqLabel: "Headquarters / Factory",
    address: "Vision Bldg., 31 Bucheon-ro 36beon-gil, Wonmi-gu, Bucheon-si, Gyeonggi-do, 14640 Korea",
    addressShort: "Bucheon-si, Gyeonggi-do, Korea",
    tel: "+82-32-610-7800",
    fax: "+82-32-668-3113",
    salesEmail: "sales1@visionhitech.co.kr",
    generalEmail: "vht@visionhitech.co.kr",
    sites: [
      { label: "Head Office", address: "Vision Bldg., 31 Bucheon-ro 36beon-gil, Wonmi-gu, Bucheon-si, Gyeonggi-do, 14640 Korea" },
      { label: "Second Factory", address: "40beon-gil 42, Bucheon-ro, Bucheon-si, Gyeonggi-do, 14640, Korea" },
      { label: "Third Factory", address: "83 Anaji-ro, Gyeyang-gu, Incheon, 21104 Korea" },
      { label: "Fourth Factory", address: "133beon-gil 28, Samjak-ro, Bucheon-si, Gyeonggi-do, 14452, Korea" },
    ],
  },

  ui: {
    viewProduct: "View Product",
    viewAll: "View all",
    download: "Download",
    productInquiry: "Product Inquiry",
    contactSales: "Contact Sales",
    techSupport: "Technical Support",
    requestDocument: "Request document",
    learnMore: "Learn more",
    explore: "Explore",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    languageComingSoon: "Japanese site coming soon",
    comingSoon: "Coming soon",
    placeholder: "Awaiting official content",
    placeholderShort: "To be confirmed",
    prototypeBanner: "Design prototype · Concept review",
    allProducts: "All products",
    models: "models",
    sourceLabel: "Source",
  },

  inquiry: {
    title: "Product Inquiry",
    intro: "Tell us about your project. Our sales team replies from Korea.",
    fields: {
      name: "Name",
      company: "Company",
      country: "Country",
      email: "Email",
      product: "Product",
      message: "Message",
    },
    generalOption: "General inquiry (no specific product)",
    countryPlaceholder: "Select country",
    messagePlaceholder: "Project, quantity, required documents…",
    submit: "Send Inquiry",
    required: "Required",
    prototypeTitle: "Prototype only.",
    prototypeBody: "Backend connection will be implemented during production. Your message has not been sent.",
    directContact: "For a real inquiry today, email",
  },

  footer: {
    statement: "Visionhitech Co., Ltd. designs and manufactures CCTV cameras and recorders in Korea.",
    copyright: "© Visionhitech Co., Ltd. All rights reserved.",
    prototypeNote: "Design prototype for internal and client review. Not the official VISION HITECH website.",
  },
};

export type SiteContent = typeof site;
