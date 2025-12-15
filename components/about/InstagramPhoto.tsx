import Image from 'next/image';
import { Instagram } from 'lucide-react';

interface InstagramPhotoProps {
  imageUrl: string;
  postUrl: string;
  caption?: string;
}

export default function InstagramPhoto({ imageUrl, postUrl, caption }: InstagramPhotoProps) {
  return (
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block min-w-[300px] flex-shrink-0 snap-center"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
        <Image
          src={imageUrl}
          alt={caption || 'Instagram post'}
          fill
          className="object-cover"
        />

        {/* Instagram Icon Overlay */}
        <div className="absolute top-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <Instagram className="w-5 h-5 text-warmwood-600" />
        </div>
      </div>
    </a>
  );
}
