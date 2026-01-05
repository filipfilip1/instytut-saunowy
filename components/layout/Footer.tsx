import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/constants/brand';

const Footer = () => {
  return (
    <footer className="bg-wood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand & Legal */}
          <div className="space-y-6">
            <div className="mb-4">
              <Image
                src={BRAND.logo.url.footer}
                alt={BRAND.logo.alt}
                width={BRAND.logo.dimensions.footer.width}
                height={BRAND.logo.dimensions.footer.height}
                className="h-10 w-auto"
              />
            </div>

            <p className="text-oat/80 text-sm leading-relaxed font-light">
              Instytut Saunowy: szkolenia dla Saunamistrzów i odzież do sauny, łączące pasję i profesjonalizm.
            </p>

            {/* Legal Data - Required by law */}
            <div className="text-xs text-oat/60 leading-relaxed space-y-1 pt-4 border-t border-oat/10">
              <p className="font-medium text-oat/70">{BRAND.legal.companyName}</p>
              <p>{BRAND.address.street}</p>
              <p>{BRAND.address.zipCode} {BRAND.address.city}</p>
              <p className="pt-2">
                NIP: {BRAND.legal.nip} | REGON: {BRAND.legal.regon}
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              <a
                href={BRAND.social.facebook.url}
                className="text-oat/70 hover:text-copper transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href={BRAND.social.instagram.url}
                className="text-oat/70 hover:text-copper transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Kategorie (Oferta) */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 text-copper">Kategorie</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/sklep/kilty"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Kilty
                </Link>
              </li>
              <li>
                <Link
                  href="/sklep/poncha"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Poncha
                </Link>
              </li>
              <li>
                <Link
                  href="/sklep/bluzy"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Bluzy
                </Link>
              </li>
              <li>
                <Link
                  href="/sklep/akcesoria"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Akcesoria
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Pomoc */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 text-copper">Pomoc</h3>
            <ul className="space-y-3 text-sm mb-8">
              <li>
                <Link
                  href="/dostawa"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Dostawa
                </Link>
              </li>
              <li>
                <Link
                  href="/zwroty"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Zwroty
                </Link>
              </li>
              <li>
                <Link
                  href="/regulamin"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Regulamin
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-oat/90 hover:text-copper transition-colors inline-block font-light"
                >
                  Polityka Prywatności
                </Link>
              </li>
            </ul>

            {/* Trust Badges - Premium Text Badges */}
            <div className="mt-8">
              <h4 className="text-xs uppercase tracking-widest text-oat/50 mb-4 font-medium">
                Bezpieczne płatności
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="border border-oat/20 text-oat/80 text-[10px] font-medium px-2 py-1 rounded tracking-wider uppercase hover:border-copper hover:text-copper transition-colors cursor-default">
                  BLIK
                </span>
                <span className="border border-oat/20 text-oat/80 text-[10px] font-medium px-2 py-1 rounded tracking-wider uppercase hover:border-copper hover:text-copper transition-colors cursor-default">
                  Visa
                </span>
                <span className="border border-oat/20 text-oat/80 text-[10px] font-medium px-2 py-1 rounded tracking-wider uppercase hover:border-copper hover:text-copper transition-colors cursor-default">
                  Mastercard
                </span>
                <span className="border border-oat/20 text-oat/80 text-[10px] font-medium px-2 py-1 rounded tracking-wider uppercase hover:border-copper hover:text-copper transition-colors cursor-default">
                  Przelewy24
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Kontakt */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 text-copper">Kontakt</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-oat/50 mb-1 uppercase tracking-wide font-medium">Email</p>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="text-oat hover:text-copper transition-colors text-base font-light inline-block"
                >
                  {BRAND.contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-oat/50 mb-1 uppercase tracking-wide font-medium">Telefon</p>
                <a
                  href={`tel:${BRAND.contact.phone}`}
                  className="text-oat hover:text-copper transition-colors text-base font-light inline-block"
                >
                  {BRAND.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Delivery Badge */}
            <div className="mt-8">
              <h4 className="text-xs uppercase tracking-widest text-oat/50 mb-4 font-medium">
                Dostawa
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="border border-oat/20 text-oat/80 text-[10px] font-medium px-2 py-1 rounded tracking-wider uppercase hover:border-copper hover:text-copper transition-colors cursor-default">
                  InPost Paczkomat
                </span>
                <span className="border border-oat/20 text-oat/80 text-[10px] font-medium px-2 py-1 rounded tracking-wider uppercase hover:border-copper hover:text-copper transition-colors cursor-default">
                  Kurier
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-oat/10 pt-8">
          <div className="text-center">
            <p className="text-sm text-oat/60 font-light">
              &copy; 2025 Instytut Saunowy. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
