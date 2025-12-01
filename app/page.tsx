import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-700 via-forest-600 to-nordic-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-gold-400/20 backdrop-blur-sm rounded-full border border-gold-400/40">
              <span className="text-gold-200 font-medium tracking-wide">🏛️ Skandynawskie Ciepło</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Odkryj Moc<br/>Skandynawskiej Sauny
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-cream-200 max-w-3xl mx-auto leading-relaxed">
              Premium produkty i ekspertka wiedza dla miłośników autentycznego relaksu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sklep"
                className="btn-gold px-10 py-4 text-lg shadow-gold-lg"
              >
                Przeglądaj Produkty
              </Link>
              <Link
                href="/sklep/zestawy"
                className="btn-outline-gold px-10 py-4 text-lg bg-white/10 backdrop-blur-sm hover:bg-gold-400"
              >
                Czytaj Blog
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-header">Nasze Kategorie</h2>
            <p className="text-graphite-600 text-lg">Odkryj produkty stworzone z myślą o Twoim komforcie</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kilty */}
            <Link href="/sklep/kilty" className="group">
              <div className="card-nordic overflow-hidden h-full">
                <div className="aspect-w-16 aspect-h-9 bg-cream-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600"
                    alt="Kilty"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-graphite-900 group-hover:text-gold-600 transition-colors">
                    Kilty
                  </h3>
                  <p className="text-graphite-600 leading-relaxed mb-4">
                    Tradycyjne kilty do sauny w różnych wzorach i kolorach.
                    Dla kobiet i mężczyzn.
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold-600 font-semibold group-hover:gap-3 transition-all">
                    Zobacz więcej
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Poncha */}
            <Link href="/sklep/poncha" className="group">
              <div className="card-gold overflow-hidden h-full">
                <div className="aspect-w-16 aspect-h-9 bg-cream-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600"
                    alt="Poncha"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-graphite-900 group-hover:text-gold-600 transition-colors">
                    Poncha
                  </h3>
                  <p className="text-graphite-600 leading-relaxed mb-4">
                    Wygodne poncha idealne po wyjściu z sauny.
                    Bambusowe i bawełniane.
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold-600 font-semibold group-hover:gap-3 transition-all">
                    Zobacz więcej
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Accessories */}
            <Link href="/sklep/akcesoria" className="group">
              <div className="card-nordic overflow-hidden h-full">
                <div className="aspect-w-16 aspect-h-9 bg-cream-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600"
                    alt="Akcesoria"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-graphite-900 group-hover:text-gold-600 transition-colors">
                    Akcesoria
                  </h3>
                  <p className="text-graphite-600 leading-relaxed mb-4">
                    Ręczniki, olejki eteryczne i wszystko czego potrzebujesz do sauny.
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold-600 font-semibold group-hover:gap-3 transition-all">
                    Zobacz więcej
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-gradient-to-br from-cream-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-header">Dlaczego Instytut Saunowy?</h2>
            <p className="text-graphite-600 text-lg">Nasza filozofia oparta na jakości i tradycji</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-forest-100 to-forest-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-serif font-semibold mb-3 text-graphite-900 text-lg">Naturalne materiały</h3>
              <p className="text-graphite-600 leading-relaxed">
                Używamy tylko najwyższej jakości naturalnych włókien
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-100 to-gold-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-3xl">🧵</span>
              </div>
              <h3 className="font-serif font-semibold mb-3 text-graphite-900 text-lg">Ręczna produkcja</h3>
              <p className="text-graphite-600 leading-relaxed">
                Każdy produkt wykonany z dbałością o szczegóły
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-nordic-100 to-nordic-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="font-serif font-semibold mb-3 text-graphite-900 text-lg">Szybka dostawa</h3>
              <p className="text-graphite-600 leading-relaxed">
                Wysyłka w 24h, darmowa od 200 zł
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-warmwood-100 to-warmwood-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="font-serif font-semibold mb-3 text-graphite-900 text-lg">Gwarancja jakości</h3>
              <p className="text-graphite-600 leading-relaxed">
                30 dni na zwrot, 2 lata gwarancji
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-forest-700 to-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Dołącz do świata saunowania
          </h2>
          <p className="text-xl text-cream-200 mb-10 leading-relaxed">
            Zapisz się do newslettera i otrzymaj 10% rabatu na pierwsze zakupy
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Twój email"
                className="flex-1 px-5 py-4 rounded-2xl border-2 border-gold-400/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all"
              />
              <button
                type="submit"
                className="btn-gold px-8 py-4 whitespace-nowrap shadow-gold-lg"
              >
                Zapisz się
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-cream-300">
            Twoje dane są bezpieczne. Możesz wypisać się w każdej chwili.
          </p>
        </div>
      </section>
    </div>
  );
}