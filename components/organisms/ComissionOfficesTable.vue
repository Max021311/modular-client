<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th
            v-if="showStudent"
            class="text-left"
          >
            Estudiante
          </th>
          <th
            v-if="showVacancy"
            class="text-left"
          >
            Plaza
          </th>
          <th
            v-if="showCycle"
            class="text-left"
          >
            Ciclo
          </th>
          <th class="text-left">
            Fecha de Inicio
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
                <AtomsIconMicroChevronDown v-if="order === '-ComissionOffices.createdAt'" />
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
          v-for="comissionOffice in comissionOffices"
          :key="comissionOffice.id"
          class="hover:bg-base-300 table-row cursor-pointer"
          role="link"
          tabindex="0"
          :title="`Ver detalles del oficio de comisión ${comissionOffice.id}`"
          @click="handleRowClick(comissionOffice.id, $event)"
        >
          <td class="text-left">
            <div class="badge badge-outline">
              {{ comissionOffice.id }}
            </div>
          </td>
          <td
            v-if="showStudent"
            class="text-left"
          >
            {{ comissionOffice.student?.name || 'N/A' }}
          </td>
          <td
            v-if="showVacancy"
            class="text-left"
          >
            <div
              class="max-w-xs whitespace-wrap"
              :title="comissionOffice.vacancy?.name"
            >
              {{ comissionOffice.vacancy?.name || 'N/A' }}
            </div>
          </td>
          <td
            v-if="showCycle"
            class="text-left"
          >
            <div
              class="badge"
              :class="{ 'badge-primary': comissionOffice.cycle?.isCurrent }"
            >
              {{ comissionOffice.cycle?.slug || 'N/A' }}
            </div>
          </td>
          <td class="text-left">
            {{ formatDate(new Date(comissionOffice.beginDate)) }}
          </td>
          <td class="text-center">
            <div
              class="badge"
              :class="getStatusBadgeClass(comissionOffice.status)"
            >
              {{ getStatusLabel(comissionOffice.status) }}
            </div>
          </td>
          <td class="text-right">
            {{ formatDate(new Date(comissionOffice.createdAt)) }}
          </td>
          <td class="text-right">
            {{ formatDate(new Date(comissionOffice.updatedAt)) }}
          </td>
          <td class="text-center">
            <div class="flex gap-1 justify-center">
              <button
                type="button"
                class="btn btn-outline btn-xs btn-circle text-success hover:bg-success hover:text-success-content"
                :disabled="comissionOffice.status !== 'PENDING'"
                :title="`Aprobar oficio de comisión ${comissionOffice.id}`"
                @click="handleApproveClick(comissionOffice.id, $event)"
              >
                <AtomsIconMicroCheck />
              </button>
              <button
                type="button"
                class="btn btn-outline btn-xs btn-circle text-warning hover:bg-warning hover:text-warning-content"
                :disabled="comissionOffice.status !== 'PENDING'"
                :title="`Rechazar oficio de comisión ${comissionOffice.id}`"
                @click="handleRejectClick(comissionOffice.id, $event)"
              >
                <AtomsIconMicroXMark />
              </button>
              <button
                type="button"
                class="btn btn-ghost btn-xs btn-circle text-error hover:bg-error hover:text-error-content"
                :title="`Eliminar oficio de comisión ${comissionOffice.id}`"
                @click="handleDeleteClick(comissionOffice.id, $event)"
              >
                <AtomsIconMicroTrash />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <div
      v-if="comissionOffices.length === 0"
      class="text-center py-8"
    >
      <p class="text-gray-500">
        {{ emptyMessage || 'No se encontraron oficios de comisión.' }}
      </p>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <ModalComponent
    v-model="deleteModal"
    modal-class="w-fit"
  >
    <div class="flex flex-col gap-4 w-80">
      <h2 class="text-lg font-semibold mb-2 text-error">
        Confirmar eliminación
      </h2>
      <div class="flex items-center gap-3 p-4 bg-error/10 rounded-lg">
        <AtomsIconOutlinedError class="w-6 h-6 text-error flex-shrink-0" />
        <p class="text-sm">
          ¿Está seguro de que desea eliminar el oficio de comisión <strong>#{{ selectedComissionOfficeId }}</strong>?
        </p>
      </div>
      <p class="text-xs text-base-content/60">
        Esta acción no se puede deshacer.
      </p>
      <div class="flex gap-2 justify-end">
        <button
          type="button"
          class="btn btn-ghost"
          @click="cancelDelete"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="btn btn-error"
          @click="confirmDelete"
        >
          <AtomsIconMicroTrash />
          Eliminar
        </button>
      </div>
    </div>
  </ModalComponent>

  <!-- Approve Confirmation Modal -->
  <ModalComponent
    v-model="approveModal"
    modal-class="w-fit"
  >
    <div class="flex flex-col gap-4 w-80">
      <h2 class="text-lg font-semibold mb-2 text-success">
        Confirmar aprobación
      </h2>
      <div class="flex items-center gap-3 p-4 bg-success/10 rounded-lg">
        <AtomsIconMicroCheck class="w-6 h-6 text-success flex-shrink-0" />
        <p class="text-sm">
          ¿Está seguro de que desea aprobar el oficio de comisión <strong>#{{ selectedComissionOfficeId }}</strong>?
        </p>
      </div>
      <p class="text-xs text-base-content/60">
        Esta acción cambiará el estado del oficio a "Aprobado".
      </p>
      <div class="flex gap-2 justify-end">
        <button
          type="button"
          class="btn btn-ghost"
          @click="cancelApprove"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="confirmApprove"
        >
          <AtomsIconMicroCheck />
          Aprobar
        </button>
      </div>
    </div>
  </ModalComponent>

  <!-- Reject Confirmation Modal -->
  <ModalComponent
    v-model="rejectModal"
    modal-class="w-fit"
  >
    <div class="flex flex-col gap-4 w-80">
      <h2 class="text-lg font-semibold mb-2 text-warning">
        Confirmar rechazo
      </h2>
      <div class="flex items-center gap-3 p-4 bg-warning/10 rounded-lg">
        <AtomsIconMicroXMark class="w-6 h-6 text-warning flex-shrink-0" />
        <p class="text-sm">
          ¿Está seguro de que desea rechazar el oficio de comisión <strong>#{{ selectedComissionOfficeId }}</strong>?
        </p>
      </div>
      <p class="text-xs text-base-content/60">
        Esta acción cambiará el estado del oficio a "Rechazado".
      </p>
      <div class="flex gap-2 justify-end">
        <button
          type="button"
          class="btn btn-ghost"
          @click="cancelReject"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click="confirmReject"
        >
          <AtomsIconMicroXMark />
          Rechazar
        </button>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { formatDate } from '~/common/dates'
