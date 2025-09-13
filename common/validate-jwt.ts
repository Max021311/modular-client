import { jwtDecode } from 'jwt-decode'
import getTimeInSeconds from './get-time-in-seconds'

function validateJWT(jwt: string | null) {
  if (!jwt) {
    return false
  }
  const { exp = -Infinity } = jwtDecode(jwt)
  const today = getTimeInSeconds()
  return exp > today
}
export default validateJWT
