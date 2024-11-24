import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "어벤디 차수판",
    short_name: "어벤디 차수판",
    description: "PWA for 어벤디 4T조",
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
