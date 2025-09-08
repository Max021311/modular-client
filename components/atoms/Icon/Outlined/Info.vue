<template>
  <svg
    :class="`${classes[props.size]}`"
    :viewBox="viewBoxes[props.size]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- <path d="M12.5 8V12M12.5 16H12.51M21.5 12C21.5 16.9706 17.4706 21 12.5 21C7.52944 21 3.5 16.9706 3.5 12C3.5 7.02944 7.52944 3 12.5 3C17.4706 3 21.5 7.02944 21.5 12Z" stroke-linecap="round" stroke-linejoin="round"/> -->
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
  24: 'M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
  20: 'M10 6.66667V10M10 13.3333H10.0083M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z',
  16: 'M8 5.33333V8M8 10.6667H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z'
}

const classes = {
  24: 'size-icon-md stroke-md',
  20: 'size-icon-sm stroke-sm',
  16: 'size-icon-xs stroke-xs'
}
</script>
