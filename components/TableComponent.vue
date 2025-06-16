<template>
  <table class="custom-table">
    <thead>
      <tr>
        <!-- Generar encabezados -->
        <th
          v-for="(header, index) in headers"
          :key="index"
        >
          {{ header }}
        </th>
        <!-- Agregar columna de "Acciones" solo si se requieren -->
        <th v-if="actions">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in data"
        :key="index"
      >
        <!-- Renderizar los datos de cada fila -->
        <td
          v-for="(cell, i) in row"
          :key="i"
        >
          {{ cell }}
        </td>
        <!-- Renderizar los botones únicamente en la columna "Acciones" -->
        <td v-if="actions">
          <button
            class="action-btn edit-btn"
            title="Editar"
          >
            ✏️
          </button>
          <button
            class="action-btn view-btn"
            title="Visualizar"
          >
            👁️
          </button>
          <button
            class="action-btn download-btn"
            title="Descargar"
          >
            ⬇️
          </button>
          <button
            class="action-btn delete-btn"
            title="Eliminar"
          >
            🗑️
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  props: {
    headers: Array,
    data: Array,
    actions: {
      type: Boolean,
      default: false
    }
  }
}
</script>

  <style scoped>
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
    text-align: center;
  }

  .custom-table th,
  .custom-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 5px;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.1);
}

.edit-btn {
  color: #007bff;
}

.edit-btn:hover {
  background-color: rgba(0, 123, 255, 0.2);
}

.delete-btn {
  color: #dc3545;
}

.delete-btn:hover {
  background-color: rgba(220, 53, 69, 0.2);
}

.view-btn {
  color: #28a745;
}

.view-btn:hover {
  background-color: rgba(40, 167, 69, 0.2);
}

.download-btn {
  color: #ffc107;
}

.download-btn:hover {
  background-color: rgba(255, 193, 7, 0.2);
}
  </style>
