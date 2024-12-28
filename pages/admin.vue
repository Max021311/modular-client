<template>
  <div id="admin-page">
    <!-- Drawer -->
    <div class="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        class="drawer-toggle"
      >
      <div class="drawer-content flex flex-col justify-center">
        <!-- Page content here -->
        <!-- Contenido principal -->
        <main class="flex-1 p-4">
          <div class="navbar bg-base-300">
            <h2 class="text-xl font-bold text-base-content">
              Panel de Administración
            </h2>
            <label
              for="my-drawer-2"
              class="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>

          <div class="content-view">
            <div v-if="currentPage === 'BuscarAlumno'">
              <h2>Buscar Alumno</h2>
              <p>Contenido relacionado a la búsqueda de alumnos.</p>
            </div>

            <div v-else-if="currentPage === 'DetallesPlaza'">
              <h2>Detalles de la Plaza</h2>
              <p>Detalles específicos de la plaza de servicio.</p>
            </div>

            <div v-else-if="currentPage === 'OficioComision'">
              <h2>Oficio de Comisión</h2>
              <p>Información del oficio de comisión.</p>
            </div>

            <!-- Secciones según sea necesario -->
            <div v-else>
              <h2>Bienvenido al Panel de Administración</h2>
              <p>Seleccione una opción del menú lateral.</p>
            </div>
          </div>
        </main>
      </div>
      <div class="drawer-side">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        />
        <ul class="menu bg-base-300 text-base-content min-h-full w-80 p-4">
          <h2 class="text-xl font-bold text-base-content">
            Menú
          </h2>
          <!-- Sidebar content here -->
          <ul class="menu bg-base-300 rounded-box w-56">
            <li>
              <details open>
                <summary class="font-bold text-base-content">
                  Administrar Alumnos
                </summary>
                <ul>
                  <li><a>Buscar Alumno</a></li>
                  <li><a>Ver detalles de la Plaza</a></li>
                  <li><a>Ver Oficio de Comisión</a></li>
                  <li><a>Ver Reportes</a></li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary class="font-bold text-base-content">
                  Administrar Programas
                </summary>
                <ul>
                  <li><a>Buscar Programa</a></li>
                  <li><a>Ver detalles del Programa</a></li>
                  <li><a>Crear Programa</a></li>
                  <li><a>Editar Programa</a></li>
                  <li><a>Eliminar Programa</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentPage: '' // Estado para manejar la página activa
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: 'SignIn' })
    }
  }
}
</script>

<style scoped>
/* Contenedor principal */
#admin-page {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  background-color: #f9f9f9;
  height: 100vh;
  overflow: hidden; /* Evita desbordamiento vertical */
}

.content-view {
  flex-grow: 1;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  box-sizing: border-box;
}
</style>
