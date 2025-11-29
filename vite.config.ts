import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  return {
    plugins: [react(), ...(isLib ? [dts({ include: ["src"] })] : [])],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 根目录
        "@/components": resolve(__dirname, "src/components"), // 组件目录
        "@/styles": resolve(__dirname, "src/styles"), // 样式目录
        "@/utils": resolve(__dirname, "src/utils"), // 工具目录
        "@/types": resolve(__dirname, "src/types"), // 类型目录
      },
    },
    server: {
      allowedHosts: [
        ".ngrok-free.app", // 允许所有 ngrok 免费域名
        ".ngrok.app", // 允许所有 ngrok 付费域名
        ".ngrok.io", // 允许所有 ngrok 旧版域名
      ],
      hmr: {
        // 增加轮询间隔,减少请求频率
        timeout: 60000,
        overlay: true,
      },
      watch: {
        // 减少文件监听的轮询频率
        usePolling: false,
      },
    },
    ...(isLib
      ? {
          build: {
            lib: {
              entry: resolve(__dirname, "src/index.ts"),
              name: "MyUI",
              formats: ["es", "umd"],
              fileName: (format) =>
                `index.${format === "es" ? "esm" : format}.js`,
            },
            rollupOptions: {
              external: ["react", "react-dom"],
              output: {
                globals: {
                  react: "React",
                  "react-dom": "ReactDOM",
                },
              },
            },
          },
        }
      : {}),
  };
});
