import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.png"],
  manifest: {
    name: "NPS",
    short_name: "NPS",
    description: "NPS:- Nature Protect System",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
       
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/favicon.ico",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "icon",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any maskable",
      },
    ],

    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    prefer_related_applications: true
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  build: {
    outDir: "dist",
  },
  server: {
	host: true,
	port: 5173,
	watch: {
		usePolling: true,
	},
},
});
