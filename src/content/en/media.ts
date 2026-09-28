/** Media Center — the current site has three news posts, all dated 2020-06-03. */
export const media = {
  intro: "Company announcements and product news.",
  news: [
    {
      date: "2020-06-03",
      category: "News",
      title: "Non-Hisilicon Recorder Launched",
      body: "We've launched NDAA-compliant Non-Hisilicon Hybrid DVRs and NVRs including 4ch, 8ch and 16ch, for the customers looking for a competitive Non-Hisilicon product.",
      image: "/images/site/news-recorder.webp",
    },
    {
      date: "2020-06-03",
      category: "News",
      title: "Ultra Lowlight 4K Coming",
      body: "Ultra lowlight 4K IPC with a new lowlight 4K sensor and advanced video tuning technology is coming soon.",
      image: "/images/site/news-4k.webp",
    },
    {
      date: "2020-06-03",
      category: "News",
      title: "New Ambarella Smart H.265 IPC",
      body: "Thank you very much for your visit to our booth (33073).",
      image: "/images/site/news-ambarella.webp",
    },
  ],
  channels: [
    { id: "event", label: "Event", status: "pending" as const },
    { id: "newsletter", label: "News Letter", status: "pending" as const },
    { id: "youtube", label: "Youtube", status: "pending" as const },
    { id: "linkedin", label: "LinkedIn", status: "pending" as const },
  ],
  archiveNote: "Latest posts on the current site date from June 2020. New posts awaiting official content.",
};
