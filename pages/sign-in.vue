<template>
  <div id="sign-in">
    <!----- Contenido Principal ----->
    <main class="flex justify-center items-center min-h-screen bg-base-200">
      <div class="hero min-h-screen">
        <!----- Tarjeta del Formulario ----->
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card bg-base-300 text-base-content w-full max-w-sm shadow-2xl">
            <h2 class="text-3xl font-bold text-base-content text-center mt-7">
              Iniciar Sesión
            </h2>
            <form
              class="card-body"
              @submit.prevent="handleSubmit"
            >
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

              <!----- Botón de Iniciar Sesión ----->
              <div class="form-control mt-6">
                <button
                  type="submit"
                  class="btn btn-primary w-full font-bold"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>

            <!----- Enlace para recuperar contraseña (No es funcional) ----->
            <div class="text-center mt-4">
              <nuxt-link
                to="/recover-password"
                class="link link-primary"
              >
                Olvidé mi contraseña
              </nuxt-link>
              <!-- Link a login -->
              <div class="text-center mt-4">
                <p>¿No tienes una cuenta?</p>
                <nuxt-link
                  to="/register"
                  class="link link-primary"
                >
                  Registrarse
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Reactive variables for form inputs
import { ref } from 'vue'

const email = ref('')
const password = ref('')

// Nuxt router for navigation
const router = useRouter()

// Handle form submission
const handleSubmit = () => {
  console.log('handleSubmit called!')
  console.log('Email:', email.value)
  console.log('Password:', password.value)

  // Placeholder logic: assume admin if usercode is "admin" and password is "1234"
  if (email.value === 'admin@admin' && password.value === '1234') {
    // Redirect to admin page
    router.push('/admin')
  } else {
    // Redirect to user index page
    router.push('/')
  }
}
</script>

  <style scoped>
  /* Botón */
  button {
    font-size: 16px;
  }
  </style>
