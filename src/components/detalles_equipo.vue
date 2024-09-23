<template>
  <div class="details-container">
    <h1>Detalles del Equipo</h1>
    <div v-if="equipo" class="details-content">
      <!-- Carrusel de fotos -->
      <div id="carouselPhotos" class="carousel slide">
        <div class="carousel-inner">
          <div
            v-for="(photo, index) in equipo.fotos"
            :key="index"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <img :src="photo" class="d-block w-100" alt="Imagen del equipo" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselPhotos"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselPhotos"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <!-- Detalles del equipo -->
      <div class="detail-list">
        <div class="detail-item">
          <span class="label">Nombre:</span>
          <span class="value">{{ equipo.nombre }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Modelo:</span>
          <span class="value">{{ equipo.modelo }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Estado:</span>
          <span class="value">{{ equipo.estado }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Última revisión:</span>
          <span class="value">{{ equipo.ultimaRevision }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Propietario:</span>
          <span class="value">{{ equipo.propietario }}</span>
        </div>
      </div>

      <!-- Descripción del problema (precargada y no editable) -->
      <div class="detail-item">
        <span class="label">Descripción del problema:</span>
        <textarea v-model="descripcionProblema" disabled rows="3"></textarea>
      </div>
      
      <!-- Sección de mantenimiento sin modales -->
      <div class="maintenance-section">
        <h2>Mantenimiento</h2>
        <ul>
          <li v-for="(paso, index) in mantenimientoPasos" :key="index">
            <input 
              type="checkbox" 
              v-model="paso.completado" 
              :disabled="!puedeCompletarPaso(index)" 
            />
            <span :class="{ completed: paso.completado }">{{ paso.descripcion }}</span>
          </li>
        </ul>
        <button @click="subirInforme" class="submit-button">Subir Informe</button>
      </div>
    </div>

    <button @click="goBack" class="back-button">Volver</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipo: null,
      descripcionProblema: 'Pantalla rota debido a caída. Se requiere diagnóstico y reparación completa.', // Descripción precargada
      mantenimientoPasos: [
        { descripcion: 'Diagnóstico inicial', completado: false, detalle: 'Abrir el equipo y revisar componentes internos como tarjeta madre, batería, etc.' },
        { descripcion: 'Reemplazo de pantalla', completado: false, detalle: 'Desmontar la pantalla rota y colocar una nueva pantalla compatible.' },
        { descripcion: 'Revisión de conexiones internas', completado: false, detalle: 'Verificar que todos los cables y conexiones internas estén correctas.' },
        { descripcion: 'Pruebas de funcionalidad', completado: false, detalle: 'Encender el equipo y verificar que la pantalla y demás componentes funcionen adecuadamente.' },
        { descripcion: 'Limpieza final', completado: false, detalle: 'Limpiar el equipo tanto por fuera como por dentro, y realizar un pulido si es necesario.' },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.updateEquipo();
    });
  },

  
  methods: {
    
    updateEquipo() {
      this.equipo = this.getEquipo();
    },
    getEquipo() {
      return {
        nombre: 'Laptop Dell',
        modelo: 'Inspiron 15',
        estado: 'En reparación',
        ultimaRevision: '2024-08-25',
        propietario: 'Carlos Pérez',
        fotos: [
          'https://http2.mlstatic.com/D_NQ_NP_2X_704019-MLU77801295055_072024-F.webp',
          'https://http2.mlstatic.com/D_NQ_NP_2X_703158-MLU77801156511_072024-F.webp',
          'https://http2.mlstatic.com/D_NQ_NP_2X_797428-MLU77582865016_072024-F.webp',
        ],
      };
    },
    puedeCompletarPaso(index) {
      if (index === 0) {
        return true;
      }
      return this.mantenimientoPasos[index - 1].completado;
    },
    subirInforme() {
      const pasosCompletados = this.mantenimientoPasos.filter(paso => paso.completado);
      console.log('Descripción del problema:', this.descripcionProblema);
      console.log('Informe de mantenimiento:', pasosCompletados);
      alert('Informe subido correctamente');
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>


<style scoped>
.details-container {
  padding: 30px;
  background-color: #1a1a1a;
  color: #f1f1f1;
  border-radius: 10px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.details-container h1,
.details-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.carousel {
  margin-bottom: 20px;
}

.carousel-inner img {
  border-radius: 5px;
}

.carousel-control-prev,
.carousel-control-next {
  filter: invert(1);
}

.details-content {
  display: flex;
  flex-direction: column;
}

.detail-list {
  margin-top: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #2a2a2a;
  border-radius: 5px;
}

.label {
  font-weight: bold;
  color: #c0c0c0;
}

.value {
  color: #e0e0e0;
}

textarea {
  width: 100%;
  padding: 10px;
  background-color: #2a2a2a;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 5px;
  resize: none;
}

.maintenance-section {
  margin-top: 40px;
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
}

.maintenance-section ul {
  list-style: none;
  padding: 0;
}

.maintenance-section li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.maintenance-section input[type="checkbox"] {
  margin-right: 10px;
}

.maintenance-section .completed {
  text-decoration: line-through;
  color: #808080;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.back-button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>