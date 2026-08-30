export function getFlatCurriculumItems(course) {
  const items = [];
  (course.curriculum || []).forEach((section) => {
    (section.items || []).forEach((item, index) => {
      items.push({
        key: `${section.id}::${index}`,
        sectionId: section.id,
        sectionTitle: section.title,
        title: item.title,
        duration: item.duration,
        type: item.type || "video",
      });
    });
  });
  return items;
}

export function getCourseStats(course) {
  const items = getFlatCurriculumItems(course);
  const moduleCount = items.length;
  const totalMinutes = items.reduce((sum, item) => {
    const match = /\d+/.exec(item.duration || "");
    return sum + (match ? Number.parseInt(match[0], 10) : 0);
  }, 0);
  return { moduleCount, totalMinutes };
}

export function getProgressPercent(course, completedItems = []) {
  const items = getFlatCurriculumItems(course);
  if (items.length === 0) return 0;
  const completedCount = items.filter((item) =>
    completedItems.includes(item.key),
  ).length;
  return Math.round((completedCount / items.length) * 100);
}
