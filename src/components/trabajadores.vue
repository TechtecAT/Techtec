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
        <h1>Equipos a tu cargo</h1>
        <div class="equipment-container">
          <div
            v-for="equipo in filteredEquipos"
            :key="equipo.id"
            class="equipment-card"
          >
            <div class="equipment-info">
              <h2>{{ equipo.nombre }}</h2>
              <p><strong>Propietario:</strong> {{ equipo.propietario }}</p>
              <p><strong>Última revisión:</strong> {{ equipo.ultimaRevision }}</p>
              <button
                type="button"
                class="btn btn-info"
                @click="showDetails(equipo)"
                data-bs-toggle="modal"
                :data-bs-target="'#modal' + equipo.id"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>
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
              <p><strong>Propietario:</strong> {{ equipo.propietario }}</p>
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
  descripcion: 'MacBook Pro con chip M1, 8GB de RAM.',
},
{
  id: 4,
  nombre: 'Samsung Galaxy S21',
  modelo: 'SM-G991B',
  estado: 'En reparación',
  ultimaRevision: '2024-09-02',
  propietario: 'Laura Martínez',
  descripcion: 'Teléfono con pantalla de 6.2 pulgadas.',
},
{
  id: 5,
  nombre: 'Lenovo ThinkPad',
  modelo: 'X1 Carbon Gen 9',
  estado: 'Listo para entrega',
  ultimaRevision: '2024-08-28',
  propietario: 'Roberto Ramírez',
  descripcion: 'Laptop ligera con procesador Intel Core i7.',
},
{
  id: 6,
  nombre: 'iPad Air',
  modelo: 'A2316',
  estado: 'En espera de piezas',
  ultimaRevision: '2024-08-29',
  propietario: 'Ana Torres',
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
  },
  setup() {
    const router = useRouter();

    const handleLinkClick = () => {
      // Cerrar todos los modales abiertos antes de navegar
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

    return {
      goToHojaServicio,
      showDetails,
      handleLinkClick,
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
  border: 2px solid #ccc;
  width: 300px;
  transition: border-color 0.3s ease;
}

.search-bar:focus {
  border-color: #007bff;
  outline: none;
}

.register-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.register-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.content {
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.equipment-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  padding: 10px;
}

.equipment-card {
  display: flex;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: white;
  width: 250px;
  box-sizing: border-box;
}

.equipment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn-info {
  background-color: #17a2b8;
  border: none;
}

.modal-content {
  background-color: #1a1a1a;
  color: white;
}

.modal-header {
  border-bottom: 1px solid #343a40;
}

.modal-footer {
  border-top: 1px solid #343a40;
}

.btn-close {
  filter: invert(1);
}
</style>
