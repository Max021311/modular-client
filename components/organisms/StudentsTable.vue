<template>
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
            Correo
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
          class="hover:bg-base-300 table-row cursor-pointer"
          role="link"
          tabindex="0"
          :title="`Ir al alumno ${student.name}`"
          @click="handleRowClick(student.id)"
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

    <!-- Empty state -->
    <div
      v-if="students.length === 0"
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
import type { Student } from '~/types/api/student'

interface StudentsTableProps {
  students: Student[]
  order?: string
  emptyMessage?: string
}

interface StudentsTableEmits {
  'update:order': [value: string]
  'row-click': [id: number]
}

const props = withDefaults(defineProps<StudentsTableProps>(), {
  order: '-Students.createdAt',
  emptyMessage: undefined
})

const emit = defineEmits<StudentsTableEmits>()

const toggleOrder = () => {
  const newOrder = props.order === '-Students.createdAt' ? 'Students.createdAt' : '-Students.createdAt'
  emit('update:order', newOrder)
}

const handleRowClick = (id: number) => {
  emit('row-click', id)
}
</script>
