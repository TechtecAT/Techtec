<template>
  <!-- Div contenedor con color de fondo negro -->
  <div class="main-container">
    <!-- Logo y secciones de drag and drop dentro del contenedor negro -->
    <div class="inner-container">
      <!-- Logo -->
      <div class="row justify-content-center mb-4">
        <div class="col-md-6 text-center">
          <img
            src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png"
            alt="Logo"
            class="logo img-fluid mb-4"
          />
        </div>
      </div>

      <!-- Secciones de drag and drop -->
      <div class="row justify-content-between">
        <!-- Equipos Recien Ingresados -->
        <div class="col-md-2">
          <h5 class="column-title">Equipos Recien Ingresados</h5>
          <draggable
            class="list-group"
            v-model="equiposRecienIngresados"
            group="equipos"
            @end="onDragEnd"
            item-key="nombre"
          >
            <template #item="{ element }">
              <div
                class="list-group-item draggable-item d-flex justify-content-between align-items-center"
              >
                {{ element.nombre }}
                <button @click="openModal(element)" class="btn btn-sm btn-primary">
                  Detalles
                </button>
              </div>
            </template>
          </draggable>
        </div>

        <!-- Equipos en Stand By -->
        <div class="col-md-2">
          <h5 class="column-title">Equipos en Stand By</h5>
          <draggable
            class="list-group"
            v-model="equiposStandBy"
            group="equipos"
            @end="onDragEnd"
            item-key="nombre"
          >
            <template #item="{ element }">
              <div
                class="list-group-item draggable-item d-flex justify-content-between align-items-center"
              >
                {{ element.nombre }}
                <button @click="openModal(element)" class="btn btn-sm btn-primary">
                  Detalles
                </button>
              </div>
            </template>
          </draggable>
        </div>

        <!-- Trabajador 1 -->
        <div class="col-md-2">
          <h5 class="column-title">Trabajador 1</h5>
          <draggable
            class="list-group"
            v-model="trabajador1Equipos"
            group="equipos"
            @end="onDragEnd"
            item-key="nombre"
          >
            <template #item="{ element }">
              <div
                class="list-group-item draggable-item d-flex justify-content-between align-items-center"
              >
                {{ element.nombre }}
                <button @click="openModal(element)" class="btn btn-sm btn-primary">
                  Detalles
                </button>
              </div>
            </template>
          </draggable>
        </div>

        <!-- Trabajador 2 -->
        <div class="col-md-2">
          <h5 class="column-title">Trabajador 2</h5>
          <draggable
            class="list-group"
            v-model="trabajador2Equipos"
            group="equipos"
            @end="onDragEnd"
            item-key="nombre"
          >
            <template #item="{ element }">
              <div
                class="list-group-item draggable-item d-flex justify-content-between align-items-center"
              >
                {{ element.nombre }}
                <button @click="openModal(element)" class="btn btn-sm btn-primary">
                  Detalles
                </button>
              </div>
            </template>
          </draggable>
        </div>

        <!-- Equipos Finalizados -->
        <div class="col-md-2">
          <h5 class="column-title">Equipos Finalizados</h5>
          <draggable
            class="list-group"
            v-model="equiposFinalizados"
            group="equipos"
            @end="onDragEnd"
            item-key="nombre"
          >
            <template #item="{ element }">
              <div
                class="list-group-item draggable-item d-flex justify-content-between align-items-center"
              >
                {{ element.nombre }}
                <button @click="openModal(element)" class="btn btn-sm btn-primary">
                  Detalles
                </button>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <!-- Modal para Detalles del Equipo -->
    <div
      class="modal fade"
      id="equipoModal"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{ equipoSeleccionado.nombre }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p><strong>Descripción del equipo:</strong> {{ equipoSeleccionado.descripcion }}</p>
            <p><strong>Errores Reportados:</strong></p>
            <ul>
              <li v-for="(error, index) in equipoSeleccionado.errores" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      equiposRecienIngresados: [
        { nombre: 'Equipo 1', descripcion: 'Laptop Dell', errores: ['Pantalla dañada', 'No enciende'] },
        { nombre: 'Equipo 2', descripcion: 'Smartphone Samsung', errores: ['Batería no carga'] },
        { nombre: 'Equipo 3', descripcion: 'Tablet Apple', errores: ['Pantalla rota'] },
      ],
      equiposStandBy: [],
      trabajador1Equipos: [],
      trabajador2Equipos: [],
      equiposFinalizados: [],
      equipoSeleccionado: {},
    };
  },
  methods: {
    onDragEnd(event) {
      console.log('Drag Ended: ', event);
    },
    openModal(equipo) {
      this.equipoSeleccionado = equipo;
      const modal = new Modal(document.getElementById('equipoModal'));
      modal.show();
    },
  },
};
</script>

<style scoped>
/* Estilo principal del contenedor (fondo negro flexible) */
.main-container {
  background: rgb(0, 83, 123);
  background: radial-gradient(circle, rgba(0, 83, 123, 1) 0%, rgba(0, 33, 86, 1) 35%);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Contenedor interno */
.inner-container {
  background-color: rgba(0, 0, 0, 0.575);
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 1200px;
}

/* Logo */
.logo {
  max-width: 150px;
  height: auto;
}

/* Títulos de las columnas */
.column-title {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
}

/* Estilos para cada item de la lista */
.list-group-item {
  margin-bottom: 15px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.list-group-item:hover {
  background-color: #f1f1f1;
  transform: scale(1.05);
}

.draggable-item {
  font-size: 1.1rem;
  color: #333;
}

/* Modal */
.modal-content {
  border-radius: 15px;
}

.modal-header {
  background-color: #007bff;
  color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
</style>
