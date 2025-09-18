<template>
  <div class="space-y-6 my-6">
    <div class="container mx-auto px-4">
      <NuxtLink
        to="/administrativo/alumnos"
        class="btn btn-outline btn-square btn-sm flex justify-center items-center"
      >
        <AtomsIconOutlinedChevronLeft />
      </NuxtLink>
    </div>

    <div class="container mx-auto px-4">
      <div
        v-if="pending"
        class="flex justify-center items-center py-12"
      >
        <span class="loading loading-spinner loading-lg text-primary" />
      </div>

      <div
        v-else-if="data"
        class="space-y-6"
      >
        <!-- Student Information and Actions Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="">
              <!-- Student Information -->
              <div class="">
                <h2 class="card-title text-2xl text-primary mb-4">
                  <AtomsIconOutlinedInfo />
                  Información del estudiante
                </h2>

                <div class="space-y-4">
                  <!-- ID -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      ID:
                    </div>
                    <div class="whitespace-wrap shrink-1 grow-1">
                      {{ data.id }}
                    </div>
                  </div>

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

                  <!-- Career -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Carrera:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.career?.name || 'N/A' }}
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

              <div class="divider" />
              <!-- Action Buttons -->
              <div class="">
                <h3 class="card-title text-lg text-primary mb-4">
                  Acciones
                </h3>
                <div class="flex flex-row flex-wrap justify-around gap-3">
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
                    disabled
                  >
                    <AtomsIconOutlinedError />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <div class="divider text-sm text-base-content/60" />

            <!-- Dates Section -->
            <div class="mt-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60 font-medium">Creado</span>
                  <span class="text-base-content">{{ formatDateTime(data.createdAt.toString()) }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60 font-medium">Actualizado</span>
                  <span class="text-base-content">{{ formatDateTime(data.updatedAt.toString()) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Student Sections -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div
              role="tablist"
              class="tabs tabs-bordered"
            >
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'vacancies' }"
                :to="`/administrativo/alumnos/${id}`"
              >
                Vacantes
              </NuxtLink>
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'quarter-reports' }"
                :to="`/administrativo/alumnos/${id}/reportes-trimestrales`"
              >
                Reportes trimestrales
              </NuxtLink>
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'final-reports' }"
                :to="`/administrativo/alumnos/${id}/reportes-finales`"
              >
                Reportes finales
              </NuxtLink>
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'comission-offices' }"
                :to="`/administrativo/alumnos/${id}/oficios-comision`"
              >
                Oficios de comisión
              </NuxtLink>
            </div>
            <TemplatesListLayout
              v-if="currentTab === 'vacancies'"
              class="mt-2"
              :current-page="vacancyPage"
              :total-pages="vacancyPages"
              :show-pagination="!vacancyPending && vacancies.length > 0"
              @previous-page="handleVacancyPageUpdate(vacancyPage - 1)"
              @next-page="handleVacancyPageUpdate(vacancyPage + 1)"
            >
              <template #actions>
                <input
                  id="vacancy-search"
                  :value="vacancySearch"
                  type="text"
                  placeholder="Buscar vacantes por nombre, descripción..."
                  class="input input-bordered w-full"
                  @input="handleVacancySearch"
                >
                <button
                  class="btn btn-primary grow-0 shrink-0"
                  @click="openAssociateVacancyModal"
                >
                  <IconPlus class="w-4 h-4" />
                  Asociar vacante
                </button>
              </template>

              <template #content>
                <!-- Loading State -->
                <div
                  v-if="vacancyPending"
                  class="flex justify-center py-12"
                >
                  <span class="loading loading-spinner loading-lg text-primary" />
                </div>

                <!-- Vacancies Table -->
                <OrganismsVacanciesTable
                  v-else
                  :vacancies="vacancies"
                  :order="vacancyOrder"
                  :show-department="true"
                  :empty-message="'No se encontraron vacantes para este estudiante.'"
                  @update:order="handleVacancyOrderUpdate"
                  @row-click="handleVacancyRowClick"
                />
              </template>
            </TemplatesListLayout>

            <!-- Reports Tab Content -->
            <div
              v-else-if="currentTab === 'quarter-reports'"
              class="mt-2"
            >
              <div class="text-center py-12">
                <p class="text-base-content/60">
                  Funcionalidad de reportes trimestrales del estudiante pendiente de implementar
                </p>
              </div>
            </div>

            <!-- Final Reports Tab Content -->
            <div
              v-else-if="currentTab === 'final-reports'"
              class="mt-2"
            >
              <div class="text-center py-12">
                <p class="text-base-content/60">
                  Funcionalidad de reportes finales del estudiante pendiente de implementar
                </p>
              </div>
            </div>

            <!-- Comission Offices Tab Content -->
            <div
              v-else-if="currentTab === 'comission-offices'"
              class="mt-2"
            >
              <div class="text-center py-12">
                <p class="text-base-content/60">
                  Funcionalidad de oficios de comisión del estudiante pendiente de implementar
                </p>
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
          Volver a Lista de Estudiantes
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
              {{ error?.data?.message || 'No se pudo obtener la información del estudiante' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Associate Vacancy Modal -->
    <ModalComponent
      v-model="associateModal"
      modal-class="w-fit"
    >
      <div class="flex flex-col gap-4 w-80">
        <h2 class="text-lg font-semibold mb-2">
          Asociar vacante al estudiante
        </h2>

        <form
          class="space-y-4"
          @submit.prevent="handleAssociateSubmit"
        >
          <!-- Vacancy ID Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">ID de la vacante <span class="text-red-500">*</span></span>
            </label>
            <AtomsInputText
              v-model="associateForm.vacancyId"
              type="number"
              placeholder="Ingrese el ID de la vacante"
              min="1"
              :disabled="associatePending"
              required
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 justify-end pt-4">
            <button
              type="button"
              class="btn btn-outline"
              :disabled="associatePending"
              @click="cancelAssociate"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="associatePending || !associateForm.vacancyId"
            >
              <span
                v-if="associatePending"
                class="loading loading-spinner loading-sm"
              />
              {{ associatePending ? 'Asociando...' : 'Asociar vacante' }}
            </button>
          </div>
        </form>
      </div>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useFetchStudent } from '~/composables/useFetchStudent'
import { useFetchVacancies } from '~/composables/useFetchVacancies'
import { useAssociateVacancy } from '~/composables/useAssociateVacancy'
import { formatDateTime } from '~/common/dates'
import { useNotificationStore } from '~/stores/notification'
import type { FastifyError } from '~/types/api/error.d'

function pathToPage(page: string) {
  switch (page) {
    case '':
    case '/':
    case 'vacantes':
      return 'vacancies'
    case 'reportes-trimestrales':
      return 'quarter-reports'
    case 'reportes-finales':
      return 'final-reports'
    case 'oficios-comision':
      return 'comission-offices'
    default:
      return null
  }
}

definePageMeta({
  validate: (value) => {
    if (value.params.id && !/^\d+$/.test(value.params.id as string)) {
      return false
    }
    if (value.params.subpage && pathToPage(value.params.subpage as string) === null) {
      return false
    }
    return true
  }
})

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id as string)
const notificationStore = useNotificationStore()

