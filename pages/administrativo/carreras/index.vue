<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Lista de carreras
    </h1>

    <div
      class="flex gap-2"
    >
      <input
        id="search"
        :value="search"
        type="text"
        placeholder="Buscar por nombre de la carrera..."
        class="input input-bordered w-full"
        @input="handleSearch"
      >
      <button
        class="btn btn-primary grow-0 shrink-0"
        :disabled="!permissions.includes(PERMISSIONS.EDIT_DEPARTMENT)"
        @click="openModal"
      >
        Crear carrera
      </button>
    </div>

    <ModalComponent
      v-model="modal"
      modal-class="w-fit"
    >
      <OrganismsCareerForm
        v-model="careerForm"
        :pending="addPending"
        @submit="createCareer"
      />
    </ModalComponent>

    <ModalComponent
      v-model="editModal"
      modal-class="w-fit"
    >
      <OrganismsCareerForm
        v-model="careerForm"
        :pending="editPending"
        title="Editar carrera"
        submit-text="Actualizar carrera"
        loading-text="Actualizando..."
        @submit="updateCareer"
      />
    </ModalComponent>

    <div class="divider divider-vertical my-2" />

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Nombre
            </th>
            <th class="text-left">
              Slug
            </th>
            <th class="text-right">
              <div class="flex items-center justify-end gap-1">
                Fecha de Creación
                <button
                  type="button"
                  class="btn btn-ghost btn-xs btn-circle"
                  @click="toggleOrder"
                >
                  <AtomsIconMicroChevronDown v-if="order === '-createdAt'" />
                  <AtomsIconMicroChevronUp v-else />
                </button>
              </div>
            </th>
            <th class="text-right">
              Última Actualización
            </th>
            <th class="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="career in careers"
            :key="career.id"
            class="table-row"
            role="link"
            tabindex="0"
          >
            <td class="text-left">
              {{ career.id }}
            </td>
            <td class="text-left">
              <div
                class="flex items-center gap-2"
              >
                {{ career.name }}
              </div>
            </td>
            <td class="text-left">
              {{ career.slug }}
            </td>
            <td class="text-right">
              {{ formatDate(new Date(career.createdAt)) }}
            </td>
            <td class="text-right">
              {{ formatDate(new Date(career.updatedAt)) }}
            </td>
            <td class="text-center">
              <button
                class="btn btn-xs btn-outline btn-circle btn-secondary hover:bg-secondary hover:text-secondary-content"
                :disabled="editPending"
                @click="editCareer(career)"
              >
                <span
                  v-if="editPending"
                  class="loading loading-spinner loading-sm"
                />
                <AtomsIconMicroPencilSquare v-else />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div
        v-if="!careers || careers.length === 0"
        class="text-center py-8"
      >
        <p class="text-gray-500">
          No se encontraron resultados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { formatDate } from '~/common/dates'
import { useFetchCareers } from '~/composables/useFetchCareers'
import { useAddCareer } from '~/composables/useAddCareer'
import { usePatchCareer } from '~/composables/usePatchCareer'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import { PERMISSIONS } from '~/common/constants/permissions'
import type { CreateCareer, Career } from '~/types/api/career'

const route = useRoute()
const router = useRouter()
const loginStore = useLoginStore()
const notificationStore = useNotificationStore()

const modal = ref(false)
const editModal = ref(false)
const editingCareer = ref<Career | null>(null)

// Career form data
const careerForm = ref<CreateCareer>({
  name: '',
  slug: ''
})

const { error: addError, pending: addPending, mutate: addCareerMutate } = useAddCareer()
const { error: editError, pending: editPending, mutate: editCareerMutate } = usePatchCareer()

const permissions = computed(() => {
  if (loginStore.userInfo?.scope === 'user') {
    return loginStore.userInfo.permissions
  }
  return []
})

const search = computed(() => route.query.search as string || undefined)
const order = computed(() => route.query.order as string ?? '-Careers.createdAt')

const toggleOrder = () => {
  const newOrder = order.value === '-Careers.createdAt' ? 'Careers.createdAt' : '-Careers.createdAt'
  router.push({ query: { ...route.query, order: newOrder } })
}

const handleSearch = useDebounceFn((event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const value = event.target.value
    router.push({
      query: {
        ...route.query,
        search: value || undefined
      }
    })
  }
}, 500)

const openModal = () => {
  modal.value = true
}

const resetForm = () => {
  careerForm.value = {
    name: '',
    slug: ''
  }
}

const createCareer = async (formData: CreateCareer) => {
  await addCareerMutate(formData, loginStore.token!)

  if (!addError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Carrera creada',
      description: `La carrera ${formData.name} ha sido creada exitosamente`
    })

    modal.value = false
    resetForm()
  }
}

const editCareer = (career: Career) => {
  editingCareer.value = career
  careerForm.value = {
    name: career.name,
    slug: career.slug
  }
  editModal.value = true
}

const updateCareer = async (formData: CreateCareer) => {
  if (!editingCareer.value) return

  await editCareerMutate(editingCareer.value.id, formData, loginStore.token!)

  if (!editError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Carrera actualizada',
      description: `La carrera ${formData.name} ha sido actualizada exitosamente`
    })

    editModal.value = false
    editingCareer.value = null
    resetForm()
  }
}

// Use the fetch careers composable
const { data: careers, error } = useFetchCareers({
  search,
  order
})

// Watch for errors from the add career composable
watch(addError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear carrera',
      description: 'Ya existe una carrera con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear carrera',
      description: 'Ocurrió un error al crear la carrera'
    })
  }
})

// Watch for errors from the edit career composable
watch(editError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar carrera',
      description: 'Ya existe una carrera con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar carrera',
      description: 'Ocurrió un error al actualizar la carrera'
    })
  }
})

// Watch for errors from the fetch careers composable
watch(error, (newError) => {
  if (newError) {
    console.error('Error fetching careers:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar carreras',
      description: 'Ocurrió un error al cargar la lista de carreras'
    })
  }
})
</script>
