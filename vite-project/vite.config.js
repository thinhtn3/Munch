// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig, resolveConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

// https://vitejs.dev/config/
export default {
  plugins: [react(), Inspect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        result: resolve(__dirname, "result/index.html")
      },
    },
  },
};
