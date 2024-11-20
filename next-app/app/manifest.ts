import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "어벤디 차수판",
    short_name: "어벤디 차수판",
    description: "어벤디 차수판 알림 + 컨트롤 PWA",
    display: "standalone",
    start_url: "/",
    theme_color: "#FFFFFF",
    background_color: "#FFFFFF",
    icons: [
      {
        src: "/icon.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  };
}