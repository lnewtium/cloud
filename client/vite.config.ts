import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  plugins: [react(), tsconfigPaths()],
  publicDir: "public",
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: "src" }],
  },
});
