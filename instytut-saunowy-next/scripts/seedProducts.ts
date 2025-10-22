import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import Product from '../lib/models/Product';
import connectDB from '../lib/mongodb';

const sampleProducts = [
  {
    name: 'Kilt męski tradycyjny',
    category: 'kilty' as const,
    description: 'Wysokiej jakości kilt do sauny, wykonany z miękkiej bawełny frotte. Idealny do sauny fińskiej i infrared. Posiada wygodny pas na rzep oraz praktyczną kieszeń.',
    basePrice: 89.99,
    images: [
      {
        id: 'img-kilt-1',
        url: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800',
        alt: 'Kilt męski tradycyjny - widok główny',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-m', value: 'M (80-90cm)', stock: 15, priceModifier: 0 },
          { id: 'size-l', value: 'L (90-100cm)', stock: 20, priceModifier: 0 },
          { id: 'size-xl', value: 'XL (100-110cm)', stock: 12, priceModifier: 10 },
          { id: 'size-xxl', value: 'XXL (110-120cm)', stock: 8, priceModifier: 15 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          {
            id: 'color-navy',
            value: 'Granatowy',
            stock: 25,
            priceModifier: 0,
            image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800'
          },
          {
            id: 'color-gray',
            value: 'Szary',
            stock: 20,
            priceModifier: 0,
            image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800'
          },
          {
            id: 'color-brown',
            value: 'Brązowy',
            stock: 15,
            priceModifier: 0,
            image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800'
          }
        ]
      }
    ],
    features: [
      '100% bawełna frotte 500g/m²',
      'Regulowany pas na rzep (60-120cm)',
      'Kieszeń na klucze z zapięciem',
      'Można prać w 60°C',
      'Szybkoschnący materiał',
      'Nie wymaga prasowania'
    ],
    seo: {
      metaTitle: 'Kilt męski do sauny - 100% bawełna',
      metaDescription: 'Wysokiej jakości kilt męski do sauny. Wykonany z bawełny frotte 500g/m². Regulowany pas, kieszeń na klucze. Dostępny w 3 kolorach.',
      keywords: ['kilt męski', 'kilt do sauny', 'ręcznik do sauny', 'sauna kilt']
    }
  },
  {
    name: 'Poncho bambusowe Premium',
    category: 'poncha' as const,
    description: 'Luksusowe poncho z włókna bambusowego. Antybakteryjne, hipoalergiczne i niezwykle miękkie. Idealne na wyjście z sauny lub jako szlafrok.',
    basePrice: 159.99,
    images: [
      {
        id: 'img-poncho-1',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
        alt: 'Poncho bambusowe Premium',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-s-m', value: 'S/M', stock: 10, priceModifier: 0 },
          { id: 'size-l-xl', value: 'L/XL', stock: 15, priceModifier: 0 },
          { id: 'size-xxl', value: 'XXL', stock: 8, priceModifier: 20 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-natural', value: 'Naturalny (beż)', stock: 18, priceModifier: 0 },
          { id: 'color-white', value: 'Biały', stock: 15, priceModifier: 0 },
          { id: 'color-anthracite', value: 'Antracyt', stock: 12, priceModifier: 0 }
        ]
      }
    ],
    features: [
      '70% włókno bambusowe, 30% bawełna',
      'Gramatura 420g/m²',
      'Właściwości antybakteryjne',
      'Hipoalergiczne',
      'Doskonała absorpcja wilgoci',
      'Miękkie i przyjemne w dotyku'
    ]
  },
  {
    name: 'Kilt damski z koronką',
    category: 'kilty' as const,
    description: 'Elegancki kilt damski ozdobiony delikatną koronką. Wykonany z wysokiej jakości bawełny z dodatkiem modalu dla większej miękkości.',
    basePrice: 99.99,
    images: [
      {
        id: 'img-kilt-d-1',
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800',
        alt: 'Kilt damski z koronką',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-xs-s', value: 'XS/S', stock: 12, priceModifier: 0 },
          { id: 'size-m-l', value: 'M/L', stock: 18, priceModifier: 0 },
          { id: 'size-xl-xxl', value: 'XL/XXL', stock: 10, priceModifier: 10 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-pink', value: 'Pudrowy róż', stock: 15, priceModifier: 0 },
          { id: 'color-cream', value: 'Kremowy', stock: 20, priceModifier: 0 },
          { id: 'color-lavender', value: 'Lawendowy', stock: 10, priceModifier: 0 }
        ]
      }
    ],
    features: [
      '85% bawełna, 15% modal',
      'Ozdobna koronka',
      'Regulacja na guziki',
      'Długość do kolan',
      'Pranie delikatne 40°C'
    ]
  },
  {
    name: 'Ręcznik do sauny XL',
    category: 'akcesoria' as const,
    description: 'Duży ręcznik do sauny o wymiarach 80x200cm. Wykonany z chłonnej bawełny egipskiej.',
    basePrice: 79.99,
    images: [
      {
        id: 'img-towel-1',
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        alt: 'Ręcznik do sauny XL',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-white', value: 'Biały', stock: 30, priceModifier: 0 },
          { id: 'color-beige', value: 'Beżowy', stock: 25, priceModifier: 0 },
          { id: 'color-gray', value: 'Szary', stock: 20, priceModifier: 0 },
          { id: 'color-navy', value: 'Granatowy', stock: 15, priceModifier: 0 }
        ]
      }
    ],
    features: [
      '100% bawełna egipska',
      'Wymiary 80x200cm',
      'Gramatura 550g/m²',
      'Szybkoschnący',
      'Można prać w 60°C'
    ]
  },
  {
    name: 'Zestaw Relax Spa',
    category: 'zestawy' as const,
    description: 'Kompletny zestaw do sauny zawierający: kilt/pareo, ręcznik, kapcie oraz kosmetyki naturalne.',
    basePrice: 249.99,
    images: [
      {
        id: 'img-set-1',
        url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
        alt: 'Zestaw Relax Spa',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-type',
        name: 'Wariant',
        options: [
          { id: 'type-men', value: 'Męski', stock: 8, priceModifier: 0 },
          { id: 'type-women', value: 'Damski', stock: 10, priceModifier: 0 },
          { id: 'type-unisex', value: 'Unisex', stock: 12, priceModifier: 0 }
        ]
      }
    ],
    features: [
      'Kilt lub pareo (w zależności od wariantu)',
      'Ręcznik 70x140cm',
      'Kapcie frotte',
      '3 naturalne olejki eteryczne (5ml)',
      'Mydło glicerynowe',
      'Eleganckie opakowanie prezentowe'
    ]
  },
  {
    name: 'Bluza After Sauna',
    category: 'bluzy' as const,
    description: 'Komfortowa bluza z kapturem, idealna na relaks po saunie. Luźny krój i miękki materiał zapewniają maksymalny komfort.',
    basePrice: 139.99,
    images: [
      {
        id: 'img-hoodie-1',
        url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        alt: 'Bluza After Sauna',
        isPrimary: true
      }
    ],
    variants: [
      {
        id: 'var-size',
        name: 'Rozmiar',
        options: [
          { id: 'size-s', value: 'S', stock: 8, priceModifier: 0 },
          { id: 'size-m', value: 'M', stock: 12, priceModifier: 0 },
          { id: 'size-l', value: 'L', stock: 15, priceModifier: 0 },
          { id: 'size-xl', value: 'XL', stock: 10, priceModifier: 0 },
          { id: 'size-xxl', value: 'XXL', stock: 5, priceModifier: 15 }
        ]
      },
      {
        id: 'var-color',
        name: 'Kolor',
        options: [
          { id: 'color-gray-melange', value: 'Szary melanż', stock: 20, priceModifier: 0 },
          { id: 'color-navy', value: 'Granatowy', stock: 15, priceModifier: 0 },
          { id: 'color-forest', value: 'Leśna zieleń', stock: 10, priceModifier: 0 }
        ]
      }
    ],
    features: [
      '80% bawełna, 20% poliester',
      'Miękka od wewnątrz',
      'Duża kieszeń kangurek',
      'Regulowany kaptur',
      'Oversize fit'
    ]
  }
];

export async function seedProducts(): Promise<void> {
  await Product.deleteMany({});

  const products = [];
  for (const productData of sampleProducts) {
    const product = new Product(productData);
    await product.save();
    products.push(product);
  }

  console.log(`📦 Seeded ${products.length} products`);
}


if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedProducts();
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      await mongoose.connection.close();
      process.exit(1);
    }
  })();
}