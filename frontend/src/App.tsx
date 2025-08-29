import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './contexts/CartContext';
import Home from './pages/Home/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { getItemCount } = useCart();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-wood-700 hover:text-wood-600 transition-colors">
                Instytut Saunowy
              </Link>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-colors ${isHomePage ? 'text-wood-600' : 'text-gray-700 hover:text-wood-600'
                  }`}
              >
                Strona główna
              </Link>
              <Link
                to="/sklep"
                className={`font-medium transition-colors ${location.pathname.startsWith('/sklep') ? 'text-wood-600' : 'text-gray-700 hover:text-wood-600'
                  }`}
              >
                Sklep
              </Link>
              <Link
                to="/o-nas"
                className="text-gray-700 hover:text-wood-600 font-medium transition-colors"
              >
                O nas
              </Link>
              <Link
                to="/kontakt"
                className="text-gray-700 hover:text-wood-600 font-medium transition-colors"
              >
                Kontakt
              </Link>
            </div>

            {/* Cart */}
            <div className="flex items-center space-x-4">
              <Link
                to="/koszyk"
                className="relative p-2 text-gray-700 hover:text-wood-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              </Link>

              {/* Mobile menu button */}
              <button className="md:hidden p-2 text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">O nas</h3>
              <p className="text-gray-400 text-sm">
                Specjalizujemy się w wysokiej jakości odzieży do saunowania.
                Nasze produkty łączą tradycję z nowoczesnością.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Kategorie</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/sklep/kilty" className="text-gray-400 hover:text-white transition-colors">
                    Kilty
                  </Link>
                </li>
                <li>
                  <Link to="/sklep/poncha" className="text-gray-400 hover:text-white transition-colors">
                    Poncha
                  </Link>
                </li>
                <li>
                  <Link to="/sklep/bluzy" className="text-gray-400 hover:text-white transition-colors">
                    Bluzy
                  </Link>
                </li>
                <li>
                  <Link to="/sklep/akcesoria" className="text-gray-400 hover:text-white transition-colors">
                    Akcesoria
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Pomoc</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/dostawa" className="text-gray-400 hover:text-white transition-colors">
                    Dostawa
                  </Link>
                </li>
                <li>
                  <Link to="/zwroty" className="text-gray-400 hover:text-white transition-colors">
                    Zwroty
                  </Link>
                </li>
                <li>
                  <Link to="/rozmiary" className="text-gray-400 hover:text-white transition-colors">
                    Tabela rozmiarów
                  </Link>
                </li>
                <li>
                  <Link to="/kontakt" className="text-gray-400 hover:text-white transition-colors">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 kontakt@instytut-saunowy.pl</li>
                <li>📱 +48 123 456 789</li>
                <li>📍 ul. Saunowa 1, Warszawa</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Instytut Saunowy. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sklep" element={<ProductList />} />
            <Route path="/sklep/:category" element={<ProductList />} />
            <Route path="/produkt/:slug" element={<ProductDetail />} />
            <Route path="/koszyk" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );

}

export default App;