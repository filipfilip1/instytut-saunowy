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
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=600&fit=crop',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Fińska sauna w pełnej krasie',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=600&fit=crop',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Ceremonia Aufguss z naszymi mistrzami',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=600&fit=crop',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Mindful moment w saunie',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=600&fit=crop',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Tradycyjne akcesoria saunowe',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Warsztaty dla przyszłych saunamistrzów',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop',
    postUrl: 'https://www.instagram.com/instytut_saunowy/',
    caption: 'Połączenie sauny z naturą',
  },
];
