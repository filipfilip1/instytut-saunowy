/**
 * TypeScript interfaces for Masters of Aufguss (MoA) competitions
 */

export interface MoaCompetition {
  year: string;
  location: string;
  title: string;
  slug: string;
  winner: {
    name: string;
    affiliation: string;
  };
  participants: number;
  description: string;
  highlights: string[];
  images: MoaImage[];
  color: string; // Tailwind gradient classes
  status?: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MoaImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface MoaCeremonyType {
  title: string;
  icon: string;
  maxPoints: number;
  description: string;
  imageUrl: string;
  criteria: MoaCriterion[];
}

export interface MoaCriterion {
  name: string;
  points: number;
}

export interface MoaCriteria {
  name: string;
  weight: string;
  description?: string;
}

export interface MoaTestimonial {
  name: string;
  role: string;
  quote: string;
  imageUrl?: string;
  year: string;
}

export interface MoaNews {
  id: string;
  title: string;
  date: Date;
  excerpt: string;
  content?: string;
  image?: string;
  slug?: string;
}
