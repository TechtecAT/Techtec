<template>
  <menu-lateral />
  <div class="details-container">
    <div class="container">
      <h1>Detalles del Equipo</h1>
      <div v-if="equipo" class="details-content">
        <!-- Detalles del equipo -->
        <div class="detail-list">
          <div class="detail-item" v-for="(value, key) in equipo" :key="key">
            <span class="label">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</span>
            <span class="value">{{ value }}</span>
          </div>
        </div>

        <!-- Descripción del problema -->
        <div class="detail-item">
          <span class="label">Descripción del problema:</span>
          <textarea v-model="descripcionProblema" disabled rows="3"></textarea>
        </div>

        <!-- Sección para agregar pasos al servicio -->
        <div class="maintenance-section">
          <h2>Pasos del Servicio</h2>
          <div class="add-step">
            <input v-model="nuevoPaso.nombre" placeholder="Nombre del paso" />
            <input v-model="nuevoPaso.descripcionGeneral" placeholder="Descripción general" />
            <textarea v-model="nuevoPaso.descripcionDetallada" placeholder="Descripción detallada"></textarea>
            <button @click="agregarPaso" class="add-button">Agregar Paso</button>
          </div>

          <!-- Lista de pasos agregados -->
          <ul>
            <li v-for="(paso, index) in mantenimientoPasos" :key="index" :class="{ completed: paso.completado, editing: paso.editando }">
              <input type="checkbox" v-model="paso.completado" />
              <span v-if="!paso.editando">{{ paso.nombre }} - {{ paso.descripcionGeneral }}</span>
              
              <!-- Modo de edición de paso -->
              <div v-else class="edit-step">
                <input v-model="paso.nombre" placeholder="Nombre del paso" />
                <input v-model="paso.descripcionGeneral" placeholder="Descripción general" />
                <textarea v-model="paso.descripcionDetallada" placeholder="Descripción detallada"></textarea>
              </div>

              <button v-if="!paso.editando" @click="activarEdicion(paso)" class="edit-button">Editar</button>
              <button v-if="paso.editando" @click="confirmarEdicion(paso)" class="confirm-button">Confirmar</button>
              <button @click="eliminarPaso(index)" class="delete-button">Eliminar</button>
            </li>
          </ul>
        </div>

        <!-- Botón de Subir Informe -->
        <button @click="subirInforme" class="submit-button">Subir Informe</button>
        <button @click="irCotizacion" class="back-button">Ir a Cotización</button>
        <button @click="goBack" class="back-button">Volver</button>
      </div>
    </div>
  </div>
</template>

<script>
import MenuLateral from '@/components/menu.vue';

export default {
  components: {
    MenuLateral,
  },
  data() {
    return {
      equipo: null,
      descripcionProblema: 'Pantalla rota debido a caída. Se requiere diagnóstico y reparación completa.',
      mantenimientoPasos: [],
      nuevoPaso: {
        nombre: '',
        descripcionGeneral: '',
        descripcionDetallada: '',
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.updateEquipo();
    });
  },
  methods: {
    irCotizacion() {
      this.$router.push({ name: 'cotizacion' });
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
      };
    },
    agregarPaso() {
      if (this.nuevoPaso.nombre && this.nuevoPaso.descripcionGeneral && this.nuevoPaso.descripcionDetallada) {
        this.mantenimientoPasos.push({ ...this.nuevoPaso, completado: false, editando: false });
        this.nuevoPaso = { nombre: '', descripcionGeneral: '', descripcionDetallada: '' };
      } else {
        alert('Completa todos los campos para agregar un paso.');
      }
    },
    activarEdicion(paso) {
      paso.editando = true;
    },
    confirmarEdicion(paso) {
      paso.editando = false;
    },
    eliminarPaso(index) {
      this.mantenimientoPasos.splice(index, 1);
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

.container {
  margin-top: 10px;
  background-color: #1a1a1a;
  color: white;
  padding: 40px 20px 20px;
  max-width: 750px;
  margin: 0 auto;
  border-radius: 15px;
  box-shadow: 18px 10px 15px -3px rgba(0, 0, 0, 0.4);
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

.service-steps {
  margin-top: 40px;
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
}

.service-steps h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #e0e0e0;
  text-align: center;
}

.service-steps input[type="text"],
.service-steps textarea {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  background-color: #1a1a1a;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 5px;
}

.service-steps button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #ffc107;
  color: #1a1a1a;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.service-steps button:hover {
  background-color: #e0a800;
  transform: scale(1.05);
}

.service-steps ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.service-steps li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2a2a2a;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.service-steps input[type="checkbox"] {
  margin-right: 10px;
}

.service-steps .completed {
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

/* Estilos nuevos para pasos de mantenimiento */
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
  background-color: #3a3a3a;
  padding: 10px;
  border-radius: 5px;
}
.add-step input,
.add-step textarea {
  width: 100%;
  margin: 5px 0;
  padding: 8px;
  background-color: #3a3a3a;
  color: #e0e0e0;
  border: 1px solid #555;
  border-radius: 5px;
}
.add-button {
  background-color: #4caf50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.add-button:hover {
  background-color: #45a049;
}

/* Botones de acción en cada paso */
.edit-button,
.confirm-button,
.delete-button {
  background-color: #555;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
.edit-button:hover {
  background-color: #007bff;
}
.confirm-button:hover {
  background-color: #28a745;
}
.delete-button:hover {
  background-color: #dc3545;
}

/* Estilos para el estado de edición */
.editing {
  background-color: #4a4a4a;
  border: 2px dashed #5d9cec;
  padding: 15px;
}
.editing input,
.editing textarea {
  background-color: #5d5d5d;
  color: #e0e0e0;
  border: 1px solid #777;
  padding: 8px;
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
}



</style>