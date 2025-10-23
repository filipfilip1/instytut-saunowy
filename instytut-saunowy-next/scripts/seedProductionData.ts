import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import Product from '../lib/models/Product';
import connectDB from '../lib/mongodb';

/**
 * Skrypt seedujący bazę danych produktami produkcyjnymi
 * Dane oparte na wytycznych Instytutu Saunowego
 */

const productionProducts = [
  // ==================== KILTY ====================
  {
    name: 'Kilt Długi',
    category: 'kilty' as const,
    description: `Odkryj nowy wymiar komfortu i wygody z naszym kiltem do sauny, wykonanym ze 100% bawełny. Nasz produkt został stworzony z myślą o Twoim relaksie i swobodzie, zarówno podczas sesji saunowych, jak i w trakcie przemieszczania się po obiekcie spa.

Kilt doskonale sprawdzi się nie tylko podczas korzystania z sauny, ale także w trakcie ceremonii saunowych, zapewniając maksymalny komfort i wygodę. Jego wzór sprawia, że jest idealnym wyborem dla każdego, kto ceni sobie funkcjonalność i styl.`,
    basePrice: 100.00,
    images: [
      {
        id: 'img-kilt-dlugi-1',
        url: 'https://placehold.co/800x800/png?text=Kilt+Dlugi',
        alt: 'Kilt Długi',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-pattern',
        name: 'Wzór',
        options: [
          { id: 'pattern-black-gold-leaves', value: 'Czarno-Złote Liście', stock: 5, priceModifier: 0 },
          { id: 'pattern-blue-gold-leaves', value: 'Niebiesko-Złote Liście', stock: 5, priceModifier: 0 },
          { id: 'pattern-paris', value: 'Paris', stock: 5, priceModifier: 0 },
          { id: 'pattern-offroad', value: 'Off Road', stock: 5, priceModifier: 0 },
          { id: 'pattern-newyork', value: 'New York', stock: 5, priceModifier: 0 },
          { id: 'pattern-london', value: 'London', stock: 5, priceModifier: 0 },
          { id: 'pattern-mouse-ballerina', value: 'Mysia Baletnica', stock: 5, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% bawełna - miękka, przewiewna i przyjazna dla skóry',
      'Komfort: zapewnia wygodę i swobodę ruchów',
      'Uniwersalność: idealny do sauny, spa, wellness oraz na co dzień',
      'Płeć: Unisex - doskonały zarówno dla kobiet, jak i mężczyzn',
      'Wymiary: długość - 55cm (+/- 1cm); maks. szerokość gumki - 120cm (+/- 1cm)',
      'Zalecamy prać produkt w trybie prania ręcznego w 30/40°C, aby zachować jego wyraziste kolory na dłużej'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Kilt Długi do Sauny - 100% Bawełna | Instytut Saunowy',
      metaDescription: 'Wysokiej jakości kilt długi do sauny wykonany ze 100% bawełny. Unisex, różne wzory. Długość 55cm. Idealny do ceremonii saunowych.',
      keywords: ['kilt do sauny', 'kilt długi', 'kilt bawełniany', 'kilt unisex', 'ceremonie saunowe']
    }
  },
  {
    name: 'Kilt Krótki',
    category: 'kilty' as const,
    description: `Odkryj nowy wymiar komfortu i wygody z naszym kiltem do sauny, wykonanym ze 100% bawełny. Nasz produkt został stworzony z myślą o Twoim relaksie i swobodzie, zarówno podczas sesji saunowych, jak i w trakcie przemieszczania się po obiekcie spa.

Kilt doskonale sprawdzi się nie tylko podczas korzystania z sauny, ale także w trakcie ceremonii saunowych, zapewniając maksymalny komfort i wygodę. Jego wzór sprawia, że jest idealnym wyborem dla każdego, kto ceni sobie funkcjonalność i styl.`,
    basePrice: 100.00,
    images: [
      {
        id: 'img-kilt-krotki-1',
        url: 'https://placehold.co/800x800/png?text=Kilt+Krotki',
        alt: 'Kilt Krótki',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-pattern-type',
        name: 'Rodzaj wzoru',
        options: [
          { id: 'type-classic', value: 'Klasyczny', stock: 30, priceModifier: 0 },
          { id: 'type-3d', value: 'Druk Cyfrowy 3D', stock: 15, priceModifier: 10 }
        ]
      },
      {
        id: 'var-pattern',
        name: 'Wzór',
        options: [
          // Wzory klasyczne
          { id: 'pattern-black-gold-leaves', value: 'Czarno-Złote Liście', stock: 5, priceModifier: 0 },
          { id: 'pattern-butterflies', value: 'Motyle', stock: 5, priceModifier: 0 },
          { id: 'pattern-folk', value: 'Folk', stock: 5, priceModifier: 0 },
          { id: 'pattern-clematis', value: 'Clematis', stock: 5, priceModifier: 0 },
          { id: 'pattern-pink-night', value: 'Różowa Noc', stock: 5, priceModifier: 0 },
          { id: 'pattern-teddy', value: 'Misiek', stock: 5, priceModifier: 0 },
          // Wzory 3D
          { id: 'pattern-3d-fox-basket', value: '3D/Lis z Koszykiem', stock: 5, priceModifier: 0 },
          { id: 'pattern-3d-cat-space', value: '3D/Kot w Kosmosie', stock: 5, priceModifier: 0 },
          { id: 'pattern-3d-unicorn', value: '3D/Unicorn', stock: 5, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% bawełna - miękka, przewiewna i przyjazna dla skóry',
      'Komfort: zapewnia wygodę i swobodę ruchów',
      'Uniwersalność: idealny do sauny, spa, wellness oraz na co dzień',
      'Płeć: Unisex - doskonały zarówno dla kobiet, jak i mężczyzn',
      'Wymiary: długość - 50cm (+/- 1cm); maks. szerokość gumki - 120cm (+/- 1cm)',
      'Zalecamy prać produkt w trybie prania ręcznego w 30/40°C, aby zachować jego wyraziste kolory na dłużej'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Kilt Krótki do Sauny - Wzory Klasyczne i 3D | Instytut Saunowy',
      metaDescription: 'Kilt krótki do sauny ze 100% bawełny. Dostępny w wersjach klasycznych i z drukiem 3D. Długość 50cm. Unisex.',
      keywords: ['kilt krótki', 'kilt 3d', 'kilt do sauny', 'kilt bawełniany', 'kilt wzory']
    }
  },
  {
    name: 'Kilt Wafel',
    category: 'kilty' as const,
    description: `Elegancki kilt wykonany z dzianiny wafel, idealny do sauny i spa. Materiał wafel zapewnia doskonałą chłonność i przewiewność, gwarantując komfort podczas relaksu.`,
    basePrice: 110.00,
    images: [
      {
        id: 'img-kilt-wafel-1',
        url: 'https://placehold.co/800x800/png?text=Kilt+Wafel',
        alt: 'Kilt Wafel',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-black', value: 'Czarny', stock: 10, priceModifier: 0 },
          { id: 'color-white', value: 'Biały', stock: 10, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Dzianina wafel',
      'Rozmiar: Unisex',
      'Długość: 60 cm (+/- 1cm)',
      'Max rozciągnięcie gumki: 130 cm (+/- 1cm)',
      'Doskonała chłonność i przewiewność',
      'Zalecane pranie w 30/40°C'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Kilt Wafel do Sauny - Unisex | Instytut Saunowy',
      metaDescription: 'Kilt z dzianiny wafel. Doskonała chłonność i przewiewność. Dostępny w kolorze czarnym i białym. Unisex.',
      keywords: ['kilt wafel', 'kilt dzianina', 'kilt saunowy', 'kilt unisex']
    }
  },

  // ==================== PONCZA ====================
  {
    name: 'Ponczo',
    category: 'poncha' as const,
    description: `Odkryj nowy wymiar komfortu i wygody z naszym Ponczem. Nasz produkt został stworzony z myślą o Twoim relaksie i swobodzie, zarówno podczas chłodnych wieczorów, jak i wygodnego poruszania się po obiektach spa.

Ponczo jest idealnym wyborem dla każdego, kto ceni sobie funkcjonalność i styl.`,
    basePrice: 250.00,
    images: [
      {
        id: 'img-ponczo-1',
        url: 'https://placehold.co/800x800/png?text=Ponczo',
        alt: 'Ponczo',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size-color',
        name: 'Rozmiar i kolor',
        options: [
          // Małe
          { id: 'size-small-black', value: 'Małe Czarne', stock: 5, priceModifier: 0 },
          { id: 'size-small-colorful', value: 'Małe Kolorowe', stock: 5, priceModifier: 0 },
          { id: 'size-small-gray', value: 'Małe Szare', stock: 5, priceModifier: 0 },
          // Średnie
          { id: 'size-medium-gray', value: 'Średnie Szare', stock: 1, priceModifier: 0 },
          // Duże
          { id: 'size-large-black', value: 'Duże Czarne', stock: 0, priceModifier: 0 },
          { id: 'size-large-colorful', value: 'Duże Kolorowe', stock: 5, priceModifier: 0 },
          { id: 'size-large-gray', value: 'Duże Szare', stock: 0, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Komfort: zapewnia wygodę i swobodę ruchów',
      'Uniwersalność: idealny do obiektów spa, wellness oraz na co dzień',
      'Płeć: Unisex - doskonały zarówno dla kobiet, jak i mężczyzn',
      'Wymiary Duże: długość - 115cm; szerokość - 78cm (+/- 1cm)',
      'Wymiary Średnie: długość - 97cm; szerokość - 78cm (+/- 1cm)',
      'Wymiary Małe: długość - 97cm; szerokość - 67cm (+/- 1cm)',
      'Zalecamy prać produkt w trybie prania ręcznego w 30/40°C'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Ponczo do Sauny i SPA - Różne Rozmiary | Instytut Saunowy',
      metaDescription: 'Wysokiej jakości ponczo do sauny i spa. Dostępne w trzech rozmiarach i różnych kolorach. Unisex, wygodne i funkcjonalne.',
      keywords: ['ponczo spa', 'ponczo sauna', 'ponczo unisex', 'ponczo relaks']
    }
  },

  // ==================== AKCESORIA ====================
  {
    name: 'Podstawa Drewniana na Kule Lodowe',
    category: 'akcesoria' as const,
    description: `Podstawa na kule wykonana z drewna bukowego na kule lodowe. Podstawa na kule wykonana jest z jednego kawałka drewna co sprawia, że jest bardzo wytrzymała.

Produkt lakierowany.`,
    basePrice: 299.00,
    images: [
      {
        id: 'img-podstawa-1',
        url: 'https://placehold.co/800x800/png?text=Podstawa+Drewniana',
        alt: 'Podstawa Drewniana na Kule Lodowe',
        isPrimary: true
      }
    ],
    variants: [],
    features: [
      'Materiał: drewno bukowe',
      'Wykonana z jednego kawałka drewna',
      'Produkt lakierowany',
      'Wymiary: 40 cm x 17 cm',
      'Bardzo wytrzymała konstrukcja',
      'Idealna do ceremonii saunowych'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Podstawa Drewniana na Kule Lodowe - Drewno Bukowe | Instytut Saunowy',
      metaDescription: 'Profesjonalna podstawa na kule lodowe z drewna bukowego. Lakierowana, wytrzymała. Wymiary 40x17cm. Dla saunamistrzów.',
      keywords: ['podstawa na kule', 'kule lodowe', 'ceremonie saunowe', 'akcesoria saunowe', 'drewno bukowe']
    }
  },
  {
    name: 'Forma Drewniana na Kule Lodowe',
    category: 'akcesoria' as const,
    description: `Formy wykonane z drewna bukowego do formowania kul lodowych na olejki eteryczne. Forma składa się z dwóch części. Na jednej z nich znajduje się stożek, który robi wgłębienie w kuli lodowej. Można je wykorzystać np. do kryształków mentolu lub naturalnych olejków eterycznych.

Każda z form jest wykonana z jednego kawałka drewna co sprawia, że są bardzo wytrzymałe.

Produkt lakierowany.`,
    basePrice: 149.00,
    images: [
      {
        id: 'img-forma-1',
        url: 'https://placehold.co/800x800/png?text=Forma+Drewniana',
        alt: 'Forma Drewniana na Kule Lodowe',
        isPrimary: true
      }
    ],
    variants: [],
    features: [
      'Materiał: drewno bukowe',
      'Składa się z dwóch części',
      'Stożek do tworzenia wgłębienia w kuli',
      'Wykonana z jednego kawałka drewna',
      'Produkt lakierowany',
      'Wymiary: 13 cm średnicy',
      'Idealna do olejków eterycznych i kryształków mentolu'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Forma Drewniana na Kule Lodowe - Bukowa | Instytut Saunowy',
      metaDescription: 'Profesjonalna forma bukowa do kul lodowych. Dwuczęściowa, ze stożkiem na olejki. Średnica 13cm. Dla saunamistrzów.',
      keywords: ['forma na kule', 'kule lodowe', 'olejki eteryczne', 'akcesoria saunowe', 'forma bukowa']
    }
  },

  // ==================== ZESTAWY ====================
  {
    name: 'Zestaw Saunamistrza - Podstawa i Forma Drewniana',
    category: 'zestawy' as const,
    description: `Kompletny zestaw dla saunamistrza zawierający podstawę drewnianą na kule lodowe oraz formę drewnianą.

Podstawa na kule wykonana z drewna bukowego na kule lodowe. Podstawa na kule wykonana jest z jednego kawałka drewna co sprawia, że jest bardzo wytrzymała. Produkt lakierowany. Wymiary: 40 cm x 17 cm.

Formy wykonane z drewna bukowego do formowania kul lodowych na olejki eteryczne. Forma składa się z dwóch części. Na jednej z nich znajduje się stożek, który robi wgłębienie w kuli lodowej. Można je wykorzystać np. do kryształków mentolu lub naturalnych olejków eterycznych. Każda z form jest wykonana z jednego kawałka drewna co sprawia, że są bardzo wytrzymałe. Produkt lakierowany. Wymiary: 13 cm średnicy.`,
    basePrice: 399.00,
    images: [
      {
        id: 'img-zestaw-1',
        url: 'https://placehold.co/800x800/png?text=Zestaw+Saunamistrza',
        alt: 'Zestaw Saunamistrza',
        isPrimary: true
      }
    ],
    variants: [],
    features: [
      'Podstawa drewniana bukowa 40 cm x 17 cm',
      'Forma drewniana bukowa średnica 13 cm',
      'Wszystko wykonane z jednego kawałka drewna',
      'Produkty lakierowane',
      'Bardzo wytrzymała konstrukcja',
      'Kompletny zestaw dla profesjonalistów',
      'Idealny prezent dla saunamistrza'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Zestaw Saunamistrza - Podstawa i Forma na Kule | Instytut Saunowy',
      metaDescription: 'Profesjonalny zestaw saunamistrza z drewna bukowego. Podstawa i forma na kule lodowe. Lakierowane, wytrzymałe.',
      keywords: ['zestaw saunamistrza', 'kule lodowe zestaw', 'akcesoria ceremonie', 'prezent dla saunamistrza']
    }
  },

  // ==================== PAREO ====================
  {
    name: 'Naleśnik z Ramiączkami "Wafel"',
    category: 'pareo' as const,
    description: `Wygodny naleśnik z ramiączkami wykonany z dzianiny wafel. Idealny do sauny, spa i na co dzień.`,
    basePrice: 110.00,
    images: [
      {
        id: 'img-nalesnik-wafel-1',
        url: 'https://placehold.co/800x800/png?text=Nalesnik+Wafel',
        alt: 'Naleśnik z Ramiączkami Wafel',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M - 160 cm x 85 cm', stock: 0, priceModifier: 0 },
          { id: 'size-lxl', value: 'L/XL - 180 cm x 85 cm', stock: 0, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-white', value: 'Biały', stock: 0, priceModifier: 0 },
          { id: 'color-black', value: 'Czarny', stock: 0, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Dzianina wafel',
      'Rozmiary: S/M (160x85cm), L/XL (180x85cm)',
      'Kolory: Biały, Czarny',
      'Wygodne ramiączka',
      'Doskonała chłonność'
    ],
    isActive: false, // Aktualnie niedostępny
    seo: {
      metaTitle: 'Naleśnik z Ramiączkami Wafel | Instytut Saunowy',
      metaDescription: 'Naleśnik z ramiączkami z dzianiny wafel. Dostępny wkrótce.',
      keywords: ['naleśnik wafel', 'pareo z ramiączkami', 'dzianina wafel']
    }
  },
  {
    name: 'Naleśnik z Ramiączkami "Muślin"',
    category: 'pareo' as const,
    description: `Delikatny naleśnik z ramiączkami wykonany z muślinu. Lekki, przewiewny i przyjemny w dotyku.`,
    basePrice: 110.00,
    images: [
      {
        id: 'img-nalesnik-muslin-1',
        url: 'https://placehold.co/800x800/png?text=Nalesnik+Muslin',
        alt: 'Naleśnik z Ramiączkami Muślin',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M - 160 cm x 85 cm', stock: 0, priceModifier: 0 },
          { id: 'size-lxl', value: 'L/XL - 180 cm x 85 cm', stock: 0, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-pink', value: 'Różowy', stock: 0, priceModifier: 0 },
          { id: 'color-khaki', value: 'Khaki', stock: 0, priceModifier: 0 },
          { id: 'color-blue', value: 'Błękitny', stock: 0, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Muślin',
      'Rozmiary: S/M (160x85cm), L/XL (180x85cm)',
      'Kolory: Różowy, Khaki, Błękitny',
      'Lekki i przewiewny',
      'Delikatny dla skóry'
    ],
    isActive: false, // Aktualnie niedostępny, cena do ustalenia
    seo: {
      metaTitle: 'Naleśnik z Ramiączkami Muślin | Instytut Saunowy',
      metaDescription: 'Naleśnik z ramiączkami z muślinu. Dostępny wkrótce.',
      keywords: ['naleśnik muślin', 'pareo z ramiączkami', 'muślin']
    }
  },
  {
    name: 'Pareo Lniane "Krepa"',
    category: 'pareo' as const,
    description: `Eleganckie pareo lniane wykonane z naturalnej krepy lnianej. Idealne do sauny, plaży i na co dzień. Len krepa jest miękki, przewiewny i naturalnie antybakteryjny.`,
    basePrice: 170.00,
    images: [
      {
        id: 'img-pareo-krepa-1',
        url: 'https://placehold.co/800x800/png?text=Pareo+Krepa',
        alt: 'Pareo Lniane Krepa',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M - 120 cm x 85 cm', stock: 8, priceModifier: 0 },
          { id: 'size-lxl', value: 'L/XL - 140 cm x 85 cm', stock: 8, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-beige', value: 'Naturalny beż', stock: 10, priceModifier: 0 },
          { id: 'color-navy', value: 'Granatowy', stock: 8, priceModifier: 0 },
          { id: 'color-black', value: 'Czarny', stock: 8, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Len krepa',
      'Rozmiary: S/M (120x85cm), L/XL (140x85cm)',
      'Kolory: Naturalny beż, Granatowy, Czarny',
      'Naturalnie antybakteryjny',
      'Przewiewny i miękki',
      'Idealny do sauny i na plażę'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Pareo Lniane Krepa - Naturalne | Instytut Saunowy',
      metaDescription: 'Eleganckie pareo z lnu krepy. Naturalne, antybakteryjne, przewiewne. Dostępne w trzech kolorach.',
      keywords: ['pareo lniane', 'pareo krepa', 'len naturalny', 'pareo sauna']
    }
  },
  {
    name: 'Pareo "Wafel"',
    category: 'pareo' as const,
    description: `Klasyczne pareo wykonane z dzianiny wafel. Doskonała chłonność i wygoda. Idealne do sauny i spa.`,
    basePrice: 150.00,
    images: [
      {
        id: 'img-pareo-wafel-1',
        url: 'https://placehold.co/800x800/png?text=Pareo+Wafel',
        alt: 'Pareo Wafel',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M - 120 cm x 85 cm', stock: 10, priceModifier: 0 },
          { id: 'size-l', value: 'L - 140 cm x 85 cm', stock: 10, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-white', value: 'Biały', stock: 10, priceModifier: 0 },
          { id: 'color-black', value: 'Czarny', stock: 10, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Dzianina wafel',
      'Rozmiary: S/M (120x85cm), L (140x85cm)',
      'Kolory: Biały, Czarny',
      'Doskonała chłonność',
      'Przewiewne i wygodne'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Pareo Wafel - Chłonne i Wygodne | Instytut Saunowy',
      metaDescription: 'Pareo z dzianiny wafel. Doskonała chłonność, dostępne w dwóch kolorach.',
      keywords: ['pareo wafel', 'pareo saunowe', 'dzianina wafel', 'pareo spa']
    }
  },
  {
    name: 'Hammam "Muślin"',
    category: 'pareo' as const,
    description: `Tradycyjny ręcznik hammam wykonany z muślinu. Lekki, przewiewny i szybkoschnący.`,
    basePrice: 120.00,
    images: [
      {
        id: 'img-hammam-1',
        url: 'https://placehold.co/800x800/png?text=Hammam+Muslin',
        alt: 'Hammam Muślin',
        isPrimary: true
      }
    ],
    variants: [],
    features: [
      'Materiał: 100% Muślin',
      'Lekki i przewiewny',
      'Szybkoschnący',
      'Idealny do hammamu i sauny'
    ],
    isActive: false, // Świeży produkt, niedostępny
    seo: {
      metaTitle: 'Hammam Muślin | Instytut Saunowy',
      metaDescription: 'Tradycyjny ręcznik hammam z muślinu. Dostępny wkrótce.',
      keywords: ['hammam', 'ręcznik muślin', 'hammam tradycyjny']
    }
  },

  // ==================== KIMONA ====================
  {
    name: 'Kimono Frotte',
    category: 'kimona' as const,
    description: `Luksusowe kimono wykonane z dzianiny frotte. Miękkie, chłonne i wygodne. Idealne po saunie lub jako szlafrok spa.`,
    basePrice: 200.00,
    images: [
      {
        id: 'img-kimono-frotte-1',
        url: 'https://placehold.co/800x800/png?text=Kimono+Frotte',
        alt: 'Kimono Frotte',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-white', value: 'Biały', stock: 10, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Dzianina frotte',
      'Rozmiar: Unisex',
      'Długość od ramienia w dół: 115 cm (+/- 1cm)',
      'Kolor: Biały',
      'Miękkie i chłonne',
      'Wygodny krój'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Kimono Frotte - Luksusowe | Instytut Saunowy',
      metaDescription: 'Kimono frotte unisex. Miękkie, chłonne, wygodne. Idealne po saunie.',
      keywords: ['kimono frotte', 'szlafrok spa', 'kimono sauna', 'frotte unisex']
    }
  },
  {
    name: 'Kimono Wafel',
    category: 'kimona' as const,
    description: `Eleganckie kimono wykonane z dzianiny wafel. Lekkie, przewiewne i szybkoschnące.`,
    basePrice: 200.00,
    images: [
      {
        id: 'img-kimono-wafel-1',
        url: 'https://placehold.co/800x800/png?text=Kimono+Wafel',
        alt: 'Kimono Wafel',
        isPrimary: true
      }
    ],
    variants: [],
    features: [
      'Materiał: 100% Dzianina wafel',
      'Lekkie i przewiewne',
      'Szybkoschnące',
      'Idealnie po saunie'
    ],
    isActive: false, // Świeży produkt
    seo: {
      metaTitle: 'Kimono Wafel | Instytut Saunowy',
      metaDescription: 'Kimono wafel. Dostępne wkrótce.',
      keywords: ['kimono wafel', 'szlafrok wafel', 'kimono spa']
    }
  },

  // ==================== SPODNIE ====================
  {
    name: 'Spodnie "Kwiatu"',
    category: 'spodnie' as const,
    description: `Wygodne spodnie "Kwiatu" wykonane ze 100% bawełny. Luźny, komfortowy krój idealny do jogi, relaksu i spa.`,
    basePrice: 185.00,
    images: [
      {
        id: 'img-spodnie-kwiatu-1',
        url: 'https://placehold.co/800x800/png?text=Spodnie+Kwiatu',
        alt: 'Spodnie Kwiatu',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-black', value: 'Czarny', stock: 10, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Bawełna',
      'Długość nogawki: 100 cm (+/- 1cm)',
      'Max. rozciągnięcie gumki: 120 cm (+/- 1cm)',
      'Kolor: Czarny',
      'Luźny, komfortowy krój',
      'Idealne do jogi i relaksu'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Spodnie Kwiatu - Bawełniane | Instytut Saunowy',
      metaDescription: 'Wygodne spodnie Kwiatu ze 100% bawełny. Luźny krój, idealne do jogi i relaksu.',
      keywords: ['spodnie kwiatu', 'spodnie bawełniane', 'spodnie joga', 'spodnie relaks']
    }
  },
  {
    name: 'Spodnie "Szarawary"',
    category: 'spodnie' as const,
    description: `Tradycyjne szarawary wykonane ze 100% bawełny. Komfortowe, przewiewne i idealne do relaksu.`,
    basePrice: 165.00,
    images: [
      {
        id: 'img-szarawary-1',
        url: 'https://placehold.co/800x800/png?text=Szarawary',
        alt: 'Spodnie Szarawary',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M - dł. nogawki 105cm', stock: 8, priceModifier: 0 },
          { id: 'size-lxl', value: 'L/XL - dł. nogawki 110cm', stock: 8, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-black', value: 'Czarny', stock: 15, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Bawełna',
      'Rozmiary: S/M (dł. 105cm), L/XL (dł. 110cm)',
      'Max szerokość gumki: 130 cm (+/- 1cm)',
      'Kolor: Czarny',
      'Tradycyjny krój',
      'Przewiewne i wygodne'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Spodnie Szarawary - Bawełniane | Instytut Saunowy',
      metaDescription: 'Tradycyjne szarawary ze 100% bawełny. Wygodne, przewiewne, dostępne w dwóch rozmiarach.',
      keywords: ['szarawary', 'spodnie szarawary', 'spodnie bawełniane', 'spodnie relaks']
    }
  },
  {
    name: 'Spodnie Lniane "Maja"',
    category: 'spodnie' as const,
    description: `Eleganckie spodnie lniane "Maja" wykonane ze 100% lnu krepy. Naturalne, przewiewne i wygodne.`,
    basePrice: 240.00,
    images: [
      {
        id: 'img-spodnie-maja-1',
        url: 'https://placehold.co/800x800/png?text=Spodnie+Maja',
        alt: 'Spodnie Lniane Maja',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-beige', value: 'Naturalny Beż', stock: 8, priceModifier: 0 },
          { id: 'color-black', value: 'Czarny', stock: 8, priceModifier: 0 },
          { id: 'color-navy', value: 'Granatowy', stock: 8, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Len krepa',
      'Długość nogawki: 100 cm (+/- 1cm)',
      'Szerokość przód: 60 cm; tył: 70 cm (+/- 1cm)',
      'Kolory: Naturalny Beż, Czarny, Granatowy',
      'Naturalne włókna lniane',
      'Przewiewne i eleganckie'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Spodnie Lniane Maja - Len Krepa | Instytut Saunowy',
      metaDescription: 'Eleganckie spodnie lniane Maja ze 100% lnu krepy. Naturalne, przewiewne, dostępne w trzech kolorach.',
      keywords: ['spodnie lniane', 'spodnie maja', 'len krepa', 'spodnie naturalne']
    }
  },
  {
    name: 'Spodnie Lniane "Mela"',
    category: 'spodnie' as const,
    description: `Spodnie lniane "Mela" wykonane ze 100% lnu melanż. Unikalne połączenie komfortu i stylu.`,
    basePrice: 245.00,
    images: [
      {
        id: 'img-spodnie-mela-1',
        url: 'https://placehold.co/800x800/png?text=Spodnie+Mela',
        alt: 'Spodnie Lniane Mela',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-blue', value: 'Błękit', stock: 10, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Len melanż',
      'Długość: 88 cm',
      'Max. szerokość w pasie: 100 cm',
      'Kolor: Błękit',
      'Unikalny melanż lniany',
      'Komfortowe i stylowe'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Spodnie Lniane Mela - Len Melanż | Instytut Saunowy',
      metaDescription: 'Spodnie lniane Mela ze 100% lnu melanż. Komfortowe, stylowe, kolor błękit.',
      keywords: ['spodnie lniane', 'spodnie mela', 'len melanż', 'spodnie błękitne']
    }
  },

  // ==================== SPÓDNICE ====================
  {
    name: 'Spódnica Lniana "Krepa"',
    category: 'spodnice' as const,
    description: `Elegancka spódnica lniana wykonana ze 100% lnu krepy. Naturalna, przewiewna i wygodna.`,
    basePrice: 205.00,
    images: [
      {
        id: 'img-spodnica-krepa-1',
        url: 'https://placehold.co/800x800/png?text=Spodnica+Krepa',
        alt: 'Spódnica Lniana Krepa',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M - 120 cm x 80 cm', stock: 0, priceModifier: 0 },
          { id: 'size-lxl', value: 'L/XL - 140 cm x 80 cm', stock: 0, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-beige', value: 'Naturalny Beż', stock: 0, priceModifier: 0 },
          { id: 'color-black', value: 'Czarny', stock: 0, priceModifier: 0 },
          { id: 'color-navy', value: 'Granatowy', stock: 0, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Len krepa',
      'Rozmiary: S/M (120x80cm), L/XL (140x80cm)',
      'Kolory: Naturalny Beż, Czarny, Granatowy',
      'Naturalne włókna lniane',
      'Przewiewna i elegancka'
    ],
    isActive: false, // Aktualnie niedostępna
    seo: {
      metaTitle: 'Spódnica Lniana Krepa | Instytut Saunowy',
      metaDescription: 'Elegancka spódnica lniana ze 100% lnu krepy. Dostępna wkrótce.',
      keywords: ['spódnica lniana', 'len krepa', 'spódnica naturalna']
    }
  },

  // ==================== TOPY ====================
  {
    name: 'Top Lniany "Krepa"',
    category: 'topy' as const,
    description: `Elegancki top lniany wykonany ze 100% lnu krepy. Lekki, przewiewny i stylowy.`,
    basePrice: 165.00,
    images: [
      {
        id: 'img-top-krepa-1',
        url: 'https://placehold.co/800x800/png?text=Top+Krepa',
        alt: 'Top Lniany Krepa',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M', stock: 0, priceModifier: 0 },
          { id: 'size-lxl', value: 'L/XL', stock: 0, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-beige', value: 'Naturalny Beż', stock: 0, priceModifier: 0 },
          { id: 'color-black', value: 'Czarny', stock: 0, priceModifier: 0 },
          { id: 'color-navy', value: 'Granatowy', stock: 0, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Len krepa',
      'Rozmiary: S/M, L/XL',
      'Kolory: Naturalny Beż, Czarny, Granatowy',
      'Lekki i przewiewny',
      'Stylowy krój'
    ],
    isActive: false, // Aktualnie niedostępny
    seo: {
      metaTitle: 'Top Lniany Krepa | Instytut Saunowy',
      metaDescription: 'Elegancki top lniany ze 100% lnu krepy. Dostępny wkrótce.',
      keywords: ['top lniany', 'top krepa', 'top len']
    }
  },
  {
    name: 'Top Lniany "Mela"',
    category: 'topy' as const,
    description: `Wygodny top lniany wykonany ze 100% lnu melanż. Naturalny, przewiewny i komfortowy.`,
    basePrice: 120.00,
    images: [
      {
        id: 'img-top-mela-1',
        url: 'https://placehold.co/800x800/png?text=Top+Mela',
        alt: 'Top Lniany Mela',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-sm', value: 'S/M', stock: 8, priceModifier: 0 },
          { id: 'size-lxl', value: 'L/XL', stock: 8, priceModifier: 0 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-blue', value: 'Błękit', stock: 15, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Len melanż',
      'Rozmiary: S/M, L/XL',
      'Kolor: Błękit',
      'Naturalny melanż lniany',
      'Przewiewny i komfortowy'
    ],
    isActive: true,
    seo: {
      metaTitle: 'Top Lniany Mela - Len Melanż | Instytut Saunowy',
      metaDescription: 'Top lniany Mela ze 100% lnu melanż. Naturalny, przewiewny, kolor błękit.',
      keywords: ['top lniany', 'top mela', 'len melanż', 'top błękitny']
    }
  },
  {
    name: 'Top z Paskiem "Wafel"',
    category: 'topy' as const,
    description: `Funkcjonalny top z paskiem wykonany z dzianiny wafel. Idealny do sauny i spa.`,
    basePrice: 125.00,
    images: [
      {
        id: 'img-top-wafel-pasek-1',
        url: 'https://placehold.co/800x800/png?text=Top+Wafel+Pasek',
        alt: 'Top z Paskiem Wafel',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-white', value: 'Biały', stock: 0, priceModifier: 0 },
          { id: 'color-black', value: 'Czarny', stock: 0, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Dzianina wafel',
      'Rozmiar: Unisex',
      'Kolory: Biały, Czarny',
      'Z praktycznym paskiem',
      'Doskonała chłonność'
    ],
    isActive: false, // Aktualnie niedostępny
    seo: {
      metaTitle: 'Top z Paskiem Wafel | Instytut Saunowy',
      metaDescription: 'Top z paskiem z dzianiny wafel. Dostępny wkrótce.',
      keywords: ['top wafel', 'top z paskiem', 'top sauna']
    }
  },
  {
    name: 'Top z Oczkiem "Wafel"',
    category: 'topy' as const,
    description: `Stylowy top z oczkiem wykonany z dzianiny wafel. Elegancki i funkcjonalny.`,
    basePrice: 120.00,
    images: [
      {
        id: 'img-top-wafel-oczko-1',
        url: 'https://placehold.co/800x800/png?text=Top+Wafel+Oczko',
        alt: 'Top z Oczkiem Wafel',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-black', value: 'Czarny', stock: 0, priceModifier: 0 },
          { id: 'color-white', value: 'Biały', stock: 0, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Materiał: 100% Dzianina wafel',
      'Rozmiar: Unisex',
      'Kolory: Czarny, Biały',
      'Stylowe oczko',
      'Doskonała chłonność'
    ],
    isActive: false, // Aktualnie niedostępny
    seo: {
      metaTitle: 'Top z Oczkiem Wafel | Instytut Saunowy',
      metaDescription: 'Top z oczkiem z dzianiny wafel. Dostępny wkrótce.',
      keywords: ['top wafel', 'top z oczkiem', 'top sauna']
    }
  }
];

export async function seedProductionData(): Promise<void> {
  console.log('🌱 Rozpoczynam seedowanie produktów produkcyjnych...');

  // Usunięcie wszystkich istniejących produktów
  await Product.deleteMany({});
  console.log('🗑️  Usunięto stare produkty');

  const products = [];
  for (const productData of productionProducts) {
    try {
      const product = new Product(productData);
      await product.save();
      products.push(product);
      console.log(`✅ Dodano: ${product.name} (${product.category})`);
    } catch (error) {
      console.error(`❌ Błąd przy dodawaniu produktu ${productData.name}:`, error);
    }
  }

  console.log(`\n📦 Zseedowano ${products.length} produktów`);
  console.log(`✨ Aktywnych produktów: ${products.filter(p => p.isActive).length}`);
  console.log(`⏸️  Nieaktywnych produktów: ${products.filter(p => !p.isActive).length}`);

  // Statystyki kategorii
  const categoryStats: Record<string, number> = {};
  products.forEach(p => {
    categoryStats[p.category] = (categoryStats[p.category] || 0) + 1;
  });

  console.log('\n📊 Produkty według kategorii:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`   ${category}: ${count}`);
  });
}

if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedProductionData();
      await mongoose.connection.close();
      console.log('\n✅ Seedowanie zakończone pomyślnie!');
      process.exit(0);
    } catch (error) {
      console.error('❌ Seedowanie nie powiodło się:', error);
      await mongoose.connection.close();
      process.exit(1);
    }
  })();
}
