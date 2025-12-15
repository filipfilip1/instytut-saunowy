/**
 * Instagram Feed for "Living Gallery" Section
 *
 * HOW TO UPDATE (Every 2-4 weeks):
 * =====================================
 * 1. Visit https://www.instagram.com/instytut_saunowy/
 * 2. Select 6 best recent posts (mix of: ceremonies, products, workshops, atmosphere)
 * 3. Download images or screenshot posts
 * 4. Upload to Cloudinary:
 *    - Use upload preset: 'instagram_feed' (auto-optimize for web)
 *    - Alternatively: Manual upload to 'instagram/' folder
 * 5. Get Cloudinary URLs (format: https://res.cloudinary.com/YOUR_CLOUD/image/upload/...)
 * 6. Get Instagram post URLs (click post → copy URL from browser)
 * 7. Update INSTAGRAM_FEED array below with new data
 * 8. Deploy changes (git commit + push)
 * 9. Done! 🎉
 *
 * TIP: Keep a mix of:
 * - Sauna atmosphere shots (70%)
 * - Products in use (15%)
 * - Workshop/community moments (15%)
 */

export interface InstagramPost {
  imageUrl: string;
  postUrl: string;
  caption?: string; // For accessibility
}

/**
 * Curated Instagram feed
 * @todo Replace with actual Cloudinary URLs after uploading real Instagram images
 */
export const INSTAGRAM_FEED: InstagramPost[] = [
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765814749/568638417_1453700313423327_1196940154728412072_n_lnbsaa.jpg',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Fińska sauna w pełnej krasie',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765814750/597859890_1500808078712550_7219933392194300319_n_rqplms.jpg',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Mindful moment w saunie',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765814698/560606082_1443792917747400_6533667736677390027_n_rztibj.jpg',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Warsztaty dla przyszłych saunamistrzów',
  },
  {
    imageUrl: 'https://res.cloudinary.com/dh87opqta/image/upload/v1765814680/481992912_1244329197693774_3957024046536135450_n_sxeaqf.jpg',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Połączenie sauny z naturą',
  },
];
