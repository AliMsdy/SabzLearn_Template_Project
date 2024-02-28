import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "سبزلرن",
        short_name: "سبزلرن",
        description: "آکادمی آموزش برنامه نویسی سبزلرن",
        theme_color: "#2bce56",
        background_color: "#c1c1c1",
        scope: "./",
        orientation: "portrait",
        start_url: "./",
        display: "standalone",
        lang: "fa",
        icons: [
          {
            src: "icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },

          {
            src: "icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-284x284.png",
            sizes: "284x284",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/v1");
            },
            handler: "StaleWhileRevalidate" as const,
            options: {
              cacheName: "api-assets",
              expiration: {
                maxEntries: 1000,
              },
            },
          },
          {
            urlPattern: ({ url }) => {
              return (
                url.pathname.startsWith("/images") ||
                url.pathname.startsWith("/fonts")
              );
            },
            handler: "CacheFirst" as const,
            options: {
              cacheName: "site-assets",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 10, // 10 day cache the assets
              },
            },
          },
        ],
      },
      injectRegister: "auto",
    }),
  ],
  resolve: {
    alias: {
      // src: "/src",
      "@": "/src/",
    },
  },
});
