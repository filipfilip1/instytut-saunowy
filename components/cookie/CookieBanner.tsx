'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { initGA4 } from '@/lib/analytics';

/**
 * Funkcja ładująca skrypty analityczne (Google Analytics 4, Meta Pixel, etc.)
 * Wywoływana TYLKO po wyrażeniu zgody przez użytkownika.
 */
function loadAnalytics() {
  // Załaduj Google Analytics 4
  initGA4();

  // TU MOŻESZ DODAĆ INNE SKRYPTY (np. Meta Pixel, Hotjar):
  /*
  // Meta Pixel przykład:
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
  */

  console.log('✅ Analytics scripts loaded');
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik już wyraził zgodę
    const consent = localStorage.getItem('cookie_consent');

    if (consent === 'granted') {
      // Automatycznie załaduj analytics dla powracających użytkowników
      loadAnalytics();
    } else if (consent === null) {
      // Pokaż baner jeśli brak decyzji
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 500); // Opóźnienie 500ms dla płynnego wejścia
    }
    // Jeśli consent === 'denied', nie rób nic (baner ukryty, analytics nie załadowane)
  }, []);

  const handleAccept = () => {
    // Zapisz zgodę
    localStorage.setItem('cookie_consent', 'granted');

    // Załaduj skrypty analityczne
    loadAnalytics();

    // Ukryj baner z animacją
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDecline = () => {
    // Zapisz odmowę
    localStorage.setItem('cookie_consent', 'denied');

    // Ukryj baner bez ładowania analytics
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm" />

      {/* Content */}
      <div className="relative bg-neutral-900/95 border-t border-gold-400/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Text content */}
            <div className="flex-1">
              <h3 className="text-xl font-serif font-bold text-cream-100 mb-2">
                Szanujemy Twoją prywatność
              </h3>
              <p className="text-sm text-cream-200 leading-relaxed max-w-3xl">
                Używamy plików cookies, aby zapewnić poprawne działanie sklepu (niezbędne)
                oraz analizować ruch, co pozwala nam rozwijać Instytut (analityczne).
                Możesz zaakceptować wszystkie lub ograniczyć się do niezbędnych.{' '}
                <Link
                  href="/polityka-prywatnosci"
                  className="text-gold-400 hover:text-gold-300 underline transition-colors font-medium"
                >
                  Polityka Prywatności
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-3 bg-transparent border-2 border-gold-400 text-gold-400 font-semibold text-sm rounded-lg hover:bg-gold-400 hover:text-graphite-900 transition-all duration-200"
              >
                Tylko niezbędne
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-graphite-900 font-bold text-sm rounded-lg hover:from-gold-500 hover:to-gold-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Akceptuję wszystkie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
