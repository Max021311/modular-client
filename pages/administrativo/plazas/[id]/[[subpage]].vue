<template>
  <div class="space-y-6 my-6">
    <div class="container mx-auto px-4">
      <NuxtLink
        :to=" data?.department ? `/administrativo/departamentos/${data.department?.id}` : '/administrativo/departamentos'"
        class="btn btn-outline btn-square btn-sm flex justify-center items-center"
      >
        <AtomsIconOutlinedChevronLeft />
      </NuxtLink>
    </div>

    <div class="container mx-auto px-4">
      <div
        v-if="pending"
        class="flex justify-center items-center py-12"
      >
        <span class="loading loading-spinner loading-lg text-primary" />
      </div>

      <div
        v-else-if="data"
        class="space-y-6"
      >
        <!-- Vacancy Information and Actions Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="">
              <!-- Vacancy Information -->
              <div class="">
                <h2 class="card-title text-2xl text-primary mb-4">
                  <AtomsIconOutlinedInfo />
                  Información de la plaza
                </h2>

                <div class="space-y-4">
                  <!-- Código -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Código:
                    </div>
                    <div class="whitespace-wrap shrink-1 grow-1">
                      {{ data.id }}
                    </div>
                  </div>

                  <!-- Name -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Nombre:
                    </div>
                    <div class="whitespace-wrap shrink-1 grow-1">
                      {{ data.name }}
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="flex-col sm:items-start gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Descripción:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.description }}
                    </div>
                  </div>

                  <!-- Slots -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Plazas disponibles:
                    </div>
                    <div class="text-base shrink-1 grow-1">
                      <div class="badge badge-outline badge-lg">
                        {{ data.slots }}
                      </div>
                    </div>
                  </div>

                  <!-- Department -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Departamento:
                    </div>
                    <NuxtLink
                      class="text-base whitespace-wrap shrink-1 grow-1 link link-hover"
                      :to="`/administrativo/departamentos/${data.department?.id}`"
                    >
                      {{ data.department?.name || 'N/A' }}
                    </NuxtLink>
                  </div>

                  <!-- Cycle -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Ciclo:
                    </div>
                    <div class="text-base shrink-1 grow-1">
                      <div
                        class="badge badge-lg"
                        :class="{ 'badge-primary': data.cycle?.isCurrent }"
                      >
                        {{ data.cycle?.slug || 'N/A' }}
                      </div>
                    </div>
                  </div>

                  <!-- Status -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Estado:
                    </div>
                    <div class="text-base shrink-1 grow-1">
                      <div
                        class="badge badge-lg"
                        :class="data.deletedAt ? 'badge-ghost' : 'badge-success'"
                      >
                        {{ data.deletedAt ? 'Inactiva' : 'Activa' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="divider" />
              <!-- Action Buttons -->
              <div class="">
                <h3 class="card-title text-lg text-primary mb-4">
                  Acciones
                </h3>
                <div class="flex flex-row flex-wrap justify-around gap-3">
                  <button
                    type="button"
                    class="btn btn-primary btn-md btn-wide lg:btn-md"
                    @click="openEditModal"
                  >
                    <AtomsIconOutlinedInfo />
                    Editar
                  </button>
                  <button
                    v-if="data.deletedAt"
                    type="button"
                    class="btn btn-success btn-md btn-wide lg:btn-md"
                    :disabled="activatePending"
                    @click="handleActivateVacancy"
                  >
                    <span
                      v-if="activatePending"
                      class="loading loading-spinner loading-sm"
                    />
                    <AtomsIconMicroCheck v-else />
                    {{ activatePending ? 'Activando...' : 'Activar Plaza' }}
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-warning btn-md btn-wide lg:btn-md"
                    :disabled="deactivatePending"
                    @click="handleDeactivateVacancy"
                  >
                    <span
                      v-if="deactivatePending"
                      class="loading loading-spinner loading-sm"
                    />
                    <AtomsIconMicroXMark v-else />
                    {{ deactivatePending ? 'Desactivando...' : 'Desactivar Plaza' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="divider text-sm text-base-content/60" />

            <!-- Dates Section -->
            <div class="mt-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60 font-medium">Creado</span>
                  <span class="text-base-content">{{ formatDateTime(data.createdAt.toString()) }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-base-content/60 font-medium">Actualizado</span>
                  <span class="text-base-content">{{ formatDateTime(data.updatedAt.toString()) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div
        v-else-if="error?.statusCode === 404"
        class="max-w-2xl mx-auto text-center py-12"
      >
        <AtomsIconOutlinedWarning
          size="64"
          class="w-16 h-16 text-warning mx-auto mb-4"
        />
        <h2 class="text-2xl font-bold text-base-content mb-2">
          Plaza no encontrada
        </h2>
        <p class="text-base-content/60 mb-6">
          No se pudo encontrar la información de la plaza con ID {{ id }}.
        </p>
        <NuxtLink
          to="/administrativo/departamentos"
          class="btn btn-primary"
        >
          Volver a Lista de Departamentos
        </NuxtLink>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="max-w-2xl mx-auto"
      >
        <div class="alert alert-error">
          <AtomsIconOutlinedError
            size="24"
            class="w-6 h-6"
          />
          <div>
            <h3 class="font-bold">
              Error al cargar la información
            </h3>
            <div class="text-xs">
              {{ 'No se pudo obtener la información de la plaza' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Students Section -->
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div
            role="tablist"
            class="tabs tabs-bordered"
          >
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'students' }"
              :to="`/administrativo/plazas/${id}`"
            >
              Alumnos
            </NuxtLink>
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'quarter-reports' }"
              :to="`/administrativo/plazas/${id}/reportes-trimestrales`"
            >
              Reportes trimestrales
            </NuxtLink>
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'final-reports' }"
              :to="`/administrativo/plazas/${id}/reportes-finales`"
            >
              Reportes finales
            </NuxtLink>
            <NuxtLink
              role="tab"
              class="tab link link-hover"
              :class="{ 'tab-active': currentTab === 'commission-offices' }"
              :to="`/administrativo/plazas/${id}/oficios-comision`"
            >
              Oficios de comisión
            </NuxtLink>
          </div>
          <TemplatesListLayout
            v-if="currentTab === 'students'"
            class="mt-2"
            :current-page="1"
            :total-pages="1"
            :show-pagination="false"
            :show-divider="false"
            @previous-page="() => {}"
            @next-page="() => {}"
          >
            <template #content>
              <!-- Loading State -->
              <div
                v-if="studentsPending"
                class="flex justify-center py-12"
              >
                <span class="loading loading-spinner loading-lg text-primary" />
              </div>

              <!-- Students Table -->
              <OrganismsStudentsTable
                v-else
                :students="students"
                order=""
                :empty-message="'No hay alumnos asignados a esta plaza.'"
                @update:order="() => {}"
                @row-click="handleStudentRowClick"
              />
            </template>
          </TemplatesListLayout>

          <!-- Quarter Reports Tab Content -->
          <TemplatesListLayout
            v-else-if="currentTab === 'quarter-reports'"
            class="mt-2"
            :current-page="reportPage"
            :total-pages="reportPages"
            :show-pagination="!reportPending && reports.length > 0"
            @previous-page="handleReportPageUpdate(reportPage - 1)"
            @next-page="handleReportPageUpdate(reportPage + 1)"
          >
            <template #actions>
              <select
                id="report-status-filter"
                :value="reportStatus"
                class="select select-bordered w-full max-w-xs"
                @change="handleReportStatusChange"
              >
                <option value="">
                  Todos los estados
                </option>
                <option value="PENDING">
                  Pendiente
                </option>
                <option value="APPROVED">
                  Aprobado
                </option>
                <option value="REJECTED">
                  Rechazado
                </option>
              </select>
              <select
                id="report-number-filter"
                :value="reportNumber"
                class="select select-bordered w-full max-w-xs"
                @change="handleReportNumberChange"
              >
                <option value="">
                  Todos los reportes
                </option>
                <option value="1">
                  Reporte 1
                </option>
                <option value="2">
                  Reporte 2
                </option>
              </select>
            </template>

            <template #content>
              <!-- Loading State -->
              <div
                v-if="reportPending"
                class="flex justify-center py-12"
              >
                <span class="loading loading-spinner loading-lg text-primary" />
              </div>

              <!-- Reports Table -->
              <OrganismsReportsTable
                v-else
                :reports="reports"
                :order="reportOrder"
                :show-student="true"
                :show-vacancy="false"
                :empty-message="'No se encontraron reportes trimestrales para esta plaza.'"
                @update:order="handleReportOrderUpdate"
                @row-click="handleReportRowClick"
                @row-approve="handleReportApprove"
                @row-reject="handleReportReject"
              />
            </template>
          </TemplatesListLayout>

          <!-- Final Reports Tab Content -->
          <TemplatesListLayout
            v-else-if="currentTab === 'final-reports'"
            class="mt-2"
            :current-page="finalReportPage"
            :total-pages="finalReportPages"
            :show-pagination="!finalReportPending && finalReports.length > 0"
            @previous-page="handleFinalReportPageUpdate(finalReportPage - 1)"
            @next-page="handleFinalReportPageUpdate(finalReportPage + 1)"
          >
            <template #actions>
              <select
                id="final-report-status-filter"
                :value="finalReportStatus"
                class="select select-bordered w-full max-w-xs"
                @change="handleFinalReportStatusChange"
              >
                <option value="">
                  Todos los estados
                </option>
                <option value="PENDING">
                  Pendiente
                </option>
                <option value="APPROVED">
                  Aprobado
                </option>
                <option value="REJECTED">
                  Rechazado
                </option>
              </select>
            </template>

            <template #content>
              <!-- Loading State -->
              <div
                v-if="finalReportPending"
                class="flex justify-center py-12"
              >
                <span class="loading loading-spinner loading-lg text-primary" />
              </div>

              <!-- Final Reports Table -->
              <OrganismsFinalReportsTable
                v-else
                :final-reports="finalReports"
                :order="finalReportOrder"
                :show-student="true"
                :show-vacancy="false"
                :empty-message="'No se encontraron reportes finales para esta plaza.'"
                @update:order="handleFinalReportOrderUpdate"
                @row-click="handleFinalReportRowClick"
                @row-approve="handleFinalReportApprove"
                @row-reject="handleFinalReportReject"
              />
            </template>
          </TemplatesListLayout>

          <!-- Commission Offices Tab Content -->
          <TemplatesListLayout
            v-else-if="currentTab === 'commission-offices'"
            class="mt-2"
            :current-page="comissionPage"
            :total-pages="comissionPages"
            :show-pagination="!comissionPending && comissionOffices.length > 0"
            @previous-page="handleComissionPageUpdate(comissionPage - 1)"
            @next-page="handleComissionPageUpdate(comissionPage + 1)"
          >
            <template #actions>
              <select
                id="comission-status-filter"
                :value="comissionStatus"
                class="select select-bordered w-full max-w-xs"
                @change="handleComissionStatusChange"
              >
                <option value="">
                  Todos los estados
                </option>
                <option value="PENDING">
                  Pendiente
                </option>
                <option value="APPROVED">
                  Aprobado
                </option>
                <option value="REJECTED">
                  Rechazado
                </option>
              </select>
            </template>

            <template #content>
              <!-- Loading State -->
              <div
                v-if="comissionPending"
                class="flex justify-center py-12"
              >
                <span class="loading loading-spinner loading-lg text-primary" />
              </div>

              <!-- Commission Offices Table -->
              <OrganismsComissionOfficesTable
                v-else
                :comission-offices="comissionOffices"
                :order="comissionOrder"
                :show-student="true"
                :show-vacancy="false"
                :empty-message="'No se encontraron oficios de comisión para esta plaza.'"
                @update:order="handleComissionOrderUpdate"
                @row-click="handleComissionRowClick"
                @row-approve="handleComissionApprove"
                @row-reject="handleComissionReject"
              />
            </template>
          </TemplatesListLayout>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <ModalComponent
      v-model="editModal"
      modal-class="w-fit"
    >
      <div class="flex flex-col gap-4">
        <OrganismsVacancyForm
          v-model="editForm"
          :pending="editPending"
          title="Editar plaza"
          submit-text="Guardar cambios"
          loading-text="Guardando..."
          show-status-field
          :show-cycle-field="false"
          :show-department-field="false"
          @submit="handleEditSubmit"
        />

        <!-- Error Display -->
        <div
          v-if="editError"
          class="alert alert-error"
        >
          <AtomsIconOutlinedError class="w-4 h-4" />
          <span class="text-sm">
            {{ typeof editError === 'string' ? editError : editError.message || 'Error al actualizar la plaza' }}
          </span>
        </div>

        <!-- Cancel Button -->
        <button
          type="button"
          class="btn btn-outline"
          :disabled="editPending"
          @click="cancelEdit"
        >
          Cancelar
        </button>
      </div>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useFetchVacancy } from '~/composables/useFetchVacancy'
import { useFetchStudentsByVacancyId } from '~/composables/useFetchStudentsByVacancyId'
import { useFetchComissionOffices } from '~/composables/useFetchComissionOffices'
import { useFetchFinalReports } from '~/composables/useFetchFinalReports'
import { useFetchReports } from '~/composables/useFetchReports'
import { useEditVacancy } from '~/composables/useEditVacancy'
import { usePatchComissionOffice } from '~/composables/usePatchComissionOffice'
import { usePatchFinalReport } from '~/composables/usePatchFinalReport'
import { usePatchReport } from '~/composables/usePatchReport'
import { useActivateVacancy } from '~/composables/useActivateVacancy'
import { useDeactivateVacancy } from '~/composables/useDeactivateVacancy'
import { formatDateTime } from '~/common/dates'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import type { UpdateVacancy } from '~/types/api/vacancy.d'

function pathToPage(page: string) {
  switch (page) {
    case '':
    case '/':
    case 'alumnos':
      return 'students'
    case 'reportes-trimestrales':
      return 'quarter-reports'
    case 'reportes-finales':
      return 'final-reports'
    case 'oficios-comision':
      return 'commission-offices'
    default:
      return null
  }
}

definePageMeta({
  validate: (value) => {
    if (value.params.id && !/^\d+$/.test(value.params.id as string)) {
      return false
    }
    console.log(value)
    if (value.params.subpage && pathToPage(value.params.subpage as string) === null) {
      return false
    }
    return true
  }
})

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id as string)
const notificationStore = useNotificationStore()
const loginStore = useLoginStore()

const currentTab = computed(() => {
  const subpage = route.params.subpage as string
  return pathToPage(subpage) ?? 'students'
})

const { data, error, pending, refresh } = useFetchVacancy({
  id,
  includeCycle: true,
  includeDepartment: true
})

// Fetch students for this vacancy
const {
  students,
  pending: studentsPending,
  error: studentsError
} = useFetchStudentsByVacancyId({
  vacancyId: computed(() => parseInt(id.value, 10))
})

// Commission Office-related computed properties
const comissionPage = computed(() => parseInt(route.query.comissionPage as string ?? '1', 10))
const comissionStatus = computed(() => route.query.comissionStatus as string || undefined)
const comissionLimit = computed(() => parseInt(route.query.comissionLimit as string ?? '10', 10))
const comissionOffset = computed(() => (comissionPage.value - 1) * comissionLimit.value)
const comissionOrder = computed(() => route.query.comissionOrder as string ?? '-ComissionOffices.createdAt')

// Report-related computed properties
const reportPage = computed(() => parseInt(route.query.reportPage as string ?? '1', 10))
const reportStatus = computed(() => route.query.reportStatus as string || undefined)
const reportNumber = computed(() => route.query.reportNumber as string || undefined)
const reportLimit = computed(() => parseInt(route.query.reportLimit as string ?? '10', 10))
const reportOffset = computed(() => (reportPage.value - 1) * reportLimit.value)
const reportOrder = computed(() => route.query.reportOrder as string ?? '-Reports.createdAt')

// Final Report-related computed properties
const finalReportPage = computed(() => parseInt(route.query.finalReportPage as string ?? '1', 10))
const finalReportStatus = computed(() => route.query.finalReportStatus as string || undefined)
const finalReportLimit = computed(() => parseInt(route.query.finalReportLimit as string ?? '10', 10))
const finalReportOffset = computed(() => (finalReportPage.value - 1) * finalReportLimit.value)
const finalReportOrder = computed(() => route.query.finalReportOrder as string ?? '-FinalReports.createdAt')

// Fetch commission offices for this vacancy
const {
  comissionOffices,
  pages: comissionPages,
  pending: comissionPending,
  error: comissionError
} = useFetchComissionOffices({
  limit: comissionLimit,
  offset: comissionOffset,
  order: comissionOrder,
  includeCycle: true,
  includeVacancy: false,
  includeStudent: true,
  vacancyId: computed(() => parseInt(id.value, 10)),
  status: computed(() => comissionStatus.value as 'APPROVED' | 'REJECTED' | 'PENDING' | undefined)
})

// Fetch reports for this vacancy
const {
  reports,
  pages: reportPages,
  pending: reportPending,
  error: reportError
} = useFetchReports({
  limit: reportLimit,
  offset: reportOffset,
  order: reportOrder,
  includeCycle: true,
  includeVacancy: false,
  includeStudent: true,
  vacancyId: computed(() => parseInt(id.value, 10)),
  status: computed(() => reportStatus.value as 'APPROVED' | 'REJECTED' | 'PENDING' | undefined),
  reportNumber: computed(() => reportNumber.value as '1' | '2' | undefined)
})

// Fetch final reports for this vacancy
const {
  finalReports,
  pages: finalReportPages,
  pending: finalReportPending,
  error: finalReportError
} = useFetchFinalReports({
  limit: finalReportLimit,
  offset: finalReportOffset,
  order: finalReportOrder,
  includeCycle: true,
  includeVacancy: false,
  includeStudent: true,
  vacancyId: computed(() => parseInt(id.value, 10)),
  status: computed(() => finalReportStatus.value as 'APPROVED' | 'REJECTED' | 'PENDING' | undefined)
})

const editModal = ref(false)

// Edit functionality
const { mutate: editVacancy, pending: editPending, error: editError } = useEditVacancy()

const editForm = ref<UpdateVacancy>({
  name: '',
  description: '',
  slots: 1,
  disabled: false
})

const openEditModal = () => {
  if (data.value) {
    // Initialize form with current data
    editForm.value = {
      name: data.value.name,
      description: data.value.description,
      slots: data.value.slots,
      disabled: data.value.disabled
    }
  }
  editModal.value = true
}

const cancelEdit = () => {
  editModal.value = false
  // Reset form
  editForm.value = {
    name: '',
    description: '',
    slots: 1,
    disabled: false
  }
}

const handleEditSubmit = async (formData: UpdateVacancy) => {
  if (!data.value || !loginStore.token) {
    return
  }

  try {
    await editVacancy(data.value.id, formData, loginStore.token)

    // Show success notification
    notificationStore.add({
      type: 'success',
      title: 'Plaza actualizada',
      description: 'La información de la plaza ha sido actualizada correctamente'
    })

    // Close modal and refresh data
    editModal.value = false
    await refresh()
  } catch (error) {
    console.error('Error updating vacancy:', error)
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar',
      description: 'No se pudo actualizar la información de la plaza'
    })
  }
}

const handleStudentRowClick = (studentId: number) => {
  router.push(`/administrativo/alumnos/${studentId}`)
}

// Commission Office handlers for component events
const handleComissionPageUpdate = (newPage: number) => {
  router.push({ query: { ...route.query, comissionPage: newPage } })
}

const handleComissionOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, comissionOrder: newOrder } })
}

