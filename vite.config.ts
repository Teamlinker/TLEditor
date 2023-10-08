import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import dts from "vite-plugin-dts"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),dts({
    rollupTypes:true
  })],
  build: {
    outDir: "dist", //输出文件名称
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.ts"), //指定组件编译入口文件
      name: "editor",
      fileName: "editor",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
