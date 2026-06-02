export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
