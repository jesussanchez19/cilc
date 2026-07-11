import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/writeClient';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('[testimonio] Falta SANITY_API_WRITE_TOKEN en .env.local');
    return NextResponse.json({ error: 'Configuración incompleta en el servidor.' }, { status: 500 });
  }

  const fd = await req.formData();
  const nombre  = fd.get('nombre') as string;
  const email   = fd.get('email')  as string;
  const programa = fd.get('programa') as string;
  const pais    = fd.get('pais')   as string;
  const texto   = fd.get('texto')  as string;
  const fotoFile = fd.get('foto') as File | null;

  if (!nombre || !email || !texto) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 });
  }

  try {
    let fotoRef: { _type: string; asset: { _type: string; _ref: string } } | undefined;

    if (fotoFile && fotoFile.size > 0) {
      const buffer = Buffer.from(await fotoFile.arrayBuffer());
      const asset = await writeClient.assets.upload('image', buffer, {
        filename: fotoFile.name,
        contentType: fotoFile.type,
      });
      fotoRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
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
      ...(fotoRef && { foto: fotoRef }),
    });
  } catch (err) {
    console.error('[testimonio] Error al guardar en Sanity:', err);
    return NextResponse.json({ error: 'No se pudo guardar el testimonio.' }, { status: 500 });
  }

  try {
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
        <p><strong>Foto:</strong> ${fotoFile && fotoFile.size > 0 ? 'Sí (ver en Studio)' : 'No'}</p>
        <p><strong>Testimonio:</strong></p>
        <blockquote>${texto}</blockquote>
        <p>Revisa y aprueba en <a href="http://localhost:3000/studio">Sanity Studio</a>.</p>
      `,
    });
  } catch (err) {
    console.error('[testimonio] Error al enviar email:', err);
  }

  return NextResponse.json({ success: true });
}
