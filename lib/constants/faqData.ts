export interface FAQItem {
  question: string;
  answer: string;
  category: 'trainings' | 'payments' | 'products' | 'general';
}

export const FAQ_DATA: FAQItem[] = [
  // Szkolenia
  {
    question: 'Czy potrzebuję wcześniejszego doświadczenia z sauną?',
    answer:
      'Nie, nasze szkolenia podstawowe są dostosowane zarówno dla początkujących, jak i osób z doświadczeniem. Każdy poziom szkolenia jasno określa wymagania wstępne. Zobacz pełną <a href="/szkolenia" class="text-nordic-600 hover:text-nordic-800 font-medium underline">ofertę szkoleń</a>.',
    category: 'trainings',
  },
  {
    question: 'Jak wygląda certyfikacja po szkoleniu?',
    answer:
      'Po ukończeniu szkolenia i zdaniu egzaminu praktycznego otrzymujesz certyfikat Instytutu Saunowego potwierdzający zdobyte kompetencje. Certyfikat jest honorowany przez partnerskie sauny w całej Polsce.',
    category: 'trainings',
  },
  {
    question: 'Czy mogę wrócić na szkolenie, jeśli nie zdam egzaminu?',
    answer:
      'Tak, oferujemy możliwość powtórzenia egzaminu w ciągu 6 miesięcy od ukończenia szkolenia. Dodatkowy egzamin jest bezpłatny. W razie potrzeby możesz również wziąć udział w kolejnym terminie szkolenia z 50% zniżką.',
    category: 'trainings',
  },
  {
    question: 'Ile osób uczestniczy w szkoleniu?',
    answer:
      'Nasze grupy są kameralne - maksymalnie 8-12 uczestników w zależności od typu szkolenia. Dzięki temu każdy otrzymuje indywidualną uwagę instruktora i możliwość praktycznego ćwiczenia technik.',
    category: 'trainings',
  },

  // Płatności i rezerwacje
  {
    question: 'Jakie formy płatności akceptujecie?',
    answer:
      'Akceptujemy płatności kartą (Visa, Mastercard) oraz szybkie przelewy (Przelewy24, BLIK). Wszystkie płatności są bezpiecznie przetwarzane przez Stripe. Możliwa jest również wpłata zaliczki - szczegóły przy rezerwacji.',
    category: 'payments',
  },
  {
    question: 'Czy mogę anulować rezerwację szkolenia?',
    answer:
      'Tak, możesz anulować rezerwację do 14 dni przed terminem szkolenia i otrzymać pełny zwrot środków. Przy anulowaniu 7-14 dni przed terminem zwracamy 50% kwoty. Mniej niż 7 dni przed - brak zwrotu.',
    category: 'payments',
  },
  {
    question: 'Jak działa system zaliczek?',
    answer:
      'Przy rezerwacji możesz wpłacić zaliczkę (zazwyczaj 30% ceny szkolenia), a resztę uiścić na miejscu przed rozpoczęciem. To dobra opcja, jeśli chcesz zarezerwować miejsce, ale rozłożyć płatność w czasie.',
    category: 'payments',
  },

  // Produkty
  {
    question: 'Jak długo trwa dostawa produktów?',
    answer:
      'Standardowa dostawa kurierem trwa 2-3 dni robocze. Oferujemy również odbiór osobisty w wybranych lokalizacjach. Wszystkie produkty w <a href="/sklep" class="text-nordic-600 hover:text-nordic-800 font-medium underline">sklepie</a> są dostępne od ręki.',
    category: 'products',
  },
  {
    question: 'Czy produkty mają gwarancję?',
    answer:
      'Tak, wszystkie produkty objęte są 24-miesięczną gwarancją producenta. Dodatkowo masz 14 dni na zwrot bez podania przyczyny (dotyczy produktów nieużywanych w oryginalnym opakowaniu).',
    category: 'products',
  },
  {
    question: 'Czy wysyłacie produkty za granicę?',
    answer:
      'Obecnie wysyłamy tylko na terenie Polski. Jeśli jesteś zainteresowany wysyłką międzynarodową, skontaktuj się z nami - rozpatrzymy indywidualną prośbę.',
    category: 'products',
  },

  // Ogólne
  {
    question: 'Gdzie odbywają się szkolenia?',
    answer:
      'Szkolenia prowadzimy w różnych lokalizacjach w całej Polsce - głównie w profesjonalnych saunach partnerskich. Każde szkolenie ma przypisaną konkretną lokalizację widoczną na <a href="/szkolenia" class="text-nordic-600 hover:text-nordic-800 font-medium underline">stronie szkolenia</a>.',
    category: 'general',
  },
  {
    question: 'Czy prowadzicie szkolenia indywidualne?',
    answer:
      'Tak, oferujemy szkolenia indywidualne lub dla zamkniętych grup (np. zespoły firm, grupy znajomych). Skontaktuj się z nami, aby omówić szczegóły i wycenę dostosowaną do Twoich potrzeb.',
    category: 'general',
  },
];

// Helper function to get FAQs by category
export function getFAQsByCategory(category: FAQItem['category']): FAQItem[] {
  return FAQ_DATA.filter((faq) => faq.category === category);
}

// Category labels in Polish
export const FAQ_CATEGORY_LABELS: Record<FAQItem['category'], string> = {
  trainings: 'Szkolenia',
  payments: 'Płatności i rezerwacje',
  products: 'Produkty',
  general: 'Ogólne',
};
