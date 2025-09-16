<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Lista de ciclos
    </h1>

    <div
      class="flex gap-2"
    >
      <input
        id="search"
        :value="search"
        type="text"
        placeholder="Buscar por nombre del ciclo..."
        class="input input-bordered w-full"
        @input="handleSearch"
      >
      <button
        class="btn btn-primary grow-0 shrink-0"
        :disabled="!permissions.includes(PERMISSIONS.EDIT_DEPARTMENT)"
        @click="openModal"
      >
        Crear ciclo
      </button>
    </div>

    <ModalComponent
      v-model="modal"
      modal-class="w-fit"
    >
      <OrganismsCycleForm
        v-model="cycleForm"
        :pending="addPending"
        @submit="createCycle"
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
            <th class="text-center">
              Estado
            </th>
            <th class="text-right">
              <div class="flex items-center justify-end gap-1">
                Fecha de Creación
                <button
                  type="button"
                  class="btn btn-ghost btn-xs btn-circle"
                  @click="toggleOrder"
                >
                  <AtomsIconMicroChevronDown v-if="order === '-Cycles.createdAt'" />
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
            v-for="cycle in cycles"
            :key="cycle.id"
            class="table-row"
            role="link"
            tabindex="0"
          >
            <td class="text-left">
              {{ cycle.id }}
            </td>
            <td class="text-left">
              <div
                class="flex items-center gap-2"
              >
                {{ cycle.slug }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-outline"
                :class="cycle.isCurrent ? 'badge-success' : 'badge-neutral'"
              >
                {{ cycle.isCurrent ? 'Activo' : 'Inactivo' }}
              </div>
            </td>
            <td class="text-right">
              {{ formatDate(new Date(cycle.createdAt)) }}
            </td>
            <td class="text-right">
              {{ formatDate(new Date(cycle.updatedAt)) }}
            </td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-primary"
                :disabled="cycle.isCurrent || editPending"
                @click="markAsActive(cycle)"
              >
                <span
                  v-if="editPending"
                  class="loading loading-spinner loading-sm"
                />
                Marcar como activo
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="join flex justify-center mt-4"
      >
        <button
          :disabled="page <= 1 || page > pages"
          class="join-item btn"
          @click="handlePage(page - 1)"
        >
          «
        </button>
        <button class="join-item btn">
          Página {{ page }}
        </button>
        <button
          :disabled="page >= pages || page < 1"
          class="join-item btn"
          @click="handlePage(page + 1)"
        >
          »
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-if="cycles.length === 0"
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
import { useFetchCycles } from '~/composables/useFetchCycles'
import { useAddCycle } from '~/composables/useAddCycle'
import { useEditCycle } from '~/composables/useEditCycle'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import { PERMISSIONS } from '~/common/constants/permissions'
import type { CreateCycle, Cycle } from '~/types/api/cycle'

const route = useRoute()
const router = useRouter()
const loginStore = useLoginStore()
const notificationStore = useNotificationStore()

const modal = ref(false)

// Cycle form data
const cycleForm = ref<CreateCycle>({
  slug: '',
  isCurrent: false
})

const { error: addError, pending: addPending, mutate: addCycleMutate } = useAddCycle()
const { error: editError, pending: editPending, mutate: editCycleMutate } = useEditCycle()

const permissions = computed(() => {
  if (loginStore.userInfo?.scope === 'user') {
    return loginStore.userInfo.permissions
  }
  return []
})

const page = computed(() => parseInt(route.query.page as string ?? '1', 10))
const search = computed(() => route.query.search as string || undefined)
const limit = computed(() => parseInt(route.query.limit as string ?? '30', 10))
const offset = computed(() => (page.value - 1) * limit.value)
const order = computed(() => route.query.order as string ?? '-Cycles.createdAt')

const toggleOrder = () => {
  const newOrder = order.value === '-Cycles.createdAt' ? 'Cycles.createdAt' : '-Cycles.createdAt'
  router.push({ query: { ...route.query, order: newOrder } })
}

const handlePage = (newPage: number) => {
  router.push({ query: { ...route.query, page: newPage } })
}

const handleSearch = useDebounceFn((event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const value = event.target.value
    router.push({
      query: {
        ...route.query,
        search: value || undefined,
        page: 1 // Reset to first page when searching
      }
    })
  }
}, 500)

const openModal = () => {
  modal.value = true
}

const resetForm = () => {
  cycleForm.value = {
    slug: '',
    isCurrent: false
  }
}

const createCycle = async (formData: CreateCycle) => {
  await addCycleMutate(formData, loginStore.token!)

  if (!addError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Ciclo creado',
      description: `El ciclo ${formData.slug} ha sido creado exitosamente`
    })

    modal.value = false
    resetForm()
  }
}

const markAsActive = async (cycle: Cycle) => {
  await editCycleMutate(cycle.id, {
    isCurrent: true
  }, loginStore.token!)

  if (!editError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Ciclo activado',
      description: `El ciclo ${cycle.slug} ha sido marcado como activo`
    })
  }
}

// Use the fetch cycles composable
const { cycles, pages, error } = useFetchCycles({
  search,
  limit,
  offset,
  order
})

// Watch for errors from the add cycle composable
watch(addError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear ciclo',
      description: 'Ya existe un ciclo con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear ciclo',
      description: 'Ocurrió un error al crear el ciclo'
    })
  }
})

// Watch for errors from the edit cycle composable
watch(editError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al activar ciclo',
      description: 'Ya existe un ciclo con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al activar ciclo',
      description: 'Ocurrió un error al marcar el ciclo como activo'
    })
  }
})

// Watch for errors from the fetch cycles composable
watch(error, (newError) => {
  if (newError) {
    console.error('Error fetching cycles:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar ciclos',
      description: 'Ocurrió un error al cargar la lista de ciclos'
    })
  }
})
</script>
