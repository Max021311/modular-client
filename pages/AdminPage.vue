<template>
    <div id="admin-page">
      <!-- Menú lateral -->
      <aside class="sidebar">
        <h2>Menú</h2>
        <section>
          <div class="menu-item" @click="toggleMenu('alumnos')">
            Administrar Alumnos <span>{{ menus.alumnos ? '-' : '+' }}</span>
          </div>
          <ul v-show="menus.alumnos">
            <li @click="navigateTo('BuscarAlumno')">Buscar Alumno</li>
            <li @click="navigateTo('DetallesPlaza')">Ver detalles de la Plaza</li>
            <li @click="navigateTo('OficioComision')">Ver Oficio de Comisión</li>
            <li @click="navigateTo('Reportes')">Ver Reportes</li>
            <li @click="navigateTo('EditarAlumno')">Editar Información</li>
            <li @click="navigateTo('BajaPlaza')">Dar de Baja</li>
          </ul>
        </section>
  
        <section>
          <div class="menu-item" @click="toggleMenu('programas')">
            Administrar Programas <span>{{ menus.programas ? '-' : '+' }}</span>
          </div>
          <ul v-show="menus.programas">
            <li @click="navigateTo('BuscarPrograma')">Buscar Programa</li>
            <li @click="navigateTo('DetallesPrograma')">Ver Detalles</li>
            <li @click="navigateTo('EditarPrograma')">Editar Programa</li>
            <li @click="navigateTo('EliminarPrograma')">Eliminar Programa</li>
            <li @click="navigateTo('CrearPrograma')">Crear Programa</li>
          </ul>
        </section>
      </aside>
  
      <!-- Contenido dinámico -->
      <main class="content">
        <header class="header">
          <h1>Panel de Administración</h1>
          <button class="logout-btn" @click="logout">Cerrar Sesión</button>
        </header>
  
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
  </template>
  
  
  <script lang="ts">
  export default {
    data() {
      return {
        menus: {
          alumnos: false,
          programas: false,
        },
        currentPage: '', // Estado para manejar la página activa
      };
    },
    methods: {
      logout() {
        this.$router.push({ name: "SignIn" });
      },
      toggleMenu(menu: 'alumnos' | 'programas') {
        this.menus[menu] = !this.menus[menu];
      },
      navigateTo(page: string) {
        this.currentPage = page; // Actualiza la página actual
        console.log("Navegando a: ", page);
      },
    },
  };
  </script>
  
  
  <style scoped>
 /* Contenedor principal */
#admin-page {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  color: #333;
  background-color: #f9f9f9;
  height: 100vh;
  overflow: hidden; /* Evita desbordamiento vertical */
}

/* Sidebar */
.sidebar {
  width: 280px; 
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* Evita que el sidebar se encoja */
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 1px solid #555;
  padding-bottom: 10px;
}

.menu-item {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #34495e;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #1abc9c;
}

ul {
  list-style: none;
  padding-left: 20px;
}

ul li {
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.3s;
}

ul li:hover {
  color: #1abc9c;
  text-decoration: underline;
}

/* Contenido principal */
.content {
  flex-grow: 1; 
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px; 
  margin: 0 auto;
  background-color: #ecf0f1;
  overflow-y: auto; /* Scroll si el contenido excede */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #34495e;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
}

.header h1 {
  font-size: 28px;
  margin: 0;
}

.logout-btn {
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c0392b;
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
  