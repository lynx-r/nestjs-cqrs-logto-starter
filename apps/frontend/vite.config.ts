import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import z from "zod";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем .env файлы в зависимости от режима (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  // Валидируем
  envSchema.parse(env); // Вызовет ошибку и остановит процесс, если что-то не так

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});

// 1. Описываем схему валидации для .env
const envSchema = z.object({
  VITE_API_URL: z.url({ message: "VITE_API_URL должен быть корректным URL" }),
  VITE_APP_TITLE: z.string().min(1, "Название приложения не должно быть пустым"),

  VITE_LOGTO_ENDPOINT: z.string().min(1, "VITE_LOGTO_ENDPOINT required"),
  VITE_LOGTO_APP_ID: z.string().min(1, "VITE_LOGTO_APP_ID required"),
});
