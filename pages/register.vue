<template>
  <div id="register-page">
    <!----- Contenido Principal ----->
    <main class="flex justify-center items-center min-h-screen bg-base-200">
      <div class="hero min-h-screen">
        <!----- Tarjeta del Formulario ----->
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card bg-base-300 text-base-content w-full max-w-sm shadow-2xl">
            <h2 class="text-3xl font-bold text-base-content text-center mt-7">
              Registrarse
            </h2>
            <form
              class="card-body"
              @submit.prevent="register"
            >
              <!----- Campo de Usuario ----->
              <div>
                <div class="form-control">
                  <label
                    for="username"
                    class="input font-bold input-bordered flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="h-4 w-4 opacity-70"
                    >
                      <path
                        d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm3.5 11.5a3.5 3.5 0 1 1-7 0v-1a3.5 3.5 0 1 1 7 0Zm-3.5-6a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 8.5 5.5Z"
                      />
                    </svg>
                    <input
                      id="username"
                      v-model="email"
                      type="text"
                      placeholder="Nombre"
                      class="grow"
                      required
                    >
                  </label>
                </div>
              </div>
              <!----- Campo de Correo ----->
              <div class="form-control">
                <label
                  for="email"
                  class="input font-bold input-bordered flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70"
                  >
                    <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.424.1.631 0l6.598-3.185A.755.755 0 0 1 15 4.793V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                    />
                    <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                    />
                  </svg>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Correo electrónico"
                    class="grow"
                    required
                  >
                </label>
              </div>
              <!----- Campo de Contraseña ----->
              <div class="form-control">
                <label
                  for="password"
                  class="input font-bold input-bordered flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    placeholder="Contraseña"
                    class="grow"
                    required
                  >
                </label>
              </div>
              <!-- Botón Registrar -->
              <div class="form-control mt-6">
                <button
                  type="submit"
                  class="btn btn-primary w-full font-bold"
                >
                  Registrarse
                </button>
              </div>

              <!-- Mensaje de error -->
              <p
                v-if="error"
                class="text-error mt-4 text-center"
              >
                {{ error }}
              </p>

              <!-- Link a login -->
              <div class="text-center mt-4">
                <p>¿Tienes una cuenta?</p>
                <nuxt-link
                  to="/sign-in"
                  class="link link-primary"
                >
                  Iniciar sesión
                </nuxt-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return { email: '', password: '', error: null }
  },
  methods: {
    register() {
      // Basic validation
      if (!this.email || !this.password) {
        // this.error = 'Please enter both username and password'
        return
      }
      // For now, just simulate a successful registration and redirect
      console.log('Registering user:', this.email)
      this.error = null // Clear any previous errors
      this.$router.push('/sign-in')
    }
  }
}
</script>

<style scoped>
/* Add any specific styles here */
/* Botón */
  button {
    font-size: 16px;
  }
</style>
