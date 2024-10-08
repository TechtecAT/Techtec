<template>
  <div class="container mt-5">
    <div class="window">
      <!-- Encabezado con el logo -->
      <div class="header-section">
        <img
          src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png"
          alt="Logo"
          class="logo img-fluid mb-4"
        />
      </div>

      <h4 class="text-center">Estado de tu equipo</h4>
      <p class="text">
        A continuación te mostramos el progreso del servicio de tu equipo.
      </p>

      <div class="row">
        <!-- Lado izquierdo: Buscador -->
        <div class="col-md-6 buscador-column">
          <h5>Buscar otro dispositivo</h5>
          <input
            type="text"
            class="form-control"
            placeholder="Ingresa el ID o nombre del dispositivo"
            v-model="searchQuery"
          />
          <button class="btn btn-primary mt-2" @click="searchDevice">
            Buscar
          </button>
        </div>

        <!-- Lado derecho: Progreso del servicio -->
        <div class="col-md-6 progreso-column">
          <div class="timeline">
            <div
              class="timeline-step"
              v-for="(step, index) in selectedDevice.steps"
              :key="index"
            >
              <!-- Step marker with icon indicating status -->
              <div class="step-marker">
                <i
                  :class="{
                    'fas fa-check-circle complete-check': currentStep > index,
                    'fas fa-circle-notch current-check': currentStep === index,
                    'far fa-circle pending-check': currentStep < index
                  }"
                ></i>
              </div>

              <!-- Step content -->
              <div class="step-content">
                <h5 :class="{ 'text-primary': currentStep === index, 'text-muted': currentStep !== index }">
                  {{ step.title }}
                </h5>
                <p v-if="step.description && currentStep === index" class="step-description">
                  {{ step.description }}
                </p>
                <button
                  class="btn btn-outline-info btn-sm"
                  @click="openModal(index)"
                  :disabled="currentStep < index"
                  :class="{
                    'text-muted': currentStep < index,
                    'text-primary': currentStep >= index
                  }"
                  data-bs-toggle="modal"
                  :data-bs-target="'#detailsModal' + index"
                >
                  Ver detalles
                </button>
              </div>

              <!-- Modal específico para cada paso -->
              <div
                class="modal fade"
                :id="'detailsModal' + index"
                tabindex="-1"
                aria-labelledby="detailsModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="detailsModalLabel">
                        Detalles de: {{ step.title }}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p>{{ step.modalContent }}</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Barra de progreso visual -->
          <div class="progress mt-4">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated bg-info"
              role="progressbar"
              :style="{ width: progressPercentage + '%' }"
              aria-valuenow="progressPercentage"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ progressPercentage }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para ver detalles del equipo general -->
      <div
        class="modal fade"
        id="detailsModal"
        tabindex="-1"
        aria-labelledby="detailsModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detailsModalLabel">
                Detalles de tu equipo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Diagnóstico de tu equipo.</p>
              <p>Diagnóstico: {{ selectedDevice.diagnosis }}</p>
              <p>Tipo de mantenimiento: {{ selectedDevice.maintenanceType }}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones para ver información del equipo y regresar -->
      <div class="text-center mt-4">
        <button
          type="button"
          class="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target="#detailsModal"
        >
          Ver información del equipo
        </button>
        <button type="button" class="btn btn-secondary" @click="goBack">
          Regresar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 2,
      searchQuery: '',
      devices: [
        {
          id: '1',
          name: 'Laptop Dell XPS',
          diagnosis: 'Problema de conexión de red',
          maintenanceType: 'Reparación de hardware',
          steps: [
            { title: 'Análisis inicial', description: 'El equipo está siendo evaluado por un técnico.', modalContent: 'El técnico está revisando el equipo para diagnosticar el problema.' },
            { title: 'Búsqueda de piezas', description: 'Estamos buscando las piezas necesarias para la reparación.', modalContent: 'En este paso se buscan y aseguran las piezas necesarias.' },
            { title: 'Armado', description: 'El equipo está siendo ensamblado.', modalContent: 'Se ensamblan las piezas nuevas en el equipo.' },
            { title: 'Pruebas finales', description: 'Estamos realizando pruebas.', modalContent: 'Se realizan pruebas para verificar que todo funcione correctamente.' },
            { title: 'Listo para entrega', description: 'El equipo está listo para entrega.', modalContent: 'El equipo ha pasado todas las pruebas y está listo.' }
          ]
        },
        {
          id: '2',
          name: 'Smartphone Samsung Galaxy',
          diagnosis: 'Pantalla rota',
          maintenanceType: 'Cambio de pantalla',
          steps: [
            { title: 'Análisis inicial', description: 'Se ha detectado una pantalla rota.', modalContent: 'Diagnóstico inicial: Pantalla rota.' },
            { title: 'Búsqueda de repuesto', description: 'Se está buscando un repuesto de pantalla.', modalContent: 'Buscando una pantalla compatible para reemplazar.' },
            { title: 'Reemplazo de pantalla', description: 'Pantalla siendo reemplazada.', modalContent: 'El técnico está instalando la nueva pantalla.' },
            { title: 'Pruebas finales', description: 'Probando la funcionalidad de la nueva pantalla.', modalContent: 'Se están realizando pruebas para asegurarse de que la pantalla funcione correctamente.' },
            { title: 'Listo para entrega', description: 'El equipo está listo para ser entregado.', modalContent: 'El reemplazo de pantalla ha sido exitoso, el equipo está listo.' }
          ]
        }
      ],
      selectedDevice: null
    };
  },
  methods: {
    openModal(index) {
      const modalId = `#detailsModal${index}`;
      const modalElement = document.querySelector(modalId);
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    },
    searchDevice() {
      const device = this.devices.find(
        (d) =>
          d.id === this.searchQuery || d.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      if (device) {
        this.selectedDevice = device;
        this.currentStep = 0; // Resetea el progreso para el dispositivo seleccionado
      } else {
        alert('Dispositivo no encontrado');
      }
    },
    goBack() {
      window.history.back();
    }
  },
  computed: {
    progressPercentage() {
      return ((this.currentStep + 1) / this.selectedDevice.steps.length) * 100;
    }
  },
  created() {
    this.selectedDevice = this.devices[0]; // Selecciona el primer equipo por defecto
  }
};
</script>

