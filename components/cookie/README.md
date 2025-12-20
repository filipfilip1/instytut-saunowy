# Cookie Consent Banner - Dokumentacja

## ✅ Instalacja zakończona

Komponent Cookie Banner został pomyślnie zintegrowany ze stroną Instytut Saunowy.

---

## 📋 Co zostało zrobione?

### 1. **Utworzony komponent CookieBanner**
- **Lokalizacja:** `components/cookie/CookieBanner.tsx`
- **Typ:** Floating bar (przyklejony do dołu ekranu)
- **Style:** Dark luxury (neutral-900, gold-400, cream-100)
- **Zgodność:** RODO/GDPR (Prior Consent)

### 2. **Dodany do głównego layoutu**
- **Plik:** `app/layout.tsx`
- Komponent renderuje się na każdej podstronie automatycznie

### 3. **Utworzony helper dla Google Analytics 4**
- **Lokalizacja:** `lib/analytics.ts`
- Zawiera funkcje: `initGA4()`, `trackPageView()`, `trackEvent()`

---

## 🔧 Jak skonfigurować Google Analytics 4?

### Krok 1: Uzyskaj Measurement ID

1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Utwórz nową właściwość GA4 (jeśli jeszcze nie masz)
3. Skopiuj swój **Measurement ID** (format: `G-XXXXXXXXXX`)

### Krok 2: Dodaj ID do zmiennych środowiskowych

Utwórz plik `.env.local` w głównym katalogu projektu (jeśli nie istnieje):

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # <-- Wklej tutaj swój Measurement ID
```

### Krok 3: Zrestartuj serwer deweloperski

```bash
npm run dev
```

**Gotowe!** Google Analytics 4 będzie teraz ładować się automatycznie po zaakceptowaniu cookies.

---

## 🎯 Jak działa mechanizm zgód?

### Scenariusz 1: Nowy użytkownik (brak decyzji)
1. Użytkownik wchodzi na stronę
2. Po 500ms wyświetla się Cookie Banner (animacja slide-up)
3. **WAŻNE:** Skrypty analityczne NIE są ładowane (zgodność z RODO)

### Scenariusz 2: Kliknięcie "Akceptuję wszystkie"
1. Zapisuje `cookie_consent: "granted"` w localStorage
2. Wywołuje funkcję `loadAnalytics()` → ładuje GA4
3. Ukrywa banner

### Scenariusz 3: Kliknięcie "Tylko niezbędne"
1. Zapisuje `cookie_consent: "denied"` w localStorage
2. NIE ładuje żadnych skryptów analitycznych
3. Ukrywa banner

### Scenariusz 4: Powracający użytkownik (zgoda już wyrażona)
1. Sprawdza localStorage
2. Jeśli `"granted"` → automatycznie ładuje GA4 w tle
3. Banner NIE pokazuje się ponownie

---

## 📊 Jak śledzić zdarzenia e-commerce?

### Import funkcji
```typescript
import { trackEvent } from '@/lib/analytics';
```

### Przykład: Dodanie produktu do koszyka
```typescript
trackEvent('add_to_cart', {
  currency: 'PLN',
  value: 199.99,
  items: [{
    item_id: 'KILT-001',
    item_name: 'Kilt Premium Czarny',
    price: 199.99,
    quantity: 1,
    category: 'Kilty'
  }]
});
```

### Przykład: Zakończenie zakupu
```typescript
trackEvent('purchase', {
  transaction_id: order.id,
  value: order.total,
  currency: 'PLN',
  shipping: order.shippingCost,
  items: order.items.map(item => ({
    item_id: item.sku,
    item_name: item.name,
    price: item.price,
    quantity: item.quantity
  }))
});
```

### Przykład: Rozpoczęcie checkout
```typescript
trackEvent('begin_checkout', {
  currency: 'PLN',
  value: cartTotal,
  items: cartItems
});
```

---

## 🎨 Dostosowanie wyglądu

### Zmiana kolorów
Edytuj plik `components/cookie/CookieBanner.tsx`:

```tsx
// Tło
className="bg-neutral-900/95"  // Zmień na inny kolor

// Przyciski
className="bg-gradient-to-r from-gold-400 to-gold-500"  // Primary
className="border-2 border-gold-400"  // Secondary
```

### Zmiana treści
```tsx
<h3>Szanujemy Twoją prywatność</h3>  // Nagłówek
<p>Używamy plików cookies...</p>      // Opis
```

---

## 🔒 Zgodność z RODO/GDPR

✅ **Prior Consent** - Skrypty nie ładują się przed wyrażeniem zgody
✅ **localStorage** - Decyzja użytkownika jest zapamiętywana
✅ **Link do Polityki Prywatności** - Użytkownik może zapoznać się z pełnymi zasadami
✅ **Opcja "Tylko niezbędne"** - Użytkownik może odmówić zgody na analitykę

---

## 🧪 Testowanie

### Test 1: Pierwszy wizyta
1. Otwórz stronę w trybie incognito
2. Sprawdź czy banner się pojawia po 500ms
3. Sprawdź localStorage (powinno być puste)

### Test 2: Akceptacja
1. Kliknij "Akceptuję wszystkie"
2. Sprawdź console - powinno być: `✅ Google Analytics 4 loaded`
3. Sprawdź localStorage - powinno być: `cookie_consent: "granted"`
4. Odśwież stronę - banner NIE powinien się pokazać ponownie

### Test 3: Odmowa
1. Wyczyść localStorage
2. Kliknij "Tylko niezbędne"
3. Sprawdź console - NIE powinno być wiadomości o GA4
4. Sprawdź localStorage - powinno być: `cookie_consent: "denied"`

---

## 🆘 Rozwiązywanie problemów

### Problem: "Banner nie pokazuje się"
**Rozwiązanie:** Wyczyść localStorage:
```javascript
localStorage.removeItem('cookie_consent');
```

### Problem: "GA4 nie działa mimo akceptacji"
**Rozwiązanie:**
1. Sprawdź czy ustawiłeś `NEXT_PUBLIC_GA_ID` w `.env.local`
2. Zrestartuj serwer: `npm run dev`
3. Sprawdź console czy nie ma błędów

### Problem: "Banner pokazuje się po każdym odświeżeniu"
**Rozwiązanie:** Sprawdź czy localStorage działa w przeglądarce (może być zablokowane w trybie prywatnym niektórych przeglądarek)

---

## 📝 TODO (opcjonalne rozszerzenia)

- [ ] Dodać przycisk "Ustawienia cookies" (zaawansowane opcje)
- [ ] Dodać integrację z Meta Pixel (Facebook/Instagram Ads)
- [ ] Dodać Hotjar dla nagrywania sesji użytkowników
- [ ] Dodać GTM (Google Tag Manager) zamiast bezpośrednio GA4
- [ ] Dodać przycisk "Zmień preferencje" w stopce

---

## 📚 Dodatkowe zasoby

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [RODO - Oficjalna strona](https://uodo.gov.pl/)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
