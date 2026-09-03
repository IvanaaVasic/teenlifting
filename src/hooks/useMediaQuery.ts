import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a `(max-width: Npx)` media query.
 *
 * Uses useSyncExternalStore so the value is already correct on the first
 * client render. The previous useState/useEffect version seeded from the
 * server (always false) and only corrected itself when a resize crossed the
 * breakpoint — a phone that loaded the page directly kept the desktop nav
 * and never showed the hamburger.
 */
export const useMediaQuery = (width: number) => {
    const query = `(max-width: ${width}px)`;

    const subscribe = useCallback(
        (onStoreChange: () => void) => {
            const media = window.matchMedia(query);
            media.addEventListener("change", onStoreChange);
            return () => media.removeEventListener("change", onStoreChange);
        },
        [query]
    );

    const getSnapshot = useCallback(
        () => window.matchMedia(query).matches,
        [query]
    );

    // No viewport on the server — render the desktop branch.
    const getServerSnapshot = () => false;

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
