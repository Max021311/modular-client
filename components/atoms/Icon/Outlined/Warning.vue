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
  24: 'M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z',
  20: 'M10 7.5V9.16667M10 12.5H10.0084M4.22653 15.8333H15.7735C17.0565 15.8333 17.8584 14.4444 17.2169 13.3333L11.4434 3.33333C10.8019 2.22222 9.19815 2.22222 8.55665 3.33333L2.78315 13.3333C2.14165 14.4444 2.94353 15.8333 4.22653 15.8333Z',
  16: 'M8.00002 6V7.33333M8.00002 10H8.00669M3.38122 12.6667H12.6188C13.6452 12.6667 14.2867 11.5556 13.7735 10.6667L9.15472 2.66667C8.64152 1.77778 7.35852 1.77778 6.84532 2.66667L2.22652 10.6667C1.71332 11.5556 2.35482 12.6667 3.38122 12.6667Z'
}

const classes = {
  24: 'size-icon-md stroke-md',
  20: 'size-icon-sm stroke-sm',
  16: 'size-icon-xs stroke-xs'
}
</script>
