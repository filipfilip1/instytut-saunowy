/**
 * Cloudinary image transformation utilities
 */

export interface CloudinaryTransformations {
  width?: number;
  height?: number;
  crop?: 'fit' | 'fill' | 'scale' | 'thumb' | 'pad';
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
  gravity?: 'auto' | 'face' | 'center';
}

/**
 * Transform Cloudinary URL by injecting transformation parameters
 *
 * @example
 * transformCloudinaryUrl(
 *   'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg',
 *   { width: 200, height: 200, crop: 'fit', quality: 80 }
 * )
 * // Returns: 'https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fit,q_80/v123/sample.jpg'
 */
export function transformCloudinaryUrl(
  url: string,
  transformations: CloudinaryTransformations
): string {
  // Check if URL is from Cloudinary
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  // Build transformation string
  const params: string[] = [];

  if (transformations.width) params.push(`w_${transformations.width}`);
  if (transformations.height) params.push(`h_${transformations.height}`);
  if (transformations.crop) params.push(`c_${transformations.crop}`);
  if (transformations.quality) params.push(`q_${transformations.quality}`);
  if (transformations.format) params.push(`f_${transformations.format}`);
  if (transformations.gravity) params.push(`g_${transformations.gravity}`);

  const transformationString = params.join(',');

  // Inject transformations after '/upload/' in the URL
  // URL structure: https://res.cloudinary.com/{cloud}/image/upload/{transformations}/{version}/{id}.{ext}
  return url.replace('/upload/', `/upload/${transformationString}/`);
}

/**
 * Optimize image for email thumbnail (60x60px, good quality)
 */
export function emailThumbnail(url: string): string {
  return transformCloudinaryUrl(url, {
    width: 60,
    height: 60,
    crop: 'thumb',
    gravity: 'auto',
    quality: 75,
    format: 'jpg',
  });
}

/**
 * Optimize logo for email (preserves aspect ratio)
 */
export function emailLogo(url: string, width: number, height: number): string {
  return transformCloudinaryUrl(url, {
    width,
    height,
    crop: 'fit',
    quality: 85,
    format: 'jpg',
  });
}

/**
 * Optimize founder/team member avatar (1024x1024px, face-centered, high quality)
 * Large enough for Next.js Image to scale down for responsive sizes
 * Perfect for rounded profile images
 */
export function founderAvatar(url: string): string {
  return transformCloudinaryUrl(url, {
    width: 1024,
    height: 1024,
    crop: 'fill',
    gravity: 'face',
    quality: 90,
    format: 'auto',
  });
}
