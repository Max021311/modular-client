<template>
  <div class="navbar bg-base-300">
    <!-- Inicio de la barra (Responsive dropdown) -->
    <div class="navbar-start">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <NavBarLinks />
        </ul>
      </div>
      <NuxtLink
        to="/"
        class="btn btn-ghost text-xl text font-bold"
      >
        <img
          src="/logo-removebg-preview.png"
          alt="Plus Icon"
          class="w-9 h-9"
        >
        SSP+
      </NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal space-x-1">
        <NavBarLinks />
      </ul>
    </div>
    <!-- Botones finales: cambio de tema y autenticación -->
    <div class="navbar-end flex gap-2">
      <ClientOnly>
        <ThemeChanger />
      </ClientOnly>
      <button
        v-if="isAuthenticated"
        class="btn btn-primary btn-sm btn-circle"
        @click="loginStore.logout"
      >
        <AtomsIconOutlinedLogout
          size="20"
          class="*:stroke-white"
        />
      </button>
      <NuxtLink
        v-else
        to="/sign-in"
        class="btn btn-primary btn-sm"
      >
        Iniciar sesión
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '~/stores/login'

const loginStore = useLoginStore()
const isAuthenticated = computed(() => loginStore.isAuthenticated)
const scope = computed(() => loginStore.userInfo?.scope)
</script>
