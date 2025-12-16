import {
  MoaCeremonyType,
  MoaCompetition,
  MoaTestimonial,
  MoaNews,
} from '@/types/moa';

/**
 * Three types of Aufguss ceremonies in MoA competitions
 * Based on official MoA regulations
 */
export const MOA_CEREMONY_TYPES: MoaCeremonyType[] = [
  {
    title: 'Seans dowolny',
    icon: '🎭',
    maxPoints: 60,
    description:
      'Wejdź do sauny i poczuj, jak ciepło budzi pewność siebie Saunamistrza. Ma on jasne zadanie: zaprezentować się, aby zapamiętać go jako najlepiej. Autentyczność to jego klucz do sukcesu - to moment by zabłysnąć.',
    imageUrl: '', // Gradient placeholder
    criteria: [
      { name: 'Profesjonalizm', points: 16 },
      { name: 'Wzrost temperatury - dystrybucja ciepła', points: 10 },
      { name: 'Zapach', points: 9 },
      { name: 'Techniki wachlowania', points: 15 },
      { name: 'Atmosfera', points: 10 },
    ],
  },
  {
    title: 'Seans cichy',
    icon: '🧘',
    maxPoints: 60,
    description:
      'Tutaj nie ma słów - tylko oddech, ciepło i harmonia. Zamknij oczy, wsłuchaj się w szept pary, poczuj jak napięcie opuszcza Twoje ciało. Każdy wdech to spokój, każdy wydech to uwolnienie. To czas dla Ciebie - zanurz się w ciszy i pozwól jej mówić.',
    imageUrl: '',
    criteria: [
      { name: 'Profesjonalizm', points: 24 },
      { name: 'Atmosfera i odczucia', points: 20 },
      { name: 'Zapachy', points: 16 },
    ],
  },
  {
    title: 'Seans z łaźni parowej',
    icon: '💆',
    maxPoints: 35,
    description:
      'Twoje ciało niczym kojący dotyk natury doświadczy magię peelingów, masek i olejków, które w połączeniu z parą intensywnie oczyszczają i regenerują ciało. Saunamistrz poprowadzi Cię przez cały etap pielęgnacyjnego rytuału.',
    imageUrl: '',
    criteria: [
      { name: 'Prezentacja', points: 14 },
      { name: 'Przebieg ceremonii', points: 13 },
      { name: 'Zapachy', points: 8 },
    ],
  },
];

/**
 * Core features of MoA competitions
 */
export const MOA_FEATURES = [
  {
    icon: '🎭',
    title: 'Sztuka Ceremonii',
    description:
      'Połączenie techniki, muzyki, aromatów i choreografii w jedną harmonijną całość.',
  },
  {
    icon: '🏆',
    title: 'Rywalizacja',
    description:
      'Najlepsi mistrzowie Aufguss z całego świata prezentują swoje unikalne ceremonie.',
  },
  {
    icon: '🎓',
    title: 'Edukacja',
    description:
      'Warsztaty, prezentacje i wymiana wiedzy między uczestnikami i publicznością.',
  },
  {
    icon: '🌍',
    title: 'Społeczność',
    description:
      'Budowanie globalnej społeczności pasjonatów saunowania i kultury wellness.',
  },
];

/**
 * Past MoA competition editions
 */
