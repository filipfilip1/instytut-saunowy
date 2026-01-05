'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { checkoutShippingSchema, type CheckoutShippingData } from '@/lib/schemas/checkout';
import ProductImageFallback from '@/components/ui/ProductImageFallback';
import { formatPriceExact } from '@/lib/utils/currency';
import { useToast } from '@/hooks/useToast';
import { ShoppingBag, ArrowRight, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { items, getTotal } = useCart();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CheckoutShippingData>({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipCode: '',
    country: 'Polska',
  });

  // Auto-format postal code: XX-XXX
  const formatZipCode = (value: string): string => {
    const digits = value.replace(/\D/g, ''); // Remove non-digits
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}`;
    }
    return digits;
  };

  // Auto-format phone number: XXX XXX XXX
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, ''); // Remove non-digits
    if (digits.length >= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    } else if (digits.length >= 3) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)}`;
    }
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Auto-format postal code and phone number as user types
    const formattedValue =
      name === 'zipCode' ? formatZipCode(value) :
        name === 'phone' ? formatPhoneNumber(value) :
          value;

    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const result = checkoutShippingSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (items.length === 0) {
      toast.error('Koszyk jest pusty!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product._id,
            productName: item.product.name,
            variantSelections: item.selectedVariants,
            quantity: item.quantity,
            pricePerItem: item.pricePerItem,
          })),
          shippingAddress: formData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Nie udało się utworzyć sesji płatności');
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error('Brak URL do przekierowania');
      }

      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Wystąpił błąd podczas przetwarzania płatności');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0ECE2]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#2C2622]/5 mb-6">
              <ShoppingBag className="w-10 h-10 text-[#2C2622]/40" strokeWidth={1.5} />
            </div>

            <h1 className="font-fraunces text-2xl md:text-3xl text-[#2C2622] mb-3">
              Twój koszyk jest pusty
            </h1>
            <p className="text-stone-500 text-sm mb-8 leading-relaxed">
              Dodaj produkty do koszyka, aby móc złożyć zamówienie.
            </p>

            <Link
              href="/sklep"
              className="inline-flex items-center gap-2 bg-[#C47F52] text-white px-6 py-3 rounded-lg font-medium uppercase tracking-widest text-xs hover:brightness-110 transition-all"
            >
              <span>Przejdź do sklepu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0ECE2] py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-fraunces text-3xl md:text-4xl text-[#2C2622] mb-2">
            Finalizacja zamówienia
          </h1>
          {!session && (
            <p className="text-sm text-stone-500">
              Masz konto?{' '}
              <Link
                href="/auth/signin?callbackUrl=/checkout"
                className="text-[#C47F52] hover:text-[#2C2622] transition-colors underline underline-offset-2"
              >
                Zaloguj się
              </Link>
            </p>
          )}
          {session && (
            <p className="text-sm text-stone-500">
              Zalogowany jako <span className="text-[#2C2622] font-medium">{session.user?.email}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: The Guest Book (8 cols) */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <h2 className="font-fraunces text-2xl text-[#2C2622] mb-6">
                  Dane do dostawy
                </h2>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
                      } focus:outline-none`}
                      placeholder="Jan Kowalski"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full h-12 px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
                        } focus:outline-none`}
                        placeholder="jan@przykład.pl"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
                        Telefon *
                      </label>
                      <div className={`flex items-center h-12 bg-white border rounded-md transition-all ${
                        errors.phone
                          ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500'
                          : 'border-[#2C2622]/20 focus-within:border-[#C47F52] focus-within:ring-1 focus-within:ring-[#C47F52]'
                      }`}>
                        <span className="pl-4 pr-2 text-stone-600 text-base font-medium border-r border-[#2C2622]/10">
                          +48
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="flex-1 h-full px-3 text-base bg-transparent border-0 text-[#2C2622] placeholder:text-stone-500 focus:outline-none focus:ring-0"
                          placeholder="123 456 789"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Street */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
                      Ulica i numer *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all ${
                        errors.street
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
                      } focus:outline-none`}
                      placeholder="ul. Przykładowa 123"
                    />
                    {errors.street && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.street}</p>
                    )}
                  </div>

                  {/* City & Zip Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
                        Miasto *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full h-12 px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all ${
                          errors.city
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
                        } focus:outline-none`}
                        placeholder="Warszawa"
                      />
                      {errors.city && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
                        Kod pocztowy *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full h-12 px-4 py-3 text-base bg-white border rounded-md text-[#2C2622] placeholder:text-stone-500 transition-all ${
                          errors.zipCode
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-[#2C2622]/20 focus:border-[#C47F52] focus:ring-1 focus:ring-[#C47F52]'
                        } focus:outline-none`}
                        placeholder="00-000"
                      />
                      {errors.zipCode && (
                        <p className="text-red-600 text-xs mt-1.5">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Country (Read-only) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2622]/80 mb-2">
                      Kraj
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full h-12 px-4 py-3 text-base bg-stone-50 border border-[#2C2622]/10 rounded-md text-stone-500 focus:outline-none cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Receipt (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-[#F0ECE2] border border-[#2C2622]/20 rounded-lg p-6 shadow-lg shadow-[#2C2622]/5">
                <h2 className="font-fraunces text-xl text-[#2C2622] mb-5">
                  Podsumowanie
                </h2>

                {/* Product List */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex-shrink-0">
                        {item.product.images[0]?.url ? (
                          <div className="relative w-16 aspect-[3/4] rounded-sm overflow-hidden bg-stone-200">
                            <Image
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <ProductImageFallback
                            productName={item.product.name}
                            className="w-16 aspect-[3/4] rounded-sm"
                            iconSize={20}
                          />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-fraunces text-sm text-[#2C2622] line-clamp-2 leading-tight">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {item.quantity} × {formatPriceExact(item.pricePerItem)}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-sm font-medium text-[#2C2622]">
                          {formatPriceExact(item.pricePerItem * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-[#2C2622]/20 pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Produkty</span>
                    <span>{formatPriceExact(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Dostawa</span>
                    <span className="text-[#C47F52] font-medium">Gratis</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-[#2C2622]/20 pt-4 flex justify-between items-baseline mb-6">
                  <span className="font-fraunces text-lg text-[#2C2622]">Razem</span>
                  <span className="font-fraunces text-4xl text-[#2C2622]">
                    {formatPriceExact(getTotal())}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C47F52] text-white py-3.5 rounded-lg font-medium uppercase tracking-widest text-xs hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Przetwarzanie...
                    </span>
                  ) : (
                    'Opłać zamówienie'
                  )}
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <Lock className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
                  <p className="text-[10px] text-stone-500 text-center">
                    Płatność przetwarzana bezpiecznie przez Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
