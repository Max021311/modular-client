<template>
  <svg
    :class="`${classes[props.size]}`"
    :viewbox="viewBoxes[props.size]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="paths[props.size]"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  size: '24' | '20' | '16'
}>()

const viewBoxes = {
  24: '0 0 24 24',
  20: '0 0 20 20',
  16: '0 0 16 16'
}

const paths = {
  24: 'M6 18L18 6M6 6L18 18',
  20: 'M5 15L15 5M5 5L15 15',
  16: 'M3.99994 12L11.9999 4M3.99994 4L11.9999 12'
}

const classes = {
  24: 'size-icon-md stroke-md',
  20: 'size-icon-sm stroke-sm',
  16: 'size-icon-xs stroke-xs'
}
</script>
