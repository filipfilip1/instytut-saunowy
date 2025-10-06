import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const product = await Product.findBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { status: 'error', message: 'Produkt nie został znaleziony' },
        { status: 404 }
      );
    }

    await product.incrementViews();

    return NextResponse.json({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { status: 'error', message: 'Błąd podczas pobierania produktu' },
      { status: 500 }
    );
  }
}