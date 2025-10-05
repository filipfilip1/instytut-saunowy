import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { status: 'error', message: 'Brak uprawnień' },
        { status: 403 }
      );
    }

    await dbConnect();

    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { status: 'error', message: 'Produkt nie znaleziony' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Produkt usunięty'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { status: 'error', message: 'Błąd serwera' },
      { status: 500 }
    );
  }
}