<template>
    <div class="container">
      <Animacion />
  
      <div class="window">
        <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="top-left-image" />
  
        <div class="content">
          <h2>Alta de equipo nuevo</h2>
          <div class="form-container">
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
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Animacion from '@/components/animacion.vue';
  
  export default {
    components: {
      Animacion,
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgb(0, 83, 123);
    background: radial-gradient(circle, rgba(0, 83, 123, 1) 0%, rgba(0, 33, 86, 1) 35%);
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
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
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
  }
  
  .form-container {
    color:black;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
    max-width: 1500px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 15px;
    border: 5px solid #7b7a7a;
  }
  
  .form-section {
    display: flex;
    flex-direction: column;
    width: 45%;
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
  </style>
  