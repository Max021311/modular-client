<template>
  <div class="dropdown dropdown-hover">
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      Theme
      <svg
        width="12px"
        height="12px"
        class="inline-block h-2 w-2 fill-current opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
      >
        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
      </svg>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
    >
      <li>
        <input
          :checked="mode === 'default'"
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Sistema"
          value="default"
          @click="mode = 'default'"
        >
      </li>
      <li>
        <input
          :checked="mode === 'winter'"
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Claro"
          value="winter"
          @click="mode = 'winter'"
        >
      </li>
      <li>
        <input
          :checked="mode === 'synthwave'"
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Oscuro"
          value="synthwave"
          @click="mode = 'synthwave'"
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const mode = ref('default')
</script>
