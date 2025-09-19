<template>
  <form
    class="flex flex-col gap-4 w-96"
    @submit.prevent="handleSubmit"
  >
    <h2 class="text-lg font-semibold mb-2">
      {{ title }}
    </h2>
    <AtomsInputText
      id="vacancy-name"
      v-model="form.name"
      label="Nombre de la plaza"
      type="text"
      placeholder="Nombre de la plaza"
      :disabled="pending"
      required
    />
    <AtomsTextArea
      id="vacancy-description"
      v-model="form.description"
      label="Descripción"
      placeholder="Descripción de la plaza"
      :rows="3"
      :disabled="pending"
      required
    />
    <AtomsInputText
      id="vacancy-slots"
      v-model="form.slots"
      label="Plazas disponibles"
      type="number"
      placeholder="Número de plazas"
      min="1"
      :disabled="pending"
      required
    />
    <div
      v-if="showDepartmentField && 'departmentId' in form"
      class="form-control"
    >
      <label
        for="vacancy-department"
        class="label"
      >
        <span class="label-text">Departamento</span>
      </label>
      <AtomsSelect
        id="vacancy-department"
        v-model="form.departmentId"
        :disabled="pending || departmentsPending"
        :options="departmentOptions"
        placeholder="Seleccionar departamento"
      />
    </div>
    <div
      v-if="showCycleField && 'cycleId' in form"
      class="form-control"
    >
      <label
        for="vacancy-cycle"
        class="label"
      >
        <span class="label-text">Ciclo</span>
      </label>
      <AtomsSelect
        id="vacancy-cycle"
        v-model="form.cycleId"
        :disabled="pending || cyclesPending"
        :options="cycleOptions"
        placeholder="Seleccionar ciclo"
      />
    </div>
    <div
      v-if="showStatusField"
      class="form-control"
    >
      <label
        for="vacancy-status"
        class="label"
      >
        <span class="label-text">Estado</span>
      </label>
      <AtomsSelect
        id="vacancy-status"
        v-model="form.disabled"
        :disabled="pending"
        :options="[
          { value: false, label: 'Activa' },
          { value: true, label: 'Inactiva' }
        ]"
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary w-full"
      :disabled="pending || !isFormValid"
    >
      <span
        v-if="pending"
        class="loading loading-spinner loading-sm"
      />
      {{ pending ? loadingText : submitText }}
    </button>
  </form>
</template>

<script setup lang="ts" generic="T extends CreateVacancy | UpdateVacancy">
import type { CreateVacancy, UpdateVacancy } from '~/types/api/vacancy'
import type { Department } from '~/types/api/department'
import type { Cycle } from '~/types/api/cycle'

interface Props {
  modelValue: T
  pending?: boolean
  title?: string
  submitText?: string
  loadingText?: string
  showStatusField?: boolean
  showDepartmentField?: boolean
  showCycleField?: boolean
  departments?: Department[]
  cycles?: Cycle[]
  departmentsPending?: boolean
  cyclesPending?: boolean
}

interface Emits {
  'update:modelValue': [value: CreateVacancy | UpdateVacancy]
  submit: [value: T]
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  title: 'Crear plaza',
  submitText: 'Crear plaza',
  loadingText: 'Creando...',
  showStatusField: false,
  showDepartmentField: true,
  showCycleField: true,
  departments: () => [],
  cycles: () => [],
  departmentsPending: false,
  cyclesPending: false
})

const emit = defineEmits<Emits>()

const form = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

// Convert departments to select options
const departmentOptions = computed(() => {
  return props.departments.map(department => ({
    value: department.id,
    label: department.name
  }))
})

// Convert cycles to select options
const cycleOptions = computed(() => {
  return props.cycles.map(cycle => ({
    value: cycle.id,
    label: cycle.slug + (cycle.isCurrent ? ' (Actual)' : '')
  }))
})

const isFormValid = computed(() => {
  const baseValid = form.value.name.trim() !== ''
    && form.value.description.trim() !== ''
    && form.value.slots > 0

  // Type assertion to check if the form has departmentId and cycleId (CreateVacancy case)
  const hasIds = 'departmentId' in form.value && 'cycleId' in form.value
  const departmentValid = !props.showDepartmentField || !hasIds || (form.value as CreateVacancy).departmentId > 0
  const cycleValid = !props.showCycleField || !hasIds || (form.value as CreateVacancy).cycleId > 0

  return baseValid && departmentValid && cycleValid
})

const handleSubmit = () => {
  if (!isFormValid.value) {
    return
  }
  emit('submit', form.value)
}
</script>
