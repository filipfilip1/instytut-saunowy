import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || '-publishedAt';
    const limit = parseInt(searchParams.get('limit') || '12');
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .select('-content'); // Exclude full content in listing

    const total = await BlogPost.countDocuments(query);

    return NextResponse.json({
      status: 'success',
      results: posts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { status: 'error', message: 'Błąd podczas pobierania postów' },
      { status: 500 }
    );
  }
}
