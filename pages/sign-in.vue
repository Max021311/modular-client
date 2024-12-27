<template>
  <div id="sign-in">
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col">
        <div class="card bg-base-100 w-full max-w-sm shadow-2xl">
          <h2 class="text font-bold">
            Inicia Sesión
          </h2>
          <form
            class="card-body"
            @submit.prevent="handleSubmit"
          >
            <div class="form-control">
              <label
                for="usercode"
                class="label"
              >
                <span class="label-text">Código de Estudiante</span>
              </label>
              <input
                id="usercode"
                v-model="usercode"
                type="text"
                placeholder="Código"
                class="input input-bordered"
                required
                pattern="^[0-9]{9,12}$"
                title="El código debe tener entre 9 y 12 caracteres"
              >
            </div>
            <div class="form-control">
              <label
                for="password"
                class="label"
              >
                <span class="label-text">Contraseña</span>
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Contraseña"
                class="input input-bordered"
                required
              >
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
