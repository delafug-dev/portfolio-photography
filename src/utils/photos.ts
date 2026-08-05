import type { Photo, PhotoWithRatio } from "@/types/photo";
import photosMetadata from "@/content/photos/metadata.json";

/**
 * Astro procesa en el build todas las imágenes de src/assets/photos y aquí las
 * cruzamos con metadata.json, que es la fuente de verdad de los textos: si una
 * foto no está en el JSON, no existe para la web.
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photos/*.{jpg,jpeg}",
  { eager: true },
);

export const photos: PhotoWithRatio[] = (photosMetadata as Photo[]).map(
  (photo) => {
    const imagePath = `../assets/photos/${photo.filename}`;
    const imageModule = images[imagePath];

    if (!imageModule) {
      throw new Error(
        `No se encuentra la imagen "${photo.filename}" (foto id ${photo.id} de metadata.json). ` +
          `Comprueba que el archivo existe en src/assets/photos/ y que el nombre coincide.`,
      );
    }

    // Las dimensiones salen del archivo real, no del JSON: Astro ya las ha
    // leído al importar la imagen y así no hay forma de que se desincronicen.
    const { width, height } = imageModule.default;

    return {
      ...photo,
      width,
      height,
      aspectRatio: width / height,
      src: imageModule.default,
    };
  },
);
