import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 👇 fuerza a resolver los params
  const { locale } = await Promise.resolve(params);

  if (!isLocale(locale)) {
    notFound();
  }

  return <main>{children}</main>;
}
