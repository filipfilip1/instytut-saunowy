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
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765819549/486124085_1258184952974865_252334988169383133_n_hfnmaq.jpg',
    eventName: 'Sauna & Natura',
    description: 'Outdoor event łączący saunę z przyrodą i nordic wellness',
    size: 'small',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765819555/589074763_1488340806625944_4533421609909245087_n_b11xzc.jpg',
    eventName: 'Warsztaty Aufguss',
    description: 'Dwudniowe szkolenie zaawansowanych technik parowych w Zakopanem',
    size: 'large',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765819553/577623514_1473475338112491_930237470988858477_n_llgatv.jpg',
    eventName: 'Zjazd Społeczności',
    description: 'Coroczne spotkanie miłośników fińskiej kultury saunowej',
    size: 'small',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765819553/563449687_1445459630914062_4252567337702658007_n_thlphf.jpg',
    eventName: 'Ceremonia Löyly',
    description: 'Praktyczne wprowadzenie do tradycyjnej fińskiej ceremonii',
    size: 'small',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765819552/547387959_1418682093591816_3464506810639298770_n_rbfvnq.jpg',
    eventName: 'Mindful Sauna',
    description: 'Połączenie rytuału saunowego z praktykami mindfulness',
    size: 'small',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765819549/558089322_1438819141578111_5356484247644721983_n_fwkqmt.jpg',
    eventName: 'Szkolenie Saunamistrzów',
    description: 'Intensywny program certyfikacyjny dla przyszłych instruktorów',
    size: 'large',
  },
];
