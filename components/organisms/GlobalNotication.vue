<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="state.current !== null"
        :key="state.current.id"
        class="fixed top-3 right-3 z-[90] flex flex-col gap-2"
        name="notification"
      >
        <div
          class="card card-bordered shadow-xl bg-base-100 max-w-[500px]"
        >
          <div class="card-body gap-2">
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
            <div class="flex items-center gap-2">
              <component
                :is="classes.icon"
                :class="classes.classIcon"
                class="shrink-0"
              />
              <p
                class=""
                :class="classes.class"
              >
                {{ state.current.title }}
              </p>
            </div>
            <p
              class="whitespace-pre-line ml-8"
            >
              {{ state.current.description }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
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

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration-500
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
