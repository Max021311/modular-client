<template>
  <label class="form-control w-full">
    <div
      class="label"
    >
      <span class="label-text">
        {{ label }}
      </span>
    </div>
    <input
      :id="id"
      ref="inputRef"
      v-model="model"
      class="input input-bordered w-full"
      :type="type"
      :pattern="pattern"
      :placeholder="placeholder"
      :required="required"
      @change="emit('change', model)"
    >
    <div
      v-if="helperText && helperText.length > 0"
      class="label"
      :class="{ 'text-error': error }"
    >
      <div class="flex items-center gap-1">
        <AtomsIconMicroError v-if="error" />
        <span
          class="label-text-alt"
          :class="{ 'text-error': error }"
        >
          {{ helperText }}
        </span>
      </div>
    </div>
  </label>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { InputHTMLAttributes } from 'vue'

const model = defineModel<T>({
  required: true
})

const emit = defineEmits<{
  (e: 'change', value: T): void
}>()

defineProps<{
  id: string
  label: string
  type: InputHTMLAttributes['type']
  pattern?: string
  placeholder?: string
  required?: boolean
  error?: boolean
  helperText?: string
}>()
</script>
