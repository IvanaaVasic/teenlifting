import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import clientConfig from "../sanity/config/client-config";

function urlFromThumbnail(source: SanityImageSource) {
    if (!source) {
        return null;
    }
    return imageUrlBuilder(clientConfig)?.image(source)?.url();
}

export { urlFromThumbnail };
