import type { MaybeRef } from 'vue'
import type { H3Error } from 'h3'
import type { Career } from '~/types/api/career.d'
import { useRuntimeConfig } from '#imports'
import type { FastifyError } from '~/types/api/error.d'

interface UseFetchCareersParams {
  search?: MaybeRef<string | undefined>
  order?: MaybeRef<string>
}

export const key = 'careers-list'

export const useFetchCareers = (params: UseFetchCareersParams = {}) => {
  const config = useRuntimeConfig()

  const {
    search = undefined,
    order = '-Careers.createdAt'
  } = params

  const query = computed(() => ({
    search: unref(search),
    order: unref(order)
  }))

  const { data, status, error, refresh, pending } = useFetch<Career[], H3Error<FastifyError>>('/careers', {
    baseURL: config.public.serverHost,
    key,
    query
  })

  return {
    data,
    status,
    error,
    pending,
    refresh
  }
}
