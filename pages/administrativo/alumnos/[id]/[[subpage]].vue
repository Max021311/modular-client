<template>
  <div class="space-y-6 my-6">
    <div class="container mx-auto px-4">
      <NuxtLink
        to="/administrativo/alumnos"
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
        <!-- Student Information and Actions Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="">
              <!-- Student Information -->
              <div class="">
                <h2 class="card-title text-2xl text-primary mb-4">
                  <AtomsIconOutlinedInfo />
                  Información del alumno
                </h2>

                <div class="space-y-4">
                  <!-- ID -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      ID:
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

                  <!-- Student Code -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Código:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.code }}
                    </div>
                  </div>

                  <!-- Career -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Carrera:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.career?.name || 'N/A' }}
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Email:
                    </div>
                    <a
                      :href="`mailto:${data.email}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.email }}
                    </a>
                  </div>

                  <!-- Phone -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Teléfono:
                    </div>
                    <a
                      :href="`tel:${data.telephone}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.telephone }}
                    </a>
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
                        {{ data.deletedAt ? 'Inactivo' : 'Activo' }}
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
                  >
                    <AtomsIconOutlinedInfo />
                    Editar
                  </button>
                  <button
                    v-if="data.deletedAt"
                    type="button"
                    class="btn btn-success btn-md btn-wide lg:btn-md"
                    :disabled="activatePending"
                    @click="handleActivateStudent"
                  >
                    <span
                      v-if="activatePending"
                      class="loading loading-spinner loading-sm"
                    />
                    <AtomsIconMicroCheck v-else />
                    {{ activatePending ? 'Activando...' : 'Activar Alumno' }}
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-warning btn-md btn-wide lg:btn-md"
                    :disabled="deactivatePending"
                    @click="handleDeactivateStudent"
                  >
                    <span
                      v-if="deactivatePending"
                      class="loading loading-spinner loading-sm"
                    />
                    <AtomsIconMicroXMark v-else />
                    {{ deactivatePending ? 'Desactivando...' : 'Desactivar Alumno' }}
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

        <!-- Student Sections -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div
              role="tablist"
              class="tabs tabs-bordered"
            >
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'vacancies' }"
                :to="`/administrativo/alumnos/${id}`"
              >
                Plazas
              </NuxtLink>
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'quarter-reports' }"
                :to="`/administrativo/alumnos/${id}/reportes-trimestrales`"
              >
                Reportes trimestrales
              </NuxtLink>
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'final-reports' }"
                :to="`/administrativo/alumnos/${id}/reportes-finales`"
              >
                Reportes finales
              </NuxtLink>
              <NuxtLink
                role="tab"
                class="tab link link-hover"
                :class="{ 'tab-active': currentTab === 'comission-offices' }"
                :to="`/administrativo/alumnos/${id}/oficios-comision`"
              >
                Oficios de comisión
              </NuxtLink>
            </div>
            <TemplatesListLayout
              v-if="currentTab === 'vacancies'"
              class="mt-2"
              :current-page="vacancyPage"
              :total-pages="vacancyPages"
              :show-pagination="!vacancyPending && vacancies.length > 0"
              @previous-page="handleVacancyPageUpdate(vacancyPage - 1)"
              @next-page="handleVacancyPageUpdate(vacancyPage + 1)"
            >
              <template #actions>
                <input
                  id="vacancy-search"
                  :value="vacancySearch"
                  type="text"
                  placeholder="Buscar plazas por nombre, descripción..."
                  class="input input-bordered w-full"
                  @input="handleVacancySearch"
                >
                <button
                  class="btn btn-primary grow-0 shrink-0"
                  @click="openAssociateVacancyModal"
                >
                  <IconPlus class="w-4 h-4" />
                  Asociar plaza
                </button>
              </template>

              <template #content>
                <!-- Loading State -->
                <div
                  v-if="vacancyPending"
                  class="flex justify-center py-12"
                >
                  <span class="loading loading-spinner loading-lg text-primary" />
                </div>

                <!-- Vacancies Table -->
                <OrganismsVacanciesTable
                  v-else
                  :vacancies="vacancies"
                  :order="vacancyOrder"
                  :show-department="true"
                  :empty-message="'No se encontraron plazas para este alumno.'"
                  @update:order="handleVacancyOrderUpdate"
                  @row-click="handleVacancyRowClick"
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
                  :show-student="false"
                  :show-vacancy="true"
                  :empty-message="'No se encontraron reportes trimestrales para este alumno.'"
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
                  :show-student="false"
                  :show-vacancy="true"
                  :empty-message="'No se encontraron reportes finales para este alumno.'"
                  @update:order="handleFinalReportOrderUpdate"
                  @row-click="handleFinalReportRowClick"
                  @row-approve="handleFinalReportApprove"
                  @row-reject="handleFinalReportReject"
                />
              </template>
            </TemplatesListLayout>

            <!-- Comission Offices Tab Content -->
            <TemplatesListLayout
              v-else-if="currentTab === 'comission-offices'"
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

                <!-- Comission Offices Table -->
                <OrganismsComissionOfficesTable
                  v-else
                  :comission-offices="comissionOffices"
                  :order="comissionOrder"
                  :show-student="false"
                  :empty-message="'No se encontraron oficios de comisión para este alumno.'"
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
          Alumno no encontrado
        </h2>
        <p class="text-base-content/60 mb-6">
          No se pudo encontrar la información del alumno con ID {{ id }}.
        </p>
        <NuxtLink
          to="/administrativo/alumnos"
          class="btn btn-primary"
        >
          Volver a Lista de Alumnos
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
              {{ error?.data?.message || 'No se pudo obtener la información del alumno' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Associate Vacancy Modal -->
    <ModalComponent
      v-model="associateModal"
      modal-class="w-fit"
    >
      <div class="flex flex-col gap-4 w-80">
        <h2 class="text-lg font-semibold mb-2">
          Asociar plaza al alumno
        </h2>

        <form
          class="space-y-4"
          @submit.prevent="handleAssociateSubmit"
        >
          <!-- Vacancy ID Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">ID de la plaza<span class="text-red-500">*</span></span>
            </label>
            <AtomsInputText
              v-model="associateForm.vacancyId"
              type="number"
              placeholder="Ingrese el ID de la plaza"
              min="1"
              :disabled="associatePending"
              required
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 justify-end pt-4">
            <button
              type="button"
              class="btn btn-outline"
              :disabled="associatePending"
              @click="cancelAssociate"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="associatePending || !associateForm.vacancyId"
            >
              <span
                v-if="associatePending"
                class="loading loading-spinner loading-sm"
              />
              {{ associatePending ? 'Asociando...' : 'Asociar plaza' }}
            </button>
          </div>
        </form>
      </div>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useFetchStudent } from '~/composables/useFetchStudent'
import { useFetchVacancies } from '~/composables/useFetchVacancies'
import { useFetchComissionOffices } from '~/composables/useFetchComissionOffices'
import { useFetchFinalReports } from '~/composables/useFetchFinalReports'
import { useFetchReports } from '~/composables/useFetchReports'
import { useAssociateVacancy } from '~/composables/useAssociateVacancy'
import { usePatchComissionOffice } from '~/composables/usePatchComissionOffice'
import { usePatchFinalReport } from '~/composables/usePatchFinalReport'
import { usePatchReport } from '~/composables/usePatchReport'
import { useActivateStudent } from '~/composables/useActivateStudent'
import { useDeactivateStudent } from '~/composables/useDeactivateStudent'
import { formatDateTime } from '~/common/dates'
import { useNotificationStore } from '~/stores/notification'
import type { FastifyError } from '~/types/api/error.d'

function pathToPage(page: string) {
  switch (page) {
    case '':
    case '/':
    case 'plazas':
      return 'vacancies'
    case 'reportes-trimestrales':
      return 'quarter-reports'
    case 'reportes-finales':
      return 'final-reports'
    case 'oficios-comision':
      return 'comission-offices'
    default:
      return null
  }
}

definePageMeta({
  validate: (value) => {
    if (value.params.id && !/^\d+$/.test(value.params.id as string)) {
      return false
    }
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

const currentTab = computed(() => {
  const subpage = route.params.subpage as string
  return pathToPage(subpage) ?? 'vacancies'
})

// Vacancy-related computed properties
const vacancyPage = computed(() => parseInt(route.query.vacancyPage as string ?? '1', 10))
const vacancySearch = computed(() => route.query.vacancySearch as string || undefined)
const vacancyLimit = computed(() => parseInt(route.query.vacancyLimit as string ?? '10', 10))
const vacancyOffset = computed(() => (vacancyPage.value - 1) * vacancyLimit.value)
const vacancyOrder = computed(() => route.query.vacancyOrder as string ?? '-Vacancies.createdAt')

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

const { data, error, pending, refresh } = useFetchStudent({
  id,
  includeCareer: true
})

const {
  vacancies,
  pages: vacancyPages,
  pending: vacancyPending,
  error: vacancyError
} = useFetchVacancies({
  search: vacancySearch,
  limit: vacancyLimit,
  offset: vacancyOffset,
  order: vacancyOrder,
  studentId: computed(() => parseInt(id.value, 10)),
  includeCycle: true,
  includeDepartment: true
})

// Fetch commission offices for this student
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
  includeVacancy: true,
  includeStudent: false,
  studentId: computed(() => parseInt(id.value, 10)),
  status: computed(() => comissionStatus.value as 'APPROVED' | 'REJECTED' | 'PENDING' | undefined)
})

// Fetch reports for this student
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
  includeVacancy: true,
  includeStudent: false,
  studentId: computed(() => parseInt(id.value, 10)),
  status: computed(() => reportStatus.value as 'APPROVED' | 'REJECTED' | 'PENDING' | undefined),
  reportNumber: computed(() => reportNumber.value as '1' | '2' | undefined)
})

