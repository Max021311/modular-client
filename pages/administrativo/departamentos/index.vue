<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Lista de departamentos
    </h1>

    <div
      class="flex gap-2"
    >
      <input
        id="search"
        :value="search"
        type="text"
        placeholder="Buscar por nombre, teléfono, correo y jefe del departamento..."
        class="input input-bordered w-full"
        @input="handleSearch"
      >
      <button
        class="btn btn-primary grow-0 shrink-0"
        :disabled="!permissions.includes(PERMISSIONS.EDIT_DEPARTMENT)"
        @click="openModal"
      >
        Crear departamento
      </button>
    </div>

    <ModalComponent
      v-model="modal"
      modal-class="w-fit"
    >
      <OrganismsDepartmentForm
        v-model="departmentForm"
        :pending="addPending"
        @submit="createDepartment"
      />
    </ModalComponent>

    <div class="divider divider-vertical my-2" />

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th class="text-left">
              Nombre
            </th>
            <th class="text-left">
              Dirección
            </th>
            <th class="text-left">
              Teléfono
            </th>
            <th class="text-left">
              Correo
            </th>
            <th class="text-left">
              Jefe del Departamento
            </th>
            <th class="text-right">
              <div class="flex items-center justify-end gap-1">
                Fecha de Creación
                <button
                  type="button"
                  class="btn btn-ghost btn-xs btn-circle"
                  @click="toggleOrder"
                >
                  <AtomsIconMicroChevronDown v-if="order === '-Departments.createdAt'" />
                  <AtomsIconMicroChevronUp v-else />
                </button>
              </div>
            </th>
            <th class="text-right">
              Última Actualización
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="department in departments"
            :key="department.id"
            class="hover:bg-base-300 table-row"
            role="link"
            tabindex="0"
            :title="`Ver detalles del departamento ${department.name}`"
            @click="router.push(`/administrativo/departamentos/${department.id}`)"
          >
            <td class="text-left">
              {{ department.name }}
            </td>
            <td class="text-left">
              {{ department.address }}
            </td>
            <td class="text-left">
              {{ department.phone }}
            </td>
            <td class="text-left">
              {{ department.email }}
            </td>
            <td class="text-left">
              {{ department.chiefName }}
            </td>
            <td class="text-right">
              {{ formatDate(new Date(department.createdAt)) }}
            </td>
            <td class="text-right">
              {{ formatDate(new Date(department.updatedAt)) }}
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
        v-if="departments.length === 0"
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
import { useFetchDepartments } from '~/composables/useFetchDepartments'
import { useAddDepartment } from '~/composables/useAddDepartment'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import { PERMISSIONS } from '~/common/constants/permissions'
import type { CreateDepartment } from '~/types/api/department'

const route = useRoute()
const router = useRouter()
const loginStore = useLoginStore()
const notificationStore = useNotificationStore()

const modal = ref(false)

// Department form data
const departmentForm = ref<CreateDepartment>({
  name: '',
  address: '',
  phone: '',
  email: '',
  chiefName: ''
})

const { error: addError, pending: addPending, mutate: addDepartmentMutate } = useAddDepartment()

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
const order = computed(() => route.query.order as string ?? '-Departments.createdAt')

const toggleOrder = () => {
  const newOrder = order.value === '-Departments.createdAt' ? 'Departments.createdAt' : '-Departments.createdAt'
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
  departmentForm.value = {
    name: '',
    address: '',
    phone: '',
    email: '',
    chiefName: ''
  }
}

const createDepartment = async (formData: CreateDepartment) => {
  await addDepartmentMutate(formData, loginStore.token!)

  if (!addError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Departamento creado',
      description: `El departamento ${formData.name} ha sido creado exitosamente`
    })

    modal.value = false
    resetForm()
  }
}

// Watch for errors from the add department composable
watch(addError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear departamento',
      description: 'Ya existe un departamento con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al crear departamento',
      description: 'Ocurrió un error al crear el departamento'
    })
  }
})

// Use the fetch departments composable
const { data: _data, departments, total: _total, pages, error } = useFetchDepartments({
  search,
  limit,
  offset,
  order
})

// Watch for errors from the composable
watch(error, (newError) => {
  if (newError) {
    console.error('Error fetching departments:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar departamentos',
      description: 'Ocurrió un error al cargar la lista de departamentos'
    })
  }
})
</script>
