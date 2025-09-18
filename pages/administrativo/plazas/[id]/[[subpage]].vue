<template>
  <div class="space-y-6 my-6">
    <div class="container mx-auto px-4">
      <NuxtLink
        :to=" data?.department ? `/administrativo/departamentos/${data.department?.id}` : '/administrativo/departamentos'"
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
        <!-- Vacancy Information and Actions Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="">
              <!-- Vacancy Information -->
              <div class="">
                <h2 class="card-title text-2xl text-primary mb-4">
                  <AtomsIconOutlinedInfo />
                  Información de la plaza
                </h2>

                <div class="space-y-4">
                  <!-- Código -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Código:
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

                  <!-- Description -->
                  <div class="flex-col sm:items-start gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Descripción:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.description }}
                    </div>
                  </div>

                  <!-- Slots -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Plazas disponibles:
                    </div>
                    <div class="text-base shrink-1 grow-1">
                      <div class="badge badge-outline badge-lg">
                        {{ data.slots }}
                      </div>
                    </div>
                  </div>

                  <!-- Department -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Departamento:
                    </div>
                    <NuxtLink
                      class="text-base whitespace-wrap shrink-1 grow-1 link link-hover"
                      :to="`/administrativo/departamentos/${data.department?.id}`"
                    >
                      {{ data.department?.name || 'N/A' }}
                    </NuxtLink>
                  </div>

                  <!-- Cycle -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Ciclo:
                    </div>
                    <div class="text-base shrink-1 grow-1">
                      <div
                        class="badge badge-lg"
                        :class="{ 'badge-primary': data.cycle?.isCurrent }"
                      >
                        {{ data.cycle?.slug || 'N/A' }}
                      </div>
                    </div>
                  </div>

                  <!-- Status -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Estado:
                    </div>
                    <div class="text-base shrink-1 grow-1">
                      <div
                        class="badge badge-lg"
                        :class="data.disabled ? 'badge-ghost' : 'badge-success'"
                      >
                        {{ data.disabled ? 'Inactiva' : 'Activa' }}
                      </div>
                    </div>
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
                    @click="openEditModal"
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
          Plaza no encontrada
        </h2>
        <p class="text-base-content/60 mb-6">
          No se pudo encontrar la información de la vacante con ID {{ id }}.
        </p>
        <NuxtLink
          to="/administrativo/departamentos"
          class="btn btn-primary"
        >
          Volver a Lista de Departamentos
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
              {{ error?.data?.message || 'No se pudo obtener la información de la vacante' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Students Section -->
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div
            role="tablist"
            class="tabs tabs-bordered"
          >
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'students' }"
              :to="`/administrativo/plazas/${id}`"
            >
              Estudiantes
            </NuxtLink>
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'quarter-reports' }"
              :to="`/administrativo/plazas/${id}/reportes-trimestrales`"
            >
              Reportes trimestrales
            </NuxtLink>
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'final-reports' }"
              :to="`/administrativo/plazas/${id}/reportes-finales`"
            >
              Reportes finales
            </NuxtLink>
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'commission-offices' }"
              :to="`/administrativo/plazas/${id}/oficios-comision`"
            >
              Oficios de comisión
            </NuxtLink>
          </div>
          <TemplatesListLayout
            v-if="currentTab === 'students'"
            class="mt-2"
            :current-page="1"
            :total-pages="1"
            :show-pagination="false"
            :show-divider="false"
            @previous-page="() => {}"
            @next-page="() => {}"
          >
            <template #content>
              <!-- Loading State -->
              <div
                v-if="studentsPending"
                class="flex justify-center py-12"
              >
                <span class="loading loading-spinner loading-lg text-primary" />
              </div>

              <!-- Students Table -->
              <OrganismsStudentsTable
                v-else
                :students="students"
                order=""
                :empty-message="'No hay estudiantes asignados a esta vacante.'"
                @update:order="() => {}"
                @row-click="handleStudentRowClick"
              />
            </template>
          </TemplatesListLayout>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <ModalComponent
      v-model="editModal"
      modal-class="w-fit"
    >
      <div class="flex flex-col gap-4">
        <OrganismsVacancyForm
          v-model="editForm"
          :pending="editPending"
          title="Editar vacante"
          submit-text="Guardar cambios"
          loading-text="Guardando..."
          show-status-field
          @submit="handleEditSubmit"
        />

        <!-- Error Display -->
        <div
          v-if="editError"
          class="alert alert-error"
        >
          <AtomsIconOutlinedError class="w-4 h-4" />
          <span class="text-sm">
            {{ typeof editError === 'string' ? editError : editError.message || 'Error al actualizar la vacante' }}
          </span>
        </div>

        <!-- Cancel Button -->
        <button
          type="button"
          class="btn btn-outline"
          :disabled="editPending"
          @click="cancelEdit"
        >
          Cancelar
        </button>
      </div>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useFetchVacancy } from '~/composables/useFetchVacancy'