const currentTab = computed(() => {
  const subpage = route.params.subpage as string
  return pathToPage(subpage) ?? 'vacancies'
})

// Vacancy-related computed properties
const vacancyPage = computed(() => parseInt(route.query.vacancyPage as string ?? '1', 10))
const vacancySearch = computed(() => route.query.vacancySearch as string || undefined)
const vacancyLimit = computed(() => parseInt(route.query.vacancyLimit as string ?? '10', 10))
const vacancyOffset = computed(() => (vacancyPage.value - 1) * vacancyLimit.value)
const vacancyOrder = computed(() => route.query.vacancyOrder as string ?? '-Vacancies.createdAt')

const { data, error, pending } = useFetchStudent({
  id,
  includeCareer: true
})

const {
  vacancies,
  pages: vacancyPages,
  pending: vacancyPending,
  error: vacancyError
} = useFetchVacancies({
  search: vacancySearch,
  limit: vacancyLimit,
  offset: vacancyOffset,
  order: vacancyOrder,
  studentId: computed(() => parseInt(id.value, 10)),
  includeCycle: true,
  includeDepartment: true
})

// Vacancy handlers for component events
const handleVacancySearchUpdate = (value: string | undefined) => {
  router.push({
    query: {
      ...route.query,
      vacancySearch: value,
      vacancyPage: 1 // Reset to first page when searching
    }
  })
}

