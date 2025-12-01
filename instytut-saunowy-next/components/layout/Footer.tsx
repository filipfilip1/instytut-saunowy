import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { BRAND } from '@/constants/brand';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-graphite-900 via-graphite-900 to-forest-900 text-cream-100 border-t-4 border-gold-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About us */}
          <div>
            <div className="mb-4">
              <Image
                src={BRAND.logo.url.footer}
                alt={BRAND.logo.alt}
                width={BRAND.logo.dimensions.footer.width}
                height={BRAND.logo.dimensions.footer.height}
                className="h-9 w-auto brightness-[1.2]"
              />
            </div>
            <p className="text-cream-300 text-sm leading-relaxed">
              Specjalizujemy się w wysokiej jakości odzieży do saunowania.
              Nasze produkty łączą tradycję z nowoczesnością.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={BRAND.social.facebook.url}
                className="text-cream-300 hover:text-gold-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={BRAND.social.instagram.url}
                className="text-cream-300 hover:text-gold-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-gold-400">Kategorie</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sklep/kilty" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Kilty
                </Link>
              </li>
              <li>
                <Link href="/sklep/poncha" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Poncha
                </Link>
              </li>
              <li>
                <Link href="/sklep/bluzy" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Bluzy
                </Link>
              </li>
              <li>
                <Link href="/sklep/akcesoria" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Akcesoria
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-gold-400">Pomoc</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dostawa" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Dostawa
                </Link>
              </li>
              <li>
                <Link href="/zwroty" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Zwroty
                </Link>
              </li>
              <li>
                <Link href="/rozmiary" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Tabela rozmiarów
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-cream-300 hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span className="text-gold-500">→</span> Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-gold-400">Kontakt</h3>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <span>{BRAND.contact.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <span>{BRAND.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{BRAND.address.street}, {BRAND.address.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-700/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-cream-400">
              &copy; 2025 Instytut Saunowy. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/polityka-prywatnosci" className="text-cream-400 hover:text-gold-400 transition-colors">
                Polityka prywatności
              </Link>
              <Link href="/regulamin" className="text-cream-400 hover:text-gold-400 transition-colors">
                Regulamin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;