import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || '-createdAt';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search');

    const query: any = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .select('-__v');

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      status: 'success',
      results: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { status: 'error', message: 'Błąd podczas pobierania produktów' },
      { status: 500 }
    );
  }
}