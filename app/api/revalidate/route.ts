import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!secret || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Revalida todas las páginas que usan datos de Sanity
  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
