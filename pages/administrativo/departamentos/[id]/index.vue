<template>
  <div class="min-h-screen bg-base-200">
    <div class="container mx-auto px-6 py-8 max-w-6xl">
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
        <div class="flex justify-start pt-4">
          <NuxtLink
            to="/administrativo/departamentos"
            class="btn btn-outline btn-square btn-sm flex justify-center items-center"
          >
            <AtomsIconOutlinedChevronLeft />
          </NuxtLink>
        </div>
        <!-- Department Information and Actions Section -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="">
              <!-- Department Information -->
              <div class="">
                <h2 class="card-title text-2xl text-primary mb-4">
                  <AtomsIconOutlinedInfo />
                  Información del Departamento
                </h2>

                <div class="space-y-4">
                  <!-- Name -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Nombre:
                    </div>
                    <div class="whitespace-wrap shrink-1 grow-1">
                      {{ data.name }}
                    </div>
                  </div>

                  <!-- Address -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Dirección:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.address }}
                    </div>
                  </div>

                  <!-- Phone -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Teléfono:
                    </div>
                    <a
                      :href="`tel:${data.phone}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.phone }}
                    </a>
                  </div>

                  <!-- Email -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Correo:
                    </div>
                    <a
                      :href="`mailto:${data.email}`"
                      class="link link-hover text-base whitespace-wrap shrink-1 grow-1"
                    >
                      {{ data.email }}
                    </a>
                  </div>

                  <!-- Chief Name -->
                  <div class="flex sm:items-center gap-1">
                    <div class="font-bold min-w-fit shrink-0 grow-0">
                      Jefe del Departamento:
                    </div>
                    <div class="text-base whitespace-wrap shrink-1 grow-1">
                      {{ data.chiefName }}
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
                    type="button"
                    class="btn btn-outline btn-error btn-md btn-wide lg:btn-md"
                    disabled
                  >
                    <AtomsIconOutlinedError />
                    Eliminar
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
          Departamento no encontrado
        </h2>
        <p class="text-base-content/60 mb-6">
          No se pudo encontrar la información del departamento con ID {{ id }}.
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
              {{ error?.data?.message || 'No se pudo obtener la información del departamento' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <ModalComponent
      v-model="editModal"
      modal-class="w-fit"
    >
      <OrganismsDepartmentForm
        v-model="editForm as any"
        :pending="editPending"
        title="Editar departamento"
        submit-text="Guardar cambios"
        loading-text="Guardando..."
        @submit="handleEditSubmit"
      />
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useFetchDepartment } from '~/composables/useFetchDepartment'
import { useEditDepartment } from '~/composables/useEditDepartment'
import { formatDateTime } from '~/common/dates'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import type { UpdateDepartment } from '~/types/api/department'

const route = useRoute()
const id = computed(() => route.params.id as string)
const notificationStore = useNotificationStore()
const loginStore = useLoginStore()

const { data, error, pending } = useFetchDepartment({
  id
})

const editModal = ref(false)
const editForm = ref<UpdateDepartment>({
  name: '',
  address: '',
  phone: '',
  email: '',
  chiefName: ''
})

const { error: editError, pending: editPending, mutate: editDepartmentMutate } = useEditDepartment()

const openEditModal = () => {
  if (data.value) {
    editForm.value = {
      name: data.value.name,
      address: data.value.address,
      phone: data.value.phone,
      email: data.value.email,
      chiefName: data.value.chiefName
    }
    editModal.value = true
  }
}

const handleEditSubmit = async (formData: UpdateDepartment) => {
  await editDepartmentMutate(id.value, formData, loginStore.token!)

  if (!editError.value) {
    notificationStore.add({
      type: 'success',
      title: 'Departamento actualizado',
      description: `El departamento ${formData.name} ha sido actualizado exitosamente`
    })

    editModal.value = false
  }
}

watch(editError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar departamento',
      description: 'Ya existe un departamento con estos datos'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al actualizar departamento',
      description: 'Ocurrió un error al actualizar el departamento'
    })
  }
})

useHead({
  title: computed(() => data.value ? `${data.value.name} - Información del Departamento` : 'Cargando...'),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        data.value
          ? `Información completa del departamento ${data.value.name} - Dirigido por ${data.value.chiefName}`
          : 'Información del departamento'
      )
    }
  ]
})
</script>
