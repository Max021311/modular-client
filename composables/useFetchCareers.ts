import type { H3Error } from 'h3'
import type { Career } from '~/types/api/career.d'
import { useRuntimeConfig } from '#imports'
import type { FastifyError } from '~/types/api/error.d'

export const useFetchCareers = () => {
  const config = useRuntimeConfig()

  const { data, status, error, refresh, pending } = useFetch<Career[], H3Error<FastifyError>>('/careers', {
    baseURL: config.public.serverHost,
    key: 'careers-list'
  })

  return {
    data,
    status,
    error,
    pending,
    refresh
  }
}
