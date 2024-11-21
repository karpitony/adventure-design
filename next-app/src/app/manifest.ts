import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Push",
    description: "Push web app with Next.js",
    display: "standalone",
    start_url: "/",
    theme_color: "#000000",
    background_color: "#FFFFFF",
    icons: [
      {
        src: "3d-bell-icon.avif",
        type: "image/png",
        sizes: "any",
      },
    ],
  };
}
