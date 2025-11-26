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
