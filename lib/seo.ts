import type { Metadata } from "next";

/**
 * Standalone copy of the SEO metadata helper used by the live /edge page.
 *
 * The production version resolves paths against `https://instaclaw.io`. In
 * this collab project there's no canonical host, so we leave the absolute
 * URLs unresolved (Next.js renders them relative). For copy/layout work
 * that doesn't matter — for production rendering, the live app uses the
 * source-of-truth implementation in the real codebase.
 */
interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function createMetadata({
  title,
  description,
  path,
  ogTitle,
  noIndex,
  ogImage,
}: CreateMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle ?? title,
      description,
      url: path,
      siteName: "Edge Esmeralda",
      type: "website",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: ogTitle ?? title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
