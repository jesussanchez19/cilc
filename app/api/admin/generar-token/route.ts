import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/writeClient';

export async function POST(req: NextRequest) {
  // Protegido con el mismo token maestro del formulario
  const auth = req.headers.get('authorization') ?? '';
  const masterToken = process.env.TESTIMONIAL_ACCESS_TOKEN;
  if (!masterToken || auth !== `Bearer ${masterToken}`) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { label } = await req.json().catch(() => ({ label: '' }));

  const token   = crypto.randomUUID();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cilc.vercel.app';
  const url     = `${siteUrl}/dar-testimonio?acceso=${token}`;

  await writeClient.create({
    _type:    'tokenTestimonio',
    label:    label || 'Sin etiqueta',
    token,
    url,
    usado:    false,
    creadoEn: new Date().toISOString(),
  });

  return NextResponse.json({ token, url });
}
