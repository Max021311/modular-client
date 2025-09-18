<template>
  <TemplatesListLayout
    class="container mx-auto p-4"
    title="Lista de alumnos"
    :current-page="page"
    :total-pages="pages"
    :show-pagination="students.length > 0"
    @previous-page="handlePage(page - 1)"
    @next-page="handlePage(page + 1)"
  >
    <template #actions>
      <input
        id="search"
        :value="search"
        type="text"
        placeholder="Buscar por nombre, código, correo y teléfono..."
        class="input input-bordered w-full"
        @input="handleSearch"
      >
      <button
        class="btn btn-primary grow-0 shrink-0"
        :disabled="!permissions.includes(PERMISSIONS.INVITE_STUDENT)"
        @click="openModal"
      >
        Invitar alumno
      </button>
    </template>

    <template #modal>
      <ModalComponent
        v-model="modal"
        modal-class="w-fit"
      >
        <form
          class="flex flex-col gap-4 w-80"
          @submit.prevent="inviteStudent"
        >
          <h2 class="text-lg font-semibold mb-2">
            Invitar alumno
          </h2>
          <AtomsInputText
            id="invite-email"
            v-model="inviteEmail"
            label="Correo electrónico"
            type="email"
            placeholder="alumno@ejemplo.com"
            required
          />
          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="invitePending"
          >
            <span
              v-if="invitePending"
              class="loading loading-spinner loading-sm"
            />
            {{ invitePending ? 'Enviando...' : 'Enviar invitación' }}
          </button>
        </form>
      </ModalComponent>
    </template>

    <template #content>
      <OrganismsStudentsTable
        :students="students"
        :order="order"
        @update:order="handleOrderUpdate"
        @row-click="handleStudentRowClick"
      />
    </template>
  </TemplatesListLayout>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useFetchStudents } from '~/composables/useFetchStudents'
import { useInviteStudent } from '~/composables/useInviteStudent'
import { useNotificationStore } from '~/stores/notification'
import { useLoginStore } from '~/stores/login'
import { PERMISSIONS } from '~/common/constants/permissions'

const route = useRoute()
const router = useRouter()
const loginStore = useLoginStore()
const notificationStore = useNotificationStore()

const modal = ref(false)
const inviteEmail = ref('')
const permissions = computed(() => {
  if (loginStore.userInfo?.scope === 'user') {
    return loginStore.userInfo.permissions
  }
  return []
})
const page = computed(() => parseInt(route.query.page as string ?? '1', 10))
const search = computed(() => route.query.search as string || undefined)
const limit = computed(() => parseInt(route.query.limit as string ?? '30', 10))
const offset = computed(() => (page.value - 1) * limit.value)
const order = computed(() => route.query.order as string ?? '-Students.createdAt')

const handleOrderUpdate = (newOrder: string) => {
  router.push({ query: { ...route.query, order: newOrder } })
}

const handlePage = (page: number) => {
  router.push({ query: { ...route.query, page } })
}

const handleStudentRowClick = (studentId: number) => {
  router.push(`/administrativo/alumnos/${studentId}`)
}

const handleSearch = useDebounceFn((event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const value = event.target.value
    console.log({ value })
    router.push({
      query: {
        ...route.query,
        search: value || undefined,
        page: 1 // Reset to first page when searching
      }
    })
  }
}, 500)

const openModal = () => {
  modal.value = true
}

// Invite student composable
const { error: inviteError, pending: invitePending, mutate: inviteStudentMutate } = useInviteStudent()

const inviteStudent = async () => {
  if (!inviteEmail.value) return

  try {
    await inviteStudentMutate({ email: inviteEmail.value })

    if (!inviteError.value) {
      notificationStore.add({
        type: 'success',
        title: 'Invitación enviada',
        description: `Se ha enviado una invitación a ${inviteEmail.value}`
      })

      // Close modal and reset form
      modal.value = false
      inviteEmail.value = ''
    }
  } catch {
    // Error is already handled by the composable
  }
}

watch(inviteError, (newError) => {
  if (newError && 'statusCode' in newError && newError.statusCode === 409) {
    notificationStore.add({
      type: 'error',
      title: 'Error al enviar invitación',
      description: 'El correo electrónico ya esta registrado'
    })
    return
  }
  if (newError) {
    notificationStore.add({
      type: 'error',
      title: 'Error al enviar invitación',
      description: 'Ocurrió un error al enviar la invitación'
    })
  }
})

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