export const MOA_PAST_EDITIONS: MoaCompetition[] = [
  {
    year: '2024',
    location: 'Warszawa, Polska',
    title: 'MoA Poland Championships 2024',
    slug: '2024-warszawa',
    winner: {
      name: 'Mateusz',
      affiliation: 'Instytut Saunowy',
    },
    participants: 24,
    description:
      'Niezapomniana edycja pełna emocji, kreatywności i mistrzowskich ceremonii Aufguss. Rekordo wa liczba uczestników i międzynarodowe jury sprawiły, że było to wyjątkowe wydarzenie.',
    highlights: [
      'Rekordowa liczba uczestników - 24 mistrzów',
      'Międzynarodowe jury z 5 krajów',
      'Innowacyjne ceremonie z elementami teatralnymi',
      'Warsztaty dla publiczności - Aufguss dla wszystkich',
    ],
    color: 'from-gold-500 to-gold-600',
    images: [],
    status: 'published',
  },
  {
    year: '2023',
    location: 'Kraków, Polska',
    title: 'MoA Poland Championships 2023',
    slug: '2023-krakow',
    winner: {
      name: 'Anna Nowak',
      affiliation: 'SPA Natura',
    },
    participants: 18,
    description:
      'Pierwsza polska edycja zawodów Masters of Aufguss, która ustanowiła nowe standardy i pokazała, że Polska ma utalentowanych mistrzów ceremonii saunowych.',
    highlights: [
      'Premiera MoA w Polsce',
      'Profesjonalne jury ekspertów',
      'Ceremonie tematyczne inspirowane naturą',
      'Networking mistrzów z całego kraju',
    ],
    color: 'from-nordic-500 to-nordic-600',
    images: [],
    status: 'published',
  },
  {
    year: '2022',
    location: 'Berlin, Niemcy',
    title: 'European MoA Finals 2022',
    slug: '2022-berlin',
    winner: {
      name: 'Mateusz',
      affiliation: 'Instytut Saunowy',
    },
    participants: 32,
    description:
      'Międzynarodowa rywalizacja najlepszych mistrzów Aufguss z całej Europy. Prestiżowe wydarzenie, które pokazało moc tradycji saunowej w nowoczesnym wydaniu.',
    highlights: [
      '12 krajów uczestniczących',
      'Spektakularne ceremonie z efektami świetlnymi',
      'Media coverage - transmisje na żywo',
      'Nagrody główne o wartości 15 000 EUR',
    ],
    color: 'from-forest-500 to-warmwood-600',
    images: [],
    status: 'published',
  },
];

/**
 * Testimonials from past participants
 */
export const MOA_TESTIMONIALS: MoaTestimonial[] = [
  {
    name: 'Mateusz',
    role: 'Zwycięzca MoA 2024',
    quote:
      'Zawody MoA to nie tylko rywalizacja, ale przede wszystkim wymiana doświadczeń z najlepszymi mistrzami z całego świata. To inspirująca podróż, która podnosi nasze umiejętności na wyższy poziom.',
    year: '2024',
  },
  {
    name: 'Anna Kowalska',
    role: 'Uczestniczka MoA 2023',
    quote:
      'Atmosfera zawodów jest niesamowita! Czułam wsparcie zarówno ze strony jury, jak i innych uczestników. To doświadczenie zmieniło moje podejście do ceremonii Aufguss.',
    year: '2023',
  },
  {
    name: 'Jan Nowak',
    role: 'Finalista MoA 2024',
    quote:
      'Profesjonalna organizacja, międzynarodowe jury i najwyższy poziom ceremonii. MoA to punkt odniesienia dla każdego, kto chce rozwijać się w sztuce Aufguss.',
    year: '2024',
  },
];

/**
 * News/updates about MoA competitions (for future CMS integration)
 * Currently static, can be migrated to database later
 */
export const MOA_NEWS: MoaNews[] = [
  {
    id: '1',
    title: 'Zapisz się na MoA 2025',
    date: new Date('2025-01-15'),
    excerpt:
      'Rozpoczęliśmy przyjmowanie zgłoszeń na kolejną edycję zawodów Masters of Aufguss. Nie przegap szansy na udział w najbardziej prestiżowym wydarzeniu w świecie ceremonii saunowych!',
    slug: 'zapisz-sie-na-moa-2025',
  },
  {
    id: '2',
    title: 'Nowe kategorie w MoA 2025',
    date: new Date('2025-01-10'),
    excerpt:
      'W nadchodzącej edycji wprowadzamy kategorię "Innowacje w Aufguss" - dla ceremonii wykorzystujących nowoczesne technologie i kreatywne podejście do tradycji.',
    slug: 'nowe-kategorie-moa-2025',
  },
  {
    id: '3',
    title: 'Relacja z MoA 2024',
    date: new Date('2024-11-20'),
    excerpt:
      'Zobaczcie najpiękniejsze momenty z tegorocznej edycji. 24 mistrzów, 3 rundy, niezapomniane emocje. Galeria zdjęć i wideo już dostępna!',
    slug: 'relacja-moa-2024',
  },
];
