import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
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
                <Link href="/sklep/kilty" className="text-gray-400 hover:text-white transition-colors">
                  Kilty
                </Link>
              </li>
              <li>
                <Link href="/sklep/poncha" className="text-gray-400 hover:text-white transition-colors">
                  Poncha
                </Link>
              </li>
              <li>
                <Link href="/sklep/bluzy" className="text-gray-400 hover:text-white transition-colors">
                  Bluzy
                </Link>
              </li>
              <li>
                <Link href="/sklep/akcesoria" className="text-gray-400 hover:text-white transition-colors">
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
                <Link href="/dostawa" className="text-gray-400 hover:text-white transition-colors">
                  Dostawa
                </Link>
              </li>
              <li>
                <Link href="/zwroty" className="text-gray-400 hover:text-white transition-colors">
                  Zwroty
                </Link>
              </li>
              <li>
                <Link href="/rozmiary" className="text-gray-400 hover:text-white transition-colors">
                  Tabela rozmiarów
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-white transition-colors">
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
  );
};

export default Footer;