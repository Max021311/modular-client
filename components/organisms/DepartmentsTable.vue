<template>
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
          class="hover:bg-base-300 table-row cursor-pointer"
          role="link"
          tabindex="0"
          :title="`Ver detalles del departamento ${department.name}`"
          @click="handleRowClick(department.id)"
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

    <!-- Empty state -->
    <div
      v-if="departments.length === 0"
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
import type { Department } from '~/types/api/department'

interface DepartmentsTableProps {
  departments: Department[]
  order?: string
  emptyMessage?: string
}

interface DepartmentsTableEmits {
  'update:order': [value: string]
  'row-click': [id: number]
}

const props = withDefaults(defineProps<DepartmentsTableProps>(), {
  order: '-Departments.createdAt',
  emptyMessage: undefined
})

const emit = defineEmits<DepartmentsTableEmits>()

const toggleOrder = () => {
  const newOrder = props.order === '-Departments.createdAt' ? 'Departments.createdAt' : '-Departments.createdAt'
  emit('update:order', newOrder)
}

const handleRowClick = (id: number) => {
  emit('row-click', id)
}
</script>
