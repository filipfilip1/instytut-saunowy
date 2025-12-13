import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb';
import BlogPost from '../lib/models/BlogPost';

const samplePosts = [
  {
    title: '10 Zasad Bezpiecznego Saunowania dla Początkujących',
    slug: '10-zasad-bezpiecznego-saunowania',
    excerpt: 'Odkryj podstawowe zasady bezpieczeństwa w saunie. Dowiedz się, jak cieszyć się saunowaniem bez ryzyka i z maksymalną korzyścią dla zdrowia.',
    content: `
      <h2>Wprowadzenie</h2>
      <p>Sauna to jedno z najstarszych i najbardziej skutecznych sposobów relaksu i regeneracji. Jednak by czerpać z niej pełnię korzyści, trzeba znać kilka podstawowych zasad bezpieczeństwa.</p>

      <h2>1. Nawodnienie przed sauną</h2>
      <p>Przed wejściem do sauny wypij przynajmniej szklankę wody. Podczas seansu możesz stracić nawet pół litra płynów przez pocenie się.</p>

      <h2>2. Prysznic przed wejściem</h2>
      <p>Zawsze bierz prysznic przed sauną - to kwestia higieny i komfortu innych użytkowników. Ciepła woda dodatkowo przygotuje ciało do wysokiej temperatury.</p>

      <h2>3. Zacznij od niższej temperatury</h2>
      <p>Jeśli jesteś początkujący, zacznij od temperatury 60-70°C i krótszych sesji (5-10 minut). Z czasem stopniowo zwiększaj czas i temperaturę.</p>

      <h2>4. Słuchaj swojego ciała</h2>
      <p>Jeśli poczujesz zawroty głowy, mdłości lub dyskomfort - natychmiast opuść saunę. To nie jest konkurencja na wytrzymałość!</p>

      <h2>5. Ochłodzenie po saunie</h2>
      <p>Po wyjściu z sauny ochłódź się stopniowo - świeże powietrze, zimny prysznic lub basen. To kluczowy element cyklu saunowego.</p>

      <h2>6. Relaks między sesjami</h2>
      <p>Pomiędzy kolejnymi wejściami zrób sobie 15-20 minut przerwy. Pozwól ciału odpocząć i zregenerować się.</p>

      <h2>7. Unikaj alkoholu</h2>
      <p>Nigdy nie łącz saunowania z piciem alkoholu. To bardzo niebezpieczne połączenie, które może prowadzić do poważnych problemów zdrowotnych.</p>

      <h2>8. Jedz lekko</h2>
      <p>Unikaj ciężkich posiłków przed sauną. Najlepiej zjedz coś lekkiego godzinę przed seansem.</p>

      <h2>9. Zdejmij biżuterię</h2>
      <p>Metal nagrzewa się w saunie i może poparzyć skórę. Przed wejściem zdejmij wszystkie metalowe przedmioty.</p>

      <h2>10. Konsultuj się z lekarzem</h2>
      <p>Jeśli masz problemy ze zdrowiem (zwłaszcza z sercem, ciśnieniem lub układem krążenia), skonsultuj się z lekarzem przed pierwszym saunowaniem.</p>

      <h2>Podsumowanie</h2>
      <p>Pamiętaj - sauna powinna być przyjemnością, nie wyzwaniem. Przestrzegając tych prostych zasad, będziesz mógł cieszyć się wszystkimi korzyściami saunowania bez żadnego ryzyka.</p>
    `,
    author: {
      name: 'Mateusz',
      role: 'Master Aufguss',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
      alt: 'Sauna fińska z drewnianym wnętrzem',
    },
    category: 'poradniki',
    tags: ['bezpieczeństwo', 'podstawy', 'dla początkujących', 'zdrowie'],
    readTime: 6,
    isPublished: true,
    viewCount: 127,
  },
  {
    title: 'Aufguss - Sztuka Ceremonii Saunowej',
    slug: 'aufguss-sztuka-ceremonii-saunowej',
    excerpt: 'Poznaj tradycję niemieckiego Aufguss i odkryj, czym różni się od zwykłego saunowania. Historia, technika i filozofia tej wyjątkowej ceremonii.',
    content: `
      <h2>Czym jest Aufguss?</h2>
      <p>Aufguss to niemiecka tradycja ceremonii saunowej, która przekształca zwykłe saunowanie w niezapomniane doświadczenie sensoryczne. Słowo "Aufguss" oznacza dosłownie "podlewanie" - odnosi się do lejnia wody z olejkami eterycznymi na rozgrzane kamienie.</p>

      <h2>Historia Aufguss</h2>
      <p>Tradycja Aufguss zrodziła się w Niemczech w połowie XX wieku. Z czasem rozwinęła się w prawdziwą sztukę, łączącą elementy teatru, aromaterapii i technik relaksacyjnych.</p>

      <h2>Elementy ceremonii</h2>
      <h3>1. Przygotowanie</h3>
      <p>Mistrz Aufguss przygotowuje specjalną mieszankę wody z olejkami eterycznymi - to jego autorski "przepis" na daną sesję.</p>

      <h3>2. Podlewanie</h3>
      <p>Woda z olejkami trafia na rozgrzane kamienie, tworząc intensywną parę nasycone aromatem.</p>

      <h3>3. Praca ręcznikiem</h3>
      <p>To najbardziej spektakularny element - mistrz rozprowadza gorącą parę specjalnymi ruchami dużego ręcznika, tworząc fale gorącego powietrza.</p>

      <h3>4. Muzyka i choreografia</h3>
      <p>Współczesny Aufguss często łączy się z muzyką i choreografią, tworząc spójne show.</p>

      <h2>Korzyści Aufguss</h2>
      <ul>
        <li><strong>Głębszy relaks</strong> - aromaterapia działa na zmysły</li>
        <li><strong>Lepszy przepływ ciepła</strong> - praca ręcznikiem równomiernie rozprowadza temperaturę</li>
        <li><strong>Doświadczenie społeczne</strong> - wspólny przeżycie łączy uczestników</li>
        <li><strong>Element show</strong> - to nie tylko sauna, to wydarzenie</li>
      </ul>

      <h2>Zawody Masters of Aufguss</h2>
      <p>Najlepsi mistrzowie Aufguss rywalizują na międzynarodowych zawodach, pokazując swoje umiejętności w pracy ręcznikiem, kompozycji zapachowej i kreowaniu atmosfery.</p>

      <blockquote>
        <p>"Aufguss to nie tylko technika - to sposób dzielenia się pasją i tworzenia wyjątkowych chwil dla innych." - Mateusz, Master Aufguss</p>
      </blockquote>

      <h2>Jak doświadczyć Aufguss?</h2>
      <p>Jeśli chcesz doświadczyć profesjonalnego Aufguss, szukaj saun i ośrodków SPA, które oferują regularne sesje. Warto też rozważyć udział w naszych szkoleniach, jeśli chcesz samemu nauczyć się tej sztuki!</p>
    `,
    author: {
      name: 'Mateusz',
      role: 'Master Aufguss',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200',
      alt: 'Mistrz Aufguss podczas ceremonii',
    },
    category: 'szkolenia',
    tags: ['aufguss', 'ceremonia', 'tradycja', 'technika'],
    readTime: 8,
    isPublished: true,
    viewCount: 243,
  },
  {
    title: 'DIY: Jak Zrobić Własny Peeling do Sauny?',
    slug: 'diy-peeling-do-sauny',
    excerpt: 'Prosty przepis na domowy peeling solny idealny do użycia w saunie. Naturalne składniki, wspaniały efekt i oszczędność pieniędzy!',
    content: `
      <h2>Dlaczego warto stosować peeling w saunie?</h2>
      <p>Sauna otwiera pory skóry, przez co peeling działa dużo skuteczniej. To idealny moment na usunięcie martwych komórek naskórka i odżywienie skóry.</p>

      <h2>Przepis na peeling solny</h2>
      <h3>Składniki:</h3>
      <ul>
        <li>1 szklanka soli morskiej (drobnoziarnistej)</li>
        <li>½ szklanki oleju kokosowego</li>
        <li>10 kropli olejku eterycznego (lawenda, eukaliptus lub mięta)</li>
        <li>1 łyżka miodu (opcjonalnie)</li>
      </ul>

      <h3>Przygotowanie:</h3>
      <ol>
        <li>Rozpuść olej kokosowy w kąpieli wodnej (jeśli jest stały)</li>
        <li>Wymieszaj sól z olejem kokosowym w misce</li>
        <li>Dodaj olejek eteryczny i miód</li>
        <li>Dokładnie wymieszaj wszystkie składniki</li>
        <li>Przełóż do szczelnego pojemnika</li>
      </ol>

      <h2>Jak stosować?</h2>
      <p>Najlepiej użyć peelingu po pierwszym wyjściu z sauny:</p>
      <ol>
        <li>Weź krótki prysznic, aby zwilżyć skórę</li>
        <li>Nałóż peeling okrężnymi ruchami na całe ciało</li>
        <li>Szczególną uwagę poświęć łokciom, kolanom i stopom</li>
        <li>Masuj przez 2-3 minuty</li>
        <li>Spłucz ciepłą wodą</li>
        <li>Wróć do sauny na kolejny seans</li>
      </ol>

      <h2>Warianty peelingów</h2>
      <h3>Energetyzujący (poranna sauna)</h3>
      <ul>
        <li>Sól morska + olej jojoba + olejek miętowy + startd pomarańczowa</li>
      </ul>

      <h3>Relaksujący (wieczorna sauna)</h3>
      <ul>
        <li>Sól morska + olej migdałowy + olejek lawendowy + płatki róży</li>
      </ul>

      <h3>Oczyszczający (dla skóry problematycznej)</h3>
      <ul>
        <li>Sól morska + olej tea tree + olejek eukaliptusowy + glinka</li>
      </ul>

      <h2>Przechowywanie</h2>
      <p>Peeling przechowuj w szczelnym pojemniku w chłodnym, ciemnym miejscu. Zużyj w ciągu 2-3 miesięcy. Przed każdym użyciem dokładnie wymieszaj.</p>

      <h2>Korzyści domowego peelingu</h2>
      <ul>
        <li>Wiesz dokładnie, co nakładasz na skórę</li>
        <li>Naturalne składniki bez chemii</li>
        <li>Kosztuje ułamek ceny komercyjnych produktów</li>
        <li>Możesz dostosować do swoich potrzeb</li>
        <li>Świetny pomysł na prezent!</li>
      </ul>

      <blockquote>
        <p>Regularny peeling w saunie to jeden z sekretów zdrowej, promieniującej skóry. A gdy zrobisz go sam, jest jeszcze lepszy!</p>
      </blockquote>
    `,
    author: {
      name: 'Magdalena',
      role: 'Wellness Expert',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200',
      alt: 'Naturalne składniki do peelingu',
    },
    category: 'diy',
    tags: ['diy', 'peeling', 'pielęgnacja', 'przepisy'],
    readTime: 5,
    isPublished: true,
    viewCount: 189,
  },
  {
    title: 'Trendy Wellness 2025: Co Nas Czeka?',
    slug: 'trendy-wellness-2025',
    excerpt: 'Przegląd najnowszych trendów w świecie wellness i saunowania. Od technologii po powrót do tradycji - sprawdź, co będzie hitem w 2025 roku.',
    content: `
      <h2>Wprowadzenie</h2>
      <p>Branża wellness nieustannie się rozwija. Oto najważniejsze trendy, które będą kształtować świat saunowania i relaksu w nadchodzącym roku.</p>

      <h2>1. Hipersauna - Technologia Spotyka Tradycję</h2>
      <p>Nowoczesne sauny wyposażone w systemy LED, oświetlenie chromoterapii i zaawansowane systemy audio. To połączenie tradycyjnego gorąca z nowoczesnymi doświadczeniami sensorycznymi.</p>

      <h3>Funkcje hipersauny:</h3>
      <ul>
        <li>Programowalne sekwencje temperatury</li>
        <li>Integracja z aplikacjami mobilnymi</li>
        <li>Chromoterapia (terapia światłem)</li>
        <li>Aromaterapia z automatycznymi dozownikami</li>
      </ul>

      <h2>2. Powrót do Natury</h2>
      <p>Paradoksalnie, wraz z rozwojem technologii obserwujemy również powrót do źródeł. Sauny beczki, leśne sauny i kąpiele lodowe w naturalnych zbiornikach to hity sezonu.</p>

      <h2>3. Wellness jako Lifestyle</h2>
      <p>Sauna przestaje być raz w miesiącu luksusem - staje się częścią codziennej rutyny dbania o siebie. Prywatne sauny domowe biją rekordy popularności.</p>

      <h2>4. Aufguss 2.0</h2>
      <p>Tradycyjna ceremonia Aufguss ewoluuje - widzimy elementy performance art, video mapping, a nawet live streaming sesji dla szerszej publiczności.</p>

      <h2>5. Regeneracja + Sauna</h2>
      <p>Integracja sauny z innymi formami regeneracji:</p>
      <ul>
        <li>Krioterapia + Sauna = Kontrast temperatur</li>
        <li>Stretching w ogrzanym pomieszczeniu</li>
        <li>Medytacja guided w saunie</li>
        <li>Sesje breathwork przed lub po saunie</li>
      </ul>

      <h2>6. Sauny Tematyczne</h2>
      <p>Coraz więcej ośrodków oferuje sauny tematyczne - od sauny himalajskiej (z solą z Himalajów) po sauny leśne (z aromatami lasu).</p>

      <h2>7. Wellness Community</h2>
      <p>Saunowanie staje się doświadczeniem społecznościowym. Kluby saunowe, wydarzenia i zawody budują społeczność wokół tej pasji.</p>

      <h2>8. Sustainability</h2>
      <p>Ekologiczne sauny z odnawialnych źródeł energii, naturalne materiały i zero waste w produktach - to standard 2025.</p>

      <h2>Podsumowanie</h2>
      <p>Czy podążysz za najnowszymi trendami czy pozostaniesz przy tradycji - pamiętaj, że najważniejsze to twoja przyjemność i korzyści dla zdrowia!</p>
    `,
    author: {
      name: 'Magdalena',
      role: 'Wellness Expert',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200',
      alt: 'Nowoczesna sauna z oświetleniem LED',
    },
    category: 'trendy',
    tags: ['trendy', '2025', 'wellness', 'innowacje'],
    readTime: 7,
    isPublished: true,
    viewCount: 312,
  },
  {
    title: 'Wpływ Saunowania na Układ Odpornościowy',
    slug: 'wplyw-saunowania-na-odpornosc',
    excerpt: 'Badania naukowe potwierdzają - regularne saunowanie wzmacnia odporność. Dowiedz się jak i dlaczego sauna pomaga w walce z infekcjami.',
    content: `
      <h2>Wstęp</h2>
      <p>Czy wiedziałeś, że regularne saunowanie może być naturalnym sposobem na wzmocnienie układu odpornościowego? Oto co mówią badania naukowe.</p>

      <h2>Co dzieje się z ciałem w saunie?</h2>
      <p>Podczas saunowania temperatura ciała wzrasta o 1-2°C, co wywołuje reakcję podobną do gorączki. To właśnie ten mechanizm aktywuje nasz układ immunologiczny.</p>

      <h2>Wpływ na produkcję białych krwinek</h2>
      <p>Badania z University of Vienna wykazały, że regularneсaunowanie zwiększa produkcję białych krwinek - głównych żołnierzy naszego układu odpornościowego.</p>

      <h3>Kluczowe odkrycia:</h3>
      <ul>
        <li>30% wzrost liczby białych krwinek bezpośrednio po saunie</li>
        <li>Efekt utrzymuje się przez kilka godzin</li>
        <li>Długotrwały wpływ przy regularnym saunowaniu (3-4x/tydzień)</li>
      </ul>

      <h2>Detoksykacja organizmu</h2>
      <p>Intensywne pocenie w saunie pomaga w usuwaniu toksyn z organizmu:</p>
      <ul>
        <li>Metale ciężkie (ołów, rtęć, kadm)</li>
        <li>BPA z plastików</li>
        <li>Resztki pestycydów</li>
        <li>Inne toksyny środowiskowe</li>
      </ul>

      <h2>Redukcja stresu = Lepsza odporność</h2>
      <p>Chroniczny stres osłabia układ odpornościowy. Sauna obniża poziom kortyzolu (hormonu stresu) i zwiększa produkcję endorfin.</p>

      <h2>Badania kliniczne</h2>
      <blockquote>
        <p>Fińskie badanie z 2017 roku wykazało, że osoby korzystające z sauny 2-3 razy w tygodniu miały o 29% mniejsze ryzyko przeziębień i infekcji górnych dróg oddechowych.</p>
      </blockquote>

      <h2>Jak saunować dla maksymalnej odporności?</h2>
      <h3>Częstotliwość:</h3>
      <ul>
        <li>Minimum 2-3 razy w tygodniu</li>
        <li>Optymalnie 4-5 razy w tygodniu</li>
      </ul>

      <h3>Czas:</h3>
      <ul>
        <li>15-20 minut na sesję</li>
        <li>2-3 wejścia z przerwami</li>
      </ul>

      <h3>Temperatura:</h3>
      <ul>
        <li>70-80°C dla większości osób</li>
        <li>Do 90°C dla zaawansowanych</li>
      </ul>

      <h2>Kiedy NIE saunować?</h2>
      <p>Unikaj sauny gdy:</p>
      <ul>
        <li>Masz wysoką gorączkę (powyżej 38°C)</li>
        <li>Jesteś w trakcie aktywnej infekcji</li>
        <li>Czujesz się bardzo osłabiony</li>
      </ul>

      <p>W takich przypadkach poczekaj aż poczujesz się lepiej!</p>

      <h2>Wsparcie diety</h2>
      <p>Maksymalizuj efekty łącząc saunowanie z:</p>
      <ul>
        <li>Witaminą C (1000mg dziennie)</li>
        <li>Witaminą D3 (2000-4000 IU)</li>
        <li>Cynkiem (15-30mg)</li>
        <li>Probiotykami</li>
      </ul>

      <h2>Podsumowanie</h2>
      <p>Regularne saunowanie to prosty, przyjemny i naukowo potwierdzony sposób na wzmocnienie odporności. Zadbaj o siebie naturalnie!</p>
    `,
    author: {
      name: 'Mateusz',
      role: 'Master Aufguss',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
      alt: 'Zdrowa osoba relaksująca się w saunie',
    },
    category: 'zdrowie',
    tags: ['zdrowie', 'odporność', 'nauka', 'korzyści'],
    readTime: 9,
    isPublished: true,
    viewCount: 421,
  },
];

export async function seedBlogPosts() {
  try {
    await dbConnect();

    // Clear existing posts
    await BlogPost.deleteMany({});
    console.log('✅ Cleared existing blog posts');

    // Insert sample posts
    const result = await BlogPost.insertMany(samplePosts);
    console.log(`✅ Successfully seeded ${result.length} blog posts`);

    console.log('\nCreated posts:');
    result.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (/${post.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error);
    process.exit(1);
  }
}

// Run the seed function
seedBlogPosts();
