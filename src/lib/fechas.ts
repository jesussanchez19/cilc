/**
 * Fechas en la zona horaria de CILC, no en la del servidor.
 *
 * El contador de "Hoy" del panel hacía `new Date().setHours(0,0,0,0)`, que toma
 * la medianoche del servidor. En Vercel el servidor corre en UTC, así que "hoy"
 * empezaba a las 18:00 hora de CDMX del día anterior y el contador se ponía a
 * cero a las 6 de la tarde, en mitad de la jornada.
 *
 * Se compara el día como texto `YYYY-MM-DD` en vez de calcular desplazamientos:
 * `Intl` ya sabe la zona y sus reglas. México dejó el horario de verano en
 * 2022, pero usar la zona IANA en vez de un `-6` fijo lo deja bien resuelto si
 * eso volviera a cambiar.
 */

const ZONA_CILC = 'America/Mexico_City';

// `en-CA` da el formato YYYY-MM-DD, que se compara bien como texto.
const DIA = new Intl.DateTimeFormat('en-CA', {
  timeZone: ZONA_CILC,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** El día natural en México al que pertenece un instante, como `YYYY-MM-DD`. */
export function diaEnMexico(fecha: Date | string): string {
  return DIA.format(typeof fecha === 'string' ? new Date(fecha) : fecha);
}

/** ¿Ese instante cae en el día de hoy según el calendario de México? */
export function esDeHoyEnMexico(fecha: Date | string): boolean {
  return diaEnMexico(fecha) === diaEnMexico(new Date());
}
