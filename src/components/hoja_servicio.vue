<template>
  <div class="full-page">
    <!-- Botón de regresar fuera del formulario -->
    <div class="back-button-container">
      <button @click="confirmarRegresar" class="btn back-button">Regresar</button>
    </div>

    <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="top-left-image" />

    <div class="content">
      <h2>Alta de equipo nuevo</h2>
      <div class="form-container">
        <!-- Formulario -->
        <div class="form-section">
          <label>ID del servicio:</label>
          <input type="text" v-model="servicioId" placeholder="ID del servicio" />

          <label>Fecha de registro:</label>
          <input type="date" v-model="fechaRegistro" />
        </div>

        <div class="form-section">
          <label>Datos del cliente:</label>
          <input type="text" placeholder="Nombres" />
          <input type="text" placeholder="Apellidos" />
          <input type="text" placeholder="Domicilio" />
          <input type="number" placeholder="Teléfono" />
          <input type="number" placeholder="Celular" />
          <input type="email" placeholder="Email" />
        </div>

        <div class="form-section">
          <label>Tipo de equipo:</label>
          <select>
            <option>Computadora</option>
            <option>Celular</option>
            <option>Impresora</option>
            <option>Tableta</option>
            <option>Monitor</option>
            <option>Agregar nuevo</option>
          </select>

          <label>Estado:</label>
          <div class="estado-container">
            <input type="radio" id="rojo" name="estado" />
            <label for="rojo" class="estado-rojo"></label>
            <input type="radio" id="amarillo" name="estado" />
            <label for="amarillo" class="estado-amarillo"></label>
            <input type="radio" id="verde" name="estado" />
            <label for="verde" class="estado-verde"></label>
          </div>
        </div>

        <div class="form-section">
          <label>Descripción del equipo:</label>
          <input type="text" placeholder="Marca" />
          <input type="text" placeholder="Serie" />
          <input type="text" placeholder="Modelo" />
          <textarea placeholder="Descripción"></textarea>
        </div>

        <div class="form-section">
          <label>Observaciones:</label>
          <textarea placeholder="Observaciones"></textarea>
        </div>

        <div class="form-section">
          <label>Tiempo estimado de entrega:</label>
          <input type="number" placeholder="Días" />
          <input type="number" placeholder="Hrs" />
        </div>

        <!-- Botones de imprimir y enviar -->
        <div class="form-buttons">
          <button @click="imprimirFormulario" class="btn print-button">Imprimir</button>
          <button @click="enviarFormulario" class="btn submit-button">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'AltaEquipo',
  setup() {
    const router = useRouter();
    const servicioId = ref('');
    const fechaRegistro = ref('');

    const confirmarRegresar = () => {
      const confirmacion = confirm('¿Estás seguro de que deseas regresar? Se perderán los datos no guardados.');
      if (confirmacion) {
        router.push('/trabajadores');
      }
    };

    const imprimirFormulario = () => {
      window.print();
    };

    const enviarFormulario = () => {
      alert('Formulario enviado correctamente.');
    };

    return {
      confirmarRegresar,
      imprimirFormulario,
      enviarFormulario,
      servicioId,
      fechaRegistro,
    };
  },
};
</script>



<style scoped>
/* General styles */
.full-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(circle, rgba(0, 83, 123, 1) 0%, rgba(0, 33, 86, 1) 35%);
  padding: 20px;
}

.top-left-image {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 10vw;
  max-width: 150px;
  height: auto;
}

.enter-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 7vw;
  max-width: 50px;
  height: auto;
  background: transparent;
  filter: invert(100%);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.enter-button:hover {
  transform: scale(1.1);
}

.content {
  text-align: center;
  color: white;
  width: 100%;
  max-width: 1200px;
}

.form-container {
  color: black;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  border: 5px solid #7b7a7a;
  width: 100%;
}

.form-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
}

textarea {
  resize: none;
  height: 100px;
}

.estado-container {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 5px;
}

.estado-rojo,
.estado-amarillo,
.estado-verde {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: transparent;
}

.estado-rojo {
  background-color: red;
}

.estado-amarillo {
  background-color: yellow;
}

.estado-verde {
  background-color: green;
}

@media (max-width: 768px) {
  .form-section {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .top-left-image {
    width: 30vw;
    max-width: 100px;
  }

  .enter-button {
    width: 15vw;
    max-width: 30px;
  }
}

/* General button styles */
.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

/* Specific styles for the back button */
.back-button {
  background-color: #ff4b4b;
}

.back-button:hover {
  background-color: #ff1c1c;
}

/* Button styles within the form */
.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.print-button, .submit-button {
  width: 45%;
}

/* Print styles */
@media print {
  .full-page {
    background: none;
    padding: 0;
  }

  .top-left-image {
    display: none;
  }

  .form-container {
    border: none;
    box-shadow: none;
    padding: 0;
    width: auto;
  }

  .form-section {
    width: 100%;
    margin-bottom: 10px;
  }

  .form-buttons {
    display: none;
  }

  .back-button-container {
    display: none;
  }
}
</style>
