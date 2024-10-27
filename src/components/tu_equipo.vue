<template>
  <div class="container">
    <div class="window">
      <div class="header-section">
        <a href="/" rel="noopener noreferrer" class="enter-button-container">
          <span class="material-symbols-outlined enter-button">arrow_back</span>
        </a>
        <img
          src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png"
          alt="Logo"
          class="logo img-fluid mb-4"
        />
      </div>

      <div class="cabeza">
        <h2 class="text-center">Estado de tu equipo</h2>
        <p class="text text-center">
          A continuación te mostramos el progreso del servicio de tu equipo.
        </p>

        <div class="search-container">
          <input
            type="text"
            class="search-input"
            placeholder="Buscar equipo..."
          />
          <button class="search-button">
            <span class="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <div class="tracking-menu">
        <div
          v-for="(step, index) in trackingSteps.slice(-4).reverse()"
          :key="step.title" 
          :class="['tracking-step', index === 0 ? 'current' : 'previous']"
        >
          <div class="step-label-container">
            <span class="step-label">Estado {{ index === 0 ? 'Actual' : 'Anterior' }}: {{ step.title }}</span>
            <a v-if="index === 0" class="enter-button-container" @click="openModal">
              <span class="material-symbols-outlined menu-button">keyboard_arrow_down</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Botón para ver seguimiento completo -->
      <div class="text-center mt-4">
        <button class="btn btn-primary" @click="openFullTrackingModal">Ver seguimiento completo</button>
      </div>

      <!-- Modal para detalles específicos -->
      <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">Detalles Específicos</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-for="step in trackingSteps" :key="step.title" class="tracking-step mb-4">
                <h6 class="step-title">{{ step.title }}</h6>
                <p class="step-details">{{ step.details }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para ver seguimiento completo -->
      <div class="modal fade" id="fullTrackingModal" tabindex="-1" role="dialog" aria-labelledby="fullTrackingTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="fullTrackingTitle">Seguimiento Completo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeFullTrackingModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-for="step in trackingSteps" :key="step.title" class="tracking-step mb-4">
                <h6 class="step-title">{{ step.title }}</h6>
                <p class="step-details">{{ step.details }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeFullTrackingModal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Ejemplo de pasos de seguimiento
      trackingSteps: [
        { title: 'Enviado', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'En Proceso', details: 'Curabitur lobortis, lectus ut posuere laoreet, massa purus facilisis augue.' },
        { title: 'En Tránsito', details: 'Vivamus quis nunc ac dui pharetra tempor.' },
        { title: 'Entregado', details: 'Fusce euismod, justo at tincidunt fringilla, nisi mi pharetra urna.' },
        { title: 'Recibido', details: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
        { title: 'Confirmado', details: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      ]
    };
  },
  methods: {
    openModal() {
      $('#detailsModal').modal('show'); // Muestra el modal utilizando jQuery
    },
    closeModal() {
      $('#detailsModal').modal('hide'); // Cierra el modal utilizando jQuery
    },
    openFullTrackingModal() {
      $('#fullTrackingModal').modal('show'); // Muestra el modal de seguimiento completo
    },
    closeFullTrackingModal() {
      $('#fullTrackingModal').modal('hide'); // Cierra el modal de seguimiento completo
    }
  }
};
</script>


<style scoped>
.tracking-step {
  margin-bottom: 20px; /* Espacio entre pasos */
}

.step-title {
  font-weight: bold; /* Título en negrita */
}

.step-details {
  margin-top: 5px; /* Espacio entre el título y los detalles */
}

.container {
  padding: 58px;
  overflow-y: hidden;
}

.cabeza {
  margin-left: 20px;
}

.window {
  background-color: rgba(0, 0, 0, 0.575);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
  color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
  margin-bottom: 30px;
  overflow-y: auto;
}

/* Header section with logo */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
}

.logo {
  width: 150px;
  height: auto;
}

h2 {
  color: #f8f9fa;
  margin-bottom: 20px;
  text-align: center;
}

.text {
  color: #ced4da;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
}

/* Estilos para la barra de búsqueda */
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.search-input {
  width: 250px;
  padding: 8px 12px;
  border: 2px solid #444;
  border-radius: 20px;
  font-size: 14px;
  margin-right: 8px;
  background: #fff;
  color: #333;
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 15px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.search-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

/* Estilos para el menú de seguimiento */
.tracking-menu {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tracking-step {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-label-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-label {
  color: #ced4da;
  margin-left: 5px;
}

.tracking-step.current .step-label {
  font-size: 40px;
  opacity: 1;
}

.tracking-step.previous .step-label {
  font-size: 30px;
  opacity: 0.8;
}

.tracking-step.previous + .tracking-step.previous .step-label {
  font-size: 25px;
  opacity: 0.5;
}

.tracking-step.previous + .tracking-step.previous + .tracking-step.previous .step-label {
  font-size: 18px;
  opacity: 0.2;
}

.enter-button-container {
  display: flex;
  align-items: center;
  color: #007bff;
  text-decoration: none;
  font-size: 24px;
}

.enter-button {
  position: absolute;
  top: 85px;
  width: 7vw; 
  max-width: 50px;
  height: auto;
  font-size: 40px; 
  color: white;
  transition: transform 0.3s ease, filter 0.3s ease;
}
  
.enter-button:hover {
  transform: scale(1.1);
}

.menu-button {
  position: absolute;
  width: 7vw; 
  max-width: 50px;
  height: auto;
  font-size: 40px; 
  color: white;
  transition: transform 0.3s ease, filter 0.3s ease;
}
  
.menu-button:hover {
  transform: scale(1.1);
}
</style>
