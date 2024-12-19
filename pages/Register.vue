<template>
    <div id="register-page">
      <!-- Encabezado -->
      <header class="header">
        <h1>Social Service System Plus</h1>
        <button class="nav-btn" @click="$router.push({ name: 'HomePage' })">Inicio</button>
        <button class="logout-btn" @click="logout">Cerrar Sesión</button>
      </header>
  
      <!-- Contenido principal -->
      <main class="main">
        <!-- Fecha de Agenda -->
        <section class="section">
          <h2>Fecha de Agenda</h2>
          <p>{{ agendaDate }}</p>
        </section>
  
        <!-- Plaza Seleccionada -->
        <section class="section">
          <h2>Plaza Seleccionada</h2>
          <TableComponent :headers="plazaHeaders" :data="plazaData" />
        </section>
  
        <!-- Plazas Disponibles -->
        <section class="section">
          <h2>Plazas Disponibles</h2>
          <div class="filters">
            <label>
              Programa:
              <input type="text" v-model="filters.program" placeholder="Buscar programa..." />
            </label>
            <label>
              Turno:
              <select v-model="filters.turno">
                <option value="">Todos</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </label>
          </div>
          <TableComponent :headers="plazasHeaders" :data="filteredPlazas" />
        </section>
      </main>
    </div>
  </template>
  
  <script lang="ts">
  import TableComponent from "./TableComponent.vue";
  
  export default {
    components: { TableComponent },
    data() {
      return {
        agendaDate: "16/12/2024", // Fecha estática que se reemplazará con datos del backend.
        plazaHeaders: [
            "ID.",
            "Campus", 
            "Dependencia", 
            "Programa",
            "Turno", 
            "Horario", 
            "Fecha de Registro"
        ],
        plazaData: [
          [101, "Campus Norte", "Unidad Administrativa", "Apoyo Administrativo", "Matutino","8:00 AM - 2:00 PM", "16/12/2024"],
        ],
        plazasHeaders: [
          "ID.",
          "Campus",
          "Dependencia",
          "Programa",
          "Turno",
          "Horario",
          "Lugares Disponibles",
        ],
        plazasData: [
          [201, "Campus Norte", "Unidad Administrativa", "Apoyo Administrativo", "Matutino", "8:00 AM - 2:00 PM", 5],
          [202, "Campus Centro", "Departamento de Finanzas", "Gestión Financiera", "Vespertino", "2:00 PM - 8:00 PM", 3],
        ],
        filters: {
          program: "",
          turno: "",
        },
      };
    },
    computed: {
        filteredPlazas() {
            return this.plazasData.filter((plaza) => {
                const programText = String(plaza[1]).toLowerCase(); //Convertir a string 
                const matchesProgram = this.filters.program
                ? programText.includes(this.filters.program.toLowerCase())
                : true;
                
                const matchesTurno = this.filters.turno
                ? plaza[1] === this.filters.turno
                : true;
                return matchesProgram && matchesTurno;
            });
        }
    },
    methods: {
      logout() {
        this.$router.push({ name: "SignIn" });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Encabezado */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #34495e;
    padding: 20px;
    text-align: center;
    border-bottom: 2px solid #ccc; /* Línea divisoria */
    margin-bottom: 20px; /* Separación con el main */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    font-size: 24px;
    margin: 0;
    color: #ffffff;
}
  
  /* Sección */
  .section {
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .filters {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }
  
  .filters label {
    display: flex;
    flex-direction: column;
  }

  /* Botón de cerrar sesión */
.logout-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #ff0000;
}

/* Botón de Registro*/
.nav-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.nav-btn:hover {
  background-color: #45a049;
}
  </style>
  
  