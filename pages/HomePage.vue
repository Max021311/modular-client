<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="main-page">
    <!-- Encabezado -->
    <header class="header">
      <h1>Social Service System Plus</h1>
      <button
        class="nav-btn"
        @click="$router.push({ name: 'Register' })"
      >
        Registro
      </button>
      <button
        class="logout-btn"
        @click="logout"
      >
        Cerrar Sesión
      </button>
    </header>

    <!-- Contenido principal -->
    <main class="main">
      <!-- Listado de plazas -->
      <section class="section">
        <h2>Plaza de Servicio</h2>
        <TableComponent
          :headers="plazasHeaders"
          :data="plazasData"
        />
      </section>

      <!-- Oficio de Comisión -->
      <section class="section">
        <div class="section-header">
          <h2>Oficio de Comisión</h2>
          <button
            class="section-btn"
            @click="openModal('oficio')"
          >
            +
          </button>
        </div>
        <TableComponent
          :headers="oficioHeaders"
          :data="oficioData"
          :actions="true"
        />
      </section>

      <!-- Reportes parciales -->
      <section class="section">
        <div class="section-header">
          <h2>Reportes Parciales</h2>
          <button
            class="section-btn"
            @click="openModal('bimestral')"
          >
            +
          </button>
        </div>
        <TableComponent
          :headers="reportesHeaders"
          :data="reportesData"
          :actions="true"
        />
      </section>

      <!-- Reporte Final -->
      <section class="section">
        <div class="section-header">
          <h2>Reporte Final</h2>
          <button
            class="section-btn"
            @click="openModal('final')"
          >
            +
          </button>
        </div>
        <TableComponent
          :headers="rpHeaders"
          :data="rpData"
          :actions="true"
        />
      </section>
    </main>

    <!-- Modal -->
    <ModalComponent
      v-if="isModalVisible"
      :show="isModalVisible"
      @close="closeModal"
    >
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div v-if="modalType === 'oficio'">
            <h3>Formulario de Oficio de Comisión</h3>
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
          </div>

          <div v-if="modalType === 'bimestral'">
            <h3>Formulario de Reporte Bimestral</h3>
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
          </div>

          <div v-if="modalType === 'final'">
            <h3>Formulario de Reporte Final</h3>
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
          </div>

          <button type="submit">
            Enviar
          </button>
        </form>
      </div>
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
      isModalVisible: false,
      modalType: '', // 'bimestral' o 'final'
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
    openModal(type: string) {
      this.modalType = type
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
      this.modalType = ''
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

/* Contenedor principal */
.main {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
  border-bottom: 1px solid #cccccc; /* Línea divisoria en el título */
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
