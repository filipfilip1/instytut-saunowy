import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Helper function - automatically generates a folder path based on environment
 *
 * Development: instytut-saunowy/dev/{basePath}
 * Production:  instytut-saunowy/prod/{basePath}
 *
 */
export const getCloudinaryFolder = (basePath: string): string => {
  const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  return `instytut-saunowy/${env}/${basePath}`;
};

export default cloudinary;
