<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="views[props.size]"
    fill="currentColor"
    :class="sizes[props.size]"
  >
    <path
      v-bind="paths[props.size]"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: '24' | '20' | '16'
  }>(),
  {
    size: '24'
  }
)

const views = {
  24: '0 0 24 24',
  20: '0 0 20 20',
  16: '0 0 16 16'
}

const sizes = {
  24: 'size-6',
  20: 'size-5',
  16: 'size-4'
}

const paths = {
  24: {
    'd': 'M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z',
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd'
  },
  20: { d: 'M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' },
  16: { d: 'M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z' }
} as const
</script>