const handleComissionStatusChange = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    const value = event.target.value
    router.push({
      query: {
        ...route.query,
        comissionStatus: value || undefined,
        comissionPage: 1 // Reset to first page when filtering
      }
    })
  }
}

const handleComissionRowClick = (comissionOfficeId: number, ctrlPressed: boolean) => {
  console.log('Open comission office file:', comissionOfficeId, 'Ctrl pressed:', ctrlPressed)
}

const handleComissionApprove = async (comissionOfficeId: number) => {
  await patchComissionOffice(comissionOfficeId, { status: 'APPROVED' })
}

const handleComissionReject = async (comissionOfficeId: number) => {
  await patchComissionOffice(comissionOfficeId, { status: 'REJECTED' })
}

// Final Report handlers for component events
const handleFinalReportPageUpdate = (newPage: number) => {
  router.push({ query: { ...route.query, finalReportPage: newPage } })
}

const handleFinalReportOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, finalReportOrder: newOrder } })
}

const handleFinalReportStatusChange = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    const value = event.target.value
    router.push({
      query: {
        ...route.query,
        finalReportStatus: value || undefined,
        finalReportPage: 1 // Reset to first page when filtering
      }
    })
  }
}

const handleFinalReportRowClick = (finalReportId: number, ctrlPressed: boolean) => {
  console.log('Open final report file:', finalReportId, 'Ctrl pressed:', ctrlPressed)
}

