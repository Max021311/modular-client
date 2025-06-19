<template>
  <div id="selection-page">
    <!----- Contenido principal ----->
    <main class="flex flex-col gap-6 px-10 py-8">
      <!-- Tarjeta de Introducción -->
      <card class="card bg-base-400 rounded-lg shadow-md">
        <template #title>
          <div class="flex items-center space-x-3">
            <span class="text-2xl font-semibold text-primary">
              Bienvenid@ a la Selección para realizar tu Servicio Social 👋
            </span>
          </div>
        </template>
        <template #content>
          <p class="mt-2 space-y-1">
            En esta sección podrás <strong>agendar tu lugar de servicio social</strong> en la propuesta que más
            se adapte a tu perfil. Recuerda que <strong>solo puedes tener una vacante activa a la vez</strong>, así
            que elige con calma.
          </p>
          <p class="text-sm mt-2">
            Utiliza los filtros para buscar por área, entidad receptora, proyecto o turno, y haz clic en “Detalles”
            si quieres conocer más información acerca de una oferta y cuando estés listo selecciona una oferta haciendo
            click en "Registrarme".
          </p>
        </template>
      </card>

      <!-- Tarjeta de Filtros -->
      <card class="bg-base-200 border border-base-300 rounded-lg shadow-md">
        <template #title>
          <h2 class="text-xl font-semibold">
            Filtrar Proyectos
          </h2>
        </template>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Filtros -->
            <div>
              <label class="block mb-1 font-medium">Área</label>
              <select
                v-model="filters.area"
                class="select select-bordered w-full"
              >
                <option value="">
                  Todas
                </option>
                <option
                  v-for="a in areas"
                  :key="a"
                  :value="a"
                >
                  {{ a }}
                </option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium">Entidad Receptora</label>
              <select
                v-model="filters.entity"
                class="select select-bordered w-full"
              >
                <option value="">
                  Todas
                </option>
                <option
                  v-for="e in entities"
                  :key="e"
                  :value="e"
                >
                  {{ e }}
                </option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium">Proyecto</label>
              <input
                v-model="filters.project"
                type="text"
                placeholder="Buscar proyecto"
                class="input input-bordered w-full"
              >
            </div>
            <div>
              <label class="block mb-1 font-medium">Turno</label>
              <select
                v-model="filters.shift"
                class="select select-bordered w-full"
              >
                <option value="">
                  Cualquiera
                </option>
                <option>Matutino</option>
                <option>Vespertino</option>
                <option>Mixto</option>
              </select>
            </div>
          </div>
          <div class="text-right mt-4">
            <button
              class="btn btn-primary"
              @click="applyFilters"
            >
              Aplicar Filtros
            </button>
          </div>
        </template>
      </card>

      <!-- Listado de Proyectos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <card
          v-for="proj in filteredProjects"
          :key="proj.id"
          class="bg-base-100 shadow-md rounded-lg overflow-hidden"
        >
          <template #title>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold">
                {{ proj.name }}
              </h3>
              <span class="badge badge-secondary">{{ proj.area }}</span>
            </div>
          </template>
          <template #content>
            <p class="text-sm mb-2">
              <strong>Entidad:</strong> {{ proj.entity }}
            </p>
            <p class="text-sm mb-2">
              <strong>Turno:</strong> {{ proj.shift }}
            </p>
            <p class="text-sm mb-2">
              <strong>Duración:</strong> {{ proj.start }} – {{ proj.end }}
            </p>
            <p class="text-sm mb-4">
              {{ proj.description }}
            </p>
            <div class="flex gap-2">
              <button
                class="btn btn-outline btn-sm flex-1"
                @click="openProjectModal(proj)"
              >
                Detalles
              </button>
              <button
                class="btn btn-primary btn-sm flex-1"
                @click="register(proj.id)"
              >
                Registrarme
              </button>
            </div>
          </template>
        </card>
      </div>

      <!-- Modal de Detalles del Proyecto -->
      <ModalComponent
        v-model="isModalOpen"
        modal-class="w-11/12 max-w-3xl"
      >
        <div>
          <h3 class="text-lg font-bold text-center mb-4">
            Detalles del Proyecto
          </h3>
          <div
            v-if="selectedProject"
            class="space-y-2"
          >
            <p><strong>Nombre:</strong> {{ selectedProject.name }}</p>
            <p><strong>Área:</strong> {{ selectedProject.area }}</p>
            <p><strong>Entidad:</strong> {{ selectedProject.entity }}</p>
            <p><strong>Turno:</strong> {{ selectedProject.shift }}</p>
            <p><strong>Duración:</strong> {{ selectedProject.start }} – {{ selectedProject.end }}</p>
            <p><strong>Descripción:</strong> {{ selectedProject.description }}</p>
            <p><strong>Requisitos:</strong> {{ selectedProject.requirements }}</p>
            <p><strong>Contacto:</strong> {{ selectedProject.contact }}</p>
          </div>
        </div>
      </ModalComponent>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const areas = ['Administración', 'Comunicación', 'Sistemas', 'Salud', 'Educación', 'Cultura', 'Medio ambiente']
const entities = ['Unidad Administrativa', 'Centro de Salud', 'Museo Cultural', 'ONG Ambiental']
const projects = ref([
  {
    id: 1,
    name: 'Apoyo Administrativo',
    area: 'Administración',
    entity: 'Unidad Administrativa',
    shift: 'Matutino',
    start: '04/03/2024',
    end: '06/09/2024',
    description: 'Colabora en la gestión de archivos y coordinación de eventos.',
    requirements: 'Conocimiento básico de Office, disponibilidad de 20h/semana',
    contact: 'contacto@uni.edu.mx'
  }
])

const filters = reactive({ area: '', entity: '', project: '', shift: '' })
const filteredProjects = computed(() => projects.value.filter(p =>
  (!filters.area || p.area === filters.area)
  && (!filters.entity || p.entity === filters.entity)
  && (!filters.shift || p.shift === filters.shift)
  && (!filters.project || p.name.toLowerCase().includes(filters.project.toLowerCase()))
))

const isModalOpen = ref(false)
const selectedProject = ref(null)

function applyFilters() {
  // lógica para aplicar filtros
}
function register(id) {
  console.log('Registrarse al proyecto', id)
}
function openProjectModal(proj) {
  selectedProject.value = proj
  isModalOpen.value = true
}
</script>
