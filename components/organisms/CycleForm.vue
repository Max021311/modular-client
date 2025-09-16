<template>
  <form
    class="flex flex-col gap-4 w-96"
    @submit.prevent="handleSubmit"
  >
    <h2 class="text-lg font-semibold mb-2">
      {{ title }}
    </h2>
    <AtomsInputText
      id="cycle-slug"
      v-model="form.slug"
      label="Nombre del ciclo"
      type="text"
      placeholder="Ej: 2024A, 2024B"
      required
    />
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">¿Es el ciclo actual?</span>
        <input
          v-model="form.isCurrent"
          type="checkbox"
          class="checkbox"
        >
      </label>
    </div>
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
import type { CreateCycle } from '~/types/api/cycle'

interface Props {
  modelValue: CreateCycle
  pending?: boolean
  title?: string
  submitText?: string
  loadingText?: string
}

interface Emits {
  (e: 'update:modelValue' | 'submit', value: CreateCycle): void
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  title: 'Crear ciclo',
  submitText: 'Crear ciclo',
  loadingText: 'Creando...'
})

const emit = defineEmits<Emits>()

const form = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const handleSubmit = () => {
  if (!form.value.slug) {
    return
  }
  emit('submit', form.value)
}
</script>
