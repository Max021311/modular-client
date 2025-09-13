<template>
  <div class="min-h-screen bg-base-200">
    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8 max-w-6xl">
      <!-- Loading State -->
      <div
        v-if="pending"
        class="flex justify-center items-center py-12"
      >
        <span class="loading loading-spinner loading-lg text-primary" />
      </div>

      <!-- Student Data -->
      <div
        v-else-if="data"
        class="space-y-6"
      >
        <div class="flex justify-start pt-4">
          <NuxtLink
            to="/administrativo/alumnos"
            class="btn btn-outline btn-square btn-sm flex justify-center items-center"
          >
            <AtomsIconOutlinedChevronLeft />
          </NuxtLink>
        </div>
        <!-- Student Information and Actions Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="grid grid-cols-1 lg:grid-cols-4">
              <!-- Personal Information -->
              <div class="lg:col-span-2">
                <h2 class="card-title text-2xl text-primary mb-4">
                  <AtomsIconOutlinedInfo />
                  Información Personal
                </h2>

                <div class="space-y-4">
                  <!-- Name -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Nombre:
                    </div>
                    <div class="whitespace-wrap shrink-1 grow-1">
                      {{ data.name }}
                    </div>
                  </div>

                  <!-- Student Code -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Código:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.code }}
                    </div>
                  </div>

                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Carrera:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.career.name }}
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Email:
                    </div>
                    <a
                      :href="`mailto:${data.email}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.email }}
                    </a>
                  </div>

                  <!-- Phone -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Teléfono:
                    </div>
                    <a
                      :href="`tel:${data.telephone}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.telephone }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="divider lg:idden lg:divider-horizontal" />
              <!-- Action Buttons -->
              <div class="lg:col-span-1 flex flex-col">
                <h3 class="card-title text-lg text-primary mb-4 lg:self-center">
                  Acciones
                </h3>
                <div class="flex flex-row flex-wrap lg:flex-col justify-around lg:items-center gap-3">
                  <button
                    type="button"
                    class="btn btn-primary btn-md btn-wide lg:btn-md"
                  >
                    <AtomsIconOutlinedInfo />
                    Editar
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline btn-error btn-md btn-wide lg:btn-md"
                  >
                    <AtomsIconOutlinedError />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <div class="divider text-sm text-base-content/60" />

            <!-- Dates Section -->
            <div class="mt-">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60 font-medium">Creado</span>
                  <span class="text-base-content">{{ formatDateTime(data.createdAt) }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60 font-medium">Actualizado</span>
                  <span class="text-base-content">{{ formatDateTime(data.updatedAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div
        v-else-if="error?.statusCode === 404"
        class="max-w-2xl mx-auto text-center py-12"
      >
        <AtomsIconOutlinedWarning
          size="64"
          class="w-16 h-16 text-warning mx-auto mb-4"
        />
        <h2 class="text-2xl font-bold text-base-content mb-2">
          Estudiante no encontrado
        </h2>
        <p class="text-base-content/60 mb-6">
          No se pudo encontrar la información del estudiante con ID {{ id }}.
        </p>
        <NuxtLink
          to="/administrativo/alumnos"
          class="btn btn-primary"
        >
          Volver a Lista de Alumnos
        </NuxtLink>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="max-w-2xl mx-auto"
      >
        <div class="alert alert-error">
          <AtomsIconOutlinedError
            size="24"
            class="w-6 h-6"
          />
          <div>
            <h3 class="font-bold">
              Error al cargar la información
            </h3>
            <div class="text-xs">
              {{ error.data?.message || 'No se pudo obtener la información del estudiante' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchStudent } from '~/composables/useFetchStudent'
import { formatDateTime } from '~/common/dates'

const route = useRoute()
const id = computed(() => route.params.id as string)

const { data, error, pending } = useFetchStudent({
  id,
  includeCareer: true
})

// Set page meta
useHead({
  title: computed(() => data.value ? `${data.value.name} - Información del Alumno` : 'Cargando...'),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        data.value
          ? `Información completa del estudiante ${data.value.name} - ${data.value.career?.name || 'Sin carrera'}`
          : 'Información del estudiante'
      )
    }
  ]
})
</script>