const handleFinalReportApprove = async (finalReportId: number) => {
  await patchFinalReport(finalReportId, { status: 'APPROVED' })
}

const handleFinalReportReject = async (finalReportId: number) => {
  await patchFinalReport(finalReportId, { status: 'REJECTED' })
}

// Report handlers for component events
const handleReportPageUpdate = (newPage: number) => {
  router.push({ query: { ...route.query, reportPage: newPage } })
}

const handleReportOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, reportOrder: newOrder } })
}

const handleReportStatusChange = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    const value = event.target.value
    router.push({
      query: {
        ...route.query,
        reportStatus: value || undefined,
        reportPage: 1 // Reset to first page when filtering
      }
    })
  }
}

const handleReportNumberChange = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    const value = event.target.value
    router.push({
      query: {
        ...route.query,
        reportNumber: value || undefined,
        reportPage: 1 // Reset to first page when filtering
      }
    })
  }
}

const handleReportRowClick = (reportId: number, ctrlPressed: boolean) => {
  console.log('Open report file:', reportId, 'Ctrl pressed:', ctrlPressed)
}

const handleReportApprove = async (reportId: number) => {
  await patchReport(reportId, { status: 'APPROVED' })
}

const handleReportReject = async (reportId: number) => {
  await patchReport(reportId, { status: 'REJECTED' })
}

