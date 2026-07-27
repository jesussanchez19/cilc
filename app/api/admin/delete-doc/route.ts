import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/writeClient';

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const id = body?.id;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const results = await Promise.allSettled([
    writeClient.delete(`drafts.${id}`),
    writeClient.delete(id),
  ]);

  const anyOk = results.some((r) => r.status === 'fulfilled');
  if (!anyOk) {
    const reason = (results[0] as PromiseRejectedResult).reason?.message ?? 'Error desconocido';
    return NextResponse.json({ error: reason }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
