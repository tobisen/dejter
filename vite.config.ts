import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "dejter";
const base = repo.endsWith(".github.io") ? "/" : `/${repo}/`;
export default defineConfig({
  base,
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "T & J Dejter",
        lang: "sv",
        short_name: "T&J Dejter",
        description: "En personlig dejt- och utflyktsapp för Tobias och Jenny.",
        start_url: ".",
        scope: ".",
        display: "standalone",
        theme_color: "#455c48",
        background_color: "#f7f8f4",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,webp,woff2,woff,ttf}"],
      },
    }),
  ],
});
