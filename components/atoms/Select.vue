<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <select
      :id="id"
      :value="model"
      class="select select-bordered"
      :required="required"
      :error="error"
      @change="(event: Event) => {
        const target = event.target as HTMLSelectElement
        const value = target.value as T
        emit('update:modelValue', value)
        emit('change', value)
      }"
    >
      <option
        value=""
        disabled
        selected
      >{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="typeof option.value === 'boolean' ? option.value.toString() : option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
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

<script setup lang="ts" generic="T extends string | number | boolean">
const model = defineModel<T>({
  required: true
})

const emit = defineEmits<{
  (e: 'change', value: T): void
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  (e: 'update:modelValue', value: T): void
}>()

interface Option {
  value: T
  label: string
}

defineProps<{
  id: string
  label: string
  required?: boolean
  placeholder?: string
  options: Option[]
  error?: boolean
  helperText?: string
}>()
</script>
