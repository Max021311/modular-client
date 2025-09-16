import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { Cycle } from '~/types/api/cycle.d'
import { useRuntimeConfig } from '#imports'
import { useLoginStore } from '~/stores/login'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchCyclesParams {
  search?: MaybeRef<string | undefined>
  limit?: MaybeRef<number>
  offset?: MaybeRef<number>
  order?: MaybeRef<string>
}

interface FetchCyclesResponse {
  total: number
  records: Cycle[]
}

export const useFetchCyclesKey = 'cycles-list'

export const useFetchCycles = (params: UseFetchCyclesParams = {}) => {
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const {
    search = undefined,
    limit = 50,
    offset = 0,
    order = '-Cycles.createdAt'
  } = params

  const query = computed(() => ({
    search: unref(search),
    limit: unref(limit),
    offset: unref(offset),
    order: unref(order)
  }))

  const { data, status, error, refresh, pending } = useFetch<FetchCyclesResponse, H3Error<FastifyError>>('/cycles', {
    baseURL: config.public.serverHost,
    headers: {
      Authorization: `Bearer ${loginStore.token}`
    },
    query,
    key: useFetchCyclesKey
  })

  const cycles = computed(() => data.value?.records ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const pages = computed(() => Math.ceil(total.value / unref(limit)))

  return {
    // Data
    data,
    cycles,
    total,
    pages,

    // State
    status,
    error,
    pending,

    // Actions
    refresh
  }
}
