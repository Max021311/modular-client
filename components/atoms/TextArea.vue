<template>
  <label class="form-control w-full">
    <div
      class="label"
    >
      <span class="label-text">
        {{ label }}
      </span>
    </div>
    <textarea
      :id="id"
      ref="textareaRef"
      v-model="model"
      class="textarea textarea-bordered w-full"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :disabled="disabled"
      @change="emit('change', model)"
    />
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

<script setup lang="ts">
const model = defineModel<string>({
  required: true
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

defineProps<{
  id: string
  label: string
  placeholder?: string
  required?: boolean
  rows?: number
  disabled?: boolean
  error?: boolean
  helperText?: string
}>()
</script>
