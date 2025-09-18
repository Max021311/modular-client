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
      <ul class="menu menu-horizontal space-x-1">
        <!-- Links for user scope (administrativo) -->
        <template v-if="scope === 'user'">
          <li>
            <NuxtLink
              to="/administrativo"
              class="btn-ghost"
            >
              Administrativo
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/administrativo/alumnos"
              class="btn-ghost"
            >
              Alumnos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/administrativo/departamentos"
              class="btn-ghost"
            >
              Departamentos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/administrativo/plazas"
              class="btn-ghost"
            >
              Plazas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/administrativo/ciclos"
              class="btn-ghost"
            >
              Ciclos
            </NuxtLink>
          </li>
        </template>

        <!-- Links for student scope (alumno) -->
        <template v-if="scope === 'student'">
          <li>
            <NuxtLink
              to="/alumno"
              class="btn-ghost"
            >
              Alumno
            </NuxtLink>
          </li>
        </template>

        <!-- <li>
          <NuxtLink
            to="/about"
            class="btn-ghost"
          >
            Acerca de
          </NuxtLink>
        </li> -->
        <ChatDialogflow />
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
