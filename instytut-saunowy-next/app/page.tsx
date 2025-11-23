import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - responsive text and spacing */}
      <section className="relative bg-gradient-to-br from-wood-700 to-wood-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Odkryj Komfort Saunowania
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-wood-100 max-w-3xl mx-auto">
              Wysokiej jakości odzież i akcesoria do sauny.
              Stworzone z pasją dla miłośników relaksu i zdrowia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/sklep"
                className="bg-white text-wood-800 px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-lg font-semibold text-base sm:text-lg hover:bg-wood-50 transition-colors"
              >
                Zobacz kolekcję
              </Link>
              <Link
                href="/sklep/zestawy"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-wood-800 transition-colors"
              >
                Zestawy prezentowe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - responsive spacing and image heights */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Nasze Kategorie
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Kilty */}
            <Link href="/sklep/kilty" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-wood-100">
                  <img
                    src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600"
                    alt="Kilty"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-wood-600">Kilty</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Tradycyjne kilty do sauny w różnych wzorach i kolorach.
                    Dla kobiet i mężczyzn.
                  </p>
                  <span className="inline-block mt-3 sm:mt-4 text-wood-600 font-medium">
                    Zobacz więcej →
                  </span>
                </div>
              </div>
            </Link>

            {/* Poncha */}
            <Link href="/sklep/poncha" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-wood-100">
                  <img
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600"
                    alt="Poncha"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-wood-600">Poncha</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Wygodne poncha idealne po wyjściu z sauny.
                    Bambusowe i bawełniane.
                  </p>
                  <span className="inline-block mt-3 sm:mt-4 text-wood-600 font-medium">
                    Zobacz więcej →
                  </span>
                </div>
              </div>
            </Link>

            {/* Accessories */}
            <Link href="/sklep/akcesoria" className="group sm:col-span-2 md:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-wood-100">
                  <img
                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600"
                    alt="Akcesoria"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-wood-600">Akcesoria</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Ręczniki, olejki eteryczne i wszystko czego potrzebujesz do sauny.
                  </p>
                  <span className="inline-block mt-3 sm:mt-4 text-wood-600 font-medium">
                    Zobacz więcej →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why us - responsive grid for mobile */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Dlaczego Instytut Saunowy?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-semibold mb-2">Naturalne materiały</h3>
              <p className="text-gray-600 text-sm">
                Używamy tylko najwyższej jakości naturalnych włókien
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧵</span>
              </div>
              <h3 className="font-semibold mb-2">Ręczna produkcja</h3>
              <p className="text-gray-600 text-sm">
                Każdy produkt wykonany z dbałością o szczegóły
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold mb-2">Szybka dostawa</h3>
              <p className="text-gray-600 text-sm">
                Wysyłka w 24h, darmowa od 200 zł
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="font-semibold mb-2">Gwarancja jakości</h3>
              <p className="text-gray-600 text-sm">
                30 dni na zwrot, 2 lata gwarancji
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - responsive text and spacing */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">
            Dołącz do świata saunowania
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Zapisz się do newslettera i otrzymaj 10% rabatu na pierwsze zakupy
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Twój email"
              className="flex-1 px-4 py-3 min-h-[44px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wood-500"
            />
            <button
              type="submit"
              className="bg-wood-600 text-white px-6 py-3 min-h-[44px] rounded-lg font-medium hover:bg-wood-700 transition-colors"
            >
              Zapisz się
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}