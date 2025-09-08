<template>
  <div id="admin-page">
    <!----- Drawer ----->
    <div class="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        class="drawer-toggle"
      >
      <div class="drawer-content flex flex-col justify-center">
        <!----- Navbar Personalizada ----->
        <div class="navbar bg-base-300 px-4">
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
        <!----- Contenido principal ----->
        <main class="flex-1 p-6">
          <!-- <component /> -->
        </main>
      </div>
      <!----- Sidebar ----->
      <div class="drawer-side">
        <label
          for="my-drawer-2"
          class="drawer-overlay"
        />
        <ul class="menu bg-base-300 text-base-content w-80 p-4">
          <h2 class="text-xl font-bold mb-4">
            Menú
          </h2>
          <li>
            <details open>
              <summary>Administrar Alumnos</summary>
              <ul>
                <li><a @click="('BuscarAlumno')">Buscar Alumno</a></li>
                <li><a @click="('DetallesPlaza')">Ver detalles de la Plaza</a></li>
                <li><a @click="('OficioComision')">Ver Oficio de Comisión</a></li>
                <li><a @click="('VerReportes')">Ver Reportes</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details open>
              <summary>Administrar Programas</summary>
              <ul>
                <li><a @click="('BuscarPrograma')">Buscar Programa</a></li>
                <li><a @click="('DetallesPrograma')">Ver detalles del Programa</a></li>
                <li><a @click="('CrearPrograma')">Crear Programa</a></li>
                <li><a @click="('EditarPrograma')">Editar Programa</a></li>
                <li><a @click="('EliminarPrograma')">Eliminar Programa</a></li>
              </ul>
            </details>
          </li>
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

</style>
