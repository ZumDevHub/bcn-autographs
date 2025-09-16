// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Idiomas soportados
const locales = ["en-gb", "ca"];
const defaultLocale = "en-gb";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si la URL ya empieza con /en o /ca, no hacemos nada
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Redirige siempre a /en (defaultLocale) si no hay idioma en la URL
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  // Si la URL ya tiene idioma, dejamos pasar la request normalmente
  return NextResponse.next();
}

// Configuración para ejecutar el middleware en todas las rutas excepto _next y ficheros estáticos
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
