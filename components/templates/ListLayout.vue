<template>
  <div class="space-y-4">
    <!-- Header Section -->
    <h1
      v-if="title && title.length > 0"
      class="text-2xl font-bold"
    >
      {{ title }}
    </h1>

    <!-- Actions Section (Search + Buttons) -->
    <div class="flex gap-2">
      <slot name="actions" />
    </div>

    <!-- Modal Section -->
    <slot name="modal" />

    <!-- Divider -->
    <div
      v-if="showDivider"
      class="divider divider-vertical"
    />

    <!-- Main Content (Table) -->
    <slot name="content" />

    <!-- Pagination Section -->
    <div
      v-if="showPagination"
      class="join flex justify-center"
    >
      <button
        :disabled="currentPage <= 1 || currentPage > totalPages"
        class="join-item btn"
        @click="handlePreviousPage"
      >
        «
      </button>
      <button class="join-item btn">
        Página {{ currentPage }}
      </button>
      <button
        :disabled="currentPage >= totalPages || currentPage < 1"
        class="join-item btn"
        @click="handleNextPage"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ListLayoutProps {
  title?: string
  currentPage: number
  totalPages: number
  showPagination?: boolean
  showDivider?: boolean
}

interface ListLayoutEmits {
  'previous-page': []
  'next-page': []
}

withDefaults(defineProps<ListLayoutProps>(), {
  showPagination: true,
  showDivider: true
})

const emit = defineEmits<ListLayoutEmits>()

const handlePreviousPage = () => {
  emit('previous-page')
}

const handleNextPage = () => {
  emit('next-page')
}
</script>
