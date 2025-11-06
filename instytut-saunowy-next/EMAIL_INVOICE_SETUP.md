# 📧 Email & 📄 Invoice Integration Setup

Kompleksowy przewodnik konfiguracji wysyłki maili i faktur dla Instytutu Saunowego.

---

## 📋 **Spis treści**

1. [Email - Resend Setup](#1-email---resend-setup)
2. [Faktury - Fakturownia Setup](#2-faktury---fakturownia-setup)
3. [Konfiguracja zmiennych środowiskowych](#3-konfiguracja-zmiennych-środowiskowych)
4. [Testowanie](#4-testowanie)
5. [Troubleshooting](#5-troubleshooting)
6. [Koszty](#6-koszty)

---

## 1. Email - Resend Setup

### **Krok 1.1: Rejestracja w Resend**

1. Idź na https://resend.com
2. Kliknij "Sign Up" (darmowe do 3000 maili/miesiąc)
3. Potwierdź email

### **Krok 1.2: Dodaj domenę**

1. W dashboard Resend → "Domains" → "Add Domain"
2. Wprowadź swoją domenę: `instytut-saunowy.pl`
3. Dodaj rekordy DNS (u swojego providera domeny):

```
Record Type: TXT
Name: resend._domainkey
Value: [skopiuj z Resend]

Record Type: MX
Name: @
Value: feedback-smtp.eu-west-1.amazonses.com
Priority: 10
```

4. Poczekaj na weryfikację (może trwać do 24h, zazwyczaj 5-10 minut)

### **Krok 1.3: Wygeneruj API Key**

1. W dashboard Resend → "API Keys"
2. Kliknij "Create API Key"
3. Nazwa: "Production - Instytut Saunowy"
4. Permission: "Sending access"
5. Skopiuj klucz (zaczyna się od `re_...`)

### **Krok 1.4: Dodaj do .env.local**

```env
RESEND_API_KEY=re_abcd1234...
```

---

## 2. Faktury - Fakturownia Setup

### **Krok 2.1: Rejestracja w Fakturownia.pl**

1. Idź na https://fakturownia.pl
2. Kliknij "Wypróbuj za darmo" (14 dni trial, potem 19 zł/m)
3. Wypełnij dane firmy:
   - Nazwa firmy
   - NIP
   - Adres

### **Krok 2.2: Uzupełnij ustawienia**

1. Ustawienia → Dane firmy:
   - Logo (opcjonalnie)
   - Dane kontaktowe
   - Numer rachunku bankowego

2. Ustawienia → Numery dokumentów:
   - Format numeracji faktur (np. `FV/{NUMER}/{ROK}`)

### **Krok 2.3: Wygeneruj API Token**

1. Ustawienia → API
2. Kliknij "Pokaż token API"
3. Skopiuj token (długi ciąg znaków)

### **Krok 2.4: Dodaj do .env.local**

```env
FAKTUROWNIA_API_TOKEN=abc123def456...
FAKTUROWNIA_ACCOUNT=twoja-nazwa.fakturownia.pl
```

**Uwaga:** `FAKTUROWNIA_ACCOUNT` to subdomena widoczna w URL (np. `instytut-saunowy.fakturownia.pl`)

---

## 3. Konfiguracja zmiennych środowiskowych

### **Pełny .env.local:**

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Next Auth
NEXTAUTH_URL=https://twoja-domena.pl
NEXTAUTH_SECRET=your-secret-here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://twoja-domena.pl

# Email (Resend) - NOWE!
RESEND_API_KEY=re_...

# Invoice (Fakturownia) - NOWE!
FAKTUROWNIA_API_TOKEN=your-token
FAKTUROWNIA_ACCOUNT=instytut-saunowy.fakturownia.pl
```

---

## 4. Testowanie

### **Test 1: Email template preview**

```bash
# Uruchom dev server
npm run dev

# Otwórz w przeglądarce:
# http://localhost:3000/api/test-email
```

Możesz stworzyć prosty endpoint do testowania:

```typescript
// app/api/test-email/route.ts
import { sendOrderConfirmationEmail } from '@/lib/services/emailService';

export async function GET() {
  const testOrder = {
    _id: '123456789',
    shippingAddress: {
      name: 'Jan Kowalski',
      email: 'twoj-email@example.com', // Zmień na swój!
    },
    items: [
      {
        productName: 'Kilt Długi - Czarno-Złote Liście',
        quantity: 2,
        pricePerItem: 100,
      },
    ],
    total: 200,
  };

  const result = await sendOrderConfirmationEmail({
    order: testOrder as any,
  });

  return Response.json(result);
}
```

### **Test 2: Faktura**

Możesz przetestować tworzenie faktury analogicznie:

```typescript
// app/api/test-invoice/route.ts
import { createInvoice } from '@/lib/services/invoiceService';

export async function GET() {
  const testOrder = {
    _id: '123456789',
    shippingAddress: {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      street: 'ul. Testowa 1',
      city: 'Warszawa',
      zipCode: '00-001',
      country: 'Polska',
    },
    items: [
      {
        productName: 'Kilt Długi',
        quantity: 1,
        pricePerItem: 100,
      },
    ],
    total: 100,
  };

  const result = await createInvoice(testOrder as any);

  return Response.json(result);
}
```

### **Test 3: Pełny flow (Stripe webhook)**

1. Zainstaluj Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks do local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
4. Skopiuj webhook secret (zaczyna się od `whsec_`)
5. Dodaj do `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_...`
6. Zrób testowe zamówienie w trybie test

---

## 5. Troubleshooting

### **Problem: Email nie wysyła się**

**Sprawdź:**
- Czy `RESEND_API_KEY` jest poprawny?
- Czy domena jest zweryfikowana? (Resend dashboard → Domains)
- Czy email "from" używa zweryfikowanej domeny?
- Logi w konsoli: `console.log` w `emailService.ts`

**Możliwe błędy:**
```
Error: Domain not verified
→ Poczekaj na weryfikację DNS (do 24h)

Error: Invalid API key
→ Sprawdź czy klucz został skopiowany poprawnie
```

### **Problem: Faktura nie tworzy się**

**Sprawdź:**
- Czy `FAKTUROWNIA_API_TOKEN` jest poprawny?
- Czy `FAKTUROWNIA_ACCOUNT` ma format: `nazwa.fakturownia.pl` (bez `https://`)
- Czy plan Fakturowni jest aktywny? (14 dni trial)
- Logi w konsoli: `console.error` w `invoiceService.ts`

**Możliwe błędy:**
```
Error: 401 Unauthorized
→ Błędny API token

Error: 404 Not Found
→ Błędna nazwa konta (FAKTUROWNIA_ACCOUNT)

Error: Missing required field
→ Sprawdź dane firmy w Fakturowni (NIP, adres)
```

### **Problem: Webhook nie działa**

**Sprawdź:**
- Czy `STRIPE_WEBHOOK_SECRET` jest ustawiony?
- Czy endpoint webhook jest dostępny: `https://twoja-domena.pl/api/webhook/stripe`
- W Stripe dashboard → Webhooks → sprawdź logi

**Tip dla local development:**
Użyj Stripe CLI do forward webhook:
```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

---

## 6. Koszty

### **Miesięczne koszty:**

| Usługa | Free Tier | Paid Plan | Koszt |
|--------|-----------|-----------|-------|
| **Resend** | 3,000 maili/m | 100,000 maili/m | 0 zł → 80 zł/m |
| **Fakturownia** | 14 dni trial | Nielimitowane faktury | 19 zł/m |
| **Stripe** | - | Per transaction | 2.9% + 1.20 zł |

**Przykładowe koszty dla 100 zamówień/miesiąc:**
- Email: 0 zł (w free tier)
- Faktury: 19 zł
- Stripe fees: ~200 zł (przy średniej wartości ~70 zł/zamówienie)
- **TOTAL: ~220 zł/miesiąc**

### **Alternatywy (jeśli za drogie):**

**Email:**
- **Mailgun** (1000 maili/m za 0 zł)
- **SendGrid** (100 maili/dzień za 0 zł)

**Faktury:**
- **InFakt** (29 zł/m, więcej opcji)
- **Wfirma** (40 zł/m, z księgowością)

---

## 7. Produkcja

### **Checklist przed wdrożeniem:**

- [ ] Resend: Domena zweryfikowana
- [ ] Resend: API key production (nie test!)
- [ ] Fakturownia: Dane firmy kompletne
- [ ] Fakturownia: Plan opłacony (po trial)
- [ ] Stripe: Przełączone na live keys (nie test!)
- [ ] Stripe: Webhook endpoint dodany w dashboard
- [ ] `.env.local` → zmienne produkcyjne
- [ ] Deploy na Vercel/produkcję
- [ ] Test end-to-end (zamówienie → email + faktura)

### **Monitoring:**

**Resend:**
- Dashboard → "Logs" - zobacz wszystkie wysłane maile
- Tracking: otwarcia, kliknięcia

**Fakturownia:**
- Dashboard → "Faktury" - lista wszystkich faktur
- Raporty JPK, VAT

**Stripe:**
- Dashboard → "Payments" - wszystkie płatności
- Dashboard → "Webhooks" - logi webhook

---

## 📞 **Wsparcie**

Jeśli coś nie działa:

1. **Sprawdź logi w konsoli** (Vercel Logs / local console)
2. **Sprawdź dashboard** usługi (Resend / Fakturownia / Stripe)
3. **Sprawdź dokumentację:**
   - Resend: https://resend.com/docs
   - Fakturownia: https://api.fakturownia.pl/
   - Stripe: https://stripe.com/docs/webhooks

---

## ✅ **To wszystko!**

Po skonfigurowaniu wszystkiego flow wygląda tak:

```
Klient kupuje produkt
    ↓
Stripe przetwarza płatność
    ↓
Webhook → Tworzy zamówienie w DB
    ↓
Tworzy fakturę w Fakturowni
    ↓
Wysyła email z potwierdzeniem + PDF faktury
    ↓
Klient otrzymuje email w ~5 sekund! ✉️
```

**Powodzenia!** 🚀
