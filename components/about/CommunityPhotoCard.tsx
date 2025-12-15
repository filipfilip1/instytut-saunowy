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
      className={`relative overflow-hidden rounded-2xl group cursor-pointer h-full ${
        size === 'large' ? 'row-span-2' : 'row-span-1'
      }`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={eventName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/80 via-graphite-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Hover Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="text-white font-semibold text-lg mb-1">{eventName}</h4>
        <p className="text-cream-100 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
