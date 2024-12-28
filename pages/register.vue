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
          <div class="card bg-base-300 shadow-md w-full p-4 text-center">
            <div class="card-body">
              <p class="text-lg font-semibold">
                Horario de Agenda:
              </p>
              <p class="text-2xl font-bold text-primary">
                {{ agendaDate }}
              </p>
            </div>
          </div>
        </template>
      </card>

      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span>
              Plaza Seleccionada
            </span>
          </div>
        </template>
        <template #content>
          <section class="flex flex-col gap-4">
            <!-- Tarjeta de Información -->
            <div class="card bg-base-300 shadow-md w-full p-4">
              <div class="card-body flex flex-col md:flex-row justify-between items-start md:items-center">
                <!-- Detalles principales -->
                <div class="flex-1">
                  <p><strong>ID:</strong> 101</p>
                  <p><strong>Campus:</strong> Campus Norte</p>
                  <p><strong>Dependencia:</strong> Unidad Administrativa</p>
                  <p><strong>Programa:</strong> Apoyo Administrativo</p>
                </div>
                <!-- Detalles adicionales -->
                <div class="flex-1">
                  <p><strong>Turno:</strong> Matutino</p>
                  <p><strong>Horario:</strong> 8:00 AM - 2:00 PM</p>
                  <p><strong>Fecha de Registro:</strong> 6/12/2024</p>
                </div>
              </div>
            </div>
          </section>
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
  </style>
