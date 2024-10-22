<template>
  <div class="container">
    <header class="header">
      <h1>Clientes y Servicios</h1>
      <input 
        type="text" 
        placeholder="Buscar por nombre, celular o equipo" 
        class="search-input" 
        v-model="searchQuery" 
        @input="resetPage"
      />
    </header>

    <div class="table-container">
      <div class="table-wrapper">
        <table class="participant-table">
          <thead>
            <tr>
              <th>Nombre del Cliente</th>
              <th>Domicilio</th>
              <th>Email</th>
              <th>Celulares</th>
              <th>Marca del Equipo</th>
              <th>Serie</th>
              <th>Modelo</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Servicio</th>
              <th>Trabajador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in paginatedClientes" :key="cliente.id_cliente">
              <td @dblclick="editField('nombre', cliente)">
                {{ cliente.nombre }} {{ cliente.apellido_paterno }} {{ cliente.apellido_materno }}
              </td>
              <td @dblclick="editField('domicilio', cliente)">
                {{ cliente.domicilio }}
              </td>
              <td @dblclick="editField('email', cliente)">
                {{ cliente.email }}
              </td>
              <td>
                <ul>
                  <li v-for="(celular, index) in cliente.celulares" :key="index">
                    <span @dblclick="editField('celular', cliente)">
                      {{ celular }}
                    </span>
                  </li>
                </ul>
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('marca', cliente.servicios[0])">
                {{ cliente.servicios[0].marca }}
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('serie', cliente.servicios[0])">
                {{ cliente.servicios[0].serie }}
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('modelo', cliente.servicios[0])">
                {{ cliente.servicios[0].modelo }}
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('descripcion', cliente.servicios[0])">
                {{ cliente.servicios[0].descripcion }}
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('estado', cliente.servicios[0])">
                {{ cliente.servicios[0].estado }}
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('observaciones', cliente.servicios[0])">
                {{ cliente.servicios[0].observaciones }}
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="openWorkerModal(cliente)">
                {{ cliente.servicios[0].trabajador.nombre }} {{ cliente.servicios[0].trabajador.apellido }}
              </td>
              <td>
                <button @click="eliminarCliente(cliente.id_cliente)" class="delete-button">
                  <img src="https://cdn-icons-png.flaticon.com/512/484/484662.png" alt="Eliminar" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      clientes: [],
      trabajadores: [],
      currentPage: 1,
      itemsPerPage: 5, // Mantener el paginado con 5 elementos por página
      searchQuery: '', // Variable para el término de búsqueda
      editing: false,
      editFieldType: '',
      editValue: {},
      currentCliente: null,
      workerModal: false,
    };
  },
  computed: {
    // Filtrar los clientes según el término de búsqueda
    filteredClientes() {
      if (!this.searchQuery) {
        return this.clientes;
      }

      const searchLower = this.searchQuery.toLowerCase();
      return this.clientes.filter(cliente => {
        const nombreCompleto = `${cliente.nombre} ${cliente.apellido_paterno} ${cliente.apellido_materno}`.toLowerCase();
        const celulares = cliente.celulares.join(' ').toLowerCase();
        const servicios = cliente.servicios.length > 0 ? `${cliente.servicios[0].marca} ${cliente.servicios[0].modelo}`.toLowerCase() : '';
        return nombreCompleto.includes(searchLower) || celulares.includes(searchLower) || servicios.includes(searchLower);
      });
    },
    totalPages() {
      return Math.ceil(this.filteredClientes.length / this.itemsPerPage);
    },
    paginatedClientes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredClientes.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    // Restablecer a la primera página cuando se realiza una búsqueda
    resetPage() {
      this.currentPage = 1;
    },
    async cargarClientes() {
      try {
        const response = await axios.get('http://localhost:3000/api/clientes');
        this.clientes = response.data;
      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      }
    },
    async eliminarCliente(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        try {
          await axios.delete(`http://localhost:3000/api/clientes/${id}`);
          this.cargarClientes();
        } catch (error) {
          console.error('Error al eliminar el cliente:', error);
        }
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    this.cargarClientes();
  },
};
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    margin-top: 70px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.table-container {
    overflow-x: auto; /* Permite desplazamiento horizontal */
    margin-bottom: 20px; /* Espacio entre la tabla y los botones de paginación */
}

.table-wrapper {
    display: block; /* Cambiado para que el contenedor se ajuste al contenido */
    width: 100%; /* El contenedor ocupará todo el ancho disponible */
}

.participant-table {
    width: auto; /* La tabla se ajustará automáticamente al contenido */
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ffffff;
    white-space: nowrap; /* Evita que el contenido se divida en varias líneas */
}

td:first-child {
    white-space: nowrap; /* Evita que el nombre se divida */
}

th {
    background-color: #007bff;
    color: white;
}

td ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.delete-button {
    background: none;
    border: none;
    cursor: pointer;
}

.delete-button img {
    width: 20px; /* Ajusta el tamaño según sea necesario */
    height: 20px; /* Ajusta el tamaño según sea necesario */
}

.edit-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.edit-modal h2 {
    margin-top: 0;
}

.edit-modal form {
    display: flex;
    flex-direction: column;
}

.edit-modal label {
    margin: 10px 0 5px;
}

.edit-modal input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.edit-modal button {
    margin-top: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.edit-modal button:hover {
    background-color: #0056b3;
}
</style>
