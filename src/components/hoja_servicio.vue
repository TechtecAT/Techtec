<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="form">

      <h3>Registro de nuevo equipo</h3>

      <!-- Apartado 1: Datos del Cliente -->
      <input v-model="cliente.nombre" placeholder="Nombre" type="text" id="nombre" required>

      <label for="apellido_paterno"></label>
      <input v-model="cliente.apellidoPaterno" placeholder="Apellido paterno" type="text" id="apellido_paterno" required>

      <label for="apellido_materno"></label>
      <input v-model="cliente.apellidoMaterno" placeholder="Apellido Materno" type="text" id="apellido_materno" required>

      <label for="domicilio"></label>
      <input v-model="cliente.domicilio" placeholder="Domicilio" type="text" id="domicilio" required>

      <label for="email"></label>
      <input v-model="cliente.email" placeholder="Email" type="email" id="email" required>

      <label for="celular"></label>
      <div v-for="(celular, index) in cliente.celulares" :key="index" class="cell-container">
        <input v-model="cliente.celulares[index]" type="text" :id="'celular' + index" placeholder="Celular" required>
        <button type="button" @click="addCelular">
          <img src="https://cdn-icons-png.flaticon.com/512/4885/4885419.png" class="add-icon">
        </button>
      </div>

      <!-- Apartado 2: Equipo -->
      <div class="inline-container">
        <label for="tipo_equipo"></label>
        <div class="options-container">
          <select v-model="equipo.idTipoEquipo" id="tipo_equipo" @change="fetchTiposServicio">
            <option v-for="tipo in tiposEquipo" :key="tipo.id_tipo_equipo" :value="tipo.id_tipo_equipo">{{ tipo.equipo }}</option>
            <option value="">Tipo de equipo</option>
          </select>
          <button type="button" @click="addTipoEquipo">
            <img src="https://cdn-icons-png.flaticon.com/512/4885/4885419.png" class="add-icon">
          </button>
        </div>

        <label for="agregados"></label>
        <div class="options-container">
          <select v-model="equipo.idAgregados" id="agregados">
            <option v-for="agregado in agregados" :key="agregado.id_agregados" :value="agregado.id_agregados">{{ agregado.tipo_agregado }}</option>
            <option value="">Agregados</option>
          </select>
          <button type="button" @click="addAgregado">
            <img src="https://cdn-icons-png.flaticon.com/512/4885/4885419.png" class="add-icon">
          </button>
        </div>

        <label for="tipo_servicio"></label>
        <div class="options-container">
          <select v-model="equipo.idTipoServicio" id="tipo_servicio">
            <option v-for="tipo in tiposServicio" :key="tipo.id_tipo_servicio" :value="tipo.id_tipo_servicio">{{ tipo.servicio }}</option>
            <option value="">Tipo de Servicio</option>
          </select>
          <button type="button" @click="addTipoServicio">
            <img src="https://cdn-icons-png.flaticon.com/512/4885/4885419.png" class="add-icon">
          </button>
        </div>
      </div>

      <label for="descripcion_agregado"></label>
      <input v-model="equipo.descripcionAgregado" placeholder="Descripción del Agregado" type="text" id="descripcion_agregado" />
      
      <div class="inline-container">
        <label for="marca"></label>
        <div class="equip-container">
          <input v-model="equipo.marca" placeholder="Marca" type="text" id="marca" required>
        </div>

        <label for="serie"></label>
        <div class="equip-container">
          <input v-model="equipo.serie" placeholder="Serie" type="text" id="serie" required>
        </div>

        <label for="modelo"></label>
        <div class="equip-container">
          <input v-model="equipo.modelo" placeholder="Modelo" type="text" id="modelo" required>
        </div>

        <label>Estado:</label>
        <div class="radio-group">
          <input type="radio" id="bueno" value="BUENO" v-model="equipo.estado" class="status-input" />
          <label for="bueno" class="status-label green"></label>

          <input type="radio" id="regular" value="REGULAR" v-model="equipo.estado" class="status-input" />
          <label for="regular" class="status-label yellow"></label>

          <input type="radio" id="malo" value="MALO" v-model="equipo.estado" class="status-input" />
          <label for="malo" class="status-label red"></label>
        </div>
      </div>

      <label for="descripcion_equipo"></label>
      <input v-model="equipo.descripcion" placeholder="Descripción del Equipo" type="text" id="descripcion_equipo" required>

      <label for="observaciones"></label>
      <textarea v-model="equipo.observaciones" placeholder="Observaciones:" id="observaciones"></textarea>

      <label for="tiempo_entrega"></label>
      <div class="time-container">
        <input v-model.number="equipo.tiempoEntrega" placeholder="Tiempo de Entrega" type="number" id="tiempo_entrega" required>

        <input type="radio" id="dias" value="DIAS" v-model="equipo.medidaTiempo" />
        <label for="dias" class="option-label">Días</label>

        <input type="radio" id="horas" value="HORAS" v-model="equipo.medidaTiempo" />
        <label for="horas" class="option-label">Hrs</label>
      </div>
      
      <div>
        <button type="submit" class="submit-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/157/157977.png" class="submit-icon">
        </button>

        <button @click="regresar" class="back-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/8591/8591477.png" class="submit-icon">
        </button>

        <button type="button" @click="imprimirFormulario" class="print-btn">
        <img src="https://img.icons8.com/?size=100&id=123&format=png&color=000000" class="print-icon">
      </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      cliente: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        domicilio: '',
        email: '',
        celulares: ['']
      },
      equipo: {
        idTipoEquipo: '',
        estado: '',
        idTipoServicio: '',
        idAgregados: '',
        descripcionAgregado: '',
        marca: '',
        serie: '',
        modelo: '',
        descripcion: '',
        observaciones: '',
        tiempoEntrega: null,
        medidaTiempo: ''
      },
      tiposEquipo: [],
      tiposServicio: [],
      agregados: []
    };
  },
  mounted() {
    this.fetchTiposEquipo();
    this.fetchTiposServicio();
    this.fetchAgregados();
  },
  methods: {

    
    validarCampos() {
  // Expresiones regulares para validación
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const direccionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/; 
  const celularRegex = /^[0-9]+$/; 
  const tiempoRegex = /^[0-9]+$/; 

  // Validar campos del cliente
  if (!this.cliente.nombre || !nombreRegex.test(this.cliente.nombre)) {
    Swal.fire({
      icon: 'warning',
      title: 'Nombre inválido',
      text: 'El nombre solo puede contener letras y espacios.',
    });
    return false;
  }

  if (!this.cliente.apellidoPaterno || !nombreRegex.test(this.cliente.apellidoPaterno)) {
    Swal.fire({
      icon: 'warning',
      title: 'Apellido paterno inválido',
      text: 'El apellido paterno solo puede contener letras y espacios.',
    });
    return false;
  }

  if (!this.cliente.apellidoMaterno || !nombreRegex.test(this.cliente.apellidoMaterno)) {
    Swal.fire({
      icon: 'warning',
      title: 'Apellido materno inválido',
      text: 'El apellido materno solo puede contener letras y espacios.',
    });
    return false;
  }

  if (!this.cliente.domicilio || !direccionRegex.test(this.cliente.domicilio)) {
    Swal.fire({
      icon: 'warning',
      title: 'Domicilio inválido',
      text: 'El domicilio solo puede contener letras, números, espacios y los caracteres . , -',
    });
    return false;
  }

  if (!this.cliente.email || !emailRegex.test(this.cliente.email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Correo electrónico inválido',
      text: 'Por favor, introduce un correo electrónico válido.',
    });
    return false;
  }

  // Validar celular
 


  // Validar campos del equipo
  if (!this.equipo.idTipoEquipo) {
    Swal.fire({
      icon: 'warning',
      title: 'Tipo de equipo inválido',
      text: 'Por favor, selecciona un tipo de equipo.',
    });
    return false;
  }

  // Sin restricciones para marca, serie y modelo como solicitaste
  if (!this.equipo.marca) {
    Swal.fire({
      icon: 'warning',
      title: 'Marca inválida',
      text: 'Por favor, introduce una marca.',
    });
    return false;
  }

  if (!this.equipo.modelo) {
    Swal.fire({
      icon: 'warning',
      title: 'Modelo inválido',
      text: 'Por favor, introduce un modelo.',
    });
    return false;
  }

  if (!this.equipo.estado) {
    Swal.fire({
      icon: 'warning',
      title: 'Estado inválido',
      text: 'Por favor, selecciona un estado.',
    });
    return false;
  }

  if (!this.equipo.descripcion || this.equipo.descripcion.length < 10) {
    Swal.fire({
      icon: 'warning',
      title: 'Descripción inválida',
      text: 'La descripción debe contener al menos 10 caracteres.',
    });
    return false;
  }

  // Validar tiempo de entrega
  if (!this.equipo.tiempoEntrega || !tiempoRegex.test(this.equipo.tiempoEntrega)) {
    Swal.fire({
      icon: 'warning',
      title: 'Tiempo de entrega inválido',
      text: 'El tiempo de entrega debe ser un número entero.',
    });
    return false;
  }

  if (!this.equipo.medidaTiempo || (this.equipo.medidaTiempo !== 'DIAS' && this.equipo.medidaTiempo !== 'HORAS')) {
    Swal.fire({
      icon: 'warning',
      title: 'Medida de tiempo inválida',
      text: 'Por favor, selecciona si el tiempo de entrega es en días u horas.',
    });
    return false;
  }

  // Si todas las validaciones pasaron
  return true;
},



    regresar(){
      router.push('/trabajadores');
    },

    addCelular() {
      this.cliente.celulares.push('');
    },

    async submitForm() {
  // Llamar a validarCampos antes de enviar el formulario
  if (!this.validarCampos()) {
    return; // Si la validación falla, no se continúa con el envío del formulario
  }

  const formData = {
    cliente: { ...this.cliente },
    celular: { celulares: this.cliente.celulares },
    equipo: { ...this.equipo },
    servicio: {
      observaciones: this.equipo.observaciones,
      tiempo_entrega: this.equipo.tiempoEntrega,
      medida_tiempo: this.equipo.medidaTiempo,
      id_tipo_servicio: this.equipo.idTipoServicio,
      id_trabajador: 1
    }
  };

  try {
    // Intentar enviar los datos del formulario
    await axios.post('http://localhost:3000/submitForm', formData);

    Swal.fire({
      title: 'Registro Exitoso',
      text: 'El equipo ha sido registrado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      router.push('/trabajadores');
    });
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al registrar el equipo. Intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
},

    async fetchTiposEquipo() {
      const response = await axios.get('http://localhost:3000/api/tipos_equipo');
      this.tiposEquipo = response.data;
    },
    async fetchTiposServicio() {
      const response = await axios.get('http://localhost:3000/api/tipos_servicio');
      this.tiposServicio = response.data;
    },
    async fetchAgregados() {
      const response = await axios.get('http://localhost:3000/api/agregados');
      this.agregados = response.data;
    },

    async addTipoEquipo() {
    const { value: nombreEquipo } = await Swal.fire({
      title: 'Agregar Nuevo Tipo de Equipo',
      input: 'text',
      inputLabel: 'Nombre del Tipo de Equipo',
      inputPlaceholder: 'Ingresa el nombre del nuevo tipo de equipo',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡El nombre del equipo es obligatorio!';
        }
      }
    });

    if (nombreEquipo) {
      try {
        await axios.post('http://localhost:3000/api/tipos_equipo', { equipo: nombreEquipo });
        this.fetchTiposEquipo();  
        Swal.fire(`Nuevo equipo "${nombreEquipo}" agregado correctamente.`);
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el equipo.', 'error');
      }
    }
  },

  async addAgregado() {
    const { value: nombreAgregado } = await Swal.fire({
      title: 'Agregar Nuevo Agregado',
      input: 'text',
      inputLabel: 'Nombre del Agregado',
      inputPlaceholder: 'Ingresa el nombre del nuevo agregado',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡El nombre del agregado es obligatorio!';
        }
      }
    });

    if (nombreAgregado) {
      try {
        await axios.post('http://localhost:3000/api/agregados', { tipo_agregado: nombreAgregado });
        this.fetchAgregados(); 
        Swal.fire(`Nuevo agregado "${nombreAgregado}" agregado correctamente.`);
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el agregado.', 'error');
      }
    }
  },

  async addTipoServicio() {
    const { value: nombreServicio } = await Swal.fire({
      title: 'Agregar Nuevo Tipo de Servicio',
      input: 'text',
      inputLabel: 'Nombre del Tipo de Servicio',
      inputPlaceholder: 'Ingresa el nombre del nuevo tipo de servicio',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡El nombre del servicio es obligatorio!';
        }
      }
    });

    if (nombreServicio) {
      try {
        await axios.post('http://localhost:3000/api/tipos_servicio', { servicio: nombreServicio });
        this.fetchTiposServicio();  
        Swal.fire(`Nuevo servicio "${nombreServicio}" agregado correctamente.`);
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el servicio.', 'error');
      }
    }
  },

    imprimirFormulario() {
      window.print();
    }
  }
};
</script>

