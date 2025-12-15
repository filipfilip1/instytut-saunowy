import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface PartnerCardProps {
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl?: string;
}

export default function PartnerCard({ name, description, logoUrl, websiteUrl }: PartnerCardProps) {
  const CardContent = (
    <>
      {/* Logo Container */}
      <div className="relative h-32 flex items-center justify-center bg-gradient-to-br from-cream-50 to-white p-6 group-hover:from-cream-100 group-hover:to-cream-50 transition-colors">
        <div className="relative w-24 h-24">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            fill
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-lg font-semibold text-graphite-900 group-hover:text-nordic-700 transition-colors">
            {name}
          </h4>
          {websiteUrl && (
            <ExternalLink className="w-4 h-4 text-graphite-400 group-hover:text-nordic-600 transition-colors flex-shrink-0 mt-1" />
          )}
        </div>
        <p className="text-sm text-graphite-600 leading-relaxed">{description}</p>
      </div>
    </>
  );

  if (websiteUrl) {
    return (
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white rounded-xl shadow-md border border-cream-200 hover:shadow-lg hover:border-nordic-300 transition-all group"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-cream-200 group">
      {CardContent}
    </div>
  );
}
