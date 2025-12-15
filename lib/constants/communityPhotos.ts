export interface CommunityPhoto {
  imageUrl: string;
  eventName: string;
  description: string;
  size: 'large' | 'small';
}

/**
 * Community event photos for Bento Grid display
 *
 * Layout pattern:
 * Row 1: [Large] [Small] [Small]
 * Row 2: [Small] [Large] [Small]
 *
 * @todo Replace Unsplash placeholders with real event photos from:
 * - Warsztaty saunowe
 * - Zjazdy społeczności
 * - Szkolenia Aufguss
 * - Eventy tematyczne
 */
export const COMMUNITY_PHOTOS: CommunityPhoto[] = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=1000&fit=crop',
    eventName: 'Warsztaty Aufguss',
    description: 'Dwudniowe szkolenie zaawansowanych technik parowych w Zakopanem',
    size: 'large',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=600&fit=crop',
    eventName: 'Zjazd Społeczności',
    description: 'Coroczne spotkanie miłośników fińskiej kultury saunowej',
    size: 'small',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop',
    eventName: 'Ceremonia Löyly',
    description: 'Praktyczne wprowadzenie do tradycyjnej fińskiej ceremonii',
    size: 'small',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=600&fit=crop',
    eventName: 'Mindful Sauna',
    description: 'Połączenie rytuału saunowego z praktykami mindfulness',
    size: 'small',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop',
    eventName: 'Szkolenie Saunamistrzów',
    description: 'Intensywny program certyfikacyjny dla przyszłych instruktorów',
    size: 'large',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop',
    eventName: 'Sauna & Natura',
    description: 'Outdoor event łączący saunę z przyrodą i nordic wellness',
    size: 'small',
  },
];
