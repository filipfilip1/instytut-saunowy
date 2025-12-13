import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { slug } = await params;
    const post = await (BlogPost as any).findBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { status: 'error', message: 'Post nie został znaleziony' },
        { status: 404 }
      );
    }

    // Increment view count
    await post.incrementViews();

    return NextResponse.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { status: 'error', message: 'Błąd podczas pobierania posta' },
      { status: 500 }
    );
  }
}
