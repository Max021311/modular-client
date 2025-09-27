<template>
  <!-- Links for user scope (administrativo) -->
  <template v-if="scope === 'user'">
    <!-- <li>
            <NuxtLink
              to="/administrativo"
              class="btn-ghost"
            >
              Administrativo
            </NuxtLink>
          </li> -->
    <li>
      <NuxtLink
        to="/administrativo/alumnos"
        class="btn-ghost no-underline"
      >
        Alumnos
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/administrativo/departamentos"
        class="btn-ghost no-underline"
      >
        Departamentos
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/administrativo/plazas"
        class="btn-ghost no-underline"
      >
        Plazas
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/administrativo/ciclos"
        class="btn-ghost no-underline"
      >
        Ciclos
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        to="/administrativo/carreras"
        class="btn-ghost no-underline"
      >
        Carreras
      </NuxtLink>
    </li>
  </template>
  <!-- Links for student scope (alumno) -->
  <template v-if="scope === 'student'">
    <li>
      <NuxtLink
        to="/alumno"
        class="btn-ghost no-underline"
      >
        Alumno
      </NuxtLink>
    </li>
  </template>
</template>

<script setup lang="ts">
import { useLoginStore } from '~/stores/login'

const loginStore = useLoginStore()
const isAuthenticated = computed(() => loginStore.isAuthenticated)
const scope = computed(() => loginStore.userInfo?.scope)
</script>
