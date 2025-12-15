import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import { FAQ_DATA } from '@/lib/constants/faqData';
import { BRAND } from '@/constants/brand';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt - Instytut Saunowy',
  description:
    'Skontaktuj się z nami. Odpowiemy na wszystkie pytania o szkolenia, produkty i kulturę sauny.',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Hero Section */}
      <section id="contact-form" className="bg-gradient-to-br from-forest-600 via-forest-500 to-nordic-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
              Skontaktuj się z nami
            </h1>
            <p className="text-xl text-center text-cream-100 max-w-3xl mx-auto">
              Odpowiemy na wszystkie pytania o szkolenia, produkty i kulturę sauny
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Contact Form */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-cream-200">
                <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-6">
                  Wyślij wiadomość
                </h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Right Column: Contact Information */}
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {/* Contact Details Card */}
                <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl shadow-lg p-8 border-2 border-gold-200">
                  <h2 className="text-2xl font-serif font-bold text-graphite-900 mb-6">
                    Dane kontaktowe
                  </h2>

                  <div className="space-y-5">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gold-100 rounded-xl">
                        <Mail className="w-6 h-6 text-gold-700" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-graphite-600 mb-1">Email</div>
                        <a
                          href={`mailto:${BRAND.contact.email}`}
                          className="text-lg font-medium text-nordic-600 hover:text-nordic-800 transition-colors"
                        >
                          {BRAND.contact.email}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gold-100 rounded-xl">
                        <Phone className="w-6 h-6 text-gold-700" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-graphite-600 mb-1">Telefon</div>
                        <a
                          href={`tel:${BRAND.contact.phone}`}
                          className="text-lg font-medium text-nordic-600 hover:text-nordic-800 transition-colors"
                        >
                          {BRAND.contact.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gold-100 rounded-xl">
                        <Clock className="w-6 h-6 text-gold-700" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-graphite-600 mb-1">
                          Godziny kontaktu
                        </div>
                        <div className="text-lg text-graphite-700">Pn-Pt: 9:00-17:00</div>
                        <div className="text-sm text-graphite-500 mt-1">
                          Weekendy i święta: odpowiadamy na emaile
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-cream-200">
                  <h3 className="text-xl font-serif font-bold text-graphite-900 mb-4">
                    Śledź nas w social media
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={BRAND.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-nordic-100 to-nordic-50 rounded-xl hover:from-nordic-200 hover:to-nordic-100 transition-all group"
                    >
                      <Facebook className="w-6 h-6 text-nordic-700 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-nordic-800">Facebook</span>
                    </a>
                    <a
                      href={BRAND.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-warmwood-100 to-warmwood-50 rounded-xl hover:from-warmwood-200 hover:to-warmwood-100 transition-all group"
                    >
                      <Instagram className="w-6 h-6 text-warmwood-700 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-warmwood-800">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gradient-to-b from-white to-cream-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-graphite-900 mb-4">Lokalizacja</h2>
              <p className="text-lg text-graphite-600">
                Siedziba oraz miejsce przeprowadzania szkoleń
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-cream-200">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-forest-100 rounded-xl flex-shrink-0">
                  <MapPin className="w-8 h-8 text-forest-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-graphite-900 mb-3">Adres biura</h3>
                  <address className="not-italic text-graphite-700 leading-relaxed mb-4">
                    {BRAND.address.street}
                    <br />
                    {BRAND.address.zipCode} {BRAND.address.city}
                    <br />
                    {BRAND.address.country}
                  </address>
                  <p className="text-sm text-graphite-600 bg-cream-50 p-4 rounded-xl border border-cream-200 mb-4">
                    💡 <strong>Ważne:</strong> Szkolenia odbywają się w różnych lokalizacjach w
                    całej Polsce. Każde szkolenie ma przypisaną konkretną lokalizację.
                  </p>
                  <Link
                    href="/szkolenia"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-forest-500 text-white font-semibold rounded-xl hover:bg-forest-600 transition-colors"
                  >
                    Zobacz lokalizacje szkoleń →
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-graphite-900 mb-4">
                Najczęściej zadawane pytania
              </h2>
              <p className="text-lg text-graphite-600">
                Znajdź odpowiedzi na popularne pytania dotyczące szkoleń, produktów i płatności
              </p>
            </div>

            <Accordion>
              {FAQ_DATA.map((faq, index) => (
                <AccordionItem key={index} title={faq.question}>
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-graphite-600">
                Nie znalazłeś odpowiedzi na swoje pytanie?{' '}
                <a
                  href="#contact-form"
                  className="text-nordic-600 hover:text-nordic-800 font-semibold underline"
                >
                  Skontaktuj się z nami
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-12 bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-graphite-900 mb-6">
                Wolisz bezpośredni kontakt?
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`tel:${BRAND.contact.phone}`}
                  className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Zadzwoń: {BRAND.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="px-8 py-4 bg-white text-graphite-800 font-semibold rounded-xl hover:bg-cream-100 transition-all shadow-lg hover:shadow-xl border-2 border-cream-300 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Napisz email
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
