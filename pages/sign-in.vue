<template>
  <div id="sign-in">
    <div class="hero min-h-screen">
      <div class="hero-content flex-col">
        <div class="card bg-base-300 text-base-content w-full max-w-sm shadow-2xl">
          <h2 class="text-3xl font-bold text-base-content text-center mt-7">
            Iniciar Sesión
          </h2>
          <form
            class="card-body w-full min-w-[400px]"
            @submit.prevent="handleSubmit"
          >
            <AtomsSelect
              id="type"
              v-model="type"
              label="Tipo de usuario"
              :options="[
                { value: 'user', label: 'Administrativo' },
                { value: 'student', label: 'Alumno' }
              ]"
              placeholder="Escoge un tipo"
              required
            />
            <AtomsInputText
              id="user"
              v-model="user"
              label="Correo"
              type="email"
              placeholder="Correo"
              required
            />
            <AtomsInputText
              id="password"
              v-model="password"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              required
            />

            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary w-full font-bold"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
          <div class="text-center my-2">
            <nuxt-link
              to="/recover-password"
              class="link link-primary"
            >
              ¿Olvidaste tu contraseña?
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isAxiosError } from 'axios'
import { useLoginStore } from '~/stores/login'
import { useNotificationStore } from '~/stores/notification'

const route = useRoute()

const loginStore = useLoginStore()
const notification = useNotificationStore()
const user = ref('')
const password = ref('')
const type = ref('')

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
