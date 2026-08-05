export interface Photo {
  id: string | number;  // Acepta tanto string como number
  filename: string;
  alt: string;
  title: string;
  description?: string;
  /**
   * Ya no se usan: las dimensiones reales se leen del archivo al importarlo.
   * Se mantienen como opcionales para no romper el metadata.json existente.
   */
  width?: number;
  height?: number;
}

export interface PhotoWithRatio extends Photo {
  /** Dimensiones reales del archivo, leídas por Astro en el build. */
  width: number;
  height: number;
  aspectRatio: number;
  /** Imagen ya procesada por Astro (astro:assets). */
  src: ImageMetadata;
}
