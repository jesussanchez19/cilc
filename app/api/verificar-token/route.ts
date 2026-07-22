import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t');
  if (!token) return NextResponse.json({ status: 'invalid' });

  try {
    const doc = await client.fetch<{ _id: string; usado: boolean } | null>(
      `*[_type == "tokenTestimonio" && token == $token][0]{ _id, usado }`,
      { token },
    );
    if (!doc)       return NextResponse.json({ status: 'invalid' });
    if (doc.usado)  return NextResponse.json({ status: 'used' });
    return NextResponse.json({ status: 'valid' });
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 503 });
  }
}
