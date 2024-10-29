<template>
  <div class="container">
    <div class="window">
      <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="top-left-image" />

      <a href="/" rel="noopener noreferrer" class="enter-button-container">
        <span class="material-symbols-outlined enter-button">east</span>
      </a>

      <div class="content-wrapper">
        <!-- Contenido del lado izquierdo -->
        <div class="cabeza">
          <h2>Estado de tu equipo</h2>
          <p class="text">
            A continuación te mostramos el progreso del servicio de tu equipo.
          </p>

          <div class="search-container">
            <input type="text" class="search-input" placeholder="Buscar otro equipo..." />
            <button class="search-button">
              <span class="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>

        <!-- Contenido del lado derecho -->
        <div class="tracking-menu">
          <!-- NUEVO: Tiempo de entrega estimado -->
          <div class="estimated-time">
            <span class="estimated-label">Tiempo de entrega estimado:</span> 
            <span class="estimated-value">{{ estimatedTime }}</span>
          </div>

          <div
            v-for="(step, index) in trackingSteps.slice(-4).reverse()"
            :key="step.title"
            :class="['tracking-step', index === 0 ? 'current' : 'previous']"
          >
            <div class="step-indicator"></div>
            <div class="step-label-container">
              <span class="step-label">
                Estado {{ index === 0 ? 'Actual' : 'Anterior' }}: {{ step.title }}
              </span>
            </div>
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-primary" @click="openFullTrackingModal">
              Ver seguimiento completo
            </button>
          </div>
        </div>
      </div>

      <div class="modal fade" id="fullTrackingModal" tabindex="-1" role="dialog" aria-labelledby="fullTrackingModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="fullTrackingModalLabel">Seguimiento Completo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeFullTrackingModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
              <table class="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Punto de seguimiento</th>
                    <th>Costo Estimado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="step in trackingSteps" :key="step.title">
                    <td>
                      <strong>{{ step.title }}</strong>
                      <p><small>{{ step.details }}</small></p>
                    </td>
                    <td>{{ step.estimatedCost }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeFullTrackingModal">Cerrar</button>
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
      estimatedTime: "2 DÍAS", // Cambia este valor según el tiempo estimado
      trackingSteps: [
        { title: 'Enviado', details: 'El paquete ha sido enviado.', estimatedCost: '$10.00' },
        { title: 'En Proceso', details: 'El paquete está en proceso de ser preparado.', estimatedCost: '$5.00' },
        { title: 'En Tránsito', details: 'El paquete está en camino a su destino.', estimatedCost: '$15.00' },
        { title: 'Entregado', details: 'El paquete ha sido entregado.', estimatedCost: '$0.00' },
        { title: 'Recibido', details: 'El paquete ha sido recibido por el cliente.', estimatedCost: '$0.00' },
        { title: 'Confirmado', details: 'El envío ha sido confirmado como recibido.', estimatedCost: '$0.00' },
      ],
    };
  },
  methods: {
    openFullTrackingModal() {
      $('#fullTrackingModal').modal('show');
    },
    closeFullTrackingModal() {
      $('#fullTrackingModal').modal('hide');
    },
  },
};
</script>

<style scoped>


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.step-title {
  font-weight: bold; /* Título en negrita */
}

.step-details {
  margin-top: 5px; /* Espacio entre el título y los detalles */
}

.content-wrapper {
  display: flex;               
  justify-content: space-between; 
  width: 100%;                  
  margin-top: 20px;             
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    box-shadow: 12px 13px 15px -4px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .cabeza {
  width: 45%;
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  animation: slideIn 0.5s ease forwards;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-right: 20px;
  width: 50%;
  padding: 25px;
  background-color: #292a2b;
  border-radius: 10px;
  box-shadow: 21px 17px 22px -4px rgba(0,0,0,0.4);
  transition: transform 0.3s ease;
  animation: slideIn 0.5s ease forwards;
}

.tracking-menu:hover{
  transform: scale(1.05);
}

.tracking-step {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.step-label-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: gray;
  margin-right: 10px;
  position: relative;
}
.current .step-indicator {
  background-color: transparent;
  border: 4px solid #007bff;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  width: 16px;
  height: 16px;
}

.step-label-container {
  display: flex;
  align-items: center;
}


.step-label {
  color: #ced4da;
  font-size: 18px;
}



.tracking-step.previous .step-indicator {
  background-color: gray;
  opacity: 0.8;
}

.tracking-step.previous + .tracking-step.previous .step-indicator {
  opacity: 0.5;
  width: 10px;
  height: 10px;
}

.tracking-step.previous + .tracking-step.previous + .tracking-step.previous .step-indicator {
  opacity: 0.2;
  width: 6px;
  height: 6px;
}

.tracking-step.current .step-label {
  font-size: 30px;
  opacity: 1;
}

.tracking-step.previous .step-label {
  font-size: 25px;
  opacity: 0.8;
}

.tracking-step.previous + .tracking-step.previous .step-label {
  font-size: 20px;
  opacity: 0.5;
}

.tracking-step.previous + .tracking-step.previous + .tracking-step.previous .step-label {
  font-size: 18px;
  opacity: 0.2;
}

.enter-button-container {
  display: flex;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  font-size: 24px;
}

.top-left-image {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 200px; 
    height: auto;
  }


  .enter-button {
    position: absolute;
    top: 20px;
    right: 20px;
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



.estimated-time {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #343a40;
  color: #f8f9fa;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
}

.estimated-label {
  margin-right: 10px;
}

.estimated-value {
  color: #41BC91;
}

.modal-content {
  border: none; /* Eliminar el borde del modal */
}

.table th,
.table td {
  vertical-align: middle; /* Centrar verticalmente el texto en las celdas */
}

.modal-body {
  max-height: 400px; /* Establecer altura máxima para el contenido del modal */
  overflow-y: auto; /* Agregar desplazamiento vertical */
}

.table-dark {
  background-color: #343a40; /* Ajustar el color de fondo de la tabla */
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #292b2c; /* Color de filas alternas */
}



</style>