<template>
  <div class="container">
    <div class="window">
      <div class="header-section">
        <div class="logo-container">
          <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="logo" />
        </div>

        <div class="controls-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar por ID, nombre, modelo o propietario"
            class="search-bar"
          />
          <button @click="goToHojaServicio" class="register-button">Registrar equipo nuevo</button>
        </div>
      </div>

      <div class="content">
        <h1>Equipos</h1>
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Equipo</th>
              <th>Estado</th>
              <th>Ubicación</th>
              <th>Fecha de Registro</th>
              <th>Etiquetas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipo in orderedEquipos" :key="equipo.id">
              <td>{{ equipo.id }}</td>
              <td>{{ equipo.nombre }}</td>
              <td>{{ equipo.estado }}</td>
              <td>
                <select v-model="equipo.ubicacion" @change="updateUbicacion(equipo)">
                  <option value="Sin asignar">Sin asignar</option>
                  <option value="En espera">En espera</option>
                  <option value="Trabajador 1">Trabajador 1</option>
                  <option value="Trabajador 2">Trabajador 2</option>
                  <option value="Almacén">Almacén</option>
                  <option value="Listo para entrega">Listo para entrega</option>
                </select>
              </td>
              <td>{{ equipo.fechaRegistro }}</td>
              <td>
                <select v-model="equipo.etiqueta" @change="updateEtiqueta(equipo)">
                  <option value="Urgente">Urgente</option>
                  <option value="No urgente">No urgente</option>
                  <option value="Poco urgente">Poco urgente</option>
                  <option value="Personalizada">Personalizada</option>
                </select>
                <input
                  v-if="equipo.etiqueta === 'Personalizada'"
                  type="text"
                  v-model="equipo.etiquetaPersonalizada"
                  placeholder="Etiqueta personalizada"
                  @input="updateEtiqueta(equipo)"
                />
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-info"
                  @click="showDetails(equipo)"
                  data-bs-toggle="modal"
                  :data-bs-target="'#modal' + equipo.id"
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div
        v-for="equipo in equipos"
        :key="'modal' + equipo.id"
        class="modal fade"
        :id="'modal' + equipo.id"
        tabindex="-1"
        aria-labelledby="'modalLabel' + equipo.id"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="'modalLabel' + equipo.id">{{ equipo.nombre }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>Modelo:</strong> {{ equipo.modelo }}</p>
              <p><strong>Estado:</strong> {{ equipo.estado }}</p>
              <p><strong>Última revisión:</strong> {{ equipo.ultimaRevision }}</p>
              <p><strong>Ubicación:</strong> {{ equipo.ubicacion }}</p>
              <p><strong>Propietario:</strong> {{ equipo.propietario }}</p>
              <p><strong>Fecha de Registro:</strong> {{ equipo.fechaRegistro }}</p>
              <p><strong>Etiqueta:</strong> {{ equipo.etiqueta === 'Personalizada' ? equipo.etiquetaPersonalizada : equipo.etiqueta }}</p>
              <p><strong>Descripción:</strong> {{ equipo.descripcion }}</p>
            </div>
            <div class="modal-footer">
              <router-link
                to="/detalles_equipo"
                class="btn btn-primary"
                @click="handleLinkClick"
              >
                Detalles específicos
              </router-link>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      searchQuery: '',
      equipos: [
        {
          id: 3,
          nombre: 'MacBook Pro',
          modelo: 'M1 13-inch',
          estado: 'En diagnóstico',
          ultimaRevision: '2024-09-01',
          propietario: 'Juan González',
          ubicacion: 'Trabajador 1',
          fechaRegistro: '2024-07-15',
          etiqueta: 'Urgente',
          etiquetaPersonalizada: '',
          descripcion: 'MacBook Pro con chip M1, 8GB de RAM.',
        },
        {
          id: 4,
          nombre: 'Samsung Galaxy S21',
          modelo: 'SM-G991B',
          estado: 'En reparación',
          ultimaRevision: '2024-09-02',
          propietario: 'Laura Martínez',
          ubicacion: 'Trabajador 2',
          fechaRegistro: '2024-08-01',
          etiqueta: 'Urgente',
          etiquetaPersonalizada: '',
          descripcion: 'Teléfono con pantalla de 6.2 pulgadas.',
        },
        {
          id: 5,
          nombre: 'Lenovo ThinkPad',
          modelo: 'X1 Carbon Gen 9',
          estado: 'Listo para entrega',
          ultimaRevision: '2024-08-28',
          propietario: 'Roberto Ramírez',
          ubicacion: 'Almacén',
          fechaRegistro: '2024-08-20',
          etiqueta: 'No urgente',
          etiquetaPersonalizada: '',
          descripcion: 'Laptop ligera con procesador Intel Core i7.',
        },
        {
          id: 6,
          nombre: 'iPad Air',
          modelo: 'A2316',
          estado: 'En espera de piezas',
          ultimaRevision: '2024-08-29',
          propietario: 'Ana Torres',
          ubicacion: 'Sin asignar',
          fechaRegistro: '2024-09-01',
          etiqueta: 'Poco urgente',
          etiquetaPersonalizada: '',
          descripcion: 'Tableta con pantalla de 10.9 pulgadas.',
        },
      ],
    };
  },
  computed: {
    filteredEquipos() {
      return this.equipos.filter((equipo) => {
        const searchTerm = this.searchQuery.toLowerCase();
        return (
          equipo.id.toString().includes(searchTerm) ||
          equipo.nombre.toLowerCase().includes(searchTerm) ||
          equipo.modelo.toLowerCase().includes(searchTerm) ||
          equipo.propietario.toLowerCase().includes(searchTerm)
        );
      });
    },
    orderedEquipos() {
      return this.filteredEquipos.sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro));
    },
  },
  setup() {
    const router = useRouter();

    const handleLinkClick = () => {
      document.querySelectorAll('.modal').forEach(modal => {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
      });
    };

    const goToHojaServicio = () => {
      router.push('/hoja_servicio');
    };

    const showDetails = (equipo) => {
      console.log('Detalles del equipo:', equipo);
    };

    const updateEtiqueta = (equipo) => {
      console.log(`Etiqueta actualizada para el equipo ${equipo.id}: ${equipo.etiqueta === 'Personalizada' ? equipo.etiquetaPersonalizada : equipo.etiqueta}`);
    };

    const updateUbicacion = (equipo) => {
      console.log(`Ubicación actualizada para el equipo ${equipo.id}: ${equipo.ubicacion}`);
    };

    return {
      goToHojaServicio,
      showDetails,
      handleLinkClick,
      updateEtiqueta,
      updateUbicacion,
    };
  },
};
</script>

<style scoped>
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