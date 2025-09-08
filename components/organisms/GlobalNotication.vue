<template>
  <Teleport to="body">
    <div
      v-if="state.current !== null"
      class="fixed z-[90] top-3 right-3 flex justify-center items-center gap-2 modal-box"
      name="notification"
    >
      <button
        type="button"
        class="btn btn-sm btn-ghost btn-circle absolute top-2 right-2"
      >
        <AtomsIconOutlinedClose
          size="20"
          class="*:stroke-primary"
          @click="state.next"
        />
      </button>
      <component
        :is="classes.icon"
        size="24"
        :class="classes.classIcon"
        class="shrink-0"
      />
      <div
        :class="classes.class"
        class="flex items-center gap-2 whitespace-pre-line"
      >
        {{ state.current.title }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useNotificationStore } from '~/stores/notification'

import Info from '~/components/atoms/Icon/Outlined/Info.vue'
import Success from '~/components/atoms/Icon/Outlined/Success.vue'
import Warning from '~/components/atoms/Icon/Outlined/Warning.vue'
import Error from '~/components/atoms/Icon/Outlined/Error.vue'

const state = useNotificationStore()

const classes = computed(() => {
  switch (state.current?.type) {
    case 'success':
      return {
        class: 'text-success',
        classIcon: '*:stroke-succes',
        icon: Success
      }
    case 'warning':
      return {
        class: 'text-warning',
        classIcon: '*:stroke-warning',
        icon: Warning
      }
    case 'error':
      return {
        class: 'text-error',
        classIcon: '*:stroke-error',
        icon: Error
      }
    case 'info':
    default:
      return {
        class: 'text-info',
        classIcon: '*:stroke-info',
        icon: Info
      }
  }
})
</script>
