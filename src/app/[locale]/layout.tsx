import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <main>{children}</main>;
}
