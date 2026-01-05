export default function DesignTestPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">
            Warm Premium
          </h1>
          <p className="text-xl italic font-serif text-wood-600">
            Rytuał Ognia i Ziemi
          </p>
          <p className="text-base text-wood-500 max-w-2xl mx-auto">
            Testowa strona Design Systemu. Nowe fonty: Fraunces (Display) i Manrope (Body).
            Nowa paleta kolorów inspirowana naturalnymi materiałami.
          </p>
        </section>

        {/* Typography Test */}
        <section className="bg-white p-8 rounded-3xl shadow-lg border border-stone">
          <h2 className="text-3xl font-medium mb-6">Typografia</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-wood-500 mb-1">H1 - Fraunces Light</p>
              <h1 className="text-5xl font-light">Instytut Saunowy</h1>
            </div>

            <div>
              <p className="text-sm text-wood-500 mb-1">H2 - Fraunces Normal</p>
              <h2 className="text-4xl">Ciepły Luksus</h2>
            </div>

            <div>
              <p className="text-sm text-wood-500 mb-1">H3 - Fraunces Medium</p>
              <h3 className="text-3xl font-medium">Rytuał Relaksu</h3>
            </div>

            <div>
              <p className="text-sm text-wood-500 mb-1">Body - Manrope Regular</p>
              <p className="text-base">
                Witaj w świecie premium wellness. Nasze produkty łączą tradycję z nowoczesnością,
                tworząc wyjątkowe doświadczenie saunowe.
              </p>
            </div>

            <div>
              <p className="text-sm text-wood-500 mb-1">Body - Manrope Medium</p>
              <p className="text-base font-medium">
                Każdy detal ma znaczenie. Od wyboru materiałów po finalne wykończenie.
              </p>
            </div>

            <div>
              <p className="text-sm text-wood-500 mb-1">Italic - Fraunces</p>
              <p className="text-lg italic font-serif">
                "Sauna to nie tylko miejsce, to filozofia życia."
              </p>
            </div>
          </div>
        </section>

        {/* Color Palette Test */}
        <section className="space-y-6">
          <h2 className="text-3xl font-medium">Paleta Kolorów</h2>

          {/* Primary Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Oat */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Oat - Canvas</h3>
              <p className="text-sm text-wood-600">Surowy len, owsianka</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-oat-200 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono">200</span>
                </div>
                <div className="bg-oat-400 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono">400</span>
                </div>
                <div className="bg-oat-600 h-20 rounded-lg flex items-end p-2 text-white">
                  <span className="text-xs font-mono">600</span>
                </div>
              </div>
            </div>

            {/* Wood */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Wood - Smoked Oak</h3>
              <p className="text-sm text-wood-600">Wędzone drewno</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-wood-400 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono text-white">400</span>
                </div>
                <div className="bg-wood-600 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono text-white">600</span>
                </div>
                <div className="bg-wood-800 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono text-white">800</span>
                </div>
              </div>
            </div>

            {/* Copper */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Copper - Accent</h3>
              <p className="text-sm text-wood-600">Rozżarzona miedź</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-copper-400 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono">400</span>
                </div>
                <div className="bg-copper-700 h-20 rounded-lg flex items-end p-2 text-white">
                  <span className="text-xs font-mono">700</span>
                </div>
                <div className="bg-copper-900 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono text-white">900</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sage */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Sage - Secondary</h3>
              <p className="text-sm text-wood-600">Suszona szałwia</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-sage-200 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono">200</span>
                </div>
                <div className="bg-sage-600 h-20 rounded-lg flex items-end p-2 text-white">
                  <span className="text-xs font-mono">600</span>
                </div>
                <div className="bg-sage-800 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono text-white">800</span>
                </div>
              </div>
            </div>

            {/* Stone */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Stone - UI Borders</h3>
              <p className="text-sm text-wood-600">Delikatne ramki</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-stone-200 h-20 rounded-lg flex items-end p-2 border border-stone-400">
                  <span className="text-xs font-mono">200</span>
                </div>
                <div className="bg-stone-400 h-20 rounded-lg flex items-end p-2">
                  <span className="text-xs font-mono">400</span>
                </div>
                <div className="bg-stone-600 h-20 rounded-lg flex items-end p-2 text-white">
                  <span className="text-xs font-mono">600</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UI Components Test */}
        <section className="space-y-6">
          <h2 className="text-3xl font-medium">Komponenty UI</h2>

          {/* Buttons */}
          <div className="bg-white p-6 rounded-3xl border border-stone">
            <h3 className="text-xl font-medium mb-4">Przyciski</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-copper hover:bg-copper-800 text-white px-8 py-3 rounded-2xl font-medium transition-all shadow-lg hover:shadow-xl">
                Copper Primary
              </button>
              <button className="bg-wood-800 hover:bg-wood-900 text-white px-8 py-3 rounded-2xl font-medium transition-all">
                Wood Dark
              </button>
              <button className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-2xl font-medium transition-all">
                Sage Secondary
              </button>
              <button className="border-2 border-copper text-copper hover:bg-copper hover:text-white px-8 py-3 rounded-2xl font-medium transition-all">
                Outline
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white p-6 rounded-3xl border border-stone">
            <h3 className="text-xl font-medium mb-4">Karty</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-oat p-6 rounded-2xl border border-stone">
                <h4 className="font-serif text-lg mb-2">Karta Oat</h4>
                <p className="text-sm text-wood-600">Delikatne tło z naturalnego lnu</p>
              </div>
              <div className="bg-sage-100 p-6 rounded-2xl border border-sage-300">
                <h4 className="font-serif text-lg mb-2">Karta Sage</h4>
                <p className="text-sm text-wood-600">Uspokajający odcień szałwii</p>
              </div>
              <div className="bg-copper-50 p-6 rounded-2xl border border-copper-200">
                <h4 className="font-serif text-lg mb-2">Karta Copper</h4>
                <p className="text-sm text-wood-600">Ciepły akcent miedzi</p>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="bg-white p-6 rounded-3xl border border-stone">
            <h3 className="text-xl font-medium mb-4">Formularze</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-2">Imię</label>
                <input
                  type="text"
                  placeholder="Wprowadź imię"
                  className="w-full px-4 py-3 border-2 border-stone bg-oat-100 rounded-xl focus:ring-2 focus:ring-copper focus:border-copper outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="twoj@email.pl"
                  className="w-full px-4 py-3 border-2 border-stone bg-oat-100 rounded-xl focus:ring-2 focus:ring-copper focus:border-copper outline-none transition-all"
                />
              </div>
              <button className="w-full bg-copper hover:bg-copper-800 text-white py-3 rounded-xl font-medium transition-all">
                Wyślij
              </button>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center py-8 border-t border-stone">
          <p className="text-sm text-wood-500">
            Design System: <span className="font-medium">Warm Premium</span> •
            Fonty: <span className="font-serif italic">Fraunces</span> & <span className="font-medium">Manrope</span>
          </p>
        </section>

      </div>
    </div>
  );
}
