import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';

// Los tokens se generan con crypto.randomUUID(), así que cualquier cosa que no
// sea un UUID se descarta sin llegar a consultar Sanity.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t');
  if (!token || !UUID.test(token)) {
    return NextResponse.json({ status: 'invalid' });
  }

  try {
    const doc: { _id: string; usado: boolean } | null = await client.fetch(
      `*[_type == "tokenTestimonio" && token == $t][0]{ _id, usado }`,
      { t: token },
    );
    if (!doc)       return NextResponse.json({ status: 'invalid' });
    if (doc.usado)  return NextResponse.json({ status: 'used' });
    return NextResponse.json({ status: 'valid' });
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 503 });
  }
}
