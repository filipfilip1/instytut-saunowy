import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { CATEGORY_LABELS } from '@/lib/constants/blog';
import { IBlogPost } from '@/types';
import FadeIn from '@/components/animations/FadeIn';

// Dynamic params - render on-demand
export const dynamicParams = true;
// Revalidate every 30 minutes
export const revalidate = 1800;

// Generate static params - empty array for on-demand rendering
export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogPost(slug: string): Promise<IBlogPost | null> {
  try {
    await dbConnect();

    const post = await BlogPost.findOne({ slug, isPublished: true });

    if (!post) {
      return null;
    }

    // Increment views
    post.viewCount += 1;
    await post.save();

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getRelatedPosts(category: string, currentSlug: string): Promise<IBlogPost[]> {
  try {
    await dbConnect();

    const posts = await BlogPost.find({
      isPublished: true,
      category,
      slug: { $ne: currentSlug },
    })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select('-content')
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post nie znaleziony',
    };
  }

  return {
    title: post.seo?.metaTitle || `${post.title} - Akademia Instytut Saunowy`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords?.join(', '),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug);

  const categoryColors: Record<string, string> = {
    poradniki: 'bg-nordic-500',
    trendy: 'bg-gold-500',
    diy: 'bg-forest-500',
    szkolenia: 'bg-warmwood-500',
    zdrowie: 'bg-nordic-400',
    przepisy: 'bg-forest-600',
  };

  const categoryColor = categoryColors[post.category] || 'bg-graphite-500';

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <article>
        <div className="relative bg-white">
          {/* Breadcrumbs */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <nav className="text-sm mb-6">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-graphite-500 hover:text-graphite-700">
                    Strona główna
                  </Link>
                </li>
                <li className="text-graphite-500">/</li>
                <li>
                  <Link href="/akademia" className="text-graphite-500 hover:text-graphite-700">
                    Akademia
                  </Link>
                </li>
                <li className="text-graphite-500">/</li>
                <li className="text-graphite-900 font-medium line-clamp-1">{post.title}</li>
              </ol>
            </nav>
          </div>

          {/* Header */}
          <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <FadeIn>
              {/* Category Badge */}
              <div className={`inline-block ${categoryColor} text-white text-sm font-semibold px-4 py-2 rounded-full mb-6`}>
                {CATEGORY_LABELS[post.category]}
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-graphite-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-graphite-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-graphite-600">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center text-white font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-graphite-900">{post.author.name}</div>
                    <div className="text-sm text-graphite-500">{post.author.role}</div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-cream-400"></div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-graphite-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.publishedAt.toString()}>
                    {new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                {/* Read Time */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-graphite-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime} min czytania</span>
                </div>

                {/* Views */}
                {post.viewCount > 0 && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-graphite-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{post.viewCount} wyświetleń</span>
                  </div>
                )}
              </div>
            </FadeIn>
          </header>

          {/* Featured Image */}
          {post.featuredImage?.url && (
            <FadeIn delay={0.2}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FadeIn delay={0.3}>
            <div
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-graphite-900
                prose-p:text-graphite-700 prose-p:leading-relaxed
                prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-graphite-900 prose-strong:font-semibold
                prose-ul:my-6 prose-li:my-2
                prose-img:rounded-xl prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-gold-500 prose-blockquote:bg-cream-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="mt-12 pt-8 border-t border-cream-400">
                <h3 className="text-sm font-semibold text-graphite-900 mb-4">Tagi:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-cream-100 text-graphite-700 px-4 py-2 rounded-full text-sm hover:bg-cream-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Author Box */}
          <FadeIn delay={0.5}>
            <div className="mt-12 p-8 bg-gradient-to-br from-cream-50 to-cream-100 rounded-3xl border-2 border-gold-200">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {post.author.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <h3 className="font-serif text-xl font-bold text-graphite-900 mb-1">{post.author.name}</h3>
                  <p className="text-gold-600 font-medium mb-3">{post.author.role}</p>
                  <p className="text-graphite-700">
                    Ekspert w dziedzinie saunowania i wellness. Dzieli się wiedzą i pasją
                    przez Akademię Instytutu Saunowego.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white border-t border-cream-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-graphite-900 mb-12 text-center">
                Powiązane Artykuły
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <FadeIn key={relatedPost._id} delay={0.1 * (index + 1)}>
                  <Link
                    href={`/akademia/${relatedPost.slug}`}
                    className="block group"
                  >
                    <article className="bg-cream-50 rounded-3xl overflow-hidden hover:shadow-gold-lg transition-shadow">
                      <div className="aspect-video bg-cream-200 overflow-hidden relative">
                        {relatedPost.featuredImage?.url && (
                          <Image
                            src={relatedPost.featuredImage.url}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif font-bold text-graphite-900 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-graphite-600 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-forest-700 to-nordic-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Podobał Ci się ten artykuł?
            </h2>
            <p className="text-xl text-cream-200 mb-8">
              Odkryj więcej treści w naszej Akademii Saunowania
            </p>
            <Link
              href="/akademia"
              className="inline-flex items-center gap-2 bg-white text-forest-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-cream-50 transition-colors shadow-lg"
            >
              Zobacz wszystkie artykuły
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
