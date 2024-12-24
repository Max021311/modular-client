<template>
  <div id="main-page">
    <!-- Contenido principal -->
    <main class="flex flex-col gap-4 px-10">
      <!-- Plaza de Servicio que se Muestra -->
      <Card>
        <template #title>
          Plaza de Servicio
        </template>
        <template #content>
          <TableComponent
            :headers="plazasHeaders"
            :data="plazasData"
          />
        </template>
      </Card>

      <!-- Oficio de Comisión -->
      <Card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Oficio de Comisión
            </span>
            <button
              class="btn btn-primary btn-sm btn-circle justify-center items-center"
              @click="openModal('office')"
            >
              <IconPlus size="20" />
            </button>
          </div>
        </template>
        <template #content>
          <TableComponent
            :headers="oficioHeaders"
            :data="oficioData"
            :actions="true"
          />
        </template>
      </Card>

      <!-- Reportes parciales -->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Reportes Parciales
            </span>
            <button
              class="btn btn-primary btn-sm btn-circle justify-center items-center"
              @click="openModal('bimester-report')"
            >
              <IconPlus size="20" />
            </button>
          </div>
        </template>
        <template #content>
          <TableComponent
            :headers="reportesHeaders"
            :data="reportesData"
            :actions="true"
          />
        </template>
      </card>

      <!-- Reporte Final -->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Reporte Final
            </span>
            <button
              class="btn btn-primary btn-sm btn-circle justify-center items-center"
              @click="openModal('final-report')"
            >
              <IconPlus size="20" />
            </button>
          </div>
        </template>
        <template #content>
          <TableComponent
            :headers="rpHeaders"
            :data="rpData"
            :actions="true"
          />
        </template>
      </card>
    </main>

    <!-- Modal -->
    <ModalComponent
      v-model="isModalOpen"
    >
      <Card>
        <template #title>
          <div v-if="modalSection === 'office'">
            <h3>Formulario de Oficio de Comisión</h3>
          </div>
          <div v-else-if="modalSection === 'bimester-report'">
            <h3>Formulario de Reporte Bimestral</h3>
          </div>
          <div v-else-if="modalSection === 'final-report'">
            <h3>Formulario de Reporte Final</h3>
          </div>
        </template>
        <template #content>
          <div v-if="modalSection === 'office'">
            <form @submit.prevent="submitForm">
              <label>
                Fecha de Inicio:
                <input
                  v-model="formData.startDate"
                  type="date"
                >
              </label>

              <label>
                Lugar de la Dependencia:
                <input
                  v-model="formData.dependencia"
                  type="text"
                  placeholder="Ejemplo: Unidad Administrativa"
                >
              </label>

              <div class="button-group">
                <button
                  type="button"
                  @click="generatePDF"
                >
                  Generar PDF
                </button>
                <button
                  type="button"
                  @click="uploadPDF"
                >
                  Cargar PDF
                </button>
              </div>

              <button type="submit">
                Enviar
              </button>
            </form>
          </div>
          <div v-else-if="modalSection === 'bimester-report'">
            <form @submit.prevent="submitForm">
              <label>
                Período reportado:
                <div class="date-range">
                  <input
                    v-model="formData.startDate"
                    type="date"
                  > -
                  <input
                    v-model="formData.endDate"
                    type="date"
                  >
                </div>
              </label>
              <label>¿Cuáles fueron las principales actividades que realizaste?</label>
              <textarea v-model="formData.activities" />

              <label>¿Qué objetivos específicos se esperaban lograr?</label>
              <textarea v-model="formData.objectives" />

              <label>¿Consideras que cumpliste con los objetivos propuestos?</label>
              <textarea v-model="formData.goalsAchieved" />

              <label>¿Qué habilidades crees que has mejorado durante tu servicio social?</label>
              <textarea v-model="formData.skills" />

              <label>¿Qué aspectos fueron más satisfactorios?</label>
              <textarea v-model="formData.satisfaction" />

              <label>¿Recomendarías esta institución para realizar el servicio social? ¿Por qué?</label>
              <textarea v-model="formData.recommendation" />

              <button type="submit">
                Enviar
              </button>
            </form>
          </div>
          <div v-else-if="modalSection === 'final-report'">
            <form @submit.prevent="submitForm">
              <label>
                Período del servicio:
                <div class="date-range">
                  <input
                    v-model="formData.startDate"
                    type="date"
                  > -
                  <input
                    v-model="formData.endDate"
                    type="date"
                  >
                </div>
              </label>
              <label>¿Cuáles fueron las actividades más relevantes que realizaste?</label>
              <textarea v-model="formData.relevantActivities" />

              <label>¿Se alcanzaron los objetivos planteados al inicio de tu servicio social?</label>
              <textarea v-model="formData.objectivesAchieved" />

              <label>¿Qué habilidades profesionales desarrollaste durante tu servicio social?</label>
              <textarea v-model="formData.professionalSkills" />

              <label>¿Cuáles fueron tus logros más importantes?</label>
              <textarea v-model="formData.keyAchievements" />

              <label>¿Qué aspectos consideras fueron los más valiosos durante tu servicio social?</label>
              <textarea v-model="formData.valuableAspects" />

              <label>¿Qué recomendaciones harías a la institución?</label>
              <textarea v-model="formData.recommendations" />

              <button type="submit">
                Enviar
              </button>
            </form>
          </div>
        </template>
      </Card>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      plazasHeaders: [
        'No.',
        'Estatus',
        'Fecha de Inicio',
        'Fecha de Finalización',
        'Tiempo Reportado (Horas)',
        'Dependencia',
        'Programa',
        'Detalles'
      ],
      plazasData: [['789/2024A', 'FINALIZADO', '04/03/2024', '06/09/2024', 480, 'Unidad Administrativa', 'Apoyo Administrativo', '👁️']],
      oficioHeaders: [
        'No.',
        'Fecha de Inicio',
        'Dependencia',
        'Programa',
        'Estatus del Oficio'
      ],
      oficioData: [[1, '01/02/2024', 'Unidad Administrativa', 'Programa A', 'VALIDADO']],
      reportesHeaders: [
        'No.',
        'Fecha de Creación',
        'Horas',
        'Bimestre Reportado',
        'Estatus del Reporte'
      ],
      reportesData: [[1, '05/05/2024', 160, '04/03/2024 - 05/05/2024', 'VALIDADO']],
      rpHeaders: [
        'Fecha de Creación',
        'Período de Servicio',
        'Horas Totales',
        'Estatus del Reporte'
      ],
      rpData: [['05/05/2024', '04/03/2024 - 06/09/2024', '480', 'VALIDADO']],
      isModalOpen: false,
      modalSection: '',
      formData: {
        startDate: '',
        dependencia: '',
        endDate: '',
        activities: '',
        objectives: '',
        goalsAchieved: '',
        skills: '',
        contribution: '',
        satisfaction: '',
        recommendation: '',
        relevantActivities: '',
        objectivesAchieved: '',
        professionalSkills: '',
        keyAchievements: '',
        valuableAspects: '',
        recommendations: ''
      }
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: 'SignIn' })
    },
    openModal(section: string) {
      this.modalSection = section
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.modalSection = ''
    },
    submitForm() {
      console.log('Formulario enviado:', this.formData)
      this.closeModal()
    },
    generatePDF() {
      console.log('Generando PDF con datos:', this.formData)
      // Lógica para generar PDF
    },
    uploadPDF() {
      console.log('Cargando PDF...')
      // Lógica para cargar PDF
    }
  }
}
</script>

<style scoped>
/* Estilos generales */
#main-page {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

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

/* Sección */
.section {
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.section h2 {
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
}
/* Contenedor del encabezado de la sección */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

/* Botón de la sección */
.section-btn {
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.section-btn:hover {
  background-color: #0056b3;
}

/*Formato del formulario*/
.form-container {
  max-height: 80vh; /* Altura máxima del formulario */
  overflow-y: auto; /* Desplazamiento vertical */
  padding: 20px;
  box-shadow: 0px 4px 10px #0000001a;
  background-color: #fff;
  border-radius: 8px;
}
textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.date-range input {
  width: 45%;
  margin-right: 5px;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
