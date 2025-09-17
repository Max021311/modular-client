<template>
  <TemplatesListLayout
    class="container mx-auto p-4"
    title="Lista de departamentos"
    :search-value="search"
    search-placeholder="Buscar por nombre, teléfono, correo y jefe del departamento..."
    search-id="search"
    :current-page="page"
    :total-pages="pages"
    :show-pagination="departments.length > 0"
    @search-input="handleSearch"
    @previous-page="handlePage(page - 1)"
    @next-page="handlePage(page + 1)"
  >
    <template #actions>
      <button
        class="btn btn-primary grow-0 shrink-0"
        :disabled="!permissions.includes(PERMISSIONS.EDIT_DEPARTMENT)"
        @click="openModal"
      >
        Crear departamento
      </button>
    </template>

    <template #modal>
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
    </template>

    <template #content>
      <OrganismsDepartmentsTable
        :departments="departments"
        :order="order"
        @update:order="handleOrderUpdate"
        @row-click="handleDepartmentRowClick"
      />
    </template>
  </TemplatesListLayout>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
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

const handleOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, order: newOrder } })
}

const handlePage = (newPage: number) => {
  router.push({ query: { ...route.query, page: newPage } })
}

const handleDepartmentRowClick = (departmentId: number) => {
  router.push(`/administrativo/departamentos/${departmentId}`)
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
