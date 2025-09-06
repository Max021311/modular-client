import useToken from './useToken'
import { onMounted, navigateTo } from '#imports'

function useIsLogin() {
  const { getToken } = useToken()

  onMounted(() => {
    const token = getToken()

    if (token === null) navigateTo('/sign-in')
  })
}

export default useIsLogin