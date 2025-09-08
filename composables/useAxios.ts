import { useNuxtApp } from '#imports'

function useAxios() {
  return useNuxtApp().$axios
}

export default useAxios
