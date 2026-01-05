import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { AccordionItem } from '@/components/ui/Accordion';
import { FAQ_DATA } from '@/lib/constants/faqData';
import { BRAND } from '@/constants/brand';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'Kontakt - Instytut Saunowy',
  description:
    'Skontaktuj się z nami. Odpowiemy na wszystkie pytania o szkolenia, produkty i kulturę sauny.',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Light & Airy */}
      <section id="contact-form" className="bg-[#F0ECE2] pt-24 md:pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-6 text-[#2C2622]">
              Skontaktuj się z nami
            </h1>
            <p className="text-lg md:text-xl text-center text-stone-600 max-w-3xl mx-auto">
              Odpowiemy na wszystkie pytania o szkolenia, produkty i kulturę sauny
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info Section - Light & Open */}
      <section className="py-16 md:py-20 bg-[#F0ECE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
            {/* Left Column: Contact Form - No Box, Direct on Page */}
            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2C2622] mb-8 md:mb-10">
                  Wyślij wiadomość
                </h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Right Column: Contact Information - Elegant & Clean */}
            <FadeIn delay={0.2}>
              <div className="space-y-10 md:space-y-12">
                {/* Contact Details */}
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2C2622] mb-8 md:mb-10">
                    Dane kontaktowe
                  </h2>

                  <div className="space-y-6 md:space-y-8">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <svg className="w-6 h-6 text-[#C47F52] flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <div className="flex-1 min-h-[44px] flex flex-col justify-center">
                        <div className="text-xs text-stone-500 mb-1 uppercase tracking-wide">Email</div>
                        <a
                          href={`mailto:${BRAND.contact.email}`}
                          className="text-base md:text-lg font-medium text-[#2C2622] hover:text-[#C47F52] transition-colors inline-block py-1"
                        >
                          {BRAND.contact.email}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <svg className="w-6 h-6 text-[#C47F52] flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <div className="flex-1 min-h-[44px] flex flex-col justify-center">
                        <div className="text-xs text-stone-500 mb-1 uppercase tracking-wide">Telefon</div>
                        <a
                          href={`tel:${BRAND.contact.phone}`}
                          className="text-base md:text-lg font-medium text-[#2C2622] hover:text-[#C47F52] transition-colors inline-block py-1"
                        >
                          {BRAND.contact.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4">
                      <svg className="w-6 h-6 text-[#C47F52] flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-xs text-stone-500 mb-1 uppercase tracking-wide">
                          Godziny kontaktu
                        </div>
                        <div className="text-lg text-[#2C2622]">Pn-Pt: 9:00-17:00</div>
                        <div className="text-sm text-stone-500 mt-1">
                          Weekendy i święta: odpowiadamy na emaile
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lokalizacja */}
                <div className="pt-8 border-t border-[#2C2622]/10">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2C2622] mb-6">
                    Lokalizacja
                  </h3>
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-[#C47F52] flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Adres biura</div>
                      <address className="not-italic text-[#2C2622] leading-relaxed mb-3">
                        {BRAND.address.street}
                        <br />
                        {BRAND.address.zipCode} {BRAND.address.city}
                        <br />
                        {BRAND.address.country}
                      </address>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(`${BRAND.address.street}, ${BRAND.address.zipCode} ${BRAND.address.city}, ${BRAND.address.country}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C47F52] hover:text-[#2C2622] font-serif text-sm border-b border-[#C47F52] inline-block transition-colors mb-4"
                      >
                        Nawiguj do biura →
                      </a>
                      <p className="text-sm text-stone-600 italic border-l-2 border-[#C47F52]/30 pl-4 mt-4">
                        Szkolenia odbywają się w różnych lokalizacjach w całej Polsce.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-8 border-t border-[#2C2622]/10">
                  <h3 className="text-lg font-serif font-semibold text-[#2C2622] mb-4">
                    Śledź nas
                  </h3>
                  <div className="flex flex-col gap-3">
                    <a
                      href={BRAND.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-stone-600 hover:text-[#C47F52] transition-colors group"
                    >
                      <span className="font-medium">Facebook</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                    <a
                      href={BRAND.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-stone-600 hover:text-[#C47F52] transition-colors group"
                    >
                      <span className="font-medium">Instagram</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark Knowledge Base */}
      <section className="py-16 md:py-20 bg-[#2C2622]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F0ECE2] mb-4 md:mb-6">
                Najczęściej zadawane pytania
              </h2>
              <p className="text-base md:text-lg text-stone-400">
                Znajdź odpowiedzi na popularne pytania dotyczące szkoleń, produktów i płatności
              </p>
            </div>

            {/* Clean Accordion - No Boxes */}
            <div>
              {FAQ_DATA.map((faq, index) => (
                <AccordionItem key={index} title={faq.question} darkMode={true}>
                  <div
                    className="prose prose-invert prose-sm max-w-none text-stone-400"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </AccordionItem>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-stone-300">
                Nie znalazłeś odpowiedzi na swoje pytanie?{' '}
                <a
                  href="#contact-form"
                  className="text-[#C47F52] hover:text-[#B36F42] font-semibold underline transition-colors"
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
