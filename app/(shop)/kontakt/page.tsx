import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import { FAQ_DATA } from '@/lib/constants/faqData';
import { BRAND } from '@/constants/brand';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt - Instytut Saunowy',
  description:
    'Skontaktuj się z nami. Odpowiemy na wszystkie pytania o szkolenia, produkty i kulturę sauny.',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-graphite-900 via-graphite-800 to-graphite-900">
      {/* Hero Section - Dark Premium Style */}
      <section id="contact-form" className="bg-gradient-to-br from-graphite-900 via-forest-900 to-graphite-900 text-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
              Skontaktuj się z nami
            </h1>
            <p className="text-xl text-center text-cream-200 max-w-3xl mx-auto">
              Odpowiemy na wszystkie pytania o szkolenia, produkty i kulturę sauny
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-gradient-to-b from-graphite-900 to-graphite-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Contact Form - Ghost Style */}
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-graphite-800/50 to-forest-900/30 rounded-2xl p-8 border border-gold-400/20">
                <h2 className="text-2xl font-serif font-bold text-cream-100 mb-8">
                  Wyślij wiadomość
                </h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Right Column: Contact Information - No Boxes, Pure Dark Mode */}
            <FadeIn delay={0.2}>
              <div className="space-y-10">
                {/* Contact Details - No card background */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-cream-100 mb-8">
                    Dane kontaktowe
                  </h2>

                  <div className="space-y-6">
                    {/* Email - Clean, no box */}
                    <div className="flex items-start gap-4">
                      {/* Gold SVG Icon - No background */}
                      <svg className="w-7 h-7 text-gold-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Email</div>
                        <a
                          href={`mailto:${BRAND.contact.email}`}
                          className="text-lg font-medium text-cream-100 hover:text-gold-400 transition-colors"
                        >
                          {BRAND.contact.email}
                        </a>
                      </div>
                    </div>

                    {/* Phone - Clean, no box */}
                    <div className="flex items-start gap-4">
                      {/* Gold SVG Icon - No background */}
                      <svg className="w-7 h-7 text-gold-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Telefon</div>
                        <a
                          href={`tel:${BRAND.contact.phone}`}
                          className="text-lg font-medium text-cream-100 hover:text-gold-400 transition-colors"
                        >
                          {BRAND.contact.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    {/* Business Hours - Clean, no box */}
                    <div className="flex items-start gap-4">
                      {/* Gold SVG Icon - No background */}
                      <svg className="w-7 h-7 text-gold-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                          Godziny kontaktu
                        </div>
                        <div className="text-lg text-cream-100">Pn-Pt: 9:00-17:00</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Weekendy i święta: odpowiadamy na emaile
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media - Simple text links with SVG icons */}
                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-serif font-semibold text-cream-100 mb-4">
                    Śledź nas
                  </h3>
                  <div className="flex gap-6">
                    <a
                      href={BRAND.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors group"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                      <span className="text-sm font-medium">Facebook</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <a
                      href={BRAND.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors group"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span className="text-sm font-medium">Instagram</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Location Section - Dark Mode, No Boxes */}
      <section className="py-16 bg-gradient-to-b from-graphite-800 to-graphite-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-cream-100 mb-4">Lokalizacja</h2>
              <p className="text-lg text-cream-300">
                Siedziba oraz miejsce przeprowadzania szkoleń
              </p>
            </div>

            {/* No white card - clean layout */}
            <div className="flex items-start gap-6 max-w-2xl mx-auto">
              {/* Gold Icon - No background */}
              <svg className="w-8 h-8 text-gold-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-cream-100 mb-3">Adres biura</h3>
                <address className="not-italic text-cream-300 leading-relaxed mb-6">
                  {BRAND.address.street}
                  <br />
                  {BRAND.address.zipCode} {BRAND.address.city}
                  <br />
                  {BRAND.address.country}
                </address>

                {/* Elegant italic note instead of yellow box */}
                <p className="text-sm text-gold-400/80 italic mb-6 border-l-2 border-gold-400/30 pl-4">
                  Szkolenia odbywają się w różnych lokalizacjach w całej Polsce.
                  Każde szkolenie ma przypisaną konkretną lokalizację.
                </p>

                <Link
                  href="/szkolenia"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg"
                >
                  Zobacz lokalizacje szkoleń
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section - Dark Mode */}
      <section className="py-16 bg-gradient-to-b from-graphite-900 to-graphite-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-cream-100 mb-4">
                Najczęściej zadawane pytania
              </h2>
              <p className="text-lg text-cream-300">
                Znajdź odpowiedzi na popularne pytania dotyczące szkoleń, produktów i płatności
              </p>
            </div>

            {/* Dark Mode Accordion */}
            <div className="space-y-4">
              <Accordion darkMode>
                {FAQ_DATA.map((faq, index) => (
                  <AccordionItem key={index} title={faq.question}>
                    <div
                      className="prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-8 text-center">
              <p className="text-cream-300">
                Nie znalazłeś odpowiedzi na swoje pytanie?{' '}
                <a
                  href="#contact-form"
                  className="text-gold-400 hover:text-gold-300 font-semibold underline transition-colors"
                >
                  Skontaktuj się z nami
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
