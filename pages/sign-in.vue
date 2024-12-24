<template>
  <div class="sign-in">
    <h2>Inicia Sesión</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="usercode">Código de Estudiante</label>
        <input
          id="usercode"
          v-model="usercode"
          type="text"
          placeholder="Código"
          required
          pattern="^[0-9]{9,12}$"
          title="El código debe tener entre 9 y 12 caracteres"
        >
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
        >
      </div>
      <button type="submit">
        Iniciar Sesión
      </button>
    </form>
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
    color: #34495e;
    margin-bottom: 20px;
  }

  /* Etiquetas del formulario */
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555; /* Gris oscuro */
  }

  /* Campos de entrada */
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
  }

  /* Botón */
  button {
    width: 100%;
    background-color: #34495e;
    color: white;
    border: none;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  /* Hover en el botón */
  button:hover {
    background-color: #34495e;
  }

  /* Fondo degradado del cuerpo */
  body {
    background: linear-gradient(135deg, #f4f4f9, #cfe9e5);
    font-family: 'Arial', sans-serif;
    color: #333;
  }
  </style>
