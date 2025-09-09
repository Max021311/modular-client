<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-4xl font-bold text-center mb-8">
      Cuestionario de Habilidades y Preferencias
    </h1>
    <form
      class="space-y-6"
      @submit.prevent="handleSubmit"
    >
      <!-- Pregunta 1 -->
      <card>
        <template #title>
          <span class="font-semibold">
            1. ¿En qué áreas académicas te sientes más cómodo/a trabajando?
          </span>
        </template>
        <template #content>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label
              v-for="area in areas"
              :key="area"
              class="cursor-pointer"
            >
              <input
                v-model="form.areas"
                type="checkbox"
                :value="area"
                class="checkbox checkbox-primary mr-2"
              >
              {{ area }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 2 -->
      <card>
        <template #title>
          <span class="font-semibold">
            2. Califica tu nivel de habilidad en herramientas ofimáticas (Word, Excel, PowerPoint).
          </span>
          <span class="font-normal">
            1: Nada - 5: Mucho
          </span>
        </template>
        <template #content>
          <div class="flex gap-4">
            <label
              v-for="n in 5"
              :key="n"
              class="cursor-pointer inline-flex items-center"
            >
              <input
                v-model="form.likert2"
                type="radio"
                :value="n"
                class="radio radio-primary mr-2"
              >
              {{ n }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 3 -->
      <card>
        <template #title>
          <span class="font-semibold">
            3. ¿Prefieres tareas que impliquen contacto directo con personas (e.g. atención, entrevista)?
          </span>
          <span class="font-normal">
            1:Nada - 5:Mucho
          </span>
        </template>
        <template #content>
          <div class="flex gap-4">
            <label
              v-for="n in 5"
              :key="n"
              class="cursor-pointer inline-flex items-center"
            >
              <input
                v-model="form.likert3"
                type="radio"
                :value="n"
                class="radio radio-primary mr-2"
              >
              {{ n }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 4 -->
      <card>
        <template #title>
          <span class="font-semibold">
            4. ¿Qué tan importante es para ti trabajar en proyectos que requieran análisis de datos?
          </span>
          <span class="font-normal">
            1:Nada - 5:Mucho
          </span>
        </template>
        <template #content>
          <div class="flex gap-4">
            <label
              v-for="n in 5"
              :key="n"
              class="cursor-pointer inline-flex items-center"
            >
              <input
                v-model="form.likert4"
                type="radio"
                :value="n"
                class="radio radio-primary mr-2"
              >
              {{ n }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 5 -->
      <card>
        <template #title>
          <span class="font-semibold">
            5. ¿Cuántas horas semanales puedes dedicar al servicio social?
          </span>
          <span class="font-normal">
            (Mínimo 1 - Máximo 40 horas)
          </span>
        </template>
        <template #content>
          <input
            v-model.number="form.hours"
            type="number"
            min="0"
            max="40"
            placeholder="Horas"
            class="input input-bordered w-full"
          >
        </template>
      </card>

      <!-- Pregunta 6 -->
      <card>
        <template #title>
          <span class="font-semibold">
            6. ¿En qué horario del día prefieres realizar tus actividades?
          </span>
        </template>
        <template #content>
          <div class="space-x-4">
            <label class="cursor-pointer inline-flex items-center">
              <input
                v-model="form.schedule"
                type="radio"
                value="Mañana"
                class="radio radio-primary mr-2"
              > Mañana
            </label>
            <label class="cursor-pointer inline-flex items-center">
              <input
                v-model="form.schedule"
                type="radio"
                value="Tarde"
                class="radio radio-primary mr-2"
              > Tarde
            </label>
            <label class="cursor-pointer inline-flex items-center">
              <input
                v-model="form.schedule"
                type="radio"
                value="Mixto"
                class="radio radio-primary mr-2"
              > Mixto
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 7 -->
      <card>
        <template #title>
          <span class="font-semibold">
            7. ¿Te gustaría desarrollar habilidades de programación o sistemas de información?
          </span>
        </template>
        <template #content>
          <div class="space-x-4">
            <label class="cursor-pointer inline-flex items-center">
              <input
                v-model="form.programming"
                type="radio"
                value="Sí"
                class="radio radio-primary mr-2"
              > Sí
            </label>
            <label class="cursor-pointer inline-flex items-center">
              <input
                v-model="form.programming"
                type="radio"
                value="No"
                class="radio radio-primary mr-2"
              > No
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 8 -->
      <card>
        <template #title>
          <span class="font-semibold">
            8. ¿Tienes experiencia previa en voluntariado o servicio social?
          </span>
        </template>
        <template #content>
          <div class="space-y-2">
            <div class="space-x-4">
              <label class="cursor-pointer inline-flex items-center">
                <input
                  v-model="form.volunteer"
                  type="radio"
                  value="Sí"
                  class="radio radio-primary mr-2"
                > Sí
              </label>
              <label class="cursor-pointer inline-flex items-center">
                <input
                  v-model="form.volunteer"
                  type="radio"
                  value="No"
                  class="radio radio-primary mr-2"
                > No
              </label>
            </div>
            <textarea
              v-if="form.volunteer === 'Sí'"
              v-model="form.volunteerDetail"
              placeholder="¿Dónde y cuándo?"
              class="textarea textarea-bordered w-full"
            />
          </div>
        </template>
      </card>

      <!-- Pregunta 9 -->
      <card>
        <template #title>
          <span class="font-semibold">
            9. ¿Qué tan motivado/a estás para trabajar en proyectos de responsabilidad social o comunitaria?
          </span>
          <span class="font-normal">
            1:Nada - 5:Mucho
          </span>
        </template>
        <template #content>
          <div class="flex gap-4">
            <label
              v-for="n in 5"
              :key="n"
              class="cursor-pointer inline-flex items-center"
            >
              <input
                v-model="form.likert9"
                type="radio"
                :value="n"
                class="radio radio-primary mr-2"
              >
              {{ n }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 10 -->
      <card>
        <template #title>
          <span class="font-semibold">
            10. Indica tu nivel de interés en actividades creativas (diseño, redacción, edición de contenidos).
          </span>
          <span class="font-normal">
            1:Nada - 5:Mucho
          </span>
        </template>
        <template #content>
          <div class="flex gap-4">
            <label
              v-for="n in 5"
              :key="n"
              class="cursor-pointer inline-flex items-center"
            >
              <input
                v-model="form.likert10"
                type="radio"
                :value="n"
                class="radio radio-primary mr-2"
              >
              {{ n }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 11 -->
      <card>
        <template #title>
          <span class="font-semibold">
            11. ¿Qué tipo de sector te interesa más?
          </span>
        </template>
        <template #content>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label
              v-for="sector in sectors"
              :key="sector"
              class="cursor-pointer"
            >
              <input
                v-model="form.sectors"
                type="checkbox"
                :value="sector"
                class="checkbox checkbox-primary mr-2"
              >
              {{ sector }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 12 -->
      <card>
        <template #title>
          <span class="font-semibold">
            12. ¿Prefieres colaborar de manera individual o en equipo?
          </span>
        </template>
        <template #content>
          <div class="space-x-4">
            <label class="cursor-pointer inline-flex items-center">
              <input
                v-model="form.collaboration"
                type="radio"
                value="Individual"
                class="radio radio-primary mr-2"
              > Individual
            </label>
            <label class="cursor-pointer inline-flex items-center">
              <input
                v-model="form.collaboration"
                type="radio"
                value="En equipo"
                class="radio radio-primary mr-2"
              > En equipo
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 13 -->
      <card>
        <template #title>
          <span class="font-semibold">
            13. ¿Qué tan cómodo/a te sientes realizando tareas físicas o de campo (e.g. levantamiento de encuestas)?
          </span>
          <span class="font-normal">
            1:Nada - 5:Mucho
          </span>
        </template>
        <template #content>
          <div class="flex gap-4">
            <label
              v-for="n in 5"
              :key="n"
              class="cursor-pointer inline-flex items-center"
            >
              <input
                v-model="form.likert13"
                type="radio"
                :value="n"
                class="radio radio-primary mr-2"
              >
              {{ n }}
            </label>
          </div>
        </template>
      </card>

      <!-- Pregunta 14 -->
      <card>
        <template #title>
          <span class="font-semibold">
            14. ¿Cuál es tu principal objetivo al hacer el servicio social?
          </span>
        </template>
        <template #content>
          <select
            v-model="form.goal"
            class="select select-bordered w-full"
          >
            <option
              disabled
              value=""
            >
              Selecciona una opción
            </option>
            <option>Desarrollar habilidades profesionales</option>
            <option>Ayudar a la comunidad</option>
            <option>Networking</option>
            <option>Requisito de titulación</option>
            <option>Otro</option>
          </select>
          <textarea
            v-if="form.goal === 'Otro'"
            v-model="form.otherGoal"
            placeholder="Especifica tu objetivo"
            class="textarea textarea-bordered w-full mt-2"
          />
        </template>
      </card>

      <!-- Pregunta 15 -->
      <card>
        <template #title>
          <span class="font-semibold">
            15. ¿Hay alguna destreza o área donde te gustaría capacitarte durante tu servicio social?
          </span>
        </template>
        <template #content>
          <textarea
            v-model="form.skillInterest"
            placeholder="Escribe aquí..."
            class="textarea textarea-bordered w-full"
          />
        </template>
      </card>

      <!-- Enviar -->
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary btn-lg"
        >
          Enviar Cuestionario
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const areas = ['Administración', 'Comunicación', 'Sistemas', 'Salud', 'Educación', 'Cultura', 'Medio ambiente', 'Otra']
const sectors = ['Salud', 'Educación', 'Cultura', 'Tecnología', 'Administración pública', 'Medio ambiente', 'Otro']

const form = reactive({
  areas: [],
  likert2: 3,
  likert3: 3,
  likert4: 3,
  likert9: 3,
  likert10: 3,
  likert13: 3,
  hours: null,
  schedule: '',
  programming: '',
  volunteer: '',
  volunteerDetail: '',
  sectors: [],
  collaboration: '',
  goal: '',
  otherGoal: '',
  skillInterest: ''
})

function handleSubmit() {
  console.log('Form submitted', form)
  // Lógica de envío
}
</script>
