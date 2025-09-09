<template>
  <div class="">
    <div class="hero bg-base-200 max-w-xl self-center place-self-center my-8">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <img
            src="/logo-removebg-preview.png"
            alt="Social Service PLUS Logo"
            class="w-24 h-auto mr-4"
          >
          <p class="text-5xl font-bold text-gray-800">
            Social Service System PLUS.
          </p>
          <p class="text-3xl font-bold text-gray-800 mb-8">
            Bienvenido a la plataforma de servicio social.
          </p>
          <p class="text-center text-3xl font-bold text-gray-800 mb-8">
            Esta es una plataforma desarrollada para la <br> Universidad de Guadalajara, especificamente para el <br>Centro Universitario de Ciencias Exactas e Ingenierías.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from '#imports'

definePageMeta({
  auth: 'public'
})
</script>
