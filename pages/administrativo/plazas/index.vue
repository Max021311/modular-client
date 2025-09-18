<template>
  <TemplatesListLayout
    class="container mx-auto p-4"
    title="Lista de plazas"
    :current-page="page"
    :total-pages="pages"
    :show-pagination="vacancies.length > 0"
    @previous-page="handlePage(page - 1)"
    @next-page="handlePage(page + 1)"
  >
    <template #actions>
      <input
        id="search"
        :value="search"
        type="text"
        placeholder="Buscar por nombre, descripción..."
        class="input input-bordered w-full"
        @input="handleSearch"
      >
    </template>

    <template #content>
      <OrganismsVacanciesTable
        :vacancies="vacancies"
        :order="order"
        :show-department="true"
        @update:order="handleOrderUpdate"
        @row-click="handleVacancyRowClick"
      />
    </template>
  </TemplatesListLayout>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useFetchVacancies } from '~/composables/useFetchVacancies'
import { useNotificationStore } from '~/stores/notification'

const route = useRoute()
const router = useRouter()
const notificationStore = useNotificationStore()

const page = computed(() => parseInt(route.query.page as string ?? '1', 10))
const search = computed(() => route.query.search as string || undefined)
const limit = computed(() => parseInt(route.query.limit as string ?? '30', 10))
const offset = computed(() => (page.value - 1) * limit.value)
const order = computed(() => route.query.order as string ?? '-Vacancies.createdAt')

const handleOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, order: newOrder } })
}

const handlePage = (page: number) => {
  router.push({ query: { ...route.query, page } })
}

const handleVacancyRowClick = (vacancyId: number) => {
  router.push(`/administrativo/plazas/${vacancyId}`)
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

const { data, error } = useFetchVacancies({
  search,
  limit,
  offset,
  order,
  includeCycle: true,
  includeDepartment: true
})

const pages = computed(() => Math.ceil((data.value?.total ?? 0) / limit.value))

watch(error, (newError) => {
  if (newError) {
    console.error('Error fetching vacancies:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar plazas',
      description: 'Ocurrió un error al cargar las plazas'
    })
  }
})

const vacancies = computed(() => data.value?.records ?? [])

useHead({
  title: 'Lista de plazas - Administración',
  meta: [
    {
      name: 'description',
      content: 'Gestión y administración de plazas disponibles en el sistema'
    }
  ]
})
</script>