<style scoped>
.form-container {
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  margin: 40px auto; 
  background-color: rgba(0, 0, 0, 0.575);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
}


.form {
  display: flex;
  flex-direction: column;
  color: white; 
}

h2 {
  color: white;
  margin-bottom: 16px;
}

label {
  margin-top: 10px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea,
select {
  margin-top: 5px;
  margin-bottom: 15px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  color: white;
  outline: none;
  width: 100%;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus,
select:focus {
  border-bottom-color: #00FFFF;
}

textarea {
  height: 100px;
  resize: none;
}

.cell-container {
  display: flex;
  align-items: center;
}

.options-container {
  display: flex;
  align-items: center;
  margin-right: 30px;
  margin-left: 30px;
  color:black;
}

.options-container select {
  color: white; 
  padding: 5px; 
}

.options-container select option {
  background-color: rgba(0, 0, 0, 0.938); 
  color: white;
}

.equip-container{
  display: flex;
  align-items: center;
  margin-right: 30px;
  margin-left: 30px;
}


button {
  background-color:transparent;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  transition: transform 0.3s ease;
}

button:hover {
  transform: scale(1.1);
}

.add-icon{
  width: 20px;
  height: 20px;
  filter: invert(100%);
}

.inline-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inline-container .cell-container,
.inline-container .radio-group {
  margin-right: 15px; 
  flex: 1;
}

.radio-group {
  display: flex;
  align-items: center;
  justify-content:  center;
}

.status-input {
  display: none; 
}

.status-label {
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
}

/* Círculo de color */
.status-label.green {
  background-color: green;
}

.status-label.yellow {
  background-color: yellow;
}

.status-label.red {
  background-color: red;
}

/* Cambiar color a blanco al seleccionar */
.status-input:checked + .status-label {
 
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); 
  transition: box-shadow 0.3s ease; 
}


.time-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Ocultar los radios */
input[type="radio"] {
  display: none;
}

.option-label {
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
}

/* Subrayado y estilo aplicado al texto cuando el radio está seleccionado */
input[type="radio"]:checked + .option-label {
  text-decoration: underline;
  font-weight: bold;
  color: rgb(0, 183, 255);
}
.submit-btn {
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 70px;
  height: 60px;
}

.back-btn {
  background-color: #c71c1c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 70px;
  height: 60px;
}

.print-btn {
  background-color: #1adecd;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 70px;
  height: 60px;
}

.submit-icon{
  width: 50px;
  height: 50px;
}

.submit-btn:hover {
  background-color: #218838;
}

.submit-icon:hover {
  filter: invert(100%);
}

.print-icon{
  width: 50px;
  height: 50px;
}

.print-btn:hover {
  background-color: #1c4fc7;
}

.print-icon:hover {
  filter: invert(100%);
}

</style>
