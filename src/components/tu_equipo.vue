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
              <p>Aquí puedes ver detalles sobre el diagnóstico de tu equipo.</p>
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
.container mt-5{
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
}

.window {
  background-color: rgba(0, 0, 0, 0.575);
  margin-bottom: 30px;
  display: flex;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
}

.modal-content{
  background-color: rgba(0, 0, 0, 0.575);;
}

h4, p, h5 {
  color: white;
}

input.form-control {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

input.form-control::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.button {
margin-top: 10px;
margin-bottom: 10px;
margin-left: 10px;
margin-right: 10px;
}

button.btn-primary {
  background-color: #00b4d8;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

button.btn-outline-info {
  color: #00b4d8;
  border-color: #00b4d8;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

button.btn-outline-info:hover {
  background-color: #00b4d8;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.progress-bar {
  background-color: #00b4d8;
}

/* Estilos del timeline */
.timeline {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.timeline-step {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.step-marker {
  margin-right: 10px;
}

.complete-check {
  color: #00b4d8;
}

.current-check {
  color: #00b4d8;
  animation: spin 1.5s linear infinite;
}

.pending-check {
  color: gray;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.step-content h5 {
  margin: 0;
  font-size: 1.2rem;
}

.step-description {
  margin: 5px 0;
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
</style>