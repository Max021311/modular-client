<template>
  <form
    class="flex flex-col gap-4 w-96"
    @submit.prevent="handleSubmit"
  >
    <h2 class="text-lg font-semibold mb-2">
      {{ title }}
    </h2>
    <AtomsInputText
      id="career-name"
      v-model="form.name"
      label="Nombre de la carrera"
      type="text"
      placeholder="Ej: Ingeniería en Sistemas"
      required
    />
    <AtomsInputText
      id="career-slug"
      v-model="form.slug"
      label="Slug de la carrera"
      type="text"
      placeholder="Ej: ingenieria-sistemas"
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
import type { CreateCareer } from '~/types/api/career'

interface Props {
  modelValue: CreateCareer
  pending?: boolean
  title?: string
  submitText?: string
  loadingText?: string
}

interface Emits {
  (e: 'update:modelValue' | 'submit', value: CreateCareer): void
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  title: 'Crear carrera',
  submitText: 'Crear carrera',
  loadingText: 'Creando...'
})

const emit = defineEmits<Emits>()

const form = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const handleSubmit = () => {
  if (!form.value.name || !form.value.slug) {
    return
  }
  emit('submit', form.value)
}
</script>
