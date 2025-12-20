/**
 * Google Analytics 4 Helper
 *
 * Ten plik zawiera funkcje do obsługi Google Analytics 4.
 * Skrypty są ładowane TYLKO po wyrażeniu zgody przez użytkownika (RODO/GDPR).
 *
 * INSTRUKCJA KONFIGURACJI:
 * 1. Zarejestruj się w Google Analytics 4
 * 2. Utwórz nową właściwość GA4
 * 3. Skopiuj swój Measurement ID (format: G-XXXXXXXXXX)
 * 4. Wklej poniżej w miejsce 'G-XXXXXXXXXX'
 * 5. Odkomentuj kod w funkcji loadAnalytics() w CookieBanner.tsx
 */

// ===== KONFIGURACJA =====
// Wklej tutaj swój Google Analytics 4 Measurement ID:
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// ===== DEKLARACJE TYPÓW =====
type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

/**
 * Inicjalizacja Google Analytics 4
 * Funkcja wywoływana z CookieBanner po zaakceptowaniu cookies
 */
export function initGA4() {
  // Sprawdź czy GA4 ID jest skonfigurowane
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('⚠️ Google Analytics ID nie jest skonfigurowane. Ustaw NEXT_PUBLIC_GA_ID w .env.local');
    return;
  }

  // Inicjalizuj dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(command: GtagCommand, ...args: unknown[]) {
    window.dataLayer.push([command, ...args]);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  // Załaduj skrypt GA4
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  console.log('✅ Google Analytics 4 loaded');
}

/**
 * Śledzenie odsłon stron (Page View)
 * Wywołaj przy zmianie strony w Next.js
 */
export function trackPageView(url: string) {
  if (typeof window.gtag === 'undefined') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/**
 * Śledzenie niestandardowych zdarzeń
 * @param eventName - nazwa zdarzenia (np. 'add_to_cart', 'purchase')
 * @param params - dodatkowe parametry
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean | unknown[]>) {
  if (typeof window.gtag === 'undefined') return;

  window.gtag('event', eventName, params);
}

/**
 * Przykładowe użycie dla e-commerce:
 *
 * // Dodanie produktu do koszyka
 * trackEvent('add_to_cart', {
 *   currency: 'PLN',
 *   value: 199.99,
 *   items: [{
 *     item_id: 'KILT-001',
 *     item_name: 'Kilt Premium',
 *     price: 199.99,
 *     quantity: 1
 *   }]
 * });
 *
 * // Zakończenie zakupu
 * trackEvent('purchase', {
 *   transaction_id: 'T12345',
 *   value: 399.98,
 *   currency: 'PLN',
 *   items: [...]
 * });
 */
