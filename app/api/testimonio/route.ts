import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/writeClient';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nombre, email, programa, pais, texto } = body;

  if (!nombre || !email || !texto) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 });
  }

  await writeClient.create({
    _type: 'solicitudTestimonio',
    nombre,
    email,
    programa: programa ?? '',
    pais: pais ?? '',
    bandera: '',
    texto,
    estado: 'pendiente',
  });

  await resend.emails.send({
    from: 'CILC Web <onboarding@resend.dev>',
    to: 'jesussanchez19062002@gmail.com',
    subject: `[CILC] Nueva solicitud de testimonio — ${nombre}`,
    html: `
      <h2>Nueva solicitud de testimonio</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Programa:</strong> ${programa}</p>
      <p><strong>País/Ciudad:</strong> ${pais}</p>
      <p><strong>Testimonio:</strong></p>
      <blockquote>${texto}</blockquote>
      <p>Revisa y aprueba en <a href="https://cilc.sanity.studio">Sanity Studio</a>.</p>
    `,
  });

  return NextResponse.json({ success: true });
}
