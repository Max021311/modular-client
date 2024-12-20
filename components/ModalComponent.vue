<template>
  <!-- You can open the modal using ID.showModal() method -->
  <dialog
    ref="dialog"
    class="modal"
    @close="close"
  >
    <div class="modal-box">
      <button
        class="btn btn-xs btn-circle btn-ghost absolute right-2 top-2"
        @click="close"
      >
        ✕
      </button>
      <slot />
    </div>
  </dialog>
</template>

<script setup lang="ts">
const dialogRef = useTemplateRef('dialog')
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

watchEffect(() => {
  const dialog = unref(dialogRef)
  if (dialog === null) return
  if (props.modelValue) {
    dialog.showModal()
  } else (
    dialog.close()
  )
})

function close() {
  emit('update:modelValue', false)
}
</script>
