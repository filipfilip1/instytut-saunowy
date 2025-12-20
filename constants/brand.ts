/**
 * Brand assets configuration
 * Single Source of Truth for logos, colors, and brand-related constants
 */

import { emailLogo } from '@/lib/utils/cloudinary';

// Base Cloudinary URL without transformations
const LOGO_BASE_URL = 'https://res.cloudinary.com/dh87opqta/image/upload/v1764238017/logo-kolor-ciemne_fuukqz.webp';

export const BRAND = {
  name: 'Instytut Saunowy',

  logo: {
    // Base logo URL (original: 73x78px, aspect ratio ~0.936)
    baseUrl: LOGO_BASE_URL,
    alt: 'Instytut Saunowy',

    // Optimized URLs for different contexts using Cloudinary transformation helpers
    // Using c_fit to preserve aspect ratio, f_jpg for email compatibility
    url: {
      // Header: 150x150 container, actual size preserves aspect ratio
      header: emailLogo(LOGO_BASE_URL, 150, 150),
      // Email: 100x100 container, JPEG for maximum email client compatibility
      email: emailLogo(LOGO_BASE_URL, 100, 100),
      // Footer: 120x120 container
      footer: emailLogo(LOGO_BASE_URL, 120, 120),
    },

    // Display dimensions (actual rendered size may be smaller due to c_fit preserving aspect ratio)
    dimensions: {
      header: { width: 150, height: 150 },
      email: { width: 100, height: 100 },
      footer: { width: 120, height: 120 },
    },
  },

  contact: {
    email: 'kontakt@instytutsaunowy.pl',
    phone: '+48533509795',
    phoneDisplay: '+48 533 509 795', // For display with country code
  },

  address: {
    street: 'Al. Józefa Piłsudskiego 34/129',
    city: 'Dąbrowa Górnicza',
    zipCode: '41-303',
    country: 'Polska',
  },

  legal: {
    companyName: 'Instytut Saunowy Sp. z o.o.',
    nip: '7322202061',
    regon: '388000284',
  },

  social: {
    facebook: {
      url: 'https://facebook.com/instytut.saunowy',
      username: '@instytut.saunowy',
    },
    instagram: {
      url: 'https://instagram.com/instytut_saunowy',
      username: '@instytut_saunowy',
    },
  },

  // Icon URLs for email templates (CDN hosted)
  icons: {
    facebook: 'https://cdn-icons-png.flaticon.com/512/124/124010.png',
    instagram: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
  },

} as const;
