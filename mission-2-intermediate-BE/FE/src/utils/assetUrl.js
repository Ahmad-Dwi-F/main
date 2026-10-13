const images = import.meta.glob("/src/assets/*.{jpg,png}", {
  eager: true,
  import: "default",
});

export const assetUrl = (name) => images[`/src/assets/${name}`];
