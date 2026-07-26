import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WishFlow",
    short_name: "WishFlow",
    description: "A cinematic birthday story for Ambay.",
    start_url: "/",
    display: "standalone",
    background_color: "#050403",
    theme_color: "#050403",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
