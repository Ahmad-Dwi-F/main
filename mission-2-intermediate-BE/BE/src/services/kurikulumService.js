export function getCurriculumRows(conn, productId) {
  return conn("material as m")
    .join("modul_kelas as mk", "m.module_id", "mk.module_id")
    .where("mk.product_id", productId)
    .select(
      "mk.module_id",
      "mk.module_title",
      "m.material_id",
      "m.material_type",
      "m.material_title",
      "m.duration_minutes",
    )
    .orderBy("mk.module_id")
    .orderBy("m.material_id");
}

export function buildCurriculum(rows) {
  const modules = new Map();

  for (const row of rows) {
    if (!modules.has(row.module_id)) {
      modules.set(row.module_id, {
        id: row.module_id,
        title: row.module_title,
        items: [],
      });
    }
    modules.get(row.module_id).items.push({
      id: row.material_id,
      title: row.material_title,
      duration: `${row.duration_minutes} Menit`,

      type: row.material_type === "pretest" ? "pre-test" : row.material_type,
    });
  }

  return [...modules.values()];
}
