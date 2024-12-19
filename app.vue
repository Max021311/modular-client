<template>
  <div id="app">
    <header>
      <h1>SSSP</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style>
/* Estilos generales */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9; /* Fondo claro */
  color: #333; /* Texto en color oscuro */
}

/* Fondo y estilo del contenedor principal */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

/* Estilo del encabezado */
header {
  width: 100%;
  background: #34495e;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 5px;
}

/* Área principal */
main {
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  /*max-width: 500px;
  width: 100%;*/
}
</style>
