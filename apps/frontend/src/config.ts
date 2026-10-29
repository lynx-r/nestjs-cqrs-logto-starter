// // 1. Описываем схему валидации для .env
// export const ENV_SCHEMA = z.object({
//   VITE_API_URL: z.url({ message: "VITE_API_URL должен быть корректным URL" }),
//   VITE_APP_TITLE: z.string().min(1, "Название приложения не должно быть пустым"),

import type { LogtoConfig } from "@logto/vue";

//   VITE_LOGTO_ENDPOINT: z.string().min(1, "VITE_LOGTO_ENDPOINT required"),
//   VITE_LOGTO_APP_ID: z.string().min(1, "VITE_LOGTO_APP_ID required"),

//   // Zod умеет автоматически трансформировать строки в boolean или числа
//   VITE_ENABLE_FEATURE_X: z.string().transform((val) => val === "true"),

//   VITE_TIMEOUT: z
//     .string()
//     .transform((val) => parseInt(val, 10))
//     .pipe(z.number().positive()),
// });

// // 2. Безопасно парсим import.meta.env
// const parsed = envSchema.safeParse(import.meta.env);

// if (!parsed.success) {
//   console.error("❌ Ошибка валидации переменных окружения (.env):", parsed.error.format());
//   // Блокируем дальнейший запуск приложения в режиме разработки/сборки
//   throw new Error("Неверная конфигурация окружения. Проверьте .env файл.");
// }

// 3. Экспортируем чистый, удобно отформатированный и строго типизированный объект
export const APP_CONFIG = {
  apiUrl: import.meta.env.VITE_API_URL,
  appTitle: import.meta.env.VITE_APP_TITLE,

  logtoConfig: {
    endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
    appId: import.meta.env.VITE_LOGTO_APP_ID,
  } satisfies LogtoConfig,

  logtoApiResource: import.meta.env.VITE_LOGTO_API_RESOURCE,

  logtoCallback: import.meta.env.VITE_LOGTO_CALLBACK,
  logtoPostLogoutRedirect: import.meta.env.VITE_LOGTO_POST_LOGOUT_REDIRECT,

  isDev: import.meta.env.DEV, // Стандартная переменная Vite
} as const;
