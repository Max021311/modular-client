<template>
  <div>
    <button
      class="btn btn-primary btn-sm"
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
  </div>
</template>

<script setup lang="ts">
const value = ref(0)
</script>
