<script setup lang="ts">
import { APP_CONFIG } from "@/config";
import { useLogto, type IdTokenClaims } from "@logto/vue";
import { ref } from "vue";

const { signIn, signOut, getIdTokenClaims, isAuthenticated } = useLogto();

const user = ref<IdTokenClaims>();

if (isAuthenticated.value) {
  (async () => {
    const claims = await getIdTokenClaims();
    user.value = claims;
  })();
}

const onClickSignIn = () => signIn(APP_CONFIG.logtoCallback);
const onClickSignOut = () => signOut(APP_CONFIG.logtoPostLogoutRedirect);
</script>

<template>
  <main>
    <button @click="onClickSignIn">Sign In</button>
    <button @click="onClickSignOut">Sign Out</button>

    {{ isAuthenticated }}
    <div v-if="isAuthenticated && user">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in user" v-bind:key="key">
            <td>{{ key }}</td>
            <td>{{ typeof value === "string" ? value : JSON.stringify(value) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