// Activate/Deactivate vacancy handlers
const handleActivateVacancy = async () => {
  if (!data.value) return

  try {
    await activateVacancy(data.value.id)
    // Refresh vacancy data after successful activation
    await refresh()
  } catch (error) {
    console.error('Error activating vacancy:', error)
  }
}

const handleDeactivateVacancy = async () => {
  if (!data.value) return

  try {
    await deactivateVacancy(data.value.id)
    // Refresh vacancy data after successful deactivation
    await refresh()
  } catch (error) {
    console.error('Error deactivating vacancy:', error)
  }
}

// Patch commission office functionality
const { mutate: patchComissionOffice } = usePatchComissionOffice()

// Patch final report functionality
const { mutate: patchFinalReport } = usePatchFinalReport()

// Patch report functionality
const { mutate: patchReport } = usePatchReport()

// Activate/Deactivate vacancy functionality
const { mutate: activateVacancy, pending: activatePending, error: _activateError } = useActivateVacancy()
const { mutate: deactivateVacancy, pending: deactivatePending, error: _deactivateError } = useDeactivateVacancy()

// Watch for students errors
watch(studentsError, (newError) => {
  if (newError) {
    console.error('Error fetching students:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar alumnos',
      description: 'Ocurrió un error al cargar los alumnos de la plaza'
    })
  }
})

// Watch for commission office errors
watch(comissionError, (newError) => {
  if (newError) {
    console.error('Error fetching commission offices:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar oficios de comisión',
      description: 'Ocurrió un error al cargar los oficios de comisión de la plaza'
    })
  }
})

// Watch for report errors
watch(reportError, (newError) => {
  if (newError) {
    console.error('Error fetching reports:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar reportes',
      description: 'Ocurrió un error al cargar los reportes trimestrales de la plaza'
    })
  }
})

// Watch for final report errors
watch(finalReportError, (newError) => {
  if (newError) {
    console.error('Error fetching final reports:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar reportes finales',
      description: 'Ocurrió un error al cargar los reportes finales de la plaza'
    })
  }
})

useHead({
  title: computed(() => data.value ? `${data.value.name} - Información de la plaza` : 'Cargando...'),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        data.value
          ? `Información completa de la plaza ${data.value.name} - ${data.value.slots} plazas disponibles`
          : 'Información de la plaza'
      )
    }
  ]
})
</script>
