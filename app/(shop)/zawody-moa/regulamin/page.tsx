import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'Regulamin zawodów MoA - Masters of Aufguss | Instytut Saunowy',
  description:
    'Regulamin zawodów MoA - Masters of Aufguss. Zapoznaj się z zasadami uczestnictwa w najbardziej prestiżowych zawodach saunowych w Polsce.',
  openGraph: {
    title: 'Regulamin zawodów MoA - Masters of Aufguss',
    description:
      'Regulamin zawodów MoA - Masters of Aufguss. Zasady uczestnictwa w prestiżowych zawodach saunowych.',
  },
};

export default function RegulaminMoAPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-cream-50 border-b border-cream-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-graphite-600">
            <Link href="/" className="hover:text-gold-600 transition-colors">
              Strona główna
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/zawody-moa" className="hover:text-gold-600 transition-colors">
              Zawody MoA
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-graphite-900 font-medium">Regulamin</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-gold-50 to-cream-100 border-b-2 border-gold-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/zawody-moa"
              className="inline-flex items-center gap-2 text-gold-700 hover:text-gold-800 font-medium mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Wróć do strony MoA
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 mb-4">
              Regulamin zawodów MoA
            </h1>
            <p className="text-xl text-graphite-600">
              Masters of Aufguss - Oficjalny regulamin zawodów saunowych
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Regulamin Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="prose prose-lg max-w-none">
              {/* §1 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §1. Postanowienia ogólne
                </h2>
                <ol className="space-y-3 text-graphite-700 leading-relaxed">
                  <li>
                    Zawody saunowe MOA to wydarzenie organizowane przez Instytut Saunowy sp. z
                    o.o., mające na celu wyłonienie najlepszego Saunamistrza w duchu
                    współzawodnictwa i profesjonalizmu.
                  </li>
                  <li>
                    Celem zawodów jest promowanie wysokiego standardu ceremonii saunowych,
                    kreatywności, profesjonalizmu oraz uniwersalności w pracy Saunamistrza.
                  </li>
                  <li>
                    Regulamin obowiązuje wszystkich uczestników, organizatorów i sędziów
                    zawodów.
                  </li>
                  <li>
                    Uczestnictwo Saunamistrzów wiąże się z opłatą wpisowego przez obiekty, które
                    Zawodnicy reprezentują, lub samych zawodników. Wpisowe dla zawodników
                    indywidualnych wynosi ..., opłatę należy uiścić do dnia ...
                  </li>
                  <li>
                    Wypłata nagród dla Zwycięzców odbywać się będzie w niedzielę po ogłoszeniu
                    wyników.
                  </li>
                  <li>
                    Wszyscy Zawodnicy są zobowiązani do noszenia koszulek MoA oraz plakietki
                    imiennej podczas zawodów.
                  </li>
                  <li>
                    Podejmowanie jakichkolwiek działań marketingowych bez ustalenia z
                    organizatorem jest surowo zabronione i wiąże się z karą grzywny w wysokości
                    2000 zł.
                  </li>
                  <li>
                    Zabrania się spożywania alkoholu oraz innych używek przez zawodników
                    startujących w turnieju MoA.
                  </li>
                  <li>Zabrania się używania otwartego ognia w saunie.</li>
                </ol>
              </div>

              {/* §2 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §2. Organizator zawodów
                </h2>
                <ol className="space-y-3 text-graphite-700 leading-relaxed">
                  <li>Organizatorem zawodów jest Instytut Saunowy sp. z o.o.</li>
                  <li>
                    Organizator odpowiada za przygotowanie miejsca zawodów, harmonogramu,
                    regulaminu oraz wyznaczenie składu sędziowskiego.
                  </li>
                  <li>
                    Organizator, zapewnia Zawodnikom nocleg w hotelu od ... do ... (jeden nocleg
                    dla jednej osoby) - obiad oraz kolację w dniu ... oraz obiad w dniu ..., wodę
                    bez ograniczeń oraz udział w wieczornej Zabawie dla Saunamistrzów. Koszty
                    dojazdu, inne wyżywienie i napoje (poza wodą) zawodnik musi zapłacić we
                    własnym zakresie, podczas trwania turnieju.
                  </li>
                  <li>
                    Organizator decyduje o przydzieleniu saunamistrzów do poszczególnych pokoi w
                    hotelu.
                  </li>
                  <li>
                    Organizator zastrzega sobie prawo do odmowy przyjęcia Saunamistrza do udziału
                    w Mistrzostwach MoA bez podania przyczyny.
                  </li>
                </ol>
              </div>

              {/* §3 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §3. Uczestnicy zawodów
                </h2>
                <ol className="space-y-3 text-graphite-700 leading-relaxed">
                  <li>
                    Udział w zawodach mogą brać Saunamistrzowie posiadający doświadczenie w
                    prowadzeniu ceremonii saunowych.
                  </li>
                  <li>
                    Każdy uczestnik zobowiązany jest do przestrzegania regulaminu zawodów oraz
                    zasad bezpieczeństwa.
                  </li>
                  <li>
                    Zgłoszenia do zawodów należy dokonać za pośrednictwem formularza
                    zgłoszeniowego do dnia ...
                  </li>
                  <li>
                    Biorąc udział w Mistrzostwach MoA zawodnicy wyrażają zgodę na nieodpłatne
                    tworzenie materiałów promocyjnych z ich wizerunkiem (filmy, zdjęcia) na
                    potrzeby dokumentacji wydarzenia oraz jego promocji.
                  </li>
                  <li>
                    Zawodnik zgłaszając się do udziału w Mistrzostwach potwierdza, że jego stan
                    zdrowia pozwala na udział w zawodach.
                  </li>
                  <li>
                    Każdy z uczestników zobowiązuje się uczestniczyć w odprawie Saunamistrzów,
                    która odbędzie się o godzinie 10:00 w ...
                  </li>
                </ol>
              </div>

              {/* §4 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §4. Formuła zawodów
                </h2>
                <ol className="space-y-3 text-graphite-700 leading-relaxed">
                  <li>
                    Zawody składają się z trzech różnych rund, podczas których uczestnicy muszą
                    wykazać się:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Kreatywnością,</li>
                      <li>Profesjonalizmem,</li>
                      <li>Wiedzą z zakresu ceremonii saunowych,</li>
                      <li>Uniwersalnością w prowadzeniu ceremonii w różnych stylach.</li>
                    </ul>
                  </li>
                  <li>
                    Każdy uczestnik przygotowuje trzy ceremonie:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>seans dowolny,</li>
                      <li>seans cichy,</li>
                      <li>seans z łaźni parowej.</li>
                    </ul>
                  </li>
                </ol>
              </div>

              {/* §5 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §5. Zasady oceniania
                </h2>
                <ol className="space-y-4 text-graphite-700 leading-relaxed">
                  <li>
                    Uczestnicy są oceniani przez profesjonalne jury składające się z 6 osób,
                    posiadających doświadczenie w branży saunowej.
                  </li>
                  <li>
                    Kryteria oceny obejmują:
                    <div className="mt-3 space-y-4">
                      <div className="bg-cream-50 rounded-xl p-5 border border-cream-300">
                        <h4 className="font-bold text-graphite-900 mb-2">
                          a) seans dowolny (60 pkt):
                        </h4>
                        <ul className="list-disc ml-6 space-y-1">
                          <li>Profesjonalizm (16 pkt),</li>
                          <li>Wzrost temperatury - dystrybucja ciepła (10 pkt),</li>
                          <li>Zapach (9 pkt),</li>
                          <li>Techniki wachlowania (15 pkt),</li>
                          <li>Atmosfera (10 pkt).</li>
                        </ul>
                      </div>

                      <div className="bg-cream-50 rounded-xl p-5 border border-cream-300">
                        <h4 className="font-bold text-graphite-900 mb-2">
                          b) seans cichy (60 pkt):
                        </h4>
                        <ul className="list-disc ml-6 space-y-1">
                          <li>Profesjonalizm (24 pkt),</li>
                          <li>Atmosfera i odczucia (20 pkt),</li>
                          <li>Zapachy (16 pkt).</li>
                        </ul>
                      </div>

                      <div className="bg-cream-50 rounded-xl p-5 border border-cream-300">
                        <h4 className="font-bold text-graphite-900 mb-2">
                          c) seans w łaźni parowej (35 pkt):
                        </h4>
                        <ul className="list-disc ml-6 space-y-1">
                          <li>Prezentacja (14 pkt),</li>
                          <li>Przebieg ceremonii (13 pkt),</li>
                          <li>Zapachy (8 pkt).</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <strong>Maksymalna liczba punktów do zdobycia wynosi 155.</strong>
                  </li>
                </ol>
              </div>

              {/* §6 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §6. Nagrody
                </h2>
                <ol className="space-y-3 text-graphite-700 leading-relaxed">
                  <li>
                    Zwycięzca zawodów otrzymuje tytuł &ldquo;Najlepszego Saunamistrza MoA - Masters of
                    Aufguss&rdquo; oraz nagrodę główną.
                  </li>
                  <li>
                    Dla zdobywców drugiego i trzeciego miejsca przewidziane są nagrody rzeczowe.
                  </li>
                </ol>
              </div>

              {/* §7 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §7. Zasady bezpieczeństwa
                </h2>
                <ol className="space-y-3 text-graphite-700 leading-relaxed">
                  <li>
                    Wszyscy uczestnicy są zobowiązani do przestrzegania zasad bezpieczeństwa
                    obowiązujących w saunach.
                  </li>
                  <li>
                    Używanie materiałów łatwopalnych, zakazanych substancji lub niebezpiecznych
                    przedmiotów jest zabronione.
                  </li>
                </ol>
              </div>

              {/* §8 */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-4 border-b-2 border-gold-200 pb-2">
                  §8. Postanowienia końcowe
                </h2>
                <ol className="space-y-3 text-graphite-700 leading-relaxed">
                  <li>
                    Organizator zastrzega sobie prawo do wprowadzania zmian w regulaminie do dnia
                    ...
                  </li>
                  <li>
                    Wszelkie kwestie sporne rozstrzyga jury lub organizator zawodów.
                  </li>
                </ol>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-cream-50 to-gold-50 border-t-2 border-gold-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn delay={0.3}>
            <h2 className="text-3xl font-serif font-bold text-graphite-900 mb-4">
              Masz pytania dotyczące regulaminu?
            </h2>
            <p className="text-lg text-graphite-600 mb-8">
              Skontaktuj się z nami lub wróć do strony zawodów MoA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/zawody-moa"
                className="px-8 py-4 bg-gold-600 text-white font-bold rounded-xl hover:bg-gold-700 transition-colors shadow-lg hover:shadow-xl text-lg"
              >
                Wróć do strony MoA
              </Link>
              <Link
                href="/kontakt"
                className="px-8 py-4 border-2 border-gold-600 text-gold-700 font-bold rounded-xl hover:bg-gold-600 hover:text-white transition-colors text-lg"
              >
                Skontaktuj się z nami
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