import type { ComissionOfficeWithRelations } from '~/types/api/comission-office'

interface ComissionOfficesTableProps {
  comissionOffices: ComissionOfficeWithRelations[]
  order?: string
  emptyMessage?: string
  showStudent?: boolean
  showVacancy?: boolean
  showCycle?: boolean
}

interface ComissionOfficesTableEmits {
  'update:order': [value: string]
  'row-click': [id: number, ctrlPressed: boolean]
  'row-delete': [id: number]
  'row-approve': [id: number]
  'row-reject': [id: number]
}

const props = withDefaults(defineProps<ComissionOfficesTableProps>(), {
  order: '-ComissionOffices.createdAt',
  emptyMessage: undefined,
  showStudent: true,
  showVacancy: true,
  showCycle: true
})

const emit = defineEmits<ComissionOfficesTableEmits>()

// Modal states
const deleteModal = ref(false)
const approveModal = ref(false)
const rejectModal = ref(false)
const selectedComissionOfficeId = ref<number | null>(null)

const toggleOrder = () => {
  const newOrder = props.order === '-ComissionOffices.createdAt' ? 'ComissionOffices.createdAt' : '-ComissionOffices.createdAt'
  emit('update:order', newOrder)
}

const handleRowClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  const ctrlPressed = event.ctrlKey || event.metaKey // metaKey for Mac Cmd key
  emit('row-click', id, ctrlPressed)
}

const handleDeleteClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  selectedComissionOfficeId.value = id
  deleteModal.value = true
}

const handleApproveClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  selectedComissionOfficeId.value = id
  approveModal.value = true
}

const handleRejectClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  selectedComissionOfficeId.value = id
  rejectModal.value = true
}

const cancelDelete = () => {
  console.log('cancelDelete', selectedComissionOfficeId.value)
  deleteModal.value = false
  selectedComissionOfficeId.value = null
}

const confirmDelete = () => {
  console.log('confirmDelete', selectedComissionOfficeId.value)
  if (selectedComissionOfficeId.value !== null) {
    emit('row-delete', selectedComissionOfficeId.value)
    deleteModal.value = false
    selectedComissionOfficeId.value = null
  }
}

const cancelApprove = () => {
  approveModal.value = false
  selectedComissionOfficeId.value = null
}

const confirmApprove = () => {
  if (selectedComissionOfficeId.value !== null) {
    emit('row-approve', selectedComissionOfficeId.value)
    approveModal.value = false
    selectedComissionOfficeId.value = null
  }
}

const cancelReject = () => {
  rejectModal.value = false
  selectedComissionOfficeId.value = null
}

const confirmReject = () => {
  if (selectedComissionOfficeId.value !== null) {
    emit('row-reject', selectedComissionOfficeId.value)
    rejectModal.value = false
    selectedComissionOfficeId.value = null
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'badge-success'
    case 'REJECTED':
      return 'badge-error'
    case 'PENDING':
      return 'badge-warning'
    default:
      return 'badge-ghost'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'Aprobado'
    case 'REJECTED':
      return 'Rechazado'
    case 'PENDING':
      return 'Pendiente'
    default:
      return status
  }
}
</script>
