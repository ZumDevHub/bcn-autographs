export const locales = ["en-gb", "ca"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-gb";