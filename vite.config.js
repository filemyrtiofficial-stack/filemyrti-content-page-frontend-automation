import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Plugin to copy _redirects to dist
function copyRedirects() {
  return {
    name: "copy-redirects",
    closeBundle() {
      const fs = require("fs");
      const path = require("path");

      const src = path.resolve(__dirname, "public/_redirects");
      const dest = path.resolve(__dirname, "dist/_redirects");

      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log("✅ Copied _redirects to dist/");
      } else {
        console.warn("⚠️ No _redirects file found in public/");
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyRedirects()],
});
