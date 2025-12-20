import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { BRAND } from '@/constants/brand';

export const metadata: Metadata = {
  title: 'Polityka prywatności i plików cookies | Instytut Saunowy',
  description:
    'Polityka prywatności i ochrony danych osobowych sklepu internetowego Instytut Saunowy. Zasady przetwarzania danych zgodnie z RODO.',
  openGraph: {
    title: 'Polityka prywatności i plików cookies | Instytut Saunowy',
    description:
      'Polityka prywatności i ochrony danych osobowych sklepu Instytut Saunowy.',
  },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-graphite-900 via-graphite-900 to-forest-900">
      {/* Breadcrumbs */}
      <div className="bg-graphite-800/50 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Strona główna
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cream-100 font-medium">Polityka prywatności</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 border-b border-gold-400/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-4">
              Polityka prywatności i plików cookies
            </h1>
            <p className="text-xl text-cream-300 leading-relaxed">
              Zasady przetwarzania i ochrony danych osobowych w sklepie Instytut Saunowy
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="space-y-12">
              {/* §1 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §1. Postanowienia Ogólne
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników
                    w związku z korzystaniem z serwisu internetowego{' '}
                    <Link href="/" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                      www.instytutsaunowy.pl
                    </Link>
                  </p>
                  <p>
                    Administratorem danych osobowych zawartych w serwisie jest:{' '}
                    <strong className="text-cream-100">{BRAND.legal.companyName}</strong> z siedzibą w{' '}
                    {BRAND.address.city} ({BRAND.address.zipCode}), {BRAND.address.street},{' '}
                    NIP: {BRAND.legal.nip}, REGON: {BRAND.legal.regon} (dalej: &bdquo;Administrator&rdquo;).
                  </p>
                  <p>
                    Kontakt z Administratorem możliwy jest pod adresem e-mail:{' '}
                    <a href={`mailto:${BRAND.contact.email}`} className="text-gold-400 hover:text-gold-300 transition-colors">
                      {BRAND.contact.email}
                    </a>
                  </p>
                  <p>
                    Dane osobowe przetwarzane są zgodnie z{' '}
                    <strong className="text-cream-100">Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO)</strong>.
                  </p>
                </div>
              </div>

              {/* §2 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §2. Cele i Podstawy Przetwarzania Danych
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p className="font-medium text-cream-100">
                    Administrator przetwarza Twoje dane w następujących celach:
                  </p>
                  <ul className="space-y-4 ml-6">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1 flex-shrink-0">•</span>
                      <div>
                        <strong className="text-cream-100">Realizacja zamówienia i umowy sprzedaży</strong>{' '}
                        <span className="text-cream-300 text-sm">(Art. 6 ust. 1 lit. b RODO)</span>
                        <span className="block mt-1">– abyśmy mogli wysłać Ci kilt, olejek lub bilet na szkolenie.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1 flex-shrink-0">•</span>
                      <div>
                        <strong className="text-cream-100">Obsługa konta Użytkownika</strong>{' '}
                        <span className="text-cream-300 text-sm">(Art. 6 ust. 1 lit. b RODO)</span>
                        <span className="block mt-1">– jeśli zdecydujesz się założyć konto w sklepie.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1 flex-shrink-0">•</span>
                      <div>
                        <strong className="text-cream-100">Kontakt i obsługa zapytań</strong>{' '}
                        <span className="text-cream-300 text-sm">(Art. 6 ust. 1 lit. f RODO)</span>
                        <span className="block mt-1">– gdy piszesz do nas przez formularz lub e-mail (nasz prawnie uzasadniony interes).</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1 flex-shrink-0">•</span>
                      <div>
                        <strong className="text-cream-100">Księgowość i obowiązki podatkowe</strong>{' '}
                        <span className="text-cream-300 text-sm">(Art. 6 ust. 1 lit. c RODO)</span>
                        <span className="block mt-1">– wystawianie faktur i ich przechowywanie przez 5 lat.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1 flex-shrink-0">•</span>
                      <div>
                        <strong className="text-cream-100">Dochodzenie roszczeń</strong>{' '}
                        <span className="text-cream-300 text-sm">(Art. 6 ust. 1 lit. f RODO)</span>
                        <span className="block mt-1">– w przypadku braku płatności lub sporów.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* §3 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §3. Odbiorcy Danych
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Twoje dane przekazujemy tylko podmiotom, które są niezbędne do realizacji usługi:
                  </p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <div>
                        <strong className="text-cream-100">Operatorzy płatności:</strong>{' '}
                        (np. PayU, Przelewy24, BLIK, Stripe) – w celu opłacenia zamówienia.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <div>
                        <strong className="text-cream-100">Firmy kurierskie:</strong>{' '}
                        (np. InPost, DPD) – w celu dostarczenia paczki.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <div>
                        <strong className="text-cream-100">Dostawca hostingu i serwera:</strong>{' '}
                        w celu utrzymania strony.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <div>
                        <strong className="text-cream-100">Biuro księgowe:</strong>{' '}
                        w celu rozliczeń podatkowych.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <div>
                        <strong className="text-cream-100">Dostawcy narzędzi IT:</strong>{' '}
                        (np. Google – w zakresie analityki, jeśli dotyczy).
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* §4 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §4. Pliki Cookies (Ciasteczka)
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Sklep internetowy używa plików cookies. Są to niewielkie pliki tekstowe wysyłane przez serwer www
                    i przechowywane przez oprogramowanie komputera przeglądarki.
                  </p>
                  <div>
                    <p className="mb-3 font-medium text-cream-100">Stosujemy cookies w celach:</p>
                    <ul className="space-y-3 ml-6">
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <div>
                          <strong className="text-cream-100">Niezbędnych:</strong>{' '}
                          Utrzymanie sesji Klienta (po zalogowaniu), zapamiętanie zawartości koszyka.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <div>
                          <strong className="text-cream-100">Analitycznych:</strong>{' '}
                          Tworzenie anonimowych statystyk, które pomagają zrozumieć, jak Klienci korzystają ze Sklepu (np. Google Analytics 4).
                        </div>
                      </li>
                    </ul>
                  </div>
                  <p className="italic text-cream-300 border-l-2 border-gold-400/30 pl-4">
                    Użytkownik ma prawo w każdym czasie wyłączyć lub przywrócić opcję gromadzenia cookies poprzez
                    zmianę ustawień w przeglądarce internetowej.
                  </p>
                </div>
              </div>

              {/* §5 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §5. Twoje Prawa
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p className="font-medium text-cream-100">Przysługuje Ci prawo do:</p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <span>Dostępu do swoich danych oraz otrzymania ich kopii.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <span>Sprostowania (poprawiania) swoich danych.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <span>Usunięcia danych (jeśli nie ma podstaw do ich dalszego przetwarzania).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <span>Ograniczenia przetwarzania danych.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-400 mt-1">•</span>
                      <span>
                        Wniesienia skargi do{' '}
                        <strong className="text-cream-100">Prezesa Urzędu Ochrony Danych Osobowych (PUODO)</strong>,
                        jeśli uznasz, że przetwarzamy dane niezgodnie z prawem.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* §6 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §6. Postanowienia Końcowe
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Administrator stosuje środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych
                    odpowiednią do zagrożeń oraz kategorii danych objętych ochroną.
                  </p>
                  <p>
                    Administrator zastrzega sobie prawo do zmian w Polityce Prywatności.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-gold-400/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn delay={0.3}>
            <h2 className="text-3xl font-serif font-bold text-cream-100 mb-4">
              Masz pytania o ochronę danych?
            </h2>
            <p className="text-lg text-cream-300 mb-8">
              Dbamy o Twoją prywatność. Skontaktuj się z nami w każdej sprawie dotyczącej Twoich danych osobowych.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold text-lg rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Skontaktuj się z nami
              </Link>
              <Link
                href="/regulamin"
                className="px-8 py-4 bg-transparent border-2 border-gold-400 text-gold-400 font-semibold text-lg rounded-xl hover:bg-gold-400 hover:text-white transition-all inline-flex items-center justify-center gap-2"
              >
                Zobacz regulamin
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
