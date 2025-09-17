<template>
  <div>
    <!-- Header Section -->
    <h1 class="text-2xl font-bold mb-4">
      {{ title }}
    </h1>

    <!-- Search and Actions Section -->
    <div class="flex gap-2">
      <input
        :id="searchId"
        :value="searchValue"
        type="text"
        :placeholder="searchPlaceholder"
        class="input input-bordered w-full"
        @input="handleSearchInput"
      >
      <slot name="actions" />
    </div>

    <!-- Modal Section -->
    <slot name="modal" />

    <!-- Divider -->
    <div class="divider divider-vertical my-2" />

    <!-- Main Content (Table) -->
    <slot name="content" />

    <!-- Pagination Section -->
    <div
      v-if="showPagination"
      class="join flex justify-center mt-4"
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
  title: string
  searchValue?: string
  searchPlaceholder?: string
  searchId?: string
  currentPage: number
  totalPages: number
  showPagination?: boolean
}

interface ListLayoutEmits {
  'search-input': [event: Event]
  'previous-page': []
  'next-page': []
}

withDefaults(defineProps<ListLayoutProps>(), {
  searchValue: undefined,
  searchPlaceholder: 'Buscar...',
  searchId: 'search',
  showPagination: true
})

const emit = defineEmits<ListLayoutEmits>()

const handleSearchInput = (event: Event) => {
  emit('search-input', event)
}

const handlePreviousPage = () => {
  emit('previous-page')
}

const handleNextPage = () => {
  emit('next-page')
}
</script>
