import { defineConfig, loadEnv } from "vite";
// import alias from '@rollup/plugin-alias';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },

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
  };
});
