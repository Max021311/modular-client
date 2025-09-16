<template>
  <form
    class="flex flex-col gap-4 w-96"
    @submit.prevent="handleSubmit"
  >
    <h2 class="text-lg font-semibold mb-2">
      {{ title }}
    </h2>
    <AtomsInputText
      id="department-name"
      v-model="form.name"
      label="Nombre del departamento"
      type="text"
      placeholder="Nombre del departamento"
      required
    />
    <AtomsInputText
      id="department-address"
      v-model="form.address"
      label="Dirección"
      type="text"
      placeholder="Dirección del departamento"
      required
    />
    <AtomsInputText
      id="department-phone"
      v-model="form.phone"
      label="Teléfono"
      type="tel"
      placeholder="Teléfono del departamento"
      required
    />
    <AtomsInputText
      id="department-email"
      v-model="form.email"
      label="Correo electrónico"
      type="email"
      placeholder="email@departamento.com"
      required
    />
    <AtomsInputText
      id="department-chief"
      v-model="form.chiefName"
      label="Nombre del jefe"
      type="text"
      placeholder="Nombre del jefe del departamento"
      required
    />
    <button
      type="submit"
      class="btn btn-primary w-full"
      :disabled="pending"
    >
      <span
        v-if="pending"
        class="loading loading-spinner loading-sm"
      />
      {{ pending ? loadingText : submitText }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { CreateDepartment } from '~/types/api/department'

interface Props {
  modelValue: CreateDepartment
  pending?: boolean
  title?: string
  submitText?: string
  loadingText?: string
}

interface Emits {
  (e: 'update:modelValue' | 'submit', value: CreateDepartment): void
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  title: 'Crear departamento',
  submitText: 'Crear departamento',
  loadingText: 'Creando...'
})

const emit = defineEmits<Emits>()

const form = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const handleSubmit = () => {
  if (!form.value.name || !form.value.address || !form.value.phone || !form.value.email || !form.value.chiefName) {
    return
  }
  emit('submit', form.value)
}
</script>
