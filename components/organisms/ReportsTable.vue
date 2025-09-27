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
          <th class="text-center">
            Reporte
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
                <AtomsIconMicroChevronDown v-if="order === '-Reports.createdAt'" />
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
          v-for="report in reports"
          :key="report.id"
          class="hover:bg-base-300 table-row cursor-pointer"
          role="link"
          tabindex="0"
          :title="`Ver detalles del reporte ${report.id}`"
          @click="handleRowClick(report.id, $event)"
        >
          <td class="text-left">
            <div class="badge badge-outline">
              {{ report.id }}
            </div>
          </td>
          <td
            v-if="showStudent"
            class="text-left"
          >
            <NuxtLink
              v-if="report.student"
              :to="`/administrativo/alumnos/${report.student.id}`"
              class="link link-hover"
            >
              {{ report.student.name }}
            </NuxtLink>
            <span v-else>N/A</span>
          </td>
          <td
            v-if="showVacancy"
            class="text-left"
          >
            <NuxtLink
              v-if="report.vacancy"
              :to="`/administrativo/plazas/${report.vacancy.id}`"
              class="link link-hover max-w-xs whitespace-wrap"
              :title="report.vacancy.name"
            >
              {{ report.vacancy.name }}
            </NuxtLink>
            <span v-else>N/A</span>
          </td>
          <td
            v-if="showCycle"
            class="text-left"
          >
            <div
              class="badge"
              :class="{ 'badge-primary': report.cycle?.isCurrent }"
            >
              {{ report.cycle?.slug || 'N/A' }}
            </div>
          </td>
          <td class="text-center">
            <div class="badge badge-secondary badge-outline">
              {{ report.reportNumber }}
            </div>
          </td>
          <td class="text-left">
            <div class="badge badge-info">
              {{ report.hours }}h
            </div>
          </td>
          <td class="text-center">
            <div
              class="badge"
              :class="getStatusBadgeClass(report.status)"
            >
              {{ getStatusLabel(report.status) }}
            </div>
          </td>
          <td class="text-right">
            {{ formatDate(new Date(report.createdAt)) }}
          </td>
          <td class="text-right">
            {{ formatDate(new Date(report.updatedAt)) }}
          </td>
          <td class="text-center">
            <div class="flex gap-1 justify-center">
              <button
                type="button"
                class="btn btn-outline btn-xs btn-circle text-success hover:bg-success hover:text-success-content"
                :disabled="report.status !== 'PENDING'"
                :title="`Aprobar reporte ${report.id}`"
                @click="handleApproveClick(report.id, $event)"
              >
                <AtomsIconMicroCheck />
              </button>
              <button
                type="button"
                class="btn btn-outline btn-xs btn-circle text-warning hover:bg-warning hover:text-warning-content"
                :disabled="report.status !== 'PENDING'"
                :title="`Rechazar reporte ${report.id}`"
                @click="handleRejectClick(report.id, $event)"
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
      v-if="reports.length === 0"
      class="text-center py-8"
    >
      <p class="text-gray-500">
        {{ emptyMessage || 'No se encontraron reportes.' }}
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
          ¿Está seguro de que desea aprobar el reporte <strong>#{{ selectedReportId }}</strong>?
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
          ¿Está seguro de que desea rechazar el reporte <strong>#{{ selectedReportId }}</strong>?
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
import type { ReportWithRelations } from '~/types/api/report'

interface ReportsTableProps {
  reports: ReportWithRelations[]
  order?: string
  emptyMessage?: string
  showStudent?: boolean
  showVacancy?: boolean
  showCycle?: boolean
}

interface ReportsTableEmits {
  'update:order': [value: string]
  'row-click': [id: number, ctrlPressed: boolean]
  'row-approve': [id: number]
  'row-reject': [id: number]
}

const props = withDefaults(defineProps<ReportsTableProps>(), {
  order: '-Reports.createdAt',
  emptyMessage: undefined,
  showStudent: true,
  showVacancy: true,
  showCycle: true
})

const emit = defineEmits<ReportsTableEmits>()

const approveModal = ref(false)
const rejectModal = ref(false)
const selectedReportId = ref<number | null>(null)

const toggleOrder = () => {
  const newOrder = props.order === '-Reports.createdAt' ? 'Reports.createdAt' : '-Reports.createdAt'
  emit('update:order', newOrder)
}

const handleRowClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  const ctrlPressed = event.ctrlKey || event.metaKey // metaKey for Mac Cmd key
  emit('row-click', id, ctrlPressed)
}

const handleApproveClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  selectedReportId.value = id
  approveModal.value = true
}

const handleRejectClick = (id: number, event: MouseEvent) => {
  event.stopPropagation()
  selectedReportId.value = id
  rejectModal.value = true
}

const cancelApprove = () => {
  approveModal.value = false
  selectedReportId.value = null
}

const confirmApprove = () => {
  if (selectedReportId.value !== null) {
    emit('row-approve', selectedReportId.value)
    approveModal.value = false
    selectedReportId.value = null
  }
}

const cancelReject = () => {
  rejectModal.value = false
  selectedReportId.value = null
}

const confirmReject = () => {
  if (selectedReportId.value !== null) {
    emit('row-reject', selectedReportId.value)
    rejectModal.value = false
    selectedReportId.value = null
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
