/**
 * Normalizes an href coming from Sanity.
 *
 * Editors enter nav/CTA targets inconsistently ("kontakt" vs "/kontakt").
 * Without a leading slash Next resolves them relative to the current route,
 * so a footer link "o-nama" on /tretmani/[slug] lands on /tretmani/o-nama.
 * External links, absolute paths and anchors are passed through untouched.
 */
export function normalizeHref(href: string | undefined | null): string {
    if (!href) return "/";
    if (
        href.startsWith("/") ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
    ) {
        return href;
    }
    return `/${href}`;
}
