<template>
  <div class="navbar bg-base-100">
    <!-- Inicio de la barra (Responsive dropdown) -->
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <NuxtLink to="/" class="btn-ghost">
              Inicio
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin" class="btn-ghost">
              Admin
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/register" class="btn-ghost">
              Registro
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/sign-in" class="btn-ghost">
              Iniciar sesión / Cerrar sesión
            </NuxtLink>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl">Social Service System Plus</a>
    </div>

    <!-- Opciones del menú para pantallas grandes -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <NuxtLink to="/" class="btn-ghost">
            Inicio
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin" class="btn-ghost">
            Admin
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/register" class="btn-ghost">
            Registro
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Botones finales: cambio de tema y autenticación -->
    <div class="navbar-end flex gap-2">
      <ClientOnly>
        <ThemeChanger />
      </ClientOnly>
      <NuxtLink
        to="/sign-in"
        class="btn btn-primary btn-sm">
        Iniciar sesión / Cerrar sesión
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