// Fetch final reports for this student
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
  includeVacancy: true,
  includeStudent: false,
  studentId: computed(() => parseInt(id.value, 10)),
  status: computed(() => finalReportStatus.value as 'APPROVED' | 'REJECTED' | 'PENDING' | undefined)
})

// Vacancy handlers for component events
const handleVacancySearchUpdate = (value: string | undefined) => {
  router.push({
    query: {
      ...route.query,
      vacancySearch: value,
      vacancyPage: 1 // Reset to first page when searching
    }
  })
}

const handleVacancySearch = useDebounceFn((event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const value = event.target.value
    handleVacancySearchUpdate(value || undefined)
  }
}, 500)

const handleVacancyPageUpdate = (newPage: number) => {
  router.push({ query: { ...route.query, vacancyPage: newPage } })
}

const handleVacancyOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, vacancyOrder: newOrder } })
}

const handleVacancyRowClick = (vacancyId: number) => {
  router.push(`/administrativo/plazas/${vacancyId}`)
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

// Associate vacancy functionality
const { mutate: associateVacancy, pending: associatePending, error: associateError } = useAssociateVacancy()

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

// Activate/Deactivate student handlers
const handleActivateStudent = async () => {
  if (!data.value) return

  try {
    await activateStudent(data.value.id)
    // Refresh student data after successful activation
    await refresh()
  } catch (error) {
    console.error('Error activating student:', error)
  }
}

const handleDeactivateStudent = async () => {
  if (!data.value) return

  try {
    await deactivateStudent(data.value.id)
    // Refresh student data after successful deactivation
    await refresh()
  } catch (error) {
    console.error('Error deactivating student:', error)
  }
}

// Patch commission office functionality
const { mutate: patchComissionOffice } = usePatchComissionOffice()

// Patch final report functionality
const { mutate: patchFinalReport } = usePatchFinalReport()

// Patch report functionality
const { mutate: patchReport } = usePatchReport()

// Activate/Deactivate student functionality
const { mutate: activateStudent, pending: activatePending, error: _activateError } = useActivateStudent()
const { mutate: deactivateStudent, pending: deactivatePending, error: _deactivateError } = useDeactivateStudent()

const associateModal = ref(false)
const associateForm = ref({
  vacancyId: ''
})

const openAssociateVacancyModal = () => {
  associateModal.value = true
  associateForm.value.vacancyId = ''
}

const cancelAssociate = () => {
  associateModal.value = false
  associateForm.value.vacancyId = ''
}

const handleAssociateSubmit = async () => {
  if (!associateForm.value.vacancyId) {
    return
  }

  try {
    const vacancyId = parseInt(associateForm.value.vacancyId, 10)
    const studentId = parseInt(id.value, 10)

    await associateVacancy(vacancyId, studentId)

    // Close modal
    associateModal.value = false
    associateForm.value.vacancyId = ''
  } catch (error) {
    console.error('Error associating vacancy:', error)

    // Check for specific error messages
    let errorMessage = 'No se pudo asociar la plaza al alumno'

    if (associateError.value && 'statusCode' in associateError.value) {
      if (associateError.value.statusCode === 400 && associateError.value.message === 'Vacancy has no available slots') {
        errorMessage = 'No hay cupos disponibles'
      } else if (associateError.value.statusCode === 404 && associateError.value.message === 'Vacancy not found') {
        errorMessage = 'Plaza no encontrada'
      } else if (associateError.value.statusCode === 409 && associateError.value.message === 'Cannot associate to inactive vacancy') {
        errorMessage = 'No se puedo asociar a una plaza inactiva'
      }
    }

    notificationStore.add({
      type: 'error',
      title: 'Error al asociar',
      description: errorMessage
    })
  }
}

function handleAssociateError(error: Error | FastifyError) {
  console.error('Error associating vacancy:', error)

  const errors = {
    'Vacancy has no available slots': 'No hay cupos disponibles',
    'Vacancy not found': 'Plaza no encontrada',
    'Student already has a vacancy association for this cycle': 'El alumno ya esta asociado a una plaza en este ciclo',
    'Cannot associate to inactive vacancy': 'No se puedo asociar a una plaza inactiva'
  }

  const errorMessage = 'message' in error ? errors[error.message as keyof typeof errors] : 'No se pudo asociar la plaza al alumno'

  notificationStore.add({
    type: 'error',
    title: 'Error al asociar',
    description: errorMessage
  })
}

watch(associateError, (newError) => {
  if (newError) handleAssociateError(newError)
})

// Watch for vacancy errors
watch(vacancyError, (newError) => {
  if (newError) {
    console.error('Error fetching vacancies:', newError)
    notificationStore.add({
      type: 'error',
      title: 'Error al cargar plazas',
      description: 'Ocurrió un error al cargar las plazas del alumno'
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
      description: 'Ocurrió un error al cargar los oficios de comisión del alumno'
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
      description: 'Ocurrió un error al cargar los reportes trimestrales del alumno'
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
      description: 'Ocurrió un error al cargar los reportes finales del alumno'
    })
  }
})

// Set page meta
useHead({
  title: computed(() => data.value ? `${data.value.name} - Información del Alumno` : 'Cargando...'),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        data.value
          ? `Información completa del alumno ${data.value.name} - ${data.value.career?.name || 'Sin carrera'}`
          : 'Información del alumno'
      )
    }
  ]
})
</script>
