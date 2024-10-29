<template>
  <menu-lateral />
  <div class="details-container">

    <div class="container">
    <h1>Detalles del Equipo</h1>
    <div v-if="equipo" class="details-content">


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
        <div class="detail-item">
          <span class="label">numero:</span>
          <span class="value">{{ equipo.numero }}</span>
        </div>
      </div>

      <!-- Descripción del problema -->
      <div class="detail-item">
        <span class="label">Descripción del problema:</span>
        <textarea v-model="descripcionProblema" disabled rows="3"></textarea>
      </div>
      
      
        <button @click="subirInforme" class="submit-button">Subir Informe</button>
      </div>
    </div>

   
  </div>

</template>

<script>
import MenuLateral from '@/components/menu.vue';
export default {
  components: {
        MenuLateral, // Registrar el componente
    },
  data() {
    return {
      equipo: null,
      descripcionProblema: 'Pantalla rota debido a caída. Se requiere diagnóstico y reparación completa.', 
      mantenimientoPasos: [
        { descripcion: 'Diagnóstico inicial', completado: false, detalle: 'Abrir el equipo y revisar componentes internos como tarjeta madre, batería, etc.' },
        { descripcion: 'Reemplazo de pantalla', completado: false, detalle: 'Desmontar la pantalla rota y colocar una nueva pantalla compatible.' },
        { descripcion: 'Revisión de conexiones internas', completado: false, detalle: 'Verificar que todos los cables y conexiones internas estén correctas.' },
        { descripcion: 'Pruebas de funcionalidad', completado: false, detalle: 'Encender el equipo y verificar que la pantalla y demás componentes funcionen adecuadamente.' },
        { descripcion: 'Limpieza final', completado: false, detalle: 'Limpiar el equipo tanto por fuera como por dentro, y realizar un pulido si es necesario.' },
      ],
      pasoMostrado: null, // Variable para saber qué paso está siendo mostrado
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.updateEquipo();
    });
  },
  methods: {
    mostrarDetalle(paso) {
      this.pasoMostrado = paso;
    },
    ocultarDetalle() {
      this.pasoMostrado = null;
    },
    updateEquipo() {
      this.equipo = this.getEquipo();
    },
    getEquipo() {
      return {
        nombre: 'Laptop Msi',
        modelo: 'Msi Gf63',
        estado: 'En reparación',
        ultimaRevision: '2024-09-16',
        propietario: 'Tadeo Martinez',
        numero: '951 396 9605',
        fotos: [
          'https://http2.mlstatic.com/D_NQ_NP_2X_839299-MLM73906886025_012024-F.webp',
          'https://http2.mlstatic.com/D_NQ_NP_2X_979819-MLM75962726731_042024-F.webp',
          'https://http2.mlstatic.com/D_NQ_NP_2X_622676-MLM75792648390_042024-F.webp',
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
.container{
  margin-top: 10px;
  background-color: #1a1a1a;
  color: white;
  padding: 40px 20px 20px; 
  max-width: 750px;
  margin: 0 auto; 
  border-radius: 15px;
  box-shadow: 18px 10px 15px -3px rgba(0,0,0,0.4);
}
.details-container {
  padding: 40px 20px 100px; 
  max-width: 750px;
  margin: 0 auto; 
  position: relative; 
  top: 0px;
  left: 7%;
  animation: slideIn 0.5s ease forwards;
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

.tooltip {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

</style>