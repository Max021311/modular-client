<template>
  <div class="navbar bg-base-300">
    <!-- Inicio de la barra (Responsive dropdown) -->
    <div class="navbar-start">
      <NuxtLink
        to="/"
        class="btn btn-ghost text-xl text font-bold"
      >
        <img
          src="/logo-removebg-preview.png"
          alt="Plus Icon"
          class="w-9 h-9 mr-2"
        >
        Social Service System Plus
      </NuxtLink>
    </div>

    <!-- Opciones del menú para pantallas grandes -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <NuxtLink
            to="/main"
            class="btn-ghost"
          >
            Inicio
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/admin"
            class="btn-ghost"
          >
            Admin
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/test"
            class="btn-ghost"
          >
            Formulario
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/register"
            class="btn-ghost"
          >
            Registro
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/about"
            class="btn-ghost"
          >
            Acerca de
          </NuxtLink>
        </li>

        <ChatDialogflow />
      </ul>
    </div>
    <!-- Botones finales: cambio de tema y autenticación -->
    <div class="navbar-end flex gap-2">
      <ClientOnly>
        <ThemeChanger />
      </ClientOnly>
      <button
        v-if="loginStore.isAuthenticated"
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
        Iniciar sesión / Registro
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '~/stores/login'

const loginStore = useLoginStore()
</script>
