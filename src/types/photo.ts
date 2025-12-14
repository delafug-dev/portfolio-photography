export interface Photo {
  id: string | number;  // Acepta tanto string como number
  filename: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  description?: string;
}

export interface PhotoWithRatio extends Photo {
  aspectRatio: number;
  src: any;
}
