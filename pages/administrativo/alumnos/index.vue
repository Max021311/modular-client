<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      Lista de alumnos
    </h1>

    <!-- DaisyUI Table -->
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th class="text-left">
              Nombre
            </th>
            <th class="text-left">
              Código
            </th>
            <th class="text-left">
              Carrera
            </th>
            <th class="text-left">
              Email
            </th>
            <th class="text-left">
              Teléfono
            </th>
            <th class="text-right">
              <div class="flex items-center justify-end gap-1">
                Fecha de Creación
                <button
                  type="button"
                  class="btn btn-ghost btn-xs btn-circle"
                  @click="toggleOrder"
                >
                  <AtomsIconMicroChevronDown v-if="order === '-Students.createdAt'" />
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
            v-for="student in students"
            :key="student.id"
            class="hover:bg-base-300 table-row"
            role="link"
            tabindex="0"
            :title="`Ir al alumno ${student.name}`"
            @click="router.push(`/administrativo/alumnos/${student.id}`)"
          >
            <td class="text-left">
              {{ student.name }}
            </td>
            <td class="text-left">
              {{ student.code }}
            </td>
            <td class="text-left">
              {{ student.career?.slug || '' }}
            </td>
            <td class="text-left">
              {{ student.email }}
            </td>
            <td class="text-left">
              {{ student.telephone }}
            </td>
            <td class="text-right">
              {{ formatDate(new Date(student.createdAt)) }}
            </td>
            <td class="text-right">
              {{ formatDate(new Date(student.updatedAt)) }}
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
        v-if="students.length === 0"
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
import { formatDate } from '~/common/dates'
import { useFetchStudents } from '~/composables/useFetchStudents'

const route = useRoute()
const router = useRouter()

const page = computed(() => parseInt(route.query.page as string ?? '1', 10))
const search = computed(() => route.query.search as string ?? undefined)
const limit = computed(() => parseInt(route.query.limit as string ?? '30', 10))
const offset = computed(() => (page.value - 1) * limit.value)
const order = computed(() => route.query.order as string ?? '-Students.createdAt')

const toggleOrder = () => {
  const newOrder = order.value === '-Students.createdAt' ? 'Students.createdAt' : '-Students.createdAt'
  router.push({ query: { ...route.query, order: newOrder } })
}

const handlePage = (page: number) => {
  router.push({ query: { ...route.query, page } })
}

const { data, error } = useFetchStudents({
  search,
  limit,
  offset,
  order,
  includeCareer: true
})

const pages = computed(() => Math.ceil((data.value?.total ?? 0) / limit.value))

watch(error, (newError) => {
  console.log({ ...newError })
  console.error(newError)
})

const students = computed(() => data.value?.records ?? [])
</script>
