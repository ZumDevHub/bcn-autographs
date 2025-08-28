import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Opcional: validar secreto, si lo añades como "Secret" en el webhook settings
    if (process.env.STORYBLOK_WEBHOOK_SECRET && body.secret !== process.env.STORYBLOK_WEBHOOK_SECRET) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid secret" },
        { status: 401 }
      );
    }

    // Storyblok envía el slug de la story modificada
    const slug = body.story?.full_slug;

    if (slug) {
      revalidatePath(`/${slug}`);
    }

    // Siempre revalidamos la homepage también, por si el listado cambia
    revalidatePath("/");

    return NextResponse.json({ revalidated: true, slug });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}