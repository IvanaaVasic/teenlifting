/**
 * Anchor ids for in-page navigation ("Na ovoj strani").
 *
 * The sticky list and the headings it scrolls to must agree on the id, so both
 * sides go through the same helpers: `blockAnchorId` for PortableText headings
 * and `slugify` for anything else (FAQ / steps titles, the disclaimer box).
 */

const DIACRITICS: Record<string, string> = {
    "č": "c",
    "ć": "c",
    "ž": "z",
    "š": "s",
    "đ": "dj",
};

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[čćžšđ]/g, (ch) => DIACRITICS[ch])
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/** Flattens a PortableText block's spans into plain text. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function blockText(block: any): string {
    if (!block?.children?.length) return "";
    return (
        block.children
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((child: any) => child?.text || "")
            .join("")
            .trim()
    );
}

/** Stable id for a heading block - slug of its text, `_key` as the fallback. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function blockAnchorId(block: any): string | undefined {
    const slug = slugify(blockText(block));
    if (slug) return slug;
    return block?._key ? `h-${block._key}` : undefined;
}

export type TocEntry = {
    id: string;
    label: string;
};

/**
 * Collects the in-page navigation entries from content sections: h2 headings,
 * plus the FAQ and numbered-step blocks that were given a title.
 */
export function extractToc(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sections: { content?: any[] }[] | undefined
): TocEntry[] {
    if (!sections?.length) return [];

    const entries: TocEntry[] = [];
    const seen = new Set<string>();

    const push = (id: string | undefined, label: string) => {
        if (!id || !label || seen.has(id)) return;
        seen.add(id);
        entries.push({ id, label });
    };

    for (const section of sections) {
        for (const block of section?.content || []) {
            if (block?._type === "block" && block.style === "h2") {
                push(blockAnchorId(block), blockText(block));
            } else if (
                (block?._type === "faqSection" ||
                    block?._type === "numberedSteps") &&
                block.title
            ) {
                push(slugify(block.title), block.title);
            }
        }
    }

    return entries;
}
