<template>
  <div id="about">
    <!-- Contenedor principal con scroll y espacio -->
    <main class="flex flex-col gap-6 px-10 py-8 overflow-auto min-h-screen">
      <!-- Card: Logo y Título -->
      <card>
        <template #title>
          <div class="flex items-center justify-center space-x-4">
            <img
              src="/logo-removebg-preview.png"
              alt="Social Service PLUS Logo"
              class="w-24 h-auto"
            >
            <h1 class="text-5xl font-bold">
              Social Service System Plus
            </h1>
          </div>
        </template>
        <template #content>
          <!-- Sin contenido adicional para esta card -->
        </template>
      </card>

      <!-- Card: Descripción breve y objetivo -->
      <card>
        <template #title>
          <h2 class="text-2xl font-bold text-center">
            Plataforma web moderna para la gestión integral del Servicio Social
          </h2>
        </template>
        <template #content>
          <p class="text-lg mb-4">
            Social Service System Plus nace como propuesta privada e independiente, con el objetivo de
            ofrecer una solución segura, accesible y fácil de usar para el registro, seguimiento y validación
            de trámites de Servicio Social.
          </p>
          <p class="text-lg mb-4">
            Automáticamente genera oficios y reportes, recomienda plazas basadas en habilidades y preferencias,
            y cuenta con un asistente virtual que guía en cada paso del proceso.
          </p>
        </template>
      </card>

      <!-- Card: ¿Qué es Social Service System Plus? -->
      <card>
        <template #title>
          <h2 class="text-3xl font-bold text-center">
            ¿Qué es Social Service System Plus?
          </h2>
        </template>
        <template #content>
          <p class="text-lg mb-4">
            Es una iniciativa desarrollada de forma independiente, no afiliada ni patrocinada oficialmente
            por la Universidad — ni por el Centro Universitario correspondiente. Se presenta como una propuesta
            de mejora al sistema actual, aportando:
          </p>
          <ul class="list-disc list-inside space-y-2">
            <li>Automatización de oficios y reportes con plantillas dinámicas.</li>
            <li>Recomendación inteligente de plazas basada en minería de datos.</li>
            <li>Chatbot IA integrado para resolver dudas y guiar a los usuarios.</li>
            <li>Interfaz intuitiva y segura, con roles de Alumno y Administrativo.</li>
          </ul>
        </template>
      </card>

      <!-- Card: Aviso de Propuesta Privada -->
      <card>
        <template #title>
          <h2 class="text-center font-bold">
            Aviso de Propuesta Privada
          </h2>
        </template>
        <template #content>
          <p class="text-sm text-center">
            ⚠️ Esta plataforma es una propuesta privada, desarrollada sin afiliación formal a la Universidad.
            Cualquier implementación real requerirá acuerdos institucionales.
          </p>
        </template>
      </card>
    </main>
  </div>
</template>

<script lang="ts">

</script>

  <style scoped>
  #main-page {
  font-family: Arial, sans-serif;
}

.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
  </style>
