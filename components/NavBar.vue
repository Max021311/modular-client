<template>
  <div class="navbar bg-base-300 flex justify-between">
    <div>
      <p class="text-2xl">
        Social Service System Plus
      </p>
    </div>
    <div class="flex gap-2">
      <ClientOnly>
        <ThemeChanger />
      </ClientOnly>
      <NuxtLink
        class="btn btn-outline btn-sm"
        to="/"
      >
        Inicio
      </NuxtLink>
      <NuxtLink
        class="btn btn-outline btn-sm"
        to="/admin"
      >
        Admin
      </NuxtLink>
      <!-- NOTE: Hide this button if the user is logged in -->
      <NuxtLink
        class="btn btn-outline btn-sm"
        to="/register"
      >
        Registro
      </NuxtLink>
      <!-- TODO: Make this button change the message if the user is logged in -->
      <NuxtLink
        class="btn btn-outline btn-sm"
        to="/sign-in"
      >
        Iniciar sesión / Cerrar sesión
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
