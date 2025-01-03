<template>
  <div id="main-page">
    <!----- Contenido principal ----->
    <main class="flex flex-col gap-4 px-10">
      <!------ Plaza de Servicio ----->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Plaza de Servicio
            </span>
            <button
              class="btn btn-primary btn-sm"
              @click="openModal('service')"
            >
              Ver Detalles
            </button>
          </div>
        </template>
        <template #content>
          <!-- Información de la Plaza -->
          <section class="flex flex-col gap-4">
            <!-- Tarjeta de Información -->
            <div
              class="card bg-base-300 shadow-md w-full p-4"
            >
              <div class="card-body flex flex-col md:flex-row justify-between items-start md:items-center">
                <!-- Detalles principales -->
                <div class="flex-1">
                  <p><strong>No:</strong> 789/2024A</p>
                  <p><strong>Estatus:</strong> FINALIZADO</p>
                  <p><strong>Dependencia:</strong> Unidad Administrativa</p>
                  <p><strong>Programa:</strong> Apoyo Administrativo</p>
                </div>

                <!-- Detalles adicionales -->
                <div class="flex-1">
                  <p><strong>Fecha de Inicio:</strong> 04/03/2024</p>
                  <p><strong>Fecha de Finalización:</strong> 06/09/2024</p>
                  <p><strong>Tiempo Reportado:</strong> 480 horas</p>
                </div>
              </div>
            </div>
          </section>
        </template>
      </card>

      <!----- Oficio de Comisión ----->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Oficio de Comisión
            </span>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                class="btn btn-activate btn-sm"
                @click="generatePDF"
              >
                Generar PDF
              </button>
              <button
                type="button"
                class="btn btn-activate btn-sm"
                @click="uploadPDF"
              >
                Cargar PDF
              </button>
              <button
                class="btn btn-primary btn-sm"
                @click="openModal('office')"
              >
                Crear Oficio
              </button>
            </div>
          </div>
        </template>
        <template #content>
          <section class="flex flex-col gap-4">
            <div class="card bg-base-300 shadow-md w-full p-4">
              <div class="card-body flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="flex-1">
                  <p><strong>No:</strong> 101/02/2024</p>
                  <p><strong>Fecha de Inicio:</strong> 04/03/2024</p>
                  <p><strong>Dependencia:</strong> Unidad Administrativa</p>
                </div>
                <div class="flex-1">
                  <p><strong>Programa:</strong> Programa A</p>
                  <p><strong>Estatus:</strong> VALIDADO</p>
                </div>
              </div>
            </div>
          </section>
        </template>
      </card>

      <!----- Reportes Parciales ----->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Reportes Parciales
            </span>
            <button
              class="btn btn-primary btn-sm"
              @click="openModal('bimester-report')"
            >
              Crear Reporte
            </button>
          </div>
        </template>
        <template #content>
          <section class="flex flex-col gap-4">
            <div class="card bg-base-300 shadow-md w-full p-4">
              <div class="card-body flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="flex-1">
                  <p><strong>No:</strong> 1</p>
                  <p><strong>Fecha de Creación:</strong> 05/05/2024</p>
                  <p><strong>Horas:</strong> 160</p>
                </div>
                <div class="flex-1">
                  <p><strong>Bimestre Reportado:</strong> 04/03/2024 - 05/05/2024</p>
                  <p><strong>Estatus del Reporte:</strong> VALIDADO</p>
                </div>
              </div>
            </div>
          </section>
        </template>
      </card>

      <!----- Reporte Final ----->
      <card>
        <template #title>
          <div class="flex w-full justify-between items-center">
            <span class="text-center">
              Reporte Final
            </span>
            <button
              class="btn btn-primary btn-sm"
              @click="openModal('final-report')"
            >
              Crear Reporte
            </button>
          </div>
        </template>
        <template #content>
          <section class="flex flex-col gap-4">
            <div class="card bg-base-300 shadow-md w-full p-4">
              <div class="card-body flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="flex-1">
                  <p><strong>Fecha de Creación:</strong> 05/05/2024</p>
                  <p><strong>Período de Servicio:</strong> 04/03/2024 - 06/09/2024</p>
                </div>
                <div class="flex-1">
                  <p><strong>Horas Totales:</strong> 480</p>
                  <p><strong>Estatus del Reporte:</strong> VALIDADO</p>
                </div>
              </div>
            </div>
          </section>
        </template>
      </card>
    </main>

    <!----- Modal ----->
    <ModalComponent
      v-model="isModalOpen"
      modal-class="w-11/12 max-w-5xl"
    >
      <div>
        <!-- Título dinámico -->
        <h3 class="text-lg font-bold text-center">
          <span v-if="modalSection === 'service'">Detalles de Plaza</span>
          <span v-else-if="modalSection === 'office'">Formulario de Oficio de Comisión</span>
          <span v-else-if="modalSection === 'bimester-report'">Formulario de Reporte Bimestral</span>
          <span v-else-if="modalSection === 'final-report'">Formulario de Reporte Final</span>
        </h3>

        <!-- Contenido dinámico -->
        <div class="py-4">
          <div v-if="modalSection === 'service'">
            <!-- Información de Plaza -->
            <div class="flex flex-col gap-4">
              <div class="card bg-base-300 shadow-md w-full p-4">
                <div class="card-body flex flex-col md:flex-row justify-between items-start md:items-center">
                  <!-- Información principal -->
                  <div class="flex-1">
                    <p><strong>Nombre de la Plaza:</strong> Plaza Administrativa</p>
                    <p><strong>Ubicación:</strong> Unidad Administrativa</p>
                    <p><strong>Estatus:</strong> Activo</p>
                  </div>
                  <div class="flex-1">
                    <p><strong>Fecha de Inicio:</strong> 01/01/2025</p>
                    <p><strong>Fecha de Fin:</strong> 31/12/2025</p>
                  </div>
                </div>
              </div>
              <p>
                <!-- Información adicional, esta sección es opcional -->
                Esta plaza está enfocada en actividades administrativas que incluyen la gestión de archivos, apoyo en eventos y coordinación de recursos internos.
              </p>
            </div>
          </div>

          <!-- Oficio -->
          <div class="py-4">
            <form
              v-if="modalSection === 'office'"
              @submit.prevent="submitForm"
            >
              <p>
                Por favor, llena los siguientes campos para crear un oficio de comisión, llena con cuidado cada campo para evitar errores.
              </p>

              <label class="block">
                <span class="font-bold">Fecha de Inicio:</span>
                <input
                  v-model="formData.startDate"
                  type="date"
                  class="input input-bordered w-full mt-1"
                >
              </label>
              <label class="block mt-4">
                <span class="font-bold">Lugar de la Dependencia:</span>
                <input
                  v-model="formData.dependencia"
                  type="text"
                  placeholder="Ejemplo: Unidad Administrativa"
                  class="input input-bordered w-full mt-1"
                >
              </label>
              <button
                type="submit"
                class="btn btn-primary flex justify-center mx-auto mt-4"
              >
                Guardar
              </button>
            </form>

            <!-- Reportes -->
            <form
              v-else-if="modalSection === 'bimester-report'"
              @submit.prevent="submitForm"
            >
              <p>
                Por favor, llena los siguientes campos para crear un nuevo reporte bimestral, llena con cuidado cada campo para evitar errores.
              </p>
              <label class="block">
                <span class="font-bold">Período Reportado:</span>
                <div class="flex gap-2 mt-1">
                  <input
                    v-model="formData.startDate"
                    type="date"
                    class="input input-bordered w-full"
                  >
                  <span class="text-lg font-bold">-</span>
                  <input
                    v-model="formData.endDate"
                    type="date"
                    class="input input-bordered w-full"
                  >
                </div>
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Consideras que cumpliste con los objetivos propuestos?</span>
                <textarea
                  v-model="formData.activities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Qué habilidades crees que has mejorado durante tu servicio social?</span>
                <textarea
                  v-model="formData.activities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Qué aspectos fueron más satisfactorios de tu servicio social?</span>
                <textarea
                  v-model="formData.activities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Recomendarías esta institución para realizar el servicio social? ¿Por qué?</span>
                <textarea
                  v-model="formData.activities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Cuáles fueron las principales actividades que realizaste?</span>
                <textarea
                  v-model="formData.activities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <button
                type="submit"
                class="btn btn-primary flex justify-center mx-auto mt-4"
              >
                Crear
              </button>
            </form>

            <!-- Reporte Final -->
            <form
              v-else-if="modalSection === 'final-report'"
              @submit.prevent="submitForm"
            >
              <p>
                Por favor, llena los siguientes campos para crear el reporte final, llena con cuidado cada campo para evitar errores.
              </p>
              <label class="block">
                <span class="font-bold">Período del Servicio:</span>
                <div class="flex gap-2 mt-1">
                  <input
                    v-model="formData.startDate"
                    type="date"
                    class="input input-bordered w-full"
                  >
                  <span class="text-lg font-bold">-</span>
                  <input
                    v-model="formData.endDate"
                    type="date"
                    class="input input-bordered w-full"
                  >
                </div>
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Cuáles fueron las actividades más relevantes que realizaste?</span>
                <textarea
                  v-model="formData.relevantActivities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Qué habilidades profesionales desarrollaste durante tu servicio social?</span>
                <textarea
                  v-model="formData.relevantActivities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Cuáles fueron tus logros más importantes durante tu servicio?</span>
                <textarea
                  v-model="formData.relevantActivities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label class="block mt-4">
                <span class="font-bold">¿Qué recomendaciones harías a la institución?</span>
                <textarea
                  v-model="formData.relevantActivities"
                  class="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <button
                type="submit"
                class="btn btn-primary flex justify-center mx-auto mt-4"
              >
                Crear
              </button>
            </form>
          </div>
        </div>
      </div>
    </modalcomponent>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
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
    viewDetails() {
      console.log('Ver detalles de plaza:')
      // Lógica para mostrar detalles adicionales
    },
    openModal(section: string) {
      this.modalSection = section
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
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
}

.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

button[type="submit"] {
  transition: background-color 0.3s ease;
}
</style>
