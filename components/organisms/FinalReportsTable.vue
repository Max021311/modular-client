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
            Alumno
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
            Horas
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
                <AtomsIconMicroChevronDown v-if="order === '-FinalReports.createdAt'" />
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
          v-for="finalReport in finalReports"
          :key="finalReport.id"
          class="hover:bg-base-300 table-row cursor-pointer"
          role="link"
          tabindex="0"
          :title="`Ver detalles del reporte final ${finalReport.id}`"
          @click="handleRowClick(finalReport.id, $event)"
        >
          <td class="text-left">
            <div class="badge badge-outline">
              {{ finalReport.id }}
            </div>
          </td>
          <td
            v-if="showStudent"
            class="text-left"
          >
            <NuxtLink
              v-if="finalReport.student"
              :to="`/administrativo/alumnos/${finalReport.student.id}`"
              class="link link-hover"
            >
              {{ finalReport.student.name }}
            </NuxtLink>
            <span v-else>N/A</span>
          </td>
          <td
            v-if="showVacancy"
            class="text-left"
          >
            <NuxtLink
              v-if="finalReport.vacancy"
              :to="`/administrativo/plazas/${finalReport.vacancy.id}`"
              class="link link-hover max-w-xs whitespace-wrap"
              :title="finalReport.vacancy.name"
            >
              {{ finalReport.vacancy.name }}
            </NuxtLink>
            <span v-else>N/A</span>
          </td>
          <td
            v-if="showCycle"
            class="text-left"
          >
            <div
              class="badge"
              :class="{ 'badge-primary': finalReport.cycle?.isCurrent }"
            >
              {{ finalReport.cycle?.slug || 'N/A' }}
            </div>
          </td>
          <td class="text-left">
            <div class="badge badge-info">
              {{ finalReport.hours }}h
            </div>
          </td>
          <td class="text-center">
            <div
              class="badge"
              :class="getStatusBadgeClass(finalReport.status)"
            >
              {{ getStatusLabel(finalReport.status) }}
            </div>
          </td>
          <td class="text-right">
            {{ formatDate(new Date(finalReport.createdAt)) }}
          </td>
          <td class="text-right">
            {{ formatDate(new Date(finalReport.updatedAt)) }}
          </td>
          <td class="text-center">
            <div class="flex gap-1 justify-center">
              <button
                type="button"
                class="btn btn-outline btn-xs btn-circle text-success hover:bg-success hover:text-success-content"
                :disabled="finalReport.status !== 'PENDING'"
                :title="`Aprobar reporte final ${finalReport.id}`"
                @click="handleApproveClick(finalReport.id, $event)"
              >
                <AtomsIconMicroCheck />
              </button>
              <button
                type="button"
                class="btn btn-outline btn-xs btn-circle text-warning hover:bg-warning hover:text-warning-content"
                :disabled="finalReport.status !== 'PENDING'"
                :title="`Rechazar reporte final ${finalReport.id}`"
                @click="handleRejectClick(finalReport.id, $event)"
              >
                <AtomsIconMicroXMark />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Empty state -->
    <div
      v-if="finalReports.length === 0"
      class="text-center py-8"
    >
      <p class="text-gray-500">
        {{ emptyMessage || 'No se encontraron reportes finales.' }}
      </p>
    </div>
  </div>

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
          ¿Está seguro de que desea aprobar el reporte final <strong>#{{ selectedFinalReportId }}</strong>?
        </p>
      </div>
      <p class="text-xs text-base-content/60">
        Esta acción cambiará el estado del reporte a "Aprobado".
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
          ¿Está seguro de que desea rechazar el reporte final <strong>#{{ selectedFinalReportId }}</strong>?
        </p>
      </div>
      <p class="text-xs text-base-content/60">
        Esta acción cambiará el estado del reporte a "Rechazado".
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
import type { FinalReportWithRelations } from '~/types/api/final-reports'

interface FinalReportsTableProps {
  finalReports: FinalReportWithRelations[]
  order?: string
  emptyMessage?: string
  showStudent?: boolean
  showVacancy?: boolean
  showCycle?: boolean
}

interface FinalReportsTableEmits {
  'update:order': [value: string]
  'row-click': [id: number, ctrlPressed: boolean]
  'row-approve': [id: number]
  'row-reject': [id: number]
}

const props = withDefaults(defineProps<FinalReportsTableProps>(), {
  order: '-FinalReports.createdAt',
  emptyMessage: undefined,
  showStudent: true,
  showVacancy: true,
  showCycle: true
})

const emit = defineEmits<FinalReportsTableEmits>()

const approveModal = ref(false)
const rejectModal = ref(false)
const selectedFinalReportId = ref<number | null>(null)

const toggleOrder = () => {
  const newOrder = props.order === '-FinalReports.createdAt' ? 'FinalReports.createdAt' : '-FinalReports.createdAt'
  emit('update:order', newOrder)
}

const handleRowClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  const ctrlPressed = event.ctrlKey || event.metaKey // metaKey for Mac Cmd key
  emit('row-click', id, ctrlPressed)
}

const handleApproveClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  selectedFinalReportId.value = id
  approveModal.value = true
}

const handleRejectClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  selectedFinalReportId.value = id
  rejectModal.value = true
}

const cancelApprove = () => {
  approveModal.value = false
  selectedFinalReportId.value = null
}

const confirmApprove = () => {
  if (selectedFinalReportId.value !== null) {
    emit('row-approve', selectedFinalReportId.value)
    approveModal.value = false
    selectedFinalReportId.value = null
  }
}

const cancelReject = () => {
  rejectModal.value = false
  selectedFinalReportId.value = null
}

const confirmReject = () => {
  if (selectedFinalReportId.value !== null) {
    emit('row-reject', selectedFinalReportId.value)
    rejectModal.value = false
    selectedFinalReportId.value = null
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
