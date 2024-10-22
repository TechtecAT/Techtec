<template>
    <div class="quote-container">
      <h1>Cotización del Equipo</h1>
      <div v-if="equipo" class="quote-content">
  
        <!-- Sección para cotizar el precio del servicio -->
        <div class="service-quote">
          <h2>Cotización del Servicio</h2>
          <div class="form-group">
            <label for="precioServicio">Precio del Servicio:</label>
            <input type="number" v-model="precioServicio" id="precioServicio" />
          </div>
          <div class="form-group">
            <label for="descripcionServicio">Descripción del Servicio:</label>
            <textarea v-model="descripcionServicio" id="descripcionServicio" rows="3"></textarea>
          </div>
          <button @click="confirmarCotizacionServicio" class="confirm-quote-button">
            Confirmar Cotización del Servicio
          </button>
        </div>
  
        <!-- Sección para agregar nuevas piezas -->
        <div class="parts-quote">
          <h2>Agregar Nueva Pieza</h2>
          <div class="form-group">
            <label for="nombrePieza">Nombre de la Pieza:</label>
            <input type="text" v-model="nombrePieza" placeholder="Nombre de la pieza" />
          </div>
          <div class="form-group">
            <label for="costoPieza">Costo Estimado:</label>
            <input type="number" v-model="costoPieza" placeholder="Costo estimado" />
          </div>
          <button @click="iniciarProcesoPieza" class="add-part-button">Agregar Pieza</button>
        </div>
  
        <!-- Mostrar el proceso de la pieza -->
        <div class="pieza-proceso" v-for="(pieza, index) in piezas" :key="index">
          <h3>Pieza: {{ pieza.nombre }}</h3>
          <div v-if="!pieza.confirmado">
            <h4>1. Confirmación</h4>
            <button @click="confirmarPieza(pieza)">Confirmar</button>
            <button @click="rechazarPieza(index)">Rechazar</button>
          </div>
  
          <div v-if="pieza.confirmado && !pieza.pedido">
            <h4>2. Pedir Pieza</h4>
            <label for="tiempoTransito">Tiempo de Tránsito (días):</label>
            <input type="number" v-model="pieza.tiempoTransito" placeholder="Tiempo en días" />
            <button @click="pedirPieza(pieza)">Pedir Pieza</button>
          </div>
  
          <div v-if="pieza.pedido && !pieza.recibido">
            <h4>3. Recepción de Pieza</h4>
            <button @click="recibirPieza(pieza, 'bien')">Llegó Bien</button>
            <button @click="recibirPieza(pieza, 'defecto')">Llegó con Defecto</button>
            <button @click="recibirPieza(pieza, 'daño')">Llegó Dañada</button>
          </div>
  
          <div v-if="pieza.recibido && pieza.estado === 'bien'">
            <h4>4. Reemplazo</h4>
            <button @click="reemplazarPieza(pieza)">Reemplazar</button>
          </div>
  
          <div v-if="pieza.reemplazada">
            <h4>Pieza Confirmada y Reemplazada</h4>
          </div>
        </div>
  
        <!-- Mostrar la cotización actual -->
        <div class="current-quote">
          <h2>Cotización Actual</h2>
          <div v-if="cotizacionActual">
            <strong>Servicio:</strong> {{ cotizacionActual.servicio.descripcion }} - Precio: ${{ cotizacionActual.servicio.precio }} <br />
            <strong>Piezas:</strong> 
            <div v-for="(pieza, index) in cotizacionActual.piezas" :key="index">
              {{ pieza.nombre }} - Precio: ${{ pieza.costo }} - Estado: {{ pieza.estado }}
            </div>
            <strong>Total: ${{ calcularTotal() }}</strong>
          </div>
          <div v-else>No hay cotización actual.</div>
        </div>
  
        <!-- Botón de volver a la hoja de servicio -->
        <button @click="goBack" class="back-button">Volver al Servicio</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        equipo: null,
        precioServicio: 0,
        descripcionServicio: '',
        piezas: [],
        nombrePieza: '',
        costoPieza: 0,
        cotizacionActual: null, // Almacena la cotización actual
      };
    },
    created() {
      this.updateEquipo();
    },
    methods: {
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
      iniciarProcesoPieza() {
        const nuevaPieza = {
          nombre: this.nombrePieza,
          costo: this.costoPieza,
          confirmacion: false,
          pedido: false,
          recibido: false,
          estado: '',
          tiempoTransito: 0,
          reemplazada: false,
        };
        this.piezas.push(nuevaPieza);
        this.nombrePieza = '';
        this.costoPieza = 0;
      },
      confirmarPieza(pieza) {
        pieza.confirmado = true;
      },
      rechazarPieza(index) {
        this.piezas.splice(index, 1);
      },
      pedirPieza(pieza) {
        pieza.pedido = true;
      },
      recibirPieza(pieza, estado) {
        pieza.recibido = true;
        pieza.estado = estado;
  
        if (estado === 'defecto' || estado === 'daño') {
          // Lógica para manejar garantía, repetir proceso
          alert('Se procesará la garantía y se repetirá el proceso.');
          // Lógica para reiniciar el proceso podría ir aquí
        }
      },
      reemplazarPieza(pieza) {
        pieza.reemplazada = true;
        // Aquí puedes añadir la lógica para agregar el costo de la pieza a la cotización
        alert(`Pieza ${pieza.nombre} reemplazada exitosamente.`);
        // También podrías actualizar la cotización aquí
      },
      confirmarCotizacionServicio() {
        this.cotizacionActual = {
          servicio: {
            precio: this.precioServicio,
            descripcion: this.descripcionServicio,
          },
          piezas: this.piezas, // Copiar las piezas actuales
        };
        alert('Cotización del servicio confirmada.');
        console.log('Cotización del servicio:', this.cotizacionActual);
      },
      calcularTotal() {
        // Calcular el total sumando el precio del servicio y el precio de las piezas
        const totalPiezas = this.cotizacionActual.piezas.reduce((sum, pieza) => sum + pieza.costo, 0);
        return this.cotizacionActual.servicio.precio + totalPiezas;
      },
      goBack() {
        this.$router.push({ name: 'servicio' });
      },
    },
  };
  </script>
  
  

  <style scoped>
/* Estilos generales */
.quote-container {
  padding: 30px;
  background-color: #1a1a1a;
  color: #f1f1f1;
  border-radius: 10px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.quote-container h1,
.quote-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

/* Estilos para la sección de cotización de servicios */
.service-quote,
.parts-quote {
  margin-top: 40px;
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
}

.service-quote input,
.parts-quote input {
  width: 100%;
  padding: 8px;
  background-color: #444;
  color: #f1f1f1;
  border: none;
  border-radius: 5px;
}

.service-quote textarea {
  width: 100%;
  padding: 10px;
  background-color: #2a2a2a;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 5px;
  resize: none;
}

/* Estilos para las piezas */
.pieza-item {
  margin-bottom: 15px;
}

/* Botones */
.confirm-quote-button,
.add-part-button,
.back-button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.confirm-quote-button {
  background-color: #28a745;
  color: white;
}

.confirm-quote-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.add-part-button {
  background-color: #007bff;
  color: white;
}

.add-part-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}
</style>

  