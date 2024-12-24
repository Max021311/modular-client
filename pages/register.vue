<template>
  <div id="register-page">
    <!-- Contenido principal -->
    <main class="flex flex-col gap-4 px-10">
      <!-- Fecha de Agenda -->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Fecha de Agenda
            </span>
          </div>
        </template>
        <template #content>
          <p>{{ agendaDate }}</p>
        </template>
      </card>

      <!-- Plaza Seleccionada -->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span>
              Plaza Seleccionada
            </span>
          </div>
        </template>
        <template #content>
          <TableComponent
            :headers="plazaHeaders"
            :data="plazaData"
          />
        </template>
      </card>

      <!-- Plazas Disponibles -->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span>
              Plazas Disponibles
            </span>
          </div>
        </template>
        <template #content>
          <div class="filters">
            <label>
              Programa:
              <input
                v-model="filters.program"
                type="text"
                placeholder="Buscar programa..."
              >
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
          <TableComponent
            :headers="plazasHeaders"
            :data="filteredPlazas"
          />
        </template>
      </card>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      agendaDate: '16/12/2024', // Fecha estática que se reemplazará con datos del backend.
      plazaHeaders: [
        'ID.',
        'Campus',
        'Dependencia',
        'Programa',
        'Turno',
        'Horario',
        'Fecha de Registro'
      ],
      plazaData: [
        [101, 'Campus Norte', 'Unidad Administrativa', 'Apoyo Administrativo', 'Matutino', '8:00 AM - 2:00 PM', '16/12/2024']
      ],
      plazasHeaders: [
        'ID.',
        'Campus',
        'Dependencia',
        'Programa',
        'Turno',
        'Horario',
        'Lugares Disponibles'
      ],
      plazasData: [
        [201, 'Campus Norte', 'Unidad Administrativa', 'Apoyo Administrativo', 'Matutino', '8:00 AM - 2:00 PM', 5],
        [202, 'Campus Centro', 'Departamento de Finanzas', 'Gestión Financiera', 'Vespertino', '2:00 PM - 8:00 PM', 3]
      ],
      filters: {
        program: '',
        turno: ''
      }
    }
  },
  computed: {
    filteredPlazas() {
      return this.plazasData.filter((plaza) => {
        const programText = String(plaza[1]).toLowerCase() // Convertir a string
        const matchesProgram = this.filters.program
          ? programText.includes(this.filters.program.toLowerCase())
          : true

        const matchesTurno = this.filters.turno
          ? plaza[1] === this.filters.turno
          : true
        return matchesProgram && matchesTurno
      })
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
