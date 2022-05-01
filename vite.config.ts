import { defineConfig } from "vite";
// import alias from '@rollup/plugin-alias';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // alias({
    //   entries:{
    //     'src': './src',
    //   },
    // }),
  ],
  // test: {
  //   environment: 'happy-dom'
  // },
});
