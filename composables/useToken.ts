function useToken() {
  function setToken(token: string) {
    localStorage.setItem('token', token)
  }

  function getToken() {
    return localStorage.getItem('token')
  }

  return {
    setToken,
    getToken
  }
}

export default useToken