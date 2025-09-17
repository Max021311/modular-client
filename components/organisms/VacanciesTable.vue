<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Descripción
          </th>
          <th class="text-center">
            Plazas
          </th>
          <th
            v-if="showDepartment"
            class="text-left"
          >
            Departamento
          </th>
          <th class="text-left">
            Ciclo
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
                <AtomsIconMicroChevronDown v-if="order === '-Vacancies.createdAt'" />
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
          v-for="vacancy in vacancies"
          :key="vacancy.id"
          class="hover:bg-base-300 table-row cursor-pointer"
          role="link"
          tabindex="0"
          :title="`Ver detalles de la vacante ${vacancy.name}`"
          @click="handleRowClick(vacancy.id)"
        >
          <td class="text-left">
            {{ vacancy.name }}
          </td>
          <td class="text-left">
            <div
              class="max-w-xs truncate"
              :title="vacancy.description"
            >
              {{ vacancy.description }}
            </div>
          </td>
          <td class="text-center">
            <div class="badge badge-outline">
              {{ vacancy.slots }}
            </div>
          </td>
          <td
            v-if="showDepartment"
            class="text-left"
          >
            {{ vacancy.department?.name || 'N/A' }}
          </td>
          <td class="text-left">
            <div
              class="badge"
              :class="{ 'badge-primary': vacancy.cycle?.isCurrent }"
            >
              {{ vacancy.cycle?.slug || 'N/A' }}
            </div>
          </td>
          <td class="text-center">
            <div
              class="badge"
              :class="vacancy.disabled ? 'badge-error' : 'badge-success'"
            >
              {{ vacancy.disabled ? 'Inactiva' : 'Activa' }}
            </div>
          </td>
          <td class="text-right">
            {{ formatDate(new Date(vacancy.createdAt)) }}
          </td>
          <td class="text-right">
            {{ formatDate(new Date(vacancy.updatedAt)) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <div
      v-if="vacancies.length === 0"
      class="text-center py-8"
    >
      <p class="text-gray-500">
        {{ emptyMessage || 'No se encontraron resultados.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/common/dates'
import type { VacancyWithRelations } from '~/types/api/vacancy'

interface VacanciesTableProps {
  vacancies: VacancyWithRelations[]
  order?: string
  showDepartment?: boolean
  emptyMessage?: string
}

interface VacanciesTableEmits {
  'update:order': [value: string]
  'row-click': [id: number]
}

const props = withDefaults(defineProps<VacanciesTableProps>(), {
  order: '-Vacancies.createdAt',
  showDepartment: true,
  emptyMessage: undefined
})

const emit = defineEmits<VacanciesTableEmits>()

const toggleOrder = () => {
  const newOrder = props.order === '-Vacancies.createdAt' ? 'Vacancies.createdAt' : '-Vacancies.createdAt'
  emit('update:order', newOrder)
}

const handleRowClick = (id: number) => {
  emit('row-click', id)
}
</script>
