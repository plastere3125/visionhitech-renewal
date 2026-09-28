/**
 * Support content — from /download/, /download/warranty/, /download/technical-guide/, /news/brochures/.
 */
export const support = {
  intro: "Product documentation, downloads, compliance files, warranty and RMA — in one place.",

  sections: [
    {
      id: "technical-documents",
      title: "Technical Documents",
      body: "Datasheet, manual, drawing and firmware are listed for each product. Files are provided on request.",
      status: "partial" as const,
      items: ["Datasheet", "Manual", "Drawing", "F/W", "Product Image"],
    },
    {
      id: "marketing-materials",
      title: "Marketing Materials",
      body: "Product guides and brochures.",
      status: "verified" as const,
      items: ["VISIONHITECH PRODUCT GUIDE 2021", "VISIONHITECH PRODUCT GUIDE 2019"],
    },
    {
      id: "download",
      title: "Download",
      body: "Software, utilities and compliance files by product category.",
      status: "verified" as const,
      items: ["IP Camera (2MP / 4MP / 6MP / 4K / Specialty)", "HD Analog", "NVR", "DVR", "VMS", "Accessories", "General — IPScan Utility 1.1.5.1"],
    },
    {
      id: "security-policy",
      title: "Security Policy",
      body: "Product security policy and vulnerability reporting process.",
      status: "pending" as const,
      items: [],
    },
    {
      id: "certificate-compliance",
      title: "Certificate & Compliance",
      body: "Approval documents listed in the download center.",
      status: "verified" as const,
      items: [
        "EC Declaration of Conformity — Bullet Camera (CE)",
        "EMC Test Report — VNN10 / VNN62 / VNV13 / VNV80 (FCC)",
        "Supplier's Declaration of Conformity — VNV80 (FCC)",
        "Vehicle Approval Authority — VDA50SMTi, VCI70131 (E-MARK)",
        "Environmental Test Report — VNPXX (IP rating)",
        "NDAA — Korean-origin design and manufacture",
      ],
    },
    {
      id: "tech-support",
      title: "Tech Support",
      body: "Technical support process, response channels and service hours.",
      status: "pending" as const,
      items: [],
    },
    {
      id: "faq",
      title: "FAQ",
      body: "Frequently asked questions for installers and integrators.",
      status: "pending" as const,
      items: [],
    },
  ],

  warranty: {
    title: "Warranty Policy",
    updated: "Last update on June 10th, 2020.",
    rows: [
      { period: "27 months", product: "Cameras — IP, HD Analogue, Analogue · All NVR / DVR" },
      { period: "15 months", product: "PTZ Camera" },
      { period: "9 months", product: "Zoom Module" },
    ],
    footnote: "Period from the date of shipment, including 3 months for delivery and stock period.",
    process: [
      { step: "DOA", detail: "Products found defective within one calendar month of receipt are deemed DOA." },
      { step: "RMA number", detail: "Apply for an RMA number with model number, serial number, date of purchase and a description of the defect." },
      { step: "Return", detail: "Return the product with the completed RMA form." },
      { step: "Repair TAT", detail: "Repaired product returned within four weeks of receipt (three weeks for PTZ cameras), transport excluded." },
    ],
    rmaForm: "https://visionhitechsecurity.com/wp-content/uploads/2020/08/RMA-form_Visionhitech.xlsx",
    confirmNote: "The policy intro on the current site states 24 months (12 months for PTZ). Final wording to be confirmed.",
  },
};
