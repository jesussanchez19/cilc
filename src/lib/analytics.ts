export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

export function trackWhatsAppClick(program?: string) {
  trackEvent('whatsapp_click', { program: program ?? 'general' });
}

export function trackFormSubmit(formType: 'contact' | 'quote', program?: string) {
  trackEvent('form_submit', { form_type: formType, program: program ?? 'general' });
}

export function buildWhatsAppUrl(message: string, program?: string): string {
  const utm = program ? `&utm_source=whatsapp&utm_medium=chat&utm_campaign=${encodeURIComponent(program)}` : '';
  return `https://wa.me/525518944494?text=${encodeURIComponent(message)}${utm}`;
}
