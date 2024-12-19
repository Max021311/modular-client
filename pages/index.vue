<template>
  <button
    class="border border-gray-500"
    @click="() => value++"
  >
    1+
  </button>
  <p>Counter: {{value}}</p>
  <NuxtLink
    :to="{
      path: '/home',
      query: {
        previousRoute: '/'
      }
    }"
  >
    Home Page
  </NuxtLink>
</template>

<script setup lang="ts">
const value = ref(0)
</script>
