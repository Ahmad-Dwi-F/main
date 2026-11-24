const images = import.meta.glob("/src/assets/*.{jpg,png}", {
  eager: true,
  import: "default",
});

const API_ORIGIN = new URL(import.meta.env.VITE_API_URL, window.location.origin)
  .origin;

export const assetUrl = (name) => {
  if (!name) return undefined;
  if (name.startsWith("uploads/")) return `${API_ORIGIN}/${name}`;
  return images[`/src/assets/${name}`] ?? `/${name}`;
};
