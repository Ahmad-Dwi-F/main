export function getFlatItems(curriculum = []) {
  return curriculum.flatMap((section) =>
    section.items.map((item) => ({
      key: item.id,
      sectionId: section.id,
      sectionTitle: section.title,
      title: item.title,
      duration: item.duration,
      type: item.type,
    })),
  );
}