import { useFetchStudentsByVacancyId } from '~/composables/useFetchStudentsByVacancyId'
import { useEditVacancy } from '~/composables/useEditVacancy'
import { formatDateTime } from '~/common/dates'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import type { UpdateVacancy } from '~/types/api/vacancy.d'

function pathToPage(page: string) {
  switch (page) {
    case '':
    case '/':case 'alumnos':
      return 'students'
    case 'reportes-trimestrales':
      return 'quarter-reports'
    case 'reportes-finales':
      return 'final-reports'
    case 'oficios-comision':
      return 'commission-offices'
    default:
      return null
  }
}

definePageMeta({
  validate: (value) => {
    if (value.params.id && !/^\d+$/.test(value.params.id as string)) {
      return false
    }
    console.log(value)
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
const loginStore = useLoginStore()

const currentTab = computed(() => {
  const subpage = route.params.subpage as string
  return pathToPage(subpage) ?? 'students'
})

const { data, error, pending, refresh } = useFetchVacancy({
  id,
  includeCycle: true,
  includeDepartment: true
})

// Fetch students for this vacancy
const {
  students,
  pending: studentsPending,
  error: studentsError
} = useFetchStudentsByVacancyId({
  vacancyId: computed(() => parseInt(id.value, 10))
})

const editModal = ref(false)

// Edit functionality
const { mutate: editVacancy, pending: editPending, error: editError } = useEditVacancy()

const editForm = ref<UpdateVacancy>({
  name: '',
  description: '',
  slots: 1,
  disabled: false
})

const openEditModal = () => {
  if (data.value) {
    // Initialize form with current data
    editForm.value = {
      name: data.value.name,
      description: data.value.description,
      slots: data.value.slots,
      disabled: data.value.disabled
    }
  }
  editModal.value = true
}

const cancelEdit = () => {
  editModal.value = false
  // Reset form
  editForm.value = {
    name: '',
    description: '',
    slots: 1,
    disabled: false
  }
}

const handleEditSubmit = async (formData: UpdateVacancy) => {
  if (!data.value || !loginStore.token) {
    return
  }

  try {
    await editVacancy(data.value.id, formData, loginStore.token)

    // Show success notification
    notificationStore.add({
      type: 'success',
      title: 'Plaza actualizada',
      description: 'La información de la vacante ha sido actualizada correctamente'
    })

    // Close modal and refresh data
    editModal.value = false
    await refresh()
  } catch (error) {
    console.error('Error updating vacancy:', error)
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar',
      description: 'No se pudo actualizar la información de la vacante'
    })
  }
}

const handleStudentRowClick = (studentId: number) => {
  router.push(`/administrativo/alumnos/${studentId}`)
}

// Watch for students errors
watch(studentsError, (newError) => {
  if (newError) {
    console.error('Error fetching students:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar estudiantes',
      description: 'Ocurrió un error al cargar los estudiantes de la vacante'
    })
  }
})

useHead({
  title: computed(() => data.value ? `${data.value.name} - Información de la plazq` : 'Cargando...'),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        data.value
          ? `Información completa de la vacante ${data.value.name} - ${data.value.slots} plazas disponibles`
          : 'Información de la vacante'
      )
    }
  ]
})
</script>
