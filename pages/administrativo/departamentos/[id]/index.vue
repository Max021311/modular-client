<template>
  <div class="space-y-6 my-6">
    <div class="container mx-auto px-4">
      <NuxtLink
        to="/administrativo/departamentos"
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
        <!-- Department Information and Actions Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="">
              <!-- Department Information -->
              <div class="">
                <h2 class="card-title text-2xl text-primary mb-4">
                  <AtomsIconOutlinedInfo />
                  Información del Departamento
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

                  <!-- Address -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Dirección:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.address }}
                    </div>
                  </div>

                  <!-- Phone -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Teléfono:
                    </div>
                    <a
                      :href="`tel:${data.phone}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.phone }}
                    </a>
                  </div>

                  <!-- Email -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Correo:
                    </div>
                    <a
                      :href="`mailto:${data.email}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.email }}
                    </a>
                  </div>

                  <!-- Chief Name -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Jefe del Departamento:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.chiefName }}
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
          Departamento no encontrado
        </h2>
        <p class="text-base-content/60 mb-6">
          No se pudo encontrar la información del departamento con ID {{ id }}.
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
              {{ error?.data?.message || 'No se pudo obtener la información del departamento' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vacancies Section -->
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <TemplatesListLayout
            title="Plazas del departamento"
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
                placeholder="Buscar plaza por nombre, descripción..."
                class="input input-bordered w-full"
                @input="handleVacancySearch"
              >
              <button
                class="btn btn-primary grow-0 shrink-0"
                :disabled="!permissions.includes(PERMISSIONS.EDIT_DEPARTMENT)"
                @click="openVacancyModal"
              >
                Crear plaza
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
                :show-department="false"
                :empty-message="'No se encontraron plazas para este departamento.'"
                @update:order="handleVacancyOrderUpdate"
                @row-click="handleVacancyRowClick"
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
      <OrganismsDepartmentForm
        v-model="editForm"
        :pending="editPending"
        title="Editar departamento"
        submit-text="Guardar cambios"
        loading-text="Guardando..."
        @submit="handleEditSubmit"
      />
    </ModalComponent>

    <!-- Add Vacancy Modal -->
    <ModalComponent
      v-model="vacancyModal"
      modal-class="w-fit"
    >
      <OrganismsVacancyForm
        v-model="vacancyForm"
        :pending="createVacancyPending"
        title="Crear plaza"
        submit-text="Crear plaza"
        loading-text="Creando..."
        :show-department-field="false"
        :show-status-field="true"
        :cycles="cycles"
        :cycles-pending="cyclesPending"
        @submit="handleVacancySubmit"
      />
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useFetchDepartment } from '~/composables/useFetchDepartment'
import { useEditDepartment } from '~/composables/useEditDepartment'
import { useFetchVacancies } from '~/composables/useFetchVacancies'
import { useAddVacancy } from '~/composables/useAddVacancy'
import { useFetchCycles } from '~/composables/useFetchCycles'
import { formatDateTime } from '~/common/dates'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import { PERMISSIONS } from '~/common/constants/permissions'
import type { UpdateDepartment } from '~/types/api/department'
import type { CreateVacancy } from '~/types/api/vacancy'

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id as string)
const notificationStore = useNotificationStore()
const loginStore = useLoginStore()

const { data, error, pending } = useFetchDepartment({
  id
})

// Permissions
const permissions = computed(() => {
  if (loginStore.userInfo?.scope === 'user') {
    return loginStore.userInfo.permissions
  }
  return []
})

// Vacancy-related computed properties
const vacancyPage = computed(() => parseInt(route.query.vacancyPage as string ?? '1', 10))
const vacancySearch = computed(() => route.query.vacancySearch as string || undefined)
const vacancyLimit = computed(() => parseInt(route.query.vacancyLimit as string ?? '10', 10))
const vacancyOffset = computed(() => (vacancyPage.value - 1) * vacancyLimit.value)
const vacancyOrder = computed(() => route.query.vacancyOrder as string ?? '-Vacancies.createdAt')

// Fetch vacancies for this department
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
  departmentId: computed(() => parseInt(id.value, 10)),
  includeCycle: true,
  includeDepartment: false
})

const editModal = ref(false)
const editForm = ref<UpdateDepartment>({
  name: '',
  address: '',
  phone: '',
  email: '',
  chiefName: ''
})

// Vacancy creation
const vacancyModal = ref(false)

// Fetch cycles to get default cycle
const { cycles, pending: cyclesPending } = useFetchCycles({ order: '-Cycles.createdAt', limit: 50 })

// Get default cycle (current cycle or first available)
const defaultCycleId = computed(() => {
  const currentCycle = cycles.value.find(cycle => cycle.isCurrent)
  return currentCycle?.id ?? cycles.value[0]?.id ?? 1
})

const vacancyForm = ref<CreateVacancy>({
  name: '',
  description: '',
  slots: 1,
  departmentId: parseInt(id.value, 10),
  cycleId: defaultCycleId.value,
  disabled: false
})

const { error: editError, pending: editPending, mutate: editDepartmentMutate } = useEditDepartment()
const { error: createVacancyError, pending: createVacancyPending, mutate: addVacancyMutate } = useAddVacancy()

const openEditModal = () => {
  if (data.value) {
    editForm.value = {
      name: data.value.name,
      address: data.value.address,
      phone: data.value.phone,
      email: data.value.email,
      chiefName: data.value.chiefName
    }
    editModal.value = true
  }
}

const handleEditSubmit = async (formData: UpdateDepartment) => {
  await editDepartmentMutate(id.value, formData, loginStore.token!)

  if (!editError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Departamento actualizado',
      description: `El departamento ${formData.name} ha sido actualizado exitosamente`
    })

    editModal.value = false
  }
}

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
  // Navigate to vacancy detail page - this route might need to be created
  router.push(`/administrativo/plazas/${vacancyId}`)
}

const openVacancyModal = () => {
  // Reset form with current defaults
  vacancyForm.value = {
    name: '',
    description: '',
    slots: 1,
    departmentId: parseInt(id.value, 10),
    cycleId: defaultCycleId.value,
    disabled: false
  }
  vacancyModal.value = true
}

const handleVacancySubmit = async (formData: CreateVacancy) => {
  await addVacancyMutate(formData)

  if (!createVacancyError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Plaza creada',
      description: `La plaza ${formData.name} ha sido creada exitosamente`
    })

    // Close modal and reset form
    vacancyModal.value = false
    vacancyForm.value = {
      name: '',
      description: '',
      slots: 1,
      departmentId: parseInt(id.value, 10),
      cycleId: defaultCycleId.value,
      disabled: false
    }
  }
}

watch(editError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar departamento',
      description: 'Ya existe un departamento con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar departamento',
      description: 'Ocurrió un error al actualizar el departamento'
    })
  }
})

// Watch for vacancy fetch errors
watch(vacancyError, (newError) => {
  if (newError) {
    console.error('Error fetching vacancies:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar plazas',
      description: 'Ocurrió un error al cargar las plazas del departamento'
    })
  }
})

// Watch for vacancy creation errors
watch(createVacancyError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear plaza',
      description: 'Ya existe una plaza con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear plaza',
      description: 'Ocurrió un error al crear la plaza'
    })
  }
})

useHead({
  title: computed(() => data.value ? `${data.value.name} - Información del Departamento` : 'Cargando...'),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        data.value
          ? `Información completa del departamento ${data.value.name} - Dirigido por ${data.value.chiefName}`
          : 'Información del departamento'
      )
    }
  ]
})
</script>
