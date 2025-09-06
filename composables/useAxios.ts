import Axios from 'axios'
import { useRuntimeConfig } from '#imports'

function useAxios() {
  const runtimeConfig = useRuntimeConfig()
  const axios = Axios.create({
    baseURL: runtimeConfig.public.serverHost,
  })
  return axios
}

export default useAxios
