// src/app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import NavBar from "../components/NavBar";
import "../globals.css";

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NavBar locale={locale} />
        <main>{children}</main>
      </body>
    </html>
  );
}
