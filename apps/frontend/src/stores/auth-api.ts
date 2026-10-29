import { APP_CONFIG } from "@/config";
import { useLogto } from "@logto/vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthApiStore = defineStore("auth-api", () => {
  const accessToken = ref<string>();

  const { isAuthenticated, getAccessToken } = useLogto();

  const authenticate = async () => {
    if (isAuthenticated) {
      return;
    }

    accessToken.value = await getAccessToken(APP_CONFIG.logtoApiResource);
  };

  return {
    isAuthenticated,
    accessToken,
    authenticate,
  };
});
