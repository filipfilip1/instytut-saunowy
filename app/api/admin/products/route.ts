import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();

    const product = await Product.create(data);

    return NextResponse.json({
      status: 'success',
      data: product
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating product:', error);

    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json({
        error: 'Produkt o tej nazwie już istnieje'
      }, { status: 400 });
    }

    return NextResponse.json({
      error: 'Błąd podczas tworzenia produktu'
    }, { status: 500 });
  }
}