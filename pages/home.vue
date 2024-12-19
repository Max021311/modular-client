<template>
  <h1>Home</h1>
  <NuxtLink
    :to="{
      path: '/',
      query: { hello: '1' }
    }"
  >
    Index
  </NuxtLink>
</template>

<script setup lang="ts"></script>
