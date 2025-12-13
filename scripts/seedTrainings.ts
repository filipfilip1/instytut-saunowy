import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Training from '../lib/models/Training';

dotenv.config({ path: '.env.local' });

const sampleTrainings = [
  {
    name: 'Kurs Aufguss Podstawowy',
    slug: 'kurs-aufguss-podstawowy-listopad-2024',
    description: '<p>Dwudniowy kurs dla początkujących, który wprowadzi Cię w świat ceremonii saunowych Aufguss. Poznasz podstawy techniki machania ręcznikiem, doboru aromatów oraz budowania ceremonii.</p><p>Kurs prowadzi Mateusz, certyfikowany Master Aufguss z wieloletnim doświadczeniem na polskiej i międzynarodowej scenie saunowej.</p>',
    shortDescription: 'Dwudniowy kurs dla początkujących - poznaj podstawy ceremonii Aufguss i techniki machania ręcznikiem',
    date: new Date('2024-12-15'),
    duration: 16,
    location: {
      venue: 'Hotel Wellness & SPA',
      address: 'ul. Parkowa 25',
      city: 'Warszawa',
    },
    price: 1200,
    depositPercentage: 100,
    maxParticipants: 10,
    currentParticipants: 3,
    category: 'podstawowy' as const,
    level: 'beginner' as const,
    requirements: [
      'Brak wymagań - kurs dla początkujących',
      'Kondycja pozwalająca na przebywanie w saunie',
      'Własny strój saunowy',
    ],
    whatYouLearn: [
      'Podstawy techniki machania ręcznikiem',
      'Dobór i mieszanie aromatów',
      'Budowanie prostej ceremonii Aufguss',
      'Bezpieczeństwo w saunie',
      'Komunikacja z gośćmi',
      'Praktyczne ćwiczenia w saunie',
    ],
    agenda: [
      { time: '09:00', title: 'Wprowadzenie', description: 'Historia Aufguss i teoria ceremonii' },
      { time: '11:00', title: 'Technika ręcznika', description: 'Podstawowe ruchy i ćwiczenia' },
      { time: '14:00', title: 'Aromaty', description: 'Poznawanie i mieszanie aromatów' },
      { time: '16:00', title: 'Pierwsza ceremonia', description: 'Praktyka w saunie' },
    ],
    instructor: {
      name: 'Mateusz',
      bio: 'Master Aufguss, zwycięzca MoA 2024, ponad 10 lat doświadczenia',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      alt: 'Kurs Aufguss',
    },
    status: 'published' as const,
  },
  {
    name: 'Kurs Aufguss Zaawansowany',
    slug: 'kurs-aufguss-zaawansowany-grudzien-2024',
    description: '<p>Trzydniowy kurs dla osób z doświadczeniem w Aufguss. Zaawansowane techniki, choreografia, muzyka i budowanie spektakularnych ceremonii.</p><p>Kurs obejmuje również przygotowanie do zawodów MoA i networking z najlepszymi mistrzami Aufguss w Polsce.</p>',
    shortDescription: 'Trzydniowy kurs zaawansowany - spektakularne ceremonie, choreografia i przygotowanie do zawodów',
    date: new Date('2025-01-20'),
    duration: 24,
    location: {
      venue: 'Sauna Natura',
      address: 'ul. Leśna 10',
      city: 'Kraków',
    },
    price: 2400,
    depositPercentage: 100,
    maxParticipants: 8,
    currentParticipants: 6,
    category: 'zaawansowany' as const,
    level: 'advanced' as const,
    requirements: [
      'Ukończony kurs podstawowy lub minimum rok doświadczenia',
      'Własny ręcznik Aufguss',
      'Dobra kondycja fizyczna',
    ],
    whatYouLearn: [
      'Zaawansowane techniki machania ręcznikiem',
      'Choreografia i synchronizacja z muzyką',
      'Budowanie 10-minutowych ceremonii tematycznych',
      'Praca z muzyką i światłem',
      'Storytelling w Aufguss',
      'Przygotowanie do zawodów MoA',
      'Intensive practice sessions',
    ],
    instructor: {
      name: 'Mateusz',
      bio: 'Master Aufguss, zwycięzca MoA 2024, ponad 10 lat doświadczenia',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      alt: 'Kurs Zaawansowany',
    },
    status: 'published' as const,
  },
  {
    name: 'Master Class Aufguss - Sztuka Ceremonii',
    slug: 'master-class-aufguss-luty-2025',
    description: '<p>Ekskluzywny pięciodniowy Master Class dla doświadczonych mistrzów Aufguss. Pogłębienie wiedzy, autorskie ceremonie, przygotowanie materiałów konkursowych.</p><p>Tylko 6 miejsc. Kurs kończy się certyfikatem Master Aufguss Specialist.</p>',
    shortDescription: 'Ekskluzywny 5-dniowy Master Class - autorskie ceremonie i certyfikat Master Aufguss Specialist',
    date: new Date('2025-02-10'),
    duration: 40,
    location: {
      venue: 'Hotel Urle',
      address: 'Górska 1',
      city: 'Zakopane',
    },
    price: 4500,
    depositPercentage: 30,
    maxParticipants: 6,
    currentParticipants: 2,
    category: 'master' as const,
    level: 'advanced' as const,
    requirements: [
      'Minimum 2 lata aktywnego doświadczenia jako Aufgussmeister',
      'Portfolio ceremonii (video)',
      'Referencje od ośrodków/organizatorów',
      'Rozmowa kwalifikacyjna',
    ],
    whatYouLearn: [
      'Tworzenie autorskich ceremonii od A do Z',
      'Advanced storytelling techniques',
      'Praca z różnymi typami saun',
      'Event management dla mistrzów',
      'Personal branding',
      'Przygotowanie ceremonii konkursowych',
      'Mentoring i coaching',
    ],
    instructor: {
      name: 'Mateusz',
      bio: 'Master Aufguss, zwycięzca MoA 2024, międzynarodowy trener',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
      alt: 'Master Class',
    },
    status: 'published' as const,
  },
  {
    name: 'Szkolenie Indywidualne - Technika i Choreografia',
    slug: 'szkolenie-indywidualne-na-zamowienie',
    description: '<p>Szkolenie indywidualne dostosowane do Twoich potrzeb i poziomu zaawansowania. Elastyczne terminy, intensywna praca one-on-one z mistrzem.</p><p>Idealne dla osób, które chcą szybko rozwinąć konkretne umiejętności lub przygotować się do ważnego wydarzenia.</p>',
    shortDescription: 'Spersonalizowane szkolenie 1-on-1 z mistrzem - elastyczny program dostosowany do Twoich potrzeb',
    date: new Date('2025-03-01'),
    duration: 8,
    location: {
      venue: 'Do uzgodnienia',
      address: 'Lokalizacja elastyczna',
      city: 'Warszawa/Kraków',
    },
    price: 2000,
    depositPercentage: 50,
    maxParticipants: 1,
    currentParticipants: 0,
    category: 'indywidualny' as const,
    level: 'intermediate' as const,
    whatYouLearn: [
      'Spersonalizowany program szkoleniowy',
      'Intensywna praca one-on-one',
      'Fokus na wybranych aspektach Aufguss',
      'Video analysis Twoich ceremonii',
      'Personalizowane feedback',
      'Materiały i resources dopasowane do Ciebie',
    ],
    instructor: {
      name: 'Mateusz',
      bio: 'Master Aufguss, zwycięzca MoA 2024',
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      alt: 'Szkolenie Indywidualne',
    },
    status: 'published' as const,
  },
  {
    name: 'Kurs Aufguss - Edycja Wiosenna (Szkic)',
    slug: 'kurs-aufguss-wiosna-2025',
    description: '<p>Planowany kurs podstawowy na wiosnę 2025. Szczegóły wkrótce.</p>',
    shortDescription: 'Planowany kurs podstawowy - szczegóły wkrótce',
    date: new Date('2025-04-15'),
    duration: 16,
    location: {
      venue: 'Do ustalenia',
      address: 'Do ustalenia',
      city: 'Warszawa',
    },
    price: 1200,
    depositPercentage: 100,
    maxParticipants: 10,
    currentParticipants: 0,
    category: 'podstawowy' as const,
    level: 'beginner' as const,
    whatYouLearn: [
      'Podstawy Aufguss',
      'Technika ręcznika',
      'Ceremonie saunowe',
    ],
    instructor: {
      name: 'Mateusz',
    },
    status: 'draft' as const,
  },
];

async function seedTrainings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB connected');

    // Clear existing trainings (COMMENTED OUT for safety - uncomment if needed)
    await Training.deleteMany({});
    console.log('✅ Cleared existing trainings');

    const result = await Training.insertMany(sampleTrainings);
    console.log(`✅ Successfully seeded ${result.length} trainings`);

    console.log('\nCreated trainings:');
    result.forEach((training, index) => {
      console.log(`${index + 1}. ${training.name} (/${training.slug})`);
      console.log(`   Status: ${training.status}, Participants: ${training.currentParticipants}/${training.maxParticipants}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding trainings:', error);
    process.exit(1);
  }
}

seedTrainings();
