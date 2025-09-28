# Instytut Saunowy - E-commerce Platform

Platforma e-commerce dla Instytutu Saunowego specjalizująca się w wysokiej jakości odzieży do saunowania.

## 📋 Spis treści

- [Opis](#opis)
- [Technologie](#technologie)
- [Funkcjonalności](#funkcjonalności)
- [Struktura projektu](#struktura-projektu)
- [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
- [API Endpoints](#api-endpoints)
- [Plan rozwoju](#plan-rozwoju)

## 🎯 Opis

Instytut Saunowy to pełnofunkcjonalna platforma e-commerce dedykowana sprzedaży odzieży i akcesoriów do saunowania. Aplikacja łączy tradycję saunowania z nowoczesnymi rozwiązaniami technologicznymi, oferując intuicyjne doświadczenie zakupowe.

## 🛠 Technologie

### Frontend
- **React 19.1.1** - nowoczesna biblioteka UI
- **TypeScript 4.9.5** - statyczne typowanie
- **React Router DOM 7.8.1** - routing aplikacji
- **Tailwind CSS 3.4.17** - utility-first CSS framework
- **Context API** - zarządzanie stanem aplikacji

### Backend
- **Node.js** - środowisko uruchomieniowe
- **Express 4.21.2** - framework webowy
- **MongoDB + Mongoose 8.17.0** - baza danych i ODM
- **CORS 2.8.5** - obsługa cross-origin requests
- **Slugify 1.6.6** - generowanie URL-friendly slugów
- **dotenv** - zarządzanie zmiennymi środowiskowymi

## ⚡ Funkcjonalności

### 🛍 Katalog produktów
- **Kategorie produktów**: kilty, poncha, bluzy, akcesoria
- **System wariantów** z dynamiczną kalkulacją cen
- **Szczegółowe strony produktów** z galerią zdjęć
- **Responsywny design** dostosowany do urządzeń mobilnych

### 🛒 Koszyk zakupowy
- **Persistencja w localStorage** - koszyk zachowany między sesjami
- **Obsługa wariantów produktów** (rozmiary, kolory)
- **Dynamiczna kalkulacja cen** z modyfikatorami wariantów
- **Toast notifications** dla akcji użytkownika

### 🎨 Interfejs użytkownika
- **Sticky navigation** z licznikiem koszyka
- **Professional layout** z footer informacyjny
- **Breadcrumb navigation**
- **Loading states** i error handling

### 🔧 Panel administracyjny (Backend)
- **RESTful API** dla zarządzania produktami
- **System SEO** z automatycznym generowaniem meta tagów
- **Statystyki produktów** (wyświetlenia, zakupy)
- **Zaawansowane zarządzanie stanem magazynowym**

## 📁 Struktura projektu

```
instytut-saunowy/
├── frontend/                  # Aplikacja React
│   ├── src/
│   │   ├── components/       # Komponenty wielokrotnego użytku
│   │   ├── contexts/         # Context providers (CartContext)
│   │   ├── pages/           # Komponenty stron
│   │   ├── services/        # Usługi API
│   │   └── types/           # Definicje TypeScript
│   ├── public/              # Pliki statyczne
│   └── package.json
├── backend/                  # API Server
│   ├── src/
│   │   ├── config/          # Konfiguracja bazy danych
│   │   ├── controllers/     # Kontrolery API
│   │   ├── models/          # Modele Mongoose
│   │   ├── routes/          # Definicje tras API
│   │   └── scripts/         # Skrypty pomocnicze (seeders)
│   ├── server.js            # Punkt wejścia aplikacji
│   └── package.json
└── README.md
```

## 🚀 Instalacja i uruchomienie

### Wymagania
- Node.js (wersja 16+)
- MongoDB (local lub MongoDB Atlas)
- npm lub yarn

### 1. Klonowanie repozytorium
```bash
git clone <repository-url>
cd instytut-saunowy
```

### 2. Instalacja zależności

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Konfiguracja środowiska

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/instytut-saunowy
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Uruchomienie aplikacji

#### Backend
```bash
cd backend
npm run dev          # Tryb development z nodemon
# lub
npm start           # Tryb produkcyjny
```

#### Seeding bazy danych (opcjonalnie)
```bash
cd backend
npm run seed        # Dodaje przykładowe produkty
```

#### Frontend
```bash
cd frontend
npm start           # Uruchomienie na http://localhost:3000
```

## 🌐 API Endpoints

### Produkty
- `GET /api/products` - Lista wszystkich produktów
- `GET /api/products/:slug` - Szczegóły produktu
- `GET /api/products/category/:category` - Produkty z kategorii
- `POST /api/products` - Dodanie nowego produktu (admin)
- `PUT /api/products/:id` - Edycja produktu (admin)
- `DELETE /api/products/:id` - Usunięcie produktu (admin)

### Kategorie produktów
- `kilty` - Kilty saunowe
- `poncha` - Poncha i okrycia
- `bluzy` - Bluzy i odzież
- `akcesoria` - Akcesoria saunowe

### Health Check
- `GET /api/health` - Status aplikacji i bazy danych

## 🗺 Plan rozwoju

### Faza 1: Backend TypeScript Migration 🔥 **W TRAKCIE**
- [ ] Migracja z JavaScript na TypeScript
- [ ] Ulepszona walidacja i type safety
- [ ] Refaktoryzacja struktury projektów
- [ ] Implementacja zaawansowanych middleware

### Faza 2: Next.js Migration
- [ ] Przepisanie frontend z React na Next.js
- [ ] Implementacja Server-side rendering (SSR)
- [ ] Static site generation (SSG) dla produktów
- [ ] Optymalizacje obrazów i wydajności

### Faza 3: System Autoryzacji
- [ ] Implementacja OAuth (Google, Facebook)
- [ ] System ról użytkowników (admin, user)
- [ ] JWT authentication
- [ ] Zabezpieczenia API endpoints

### Faza 4: Panel CMS
- [ ] CRUD operacje dla produktów
- [ ] Zarządzanie magazynem i stanem
- [ ] Dashboard analityczny
- [ ] Interfejs administracyjny

### Faza 5: Proces Zakupowy
- [ ] Rozbudowany system koszyka
- [ ] Checkout flow
- [ ] Integracja z bramkami płatności
- [ ] System zamówień i fakturowania

### Faza 6: Blog/CMS Treści
- [ ] System zarządzania treścią (Markdown/MDX)
- [ ] Blog o saunowaniu
- [ ] SEO optimization
- [ ] Rich text editor

## 🤝 Kontakt

- Email: kontakt@instytut-saunowy.pl
- Telefon: +48 123 456 789
- Adres: ul. Saunowa 1, Warszawa

---

*Projekt rozwijany z myślą o łączeniu tradycji saunowania z nowoczesnymi rozwiązaniami e-commerce.*