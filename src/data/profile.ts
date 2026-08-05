/**
 * Datos del perfil. Es el único sitio que hay que tocar para actualizar la
 * página "About".
 *
 * Las cifras que dependen del tiempo (años de experiencia, tiempo con la
 * cámara) se calculan solas a partir de las fechas de abajo, así que no hay que
 * cambiarlas nunca a mano. Ojo: el sitio es estático, o sea que el número se
 * congela en el momento del build — se actualiza en cada despliegue.
 */

/** 31 de julio de 2023: cada 31 de julio suma un año de experiencia. */
const CAREER_START = new Date(2023, 6, 31);

/** Abril de 2025: la primera foto. */
const PHOTOGRAPHY_START = new Date(2025, 3, 1);

function monthsBetween(start: Date, end: Date): number {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // Todavía no ha llegado el día del mes: el último mes no cuenta.
  if (end.getDate() < start.getDate()) months--;

  return Math.max(0, months);
}

function yearsSince(start: Date, now = new Date()): number {
  return Math.floor(monthsBetween(start, now) / 12);
}

/** "3 years", "1 year and 4 months", "8 months". */
function formatDuration(start: Date, now = new Date()): string {
  const months = monthsBetween(start, now);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (remainingMonths > 0) {
    parts.push(
      `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`,
    );
  }

  return parts.length > 0 ? parts.join(" and ") : "less than a month";
}

export const profile = {
  name: "Adrián",
  brand: "Devlafug Photography",
  email: "adelafuentegarceso@gmail.com",
  city: "Seville",
  country: "Spain",
  birthYear: 1999,

  /** Años de experiencia como programador, a día de hoy. */
  yearsOfExperience: yearsSince(CAREER_START),

  /** Tiempo con la cámara, en texto: "1 year and 4 months". */
  timeShooting: formatDuration(PHOTOGRAPHY_START),

  /** Año en el que empezó la fotografía, para las cifras de un vistazo. */
  photographyStartYear: PHOTOGRAPHY_START.getFullYear(),

  gear: [
    { label: "Body", value: "Canon EOS R10" },
    { label: "Lens", value: "RF-S 18-45mm F4.5-6.3 IS STM" },
    { label: "Shooting since", value: "April 2025" },
  ],

  locations: [
    {
      name: "Seville",
      region: "Spain",
      note: "Home. Where I learned to look, and where I always come back to.",
    },
    {
      name: "Madrid",
      region: "Spain",
      note: "The capital: rush, crowds and contrast everywhere you turn.",
    },
    {
      name: "Amalfi Coast",
      region: "Italy",
      note: "Light, stone and sea. The hardest place in the world to photograph badly.",
    },
  ],

  passions: ["Sport", "Video games", "Reading", "Film", "Photography"],
} as const;