<style scoped>
/* General container styling */
.container {
  background-color: rgba(0, 0, 0, 0.575);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
  color: #f8f9fa; 
  padding: 20px;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
  margin-bottom: 30px;
}

/* Header section with logo */
.header-section {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  height: auto;
}

/* Text and title styling */
h4 {
  color: #f8f9fa;
  margin-bottom: 20px;
}

.text {
  color: #ced4da;
  font-size: 16px;
  margin-bottom: 20px;
}

/* Columns layout */
.buscador-column,
.progreso-column {
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #ced4da;
}

.buscador-column h5,
.progreso-column h5 {
  color: #f8f9fa;
}

/* Form styling */
.form-control {
  background-color: #f8f9fa;
  color:  #1f2122;
  border: 1px solid #495057;
  border-radius: 50px;
}

.form-control::placeholder {
  color: #adb5bd;
}

button {
  color: #f8f9fa;
  border-radius: 50px;
}

/* Timeline styles */
.timeline {
  padding-left: 0;
  list-style: none;
}

.timeline-step {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.step-marker {
  margin-right: 15px;
}

.complete-check {
  color: #007bff;
}

.current-check {
  color: #53e2ff;
}

.pending-check {
  color: #6c757d;
}

.complete-check, .current-check, .pending-check {
  font-size: 1.5rem;
}

.current-check {
  animation: spin 1.5s linear infinite;
}

.step-content {
  flex-grow: 1;
}

.step-content h5 {
  font-size: 18px;
  margin-bottom: 5px;
}

.step-description {
  font-size: 14px;
  color: #ffffff;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


/* Progress bar */
.progress {
  height: 20px;
}

.progress-bar {
  font-size: 14px;
}

/* Modals */
.modal-content {
  background-color: #343a40;
  color: #f8f9fa;
}

.modal-header .btn-close {
  background-color: #495057;
  border-radius: 50px;
}

/* Buttons */
.btn-primary {
  background-color: #007bff;
  border: none;
  border-radius: 50px;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  border-radius: 50px;
  margin-left: 5px;
}

.btn-info {
  background-color: #17a2b8;
  border: none;
  border-radius: 50px;
  margin-right: 5px;
}

/* Ensure text is readable */
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

h4, h5 {
  font-weight: 600;
}

/* Media queries for responsive layout */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col-md-6 {
    width: 100%;
    margin-bottom: 20px;
  }
}

</style>