const handleVacancySearch = useDebounceFn((event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const value = event.target.value
    handleVacancySearchUpdate(value || undefined)
  }
}, 500)

const handleVacancyPageUpdate = (newPage: number) => {
  router.push({ query: { ...route.query, vacancyPage: newPage } })
}

const handleVacancyOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, vacancyOrder: newOrder } })
}

const handleVacancyRowClick = (vacancyId: number) => {
  router.push(`/administrativo/plazas/${vacancyId}`)
}

// Associate vacancy functionality
const { mutate: associateVacancy, pending: associatePending, error: associateError } = useAssociateVacancy()

const associateModal = ref(false)
const associateForm = ref({
  vacancyId: ''
})

const openAssociateVacancyModal = () => {
  associateModal.value = true
  associateForm.value.vacancyId = ''
}

const cancelAssociate = () => {
  associateModal.value = false
  associateForm.value.vacancyId = ''
}

const handleAssociateSubmit = async () => {
  if (!associateForm.value.vacancyId) {
    return
  }

  try {
    const vacancyId = parseInt(associateForm.value.vacancyId, 10)
    const studentId = parseInt(id.value, 10)

    await associateVacancy(vacancyId, studentId)

    // Close modal
    associateModal.value = false
    associateForm.value.vacancyId = ''
  } catch (error) {
    console.error('Error associating vacancy:', error)

    // Check for specific error messages
    let errorMessage = 'No se pudo asociar la vacante al estudiante'

    if (associateError.value && 'statusCode' in associateError.value) {
      if (associateError.value.statusCode === 400 && associateError.value.message === 'Vacancy has no available slots') {
        errorMessage = 'No hay cupos disponibles'
      } else if (associateError.value.statusCode === 404 && associateError.value.message === 'Vacancy not found') {
        errorMessage = 'Plaza no encontrada'
      } else if (associateError.value.statusCode === 409 && associateError.value.message === 'Cannot associate to inactive vacancy') {
        errorMessage = 'No se puedo asociar a una plaza inactiva'
      }
    }

    notificationStore.add({
      type: 'error',
      title: 'Error al asociar',
      description: errorMessage
    })
  }
}

function handleAssociateError(error: Error | FastifyError) {
  console.error('Error associating vacancy:', error)

  const errors = {
    'Vacancy has no available slots': 'No hay cupos disponibles',
    'Vacancy not found': 'Plaza no encontrada',
    'Student already has a vacancy association for this cycle': 'El alumno ya esta asociado a una plaza en este ciclo',
    'Cannot associate to inactive vacancy': 'No se puedo asociar a una plaza inactiva'
  }

  const errorMessage = 'message' in error ? errors[error.message as keyof typeof errors] : 'No se pudo asociar la vacante al estudiante'

  notificationStore.add({
    type: 'error',
    title: 'Error al asociar',
    description: errorMessage
  })
}

watch(associateError, (newError) => {
  if (newError) handleAssociateError(newError)
})

// Watch for vacancy errors
watch(vacancyError, (newError) => {
  if (newError) {
    console.error('Error fetching vacancies:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar vacantes',
      description: 'Ocurrió un error al cargar las vacantes del estudiante'
    })
  }
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
