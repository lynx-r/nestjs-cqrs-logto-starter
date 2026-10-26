<script setup lang="ts">
import { useHandleSignInCallback } from "@logto/vue";
import { useRouter } from "vue-router";
const router = useRouter();

const { isLoading, error } = useHandleSignInCallback(() => {
  router.push("/");
});
</script>

<template>
  <!-- When it's working in progress -->
  <p v-if="isLoading">Redirecting...</p>
  <p v-else-if="error">{{ error }}</p>
</template>
