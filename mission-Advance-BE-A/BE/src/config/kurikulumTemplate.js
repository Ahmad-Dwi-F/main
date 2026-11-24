export const MATERIAL_DEFAULTS = {
  pretest: { title: "Pre-test Introduction", minutes: 5 },
  video: { title: "Video: Introduction to HR", minutes: 12 },
  rangkuman: { title: "Rangkuman Introduction", minutes: 3 },
  quiz: { title: "Quiz Introduction", minutes: 10 },
};

export const CURRICULUM_TEMPLATE = [
  {
    title: "Introduction to HR",
    items: ["pretest", "video", "video", "video"],
  },
  { title: "Introduction to HR", items: ["video", "video", "video", "video"] },
  { title: "Introduction to HR", items: ["video", "video", "video", "video"] },
  {
    title: "Introduction to HR",
    items: ["video", "video", "rangkuman", "quiz"],
  },
];
