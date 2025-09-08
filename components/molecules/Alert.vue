<template>
  <div
    role="alert"
    class="alert max-w-[400px] min-w-[200px]"
    :class="classes.class"
  >
    <component
      :is="classes.icon"
      size="20"
      :class="classes.classIcon"
      class="shrink-0"
    />
    <div class="flex items-center gap-2 whitespace-pre-line">
      <slot />
    </div>
    <button
      class="btn btn-circle btn-sm btn-ghost"
      @click="onClick"
    >
      <AtomsIconOutlinedClose
        size="20"
        class="*:stroke-current"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Info from '~/components/atoms/Icon/Outlined/Info.vue'
import Success from '~/components/atoms/Icon/Outlined/Success.vue'
import Warning from '~/components/atoms/Icon/Outlined/Warning.vue'
import Error from '~/components/atoms/Icon/Outlined/Error.vue'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'success' | 'warning' | 'error'
  }>(), {
    type: 'info'
  }
)

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function onClick(event: MouseEvent) {
  emits('click', event)
}

const classes = computed(() => {
  switch (props.type) {
    case 'success':
      return {
        class: 'alert-success',
        classIcon: '*:stroke-current',
        icon: Success
      }
    case 'warning':
      return {
        class: 'alert-warning',
        classIcon: '*:stroke-current',
        icon: Warning
      }
    case 'error':
      return {
        class: 'alert-error',
        classIcon: '*:stroke-current',
        icon: Error
      }
    case 'info':
    default:
      return {
        class: 'alert-info',
        classIcon: '*:stroke-current',
        icon: Info
      }
  }
})
</script>
