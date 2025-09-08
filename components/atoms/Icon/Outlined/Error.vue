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
  24: 'M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
  20: 'M8.33333 11.6667L10 10M10 10L11.6667 8.33333M10 10L8.33333 8.33333M10 10L11.6667 11.6667M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z',
  16: 'M6.66667 9.33333L8 8M8 8L9.33333 6.66667M8 8L6.66667 6.66667M8 8L9.33333 9.33333M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z'
}

const classes = {
  24: 'size-icon-md stroke-md',
  20: 'size-icon-sm stroke-sm',
  16: 'size-icon-xs stroke-xs'
}
</script>
