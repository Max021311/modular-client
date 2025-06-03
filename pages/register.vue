<template>
  <div id="register-page">
    <!-- Contenido principal -->
    <main class="flex justify-center items-center min-h-screen bg-base-200">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-center justify-center">
            Registro
          </h2>
          <form @submit.prevent="register">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Usuario</span>
              </label>
              <input
                v-model="username"
                type="text"
                placeholder="Escribe tu usuario"
                class="input input-bordered"
              >
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Contraseña</span>
              </label>
              <input
                v-model="password"
                type="password"
                placeholder="Escribe tu contraseña"
                class="input input-bordered"
              >
            </div>
            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary"
              >
                Registrarse
              </button>
            </div>
          </form>
          <p
            v-if="error"
            class="text-error mt-4 text-center"
          >
            {{ error }}
          </p>

          <div class="text-center mt-4">
            <p>¿Tienes una cuenta?</p>
            <nuxt-link
              to="/sign-in"
              class="link link-primary"
            >
              Iniciar sesión
            </nuxt-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return { username: '', password: '', error: null }
  },
  methods: {
    register() {
      // Basic validation
      if (!this.username || !this.password) {
        this.error = 'Please enter both username and password'
        return
      }
      // For now, just simulate a successful registration and redirect
      console.log('Registering user:', this.username)
      this.error = null // Clear any previous errors
      this.$router.push('/sign-in')
    }
  }
}
</script>

<style scoped>
/* Add any specific styles here */
</style>
