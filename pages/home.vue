<template>
  <div>
    <h1>Home</h1>
    <NuxtLink
      :to="{
        path: '/',
        query: { hello: '1' }
      }"
    >
      Index
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>
