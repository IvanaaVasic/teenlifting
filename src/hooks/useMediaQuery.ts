import { useState, useEffect } from "react";

export const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(() => {
        // SSR-safe: check if window exists
        if (typeof window === "undefined") return false;
        return window.matchMedia(`(max-width: ${width}px)`).matches;
    });

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);

        const updateTarget = (e: MediaQueryListEvent) => {
            setTargetReached(e.matches);
        };

        media.addEventListener("change", updateTarget);
        return () => media.removeEventListener("change", updateTarget);
    }, [width]);

    return targetReached;
};
