import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { BRAND } from '@/constants/brand';

export const metadata: Metadata = {
  title: 'Regulamin sklepu internetowego | Instytut Saunowy',
  description:
    'Regulamin sklepu internetowego Instytut Saunowy. Zasady korzystania ze sklepu, składania zamówień, płatności, dostaw i zwrotów.',
  openGraph: {
    title: 'Regulamin sklepu internetowego | Instytut Saunowy',
    description:
      'Regulamin sklepu internetowego Instytut Saunowy. Zasady zakupów i korzystania ze sklepu.',
  },
};

export default function RegulaminPage() {
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
            <span className="text-cream-100 font-medium">Regulamin</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 border-b border-gold-400/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-4">
              Regulamin sklepu internetowego
            </h1>
            <p className="text-xl text-cream-300 leading-relaxed">
              Zasady korzystania ze sklepu internetowego Instytut Saunowy
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Regulamin Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="space-y-12">
              {/* §1 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §1. Postanowienia ogólne
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Niniejszy regulamin określa zasady korzystania ze sklepu internetowego dostępnego pod adresem:{' '}
                    <Link href="/" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                      www.instytutsaunowy.pl
                    </Link>
                  </p>
                  <p>
                    Sklep internetowy prowadzony jest przez <strong className="text-cream-100">{BRAND.legal.companyName}</strong>,
                    z siedzibą w {BRAND.address.zipCode} {BRAND.address.city}, {BRAND.address.street},
                    NIP: {BRAND.legal.nip}, REGON: {BRAND.legal.regon}.
                  </p>
                  <div>
                    <p className="mb-3 font-medium text-cream-100">Kontakt ze sklepem jest możliwy poprzez:</p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <span>
                          e-mail:{' '}
                          <a href={`mailto:${BRAND.contact.email}`} className="text-gold-400 hover:text-gold-300 transition-colors">
                            {BRAND.contact.email}
                          </a>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <span>
                          telefon:{' '}
                          <a href={`tel:${BRAND.contact.phone}`} className="text-gold-400 hover:text-gold-300 transition-colors">
                            {BRAND.contact.phoneDisplay}
                          </a>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <span>
                          formularz kontaktowy na stronie:{' '}
                          <Link href="/kontakt" className="text-gold-400 hover:text-gold-300 transition-colors">
                            /kontakt
                          </Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* §2 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §2. Definicje
                </h2>
                <dl className="space-y-4 text-cream-200 leading-relaxed">
                  <div>
                    <dt className="font-semibold text-cream-100 mb-1">Kupujący / Klient</dt>
                    <dd className="ml-6">osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupu w sklepie.</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-cream-100 mb-1">Sprzedawca</dt>
                    <dd className="ml-6">podmiot wskazany w §1 ust. 2.</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-cream-100 mb-1">Towar / Produkt</dt>
                    <dd className="ml-6">odzież, akcesoria oraz bilety/wstęp na wydarzenia oferowane przez Sprzedawcę.</dd>
                  </div>
                </dl>
              </div>

              {/* §3 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §3. Zasady korzystania ze sklepu i Opinie
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Kupujący zobowiązany jest do korzystania ze sklepu w sposób zgodny z przepisami prawa.
                  </p>
                  <p className="italic text-cream-300 border-l-2 border-gold-400/30 pl-4">
                    Sprzedawca informuje, że nie stosuje mechanizmu weryfikacji opinii klientów pod kątem ich pochodzenia
                    od osób, które faktycznie nabyły produkt (wymóg dyrektywy Omnibus).
                  </p>
                </div>
              </div>

              {/* §4 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §4. Składanie zamówień
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Umowa sprzedaży zostaje zawarta z chwilą otrzymania potwierdzenia zamówienia przez Kupującego drogą mailową.
                  </p>
                  <p>
                    Do złożenia zamówienia nie jest wymagane posiadanie konta.
                  </p>
                </div>
              </div>

              {/* §5 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §5. Ceny i płatności
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Ceny są cenami brutto (zawierają VAT).
                  </p>
                  <p>
                    W przypadku obniżek cen (promocji), Sprzedawca obok ceny promocyjnej uwidacznia najniższą cenę
                    tego produktu z okresu 30 dni przed wprowadzeniem obniżki (wymóg dyrektywy Omnibus).
                  </p>
                  <div>
                    <p className="mb-2 font-medium text-cream-100">Dostępne metody płatności:</p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <span>Przelew tradycyjny</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <span>Szybkie płatności online (BLIK, Visa, Mastercard, Przelewy24)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* §6 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §6. Dostawa
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Termin wysyłki zamówienia wynosi do <strong className="text-cream-100">5 dni roboczych</strong> od zaksięgowania wpłaty.
                  </p>
                  <p>
                    Bilety/Vouchery przesyłane są drogą elektroniczną.
                  </p>
                </div>
              </div>

              {/* §7 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §7. Prawo odstąpienia od umowy (Zwroty)
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Konsument ma prawo odstąpić od umowy w terminie <strong className="text-cream-100">14 dni</strong> od otrzymania towaru.
                  </p>
                  <p>
                    Bezpośrednie koszty zwrotu rzeczy ponosi Kupujący.
                  </p>
                  <div>
                    <p className="mb-3 font-medium text-cream-100">Prawo odstąpienia nie przysługuje w przypadku:</p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <span>
                          Biletów/wstępu na wydarzenia z określoną datą (zgodnie z art. 38 ustawy o prawach konsumenta).
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-gold-400 mt-1">•</span>
                        <span>
                          Produktów higienicznych dostarczanych w zapieczętowanym opakowaniu, jeżeli opakowanie zostało
                          otwarte po dostarczeniu (np. otwarte olejki, kosmetyki).
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p>
                    Zwrot środków następuje w ciągu <strong className="text-cream-100">14 dni</strong> od otrzymania zwracanego produktu.
                  </p>
                </div>
              </div>

              {/* §8 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §8. Reklamacje
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Reklamacje rozpatrywane są w ciągu <strong className="text-cream-100">14 dni kalendarzowych</strong> od ich otrzymania.
                  </p>
                </div>
              </div>

              {/* §9 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §9. Przedsiębiorcy
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    W przypadku Klientów niebędących konsumentami (B2B), rękojmia jest wyłączona.
                  </p>
                </div>
              </div>

              {/* §10 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §10. Dane osobowe
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Administratorem danych jest Sprzedawca. Szczegóły w{' '}
                    <Link href="/polityka-prywatnosci" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                      Polityce Prywatności
                    </Link>.
                  </p>
                </div>
              </div>

              {/* §11 */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-3 border-b border-gold-400/30">
                  §11. Postanowienia końcowe
                </h2>
                <div className="space-y-4 text-cream-200 leading-relaxed">
                  <p>
                    Regulamin wchodzi w życie z dniem publikacji.
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
              Masz pytania dotyczące regulaminu?
            </h2>
            <p className="text-lg text-cream-300 mb-8">
              Skontaktuj się z nami – chętnie rozwiejemy wszelkie wątpliwości
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold text-lg rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Skontaktuj się z nami
              </Link>
              <Link
                href="/sklep"
                className="px-8 py-4 bg-transparent border-2 border-gold-400 text-gold-400 font-semibold text-lg rounded-xl hover:bg-gold-400 hover:text-white transition-all inline-flex items-center justify-center gap-2"
              >
                Wróć do sklepu
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
