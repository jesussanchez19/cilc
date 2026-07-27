import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { writeClient } from '@/lib/sanity/writeClient';

/**
 * Los IDs de Sanity son alfanuméricos con guiones y puntos. Acotar el formato
 * evita que llegue aquí cualquier cadena: este endpoint borra documentos, así
 * que conviene rechazar pronto lo que ni siquiera parece un ID.
 */
const deleteSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[A-Za-z0-9._-]+$/, 'ID con caracteres no permitidos'),
});

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = deleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }
  const { id } = parsed.data;

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
