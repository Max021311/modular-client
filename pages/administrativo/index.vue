<template>
  <div
    id="admin-page"
    class="flex h-screen bg-base-200"
  >
    <!----- Sidebar para lg+ ----->
    <aside class="hidden lg:flex lg:flex-col w-64 bg-base-100 border-r p-4 space-y-4 overflow-auto">
      <h2 class="text-2xl font-bold">
        Menú
      </h2>

      <ul class="space-y-2">
        <li
          v-for="section in sections"
          :key="section.key"
        >
          <div class="collapse collapse-arrow border rounded-box bg-base-200">
            <!----- checkbox controla el expandido ----->
            <input
              v-model="section.open"
              type="checkbox"
            >
            <div class="collapse-title text-lg font-semibold">
              {{ section.label }}
            </div>
            <div class="collapse-content bg-base-100">
              <ul class="menu menu-compact pl-4">
                <li
                  v-for="item in section.items"
                  :key="item.key"
                  @click="navigateTo(item.key)"
                >
                  <NuxtLink
                    class="block py-1 rounded hover:bg-base-200"
                    :class="{ 'bg-primary text-primary-content': currentPage === item.key }"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </aside>

    <!----- Drawer para dispositivos pequeños ----->
    <div class="drawer lg:hidden">
      <input
        id="admin-drawer"
        type="checkbox"
        class="drawer-toggle"
      >
      <div class="drawer-content flex flex-col">
        <header class="navbar bg-base-300 px-4">
          <label
            for="admin-drawer"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <h2 class="flex-1 text-xl font-bold text-center">
            Panel de Administración
          </h2>
        </header>
        <main class="flex-1 p-6 overflow-auto">
          <component :is="currentPageComponent" />
        </main>
      </div>
      <aside class="drawer-side">
        <label
          for="admin-drawer"
          class="drawer-overlay"
        />
        <ul class="menu p-4 w-64 bg-base-100 space-y-4">
          <h2 class="text-2xl font-bold">
            Menú
          </h2>
          <li
            v-for="section in sections"
            :key="section.key"
          >
            <div class="collapse collapse-arrow border rounded-box bg-base-200">
              <input
                v-model="section.open"
                type="checkbox"
              >
              <div class="collapse-title text-lg font-semibold">
                {{ section.label }}
              </div>
              <div class="collapse-content bg-base-100">
                <ul class="menu menu-compact pl-4">
                  <li
                    v-for="item in section.items"
                    :key="item.key"
                    @click="() => { navigateTo(item.key); closeDrawer(); }"
                  >
                    <a
                      class="block py-1 rounded hover:bg-base-200"
                      :class="{ 'bg-primary text-primary-content': currentPage === item.key }"
                    >
                      {{ item.label }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  key: string
  label: string
}

interface Section {
  key: string
  label: string
  open: boolean
  items: MenuItem[]
}

const currentPage = ref('')

const sections = ref<Section[]>([
  {
    key: 'alumnos',
    label: 'Administrar Alumnos',
    open: false,
    items: [
      { key: 'BuscarAlumno', label: 'Buscar Alumno' },
      { key: 'DetallesPlaza', label: 'Detalles de Plaza' },
      { key: 'OficioComision', label: 'Oficio de Comisión' },
      { key: 'VerReportes', label: 'Ver Reportes' }
    ]
  },
  {
    key: 'programas',
    label: 'Administrar Programas',
    open: false,
    items: [
      { key: 'BuscarPrograma', label: 'Buscar Programa' },
      { key: 'DetallesPrograma', label: 'Detalles de Programa' },
      { key: 'CrearPrograma', label: 'Crear Programa' },
      { key: 'EditarPrograma', label: 'Editar Programa' },
      { key: 'EliminarPrograma', label: 'Eliminar Programa' }
    ]
  },
  {
    key: 'estadistica',
    label: 'Estadística',
    open: false,
    items: [
      { key: 'CrearReporte', label: 'Crear un Nuevo Reporte' },
      { key: 'BuscarReporte', label: 'Buscar un Reporte' },
      { key: 'EditarReporte', label: 'Editar un Reporte' },
      { key: 'VisualizarReporte', label: 'Visualizar Reporte' }
    ]
  }
])

const currentPageComponent = computed(() => {
  // Mapea currentPage a un componente, o devuelve un placeholder
  return 'WelcomeComponent'
})

const navigateTo = (page: string) => {
  currentPage.value = page
}

const closeDrawer = () => {
  const drawer = document.getElementById('admin-drawer') as HTMLInputElement
  if (drawer) drawer.checked = false
}
</script>

<style scoped>
/* Scroll en sidebar */
aside nav {
  scrollbar-width: thin;
}
</style>
