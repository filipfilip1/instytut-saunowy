# Seedowanie Bazy Danych - Produkty Produkcyjne

## Opis

Skrypt `seedProductionData.ts` zawiera kompletne dane produktów dla Instytutu Saunowego na podstawie dostarczonych wytycznych.

## Zawartość

Skrypt zawiera **26 produktów** w następujących kategoriach:

### Kilty (3 produkty)
- **Kilt Długi** - 100 zł
  - 7 wzorów klasycznych (Czarno-Złote Liście, Niebiesko-Złote Liście, Paris, Off Road, New York, London, Mysia Baletnica)
- **Kilt Krótki** - 100-110 zł (w zależności od rodzaju druku)
  - 6 wzorów klasycznych + 3 wzory 3D
- **Kilt Wafel** - 110 zł
  - Kolory: czarny, biały

### Poncza (1 produkt)
- **Ponczo** - 250 zł
  - 3 rozmiary (Małe, Średnie, Duże)
  - 3 kolory (Czarne, Kolorowe, Szare)

### Akcesoria (2 produkty)
- **Podstawa Drewniana na Kule Lodowe** - 299 zł
- **Forma Drewniana na Kule Lodowe** - 149 zł

### Zestawy (1 produkt)
- **Zestaw Saunamistrza** - 399 zł
  - Zawiera podstawę + formę drewnianą

### Pareo (5 produktów)
- **Naleśnik z Ramiączkami "Wafel"** - 110 zł (obecnie niedostępny)
- **Naleśnik z Ramiączkami "Muślin"** - 110 zł (obecnie niedostępny)
- **Pareo Lniane "Krepa"** - 170 zł
- **Pareo "Wafel"** - 150 zł
- **Hammam "Muślin"** - 120 zł (obecnie niedostępny)

### Kimona (2 produkty)
- **Kimono Frotte** - 200 zł
- **Kimono Wafel** - 200 zł (obecnie niedostępny)

### Spodnie (4 produkty)
- **Spodnie "Kwiatu"** - 185 zł
- **Spodnie "Szarawary"** - 165 zł
- **Spodnie Lniane "Maja"** - 240 zł
- **Spodnie Lniane "Mela"** - 245 zł

### Spódnice (1 produkt)
- **Spódnica Lniana "Krepa"** - 205 zł (obecnie niedostępna)

### Topy (4 produkty)
- **Top Lniany "Krepa"** - 165 zł (obecnie niedostępny)
- **Top Lniany "Mela"** - 120 zł
- **Top z Paskiem "Wafel"** - 125 zł (obecnie niedostępny)
- **Top z Oczkiem "Wafel"** - 120 zł (obecnie niedostępny)

## Zmiany w modelu Product

Skrypt wymaga rozszerzenia kategorii w modelu Product. Dodano następujące nowe kategorie:
- `pareo`
- `kimona`
- `spodnice`
- `topy`

## Uruchomienie

### Wymagania wstępne

1. Plik `.env.local` z poprawnym connection stringiem do MongoDB:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

### Uruchomienie skryptu

```bash
npm run seed:production
```

### Co robi skrypt?

1. **Usuwa wszystkie istniejące produkty** z bazy danych
2. **Dodaje 26 produktów produkcyjnych** zgodnie z wytycznymi
3. **Ustawia właściwe stany dostępności** (`isActive: true/false`)
4. **Tworzy warianty produktów** (rozmiary, kolory, wzory)
5. **Generuje automatycznie slug i meta dane SEO**

### Wynik działania

Po uruchomieniu zobaczysz:
```
🌱 Rozpoczynam seedowanie produktów produkcyjnych...
🗑️  Usunięto stare produkty
✅ Dodano: Kilt Długi (kilty)
✅ Dodano: Kilt Krótki (kilty)
...
📦 Zseedowano 26 produktów
✨ Aktywnych produktów: 18
⏸️  Nieaktywnych produktów: 8

📊 Produkty według kategorii:
   kilty: 3
   poncha: 1
   akcesoria: 2
   zestawy: 1
   pareo: 5
   kimona: 2
   spodnie: 4
   spodnice: 1
   topy: 4

✅ Seedowanie zakończone pomyślnie!
```

## Produkty nieaktywne

Następujące produkty są oznaczone jako `isActive: false` (zgodnie z wytycznymi "AKTUALNIE NIE MAMY"):
- Naleśnik z Ramiączkami "Wafel"
- Naleśnik z Ramiączkami "Muślin"
- Hammam "Muślin"
- Kimono Wafel
- Spódnica Lniana "Krepa"
- Top Lniany "Krepa"
- Top z Paskiem "Wafel"
- Top z Oczkiem "Wafel"

## Obrazy produktów

Obecnie skrypt używa placeholderów dla obrazów:
```
https://placehold.co/800x800/png?text=Nazwa+Produktu
```

### Aktualizacja obrazów

Po seedowaniu możesz zaktualizować obrazy produktów:

1. **Ręcznie w panelu admina** - przejdź do `/admin/products` i edytuj każdy produkt
2. **Poprzez upload do Cloudinary** - skrypt używa struktury, która wspiera Cloudinary
3. **Poprzez API** - użyj endpointu PUT `/api/admin/products/[id]`

## Struktura produktu

Każdy produkt zawiera:
- `name` - Nazwa produktu
- `category` - Kategoria (kilty, poncha, akcesoria, etc.)
- `description` - Szczegółowy opis
- `basePrice` - Cena bazowa w PLN
- `images` - Tablica obrazów (obecnie z placeholderami)
- `variants` - Warianty (rozmiary, kolory, wzory)
- `features` - Lista cech produktu
- `isActive` - Status dostępności
- `seo` - Meta dane SEO

## Warianty produktów

Przykładowa struktura wariantów:

```typescript
variants: [
  {
    id: 'var-pattern',
    name: 'Wzór',
    options: [
      {
        id: 'pattern-black-gold-leaves',
        value: 'Czarno-Złote Liście',
        stock: 5,
        priceModifier: 0
      },
      // ...więcej opcji
    ]
  }
]
```

## Uwagi

1. **Stany magazynowe** - Skrypt ustawia domyślne stany magazynowe. Należy je zaktualizować według rzeczywistych stanów.
2. **Ceny** - Wszystkie ceny są zgodne z wytycznymi. Produkty z nieznaną ceną mają cenę placeholder (np. 110 zł).
3. **Ponczo Średnie Szare** - Ma stock=1 zgodnie z notatką "Jest jedno, ale więcej raczej nie będzie tego rozmiaru".
4. **E-book** - Nie został dodany, ponieważ jest w trakcie tworzenia.

## Rozszerzanie

Aby dodać nowe produkty:

1. Otwórz `scripts/seedProductionData.ts`
2. Dodaj nowy obiekt do tablicy `productionProducts`
3. Uruchom ponownie `npm run seed:production`

## Wsparcie

W razie problemów sprawdź:
- Connection string do MongoDB w `.env.local`
- Czy wszystkie zależności są zainstalowane: `npm install`
- Logi w konsoli po uruchomieniu skryptu
