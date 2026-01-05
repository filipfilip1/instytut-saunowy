import Image from 'next/image';

interface CommunityPhotoCardProps {
  imageUrl: string;
  eventName: string;
  description: string;
  size: 'large' | 'small';
}

export default function CommunityPhotoCard({
  imageUrl,
  eventName,
  description,
  size,
}: CommunityPhotoCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm group h-full ${
        size === 'large' ? 'row-span-2' : 'row-span-1'
      }`}
    >
      {/* Image - Clean, no overlays */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={eventName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
