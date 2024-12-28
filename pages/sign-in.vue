<template>
  <div id="sign-in">
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col">
        <div class="card bg-base-100 w-full max-w-sm shadow-2xl">
          <h2 class="text font-bold">
            Iniciar Sesión
          </h2>
          <form
            class="card-body"
            @submit.prevent="handleSubmit"
          >
            <div class="form-control">
              <label class="input input-bordered flex items-center gap-2">
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
                  id="usercode"
                  v-model="usercode"
                  type="text"
                  placeholder="Código"
                  class="grow"
                  required
                  pattern="^[0-9]{9,12}$"
                  title="El código debe tener entre 9 y 12 caracteres"
                >
              </label>
            </div>
            <div class="form-control">
              <label class="input input-bordered flex items-center gap-2">
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
                class="btn btn-primary"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      usercode: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      // Lógica de autenticación

      this.$router.push('/')
    }
  }

}
</script>

  <style scoped>
  /* Contenedor del formulario */
  .sign-in {
    text-align: center;
    background: #fff; /* Fondo blanco */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }

  /* Título del formulario */
  h2 {
    font-size: 24px;
    margin-top: 30px;
    text-align: center;
  }

  /* Etiquetas del formulario */
  label {
    font-weight: bold;
    color: #555; /* Gris oscuro */
  }

  /* Botón */
  button {
    width: 100%;
    color: white;
    border: none;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  /* Fondo degradado del cuerpo */
  body {
    background: linear-gradient(135deg, #f4f4f9, #cfe9e5);
    font-family: 'Arial', sans-serif;
    color: #333;
  }
  </style>
