import it from "./it";
import en from "./en";

export type Locale = "it" | "en";
export type TranslationKey = keyof typeof it;

const translations: Record<Locale, Record<TranslationKey, string>> = { it, en };

export const defaultLocale: Locale = "it";
export const locales: Locale[] = ["it", "en"];

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations[defaultLocale][key] ?? key;
}

/** Build a locale-prefixed path: localePath("it", "/portfolio") → "/it/portfolio" */
export function localePath(locale: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path.replace(/^\//, "");
  return `/${locale}${clean ? `/${clean}` : ""}`;
}

/** Extract locale from a URL pathname, defaulting to "it" */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  if (locales.includes(seg as Locale)) return seg as Locale;
  return defaultLocale;
}

/** Get the alternate-language path for a given pathname */
export function getAlternatePath(pathname: string): { locale: Locale; path: string } {
  const current = getLocaleFromPath(pathname);
  const alt: Locale = current === "it" ? "en" : "it";
  const rest = pathname.replace(/^\/(it|en)/, "") || "/";
  return { locale: alt, path: localePath(alt, rest) };
}
