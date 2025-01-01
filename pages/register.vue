<template>
  <div id="register-page">
    <!-- Contenido principal -->
    <main class="flex flex-col gap-4 px-10">
      <!----- Fecha de Agenda ----->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="font-bold text-center">
              Fecha de Agenda
            </span>
          </div>
        </template>
        <template #content>
          <div class="card bg-base-300 shadow-md w-full p-4 text-center">
            <div class="card-body">
              <p class="text-lg font-bold">
                Horario de Agenda:
              </p>
              <p class="text-2xl font-bold text-primary">
                {{ agendaDate }}
              </p>
            </div>
          </div>
        </template>
      </card>

      <!----- Plaza Seleccionada ----->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="font-bold text-center">
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

      <!----- Plazas Disponibles ----->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="font-bold text-center">
              Plazas Disponibles
            </span>
          </div>
        </template>

        <!-- Contenido -->
        <template #content>
          <section class="flex flex-col gap-4">
            <!-- Filtros -->
            <div class="card bg-base-300 shadow-sm w-full">
              <div class="card-body flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <label class="flex flex-col">
                  <span class="font-medium">Programa:</span>
                  <input
                    v-model="filters.program"
                    type="text"
                    placeholder="Buscar programa..."
                    class="input input-bordered w-full"
                  >
                </label>
                <label class="flex flex-col">
                  <span class="font-medium">Turno:</span>
                  <select
                    v-model="filters.turno"
                    class="select select-bordered w-full"
                  >
                    <option value="">Todos</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                  </select>
                </label>
              </div>
            </div>

            <!-- Tabla -->
            <div class="card bg-base-300 shadow-md w-full p-4">
              <div class="card-body">
                <TableComponent
                  :headers="plazasHeaders"
                  :data="filteredPlazas"
                />
              </div>
            </div>
          </section>
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

  </style>
