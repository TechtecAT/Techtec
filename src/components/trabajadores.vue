<template>
  <div class="container">
    <header class="header">
      <h1>Dashboard de Clientes y Servicios</h1>
      <input
        type="text"
        placeholder="Buscar"
        class="search-input"
        v-model="searchQuery"
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
              <td @dblclick="editField('nombre', cliente)">{{ cliente.nombre }} {{ cliente.apellido_paterno }} {{ cliente.apellido_materno }}</td>
              <td @dblclick="editField('domicilio', cliente)">{{ cliente.domicilio }}</td>
              <td @dblclick="editField('email', cliente)">{{ cliente.email }}</td>
              <td>
                <ul>
                  <li v-for="(celular, index) in cliente.celulares" :key="index">
                    <span @dblclick="editField('celular', cliente)">{{ celular }}</span>
                  </li>
                </ul>
              </td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('marca', cliente.servicios[0])">{{ cliente.servicios[0].marca }}</td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('serie', cliente.servicios[0])">{{ cliente.servicios[0].serie }}</td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('modelo', cliente.servicios[0])">{{ cliente.servicios[0].modelo }}</td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('descripcion', cliente.servicios[0])">{{ cliente.servicios[0].descripcion }}</td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('estado', cliente.servicios[0])">{{ cliente.servicios[0].estado }}</td>
              <td v-if="cliente.servicios.length > 0" @dblclick="editField('observaciones', cliente.servicios[0])">{{ cliente.servicios[0].observaciones }}</td>
              <td v-if="cliente.servicios.length > 0" @dblclick="openWorkerModal(cliente)">{{ cliente.servicios[0].trabajador.nombre }} {{ cliente.servicios[0].trabajador.apellido }}</td>
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
      itemsPerPage: 5,
      editing: false,
      editFieldType: '',
      editValue: {},
      currentCliente: null,
      workerModal: false,
      searchQuery: '',
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredClientes.length / this.itemsPerPage);
    },
    paginatedClientes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredClientes.slice(start, start + this.itemsPerPage);
    },
    filteredClientes() {
      const query = this.searchQuery.toLowerCase();
      return this.clientes.filter(cliente => {
        const fullName = `${cliente.nombre} ${cliente.apellido_paterno} ${cliente.apellido_materno}`.toLowerCase();
        const celulares = cliente.celulares.join(' ').toLowerCase();
        const servicios = cliente.servicios.length > 0 ? cliente.servicios[0] : {};
        return (
          fullName.includes(query) ||
          cliente.domicilio.toLowerCase().includes(query) ||
          cliente.email.toLowerCase().includes(query) ||
          celulares.includes(query) ||
          servicios.marca?.toLowerCase().includes(query) ||
          servicios.serie?.toLowerCase().includes(query) ||
          servicios.modelo?.toLowerCase().includes(query) ||
          servicios.descripcion?.toLowerCase().includes(query) ||
          servicios.estado?.toLowerCase().includes(query) ||
          servicios.observaciones?.toLowerCase().includes(query) ||
          (servicios.trabajador && `${servicios.trabajador.nombre} ${servicios.trabajador.apellido}`.toLowerCase().includes(query))
        );
      });
    },
  },
  methods: {
    async cargarClientes() {
      try {
        const response = await axios.get('http://localhost:3000/api/clientes');
        this.clientes = response.data;
      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      }
    },
    async cargarTrabajadores() {
      try {
        const response = await axios.get('http://localhost:3000/api/trabajadores');
        this.trabajadores = response.data;
      } catch (error) {
        console.error('Error al cargar los trabajadores:', error);
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
.container-fluid {
  padding: 0;
  margin: 0;
}

.window {
  background-color: rgba(0, 0, 0, 0.575);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
  height: auto;
  max-width: 100%;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.logo {
  width: 100%;
  max-width: 200px;
  height: auto;
}

.controls-container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .controls-container {
    flex-direction: row;
  }

  .register-button {
    margin-left: 10px;
  }
}

.table-responsive {
  overflow-x: auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(0, 83, 123);
  background: radial-gradient(circle, rgba(0, 83, 123, 1) 0%, rgba(0, 33, 86, 1) 35%);
}

.window {
  background-color: rgba(0, 0, 0, 0.575);
  width: 90vw;
  max-width: 1500px;
  height: 80vh;
  max-height: 1200px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.header-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
}

.logo {
  width: 10vw;
  max-width: 150px;
}

.controls-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar {
  padding: 10px;
  border-radius: 20px;
  border: 2px solid black;
  font-size: 1.1em;
}

.register-button {
  padding: 10px;
  border-radius: 50px;
  border: 2px solid black;
  background-color: #007bff;
  color: white;
  font-weight: 600;
}

.content {
  margin-top: 20px;
  width: 100%;
  color: white;
}

.table {
  margin-top: 40px;
  width: 100%;
  text-align: center;
}

.table th,
.table td {
  padding: 12px;
}

.modal-content {
  background-color: #343a40;
  color: #fff;
}

.modal-header {
  border-bottom: 1px solid #343a40;
}

.modal-footer {
  border-top: 1px solid #343a40;
}

.btn-primary {
  border-radius: 50px;
  background-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  border-radius: 50px;
}

/* Estilo para el select */
select {
  padding: 6px;
  font-size: 0.9rem;
  background-color: #343a40;
  border: 1px solid #ced4da;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

select:focus {
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Input personalizado */
input[type="text"] {
  padding: 6px;
  font-size: 0.9rem;
  border: 1px solid #ced4da;
  border-radius: 50px;
  outline: none;
  transition: border-color 0.3s ease;
  width: 100%;
  max-width: 200px;
}

input[type="text"]:focus {
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>