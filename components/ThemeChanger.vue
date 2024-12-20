<template>
  <div class="dropdown dropdown-hover">
    <div
      tabindex="0"
      role="button"
      class="btn btn-outline m-1 btn-sm"
    >
      {{ themes.find(theme => theme.value === selected)?.label }}
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
      <li
        v-for="theme in themes"
        :key="theme.value"
      >
        <input
          :checked="selected === theme.value"
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          :aria-label="theme.label"
          :value="theme.value"
          @click="selected = theme.value"
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
if (import.meta.server) {
  throw new Error('ThemeChanger component is not meant to be pre-rendered.')
}

const themes = [
  { label: 'Sistema', value: 'default' },
  { label: 'Claro', value: 'winter' },
  { label: 'Oscuro', value: 'synthwave' }
]
const selected = useLocalStorage('theme', 'default')
</script>
