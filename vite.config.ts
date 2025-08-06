import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  base: "tiny-react/demos",
  resolve: {
    alias: {
      "@": "/src",
      "#": "/demo",
    },
  },
  plugins: [
    react({
      jsxRuntime: "classic",
      babel: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              pragma: "createElement",
              development: false,
              useBuiltIns: false,
              throwIfNamespace: false,
            },
          ],
        ],
      },
    }),
  ],
  server: {
    port: 3333,
  },
})
