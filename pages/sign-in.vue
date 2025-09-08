<template>
  <div id="sign-in">
    <main>
      <div class="hero min-h-screen">
        <div class="hero-content flex-col">
          <div class="card bg-base-300 text-base-content w-full max-w-sm shadow-2xl">
            <h2 class="text-3xl font-bold text-base-content text-center mt-7">
              Iniciar Sesión
            </h2>
            <form
              class="card-body"
              @submit.prevent="handleSubmit"
            >
              <div class="form-control">
                <select
                  v-model="type"
                  class="select"
                >
                  <option
                    disabled
                    selected
                    value=""
                  >
                    Escoge un tipo
                  </option>
                  <option value="user">
                    Administrativo
                  </option>
                  <option value="student">
                    Estudiante
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label
                  for="user"
                  class="input font-bold input-bordered flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70"
                  >
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                    />
                  </svg>
                  <input
                    id="user"
                    v-model="user"
                    type="email"
                    placeholder="Correo"
                    class="grow"
                    required
                  >
                </label>
              </div>
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
              <div class="form-control mt-6">
                <button
                  type="submit"
                  class="btn btn-primary w-full font-bold"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
            <div class="text-center mt-4">
              <p>No tienes cuenta?</p>
              <nuxt-link
                to="/register"
                class="link link-primary"
              >
                Registro
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { isAxiosError } from 'axios'
import { useLoginStore } from '~/stores/login'
import { useNotificationStore } from '~/stores/notification'
// Reactive variables for form inputs

definePageMeta({
  auth: 'public'
})

const route = useRoute()

const loginStore = useLoginStore()
const notification = useNotificationStore()
const user = ref('')
const password = ref('')
const type = ref('')

// Handle form submission
const handleSubmit = async () => {
  try {
    if (type.value === 'user') {
      await loginStore.loginAsAdministrativeUser(user.value, password.value)
    } else {
      await loginStore.loginAsStudentUser(user.value, password.value)
    }
    if (route.query.redirect_to) {
      navigateTo(route.query.redirect_to as string)
    } else {
      navigateTo('/')
    }
  } catch (error) {
    const statusCode = isAxiosError(error) ? error.response?.status : null
    const message = {
      title: 'Intentelo de nuevo mas tarde',
      description: 'Si el problema persiste contacta a soporte'
    }
    switch (statusCode) {
      case 401:
        message.title = 'Contraseña o correo equivocado'
        break
      case 500:
        message.title = 'Ha sucedido un problema en el servidor'
        message.description = 'Intentelo de nuevo mas tarde. Si el problema persiste contacta a soporte'
        break
    }
    notification.add({
      ...message,
      type: 'error'
    })
    console.error(error)
  }
}
</script>

  <style scoped>
  /* Botón */
  button {
    font-size: 16px;
  }
  </style>
