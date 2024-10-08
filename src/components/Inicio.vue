<template>
   <Animacion />
  <div class="container">
   
    <div class="window">
      <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="top-left-image" />

      <a href="/login" rel="noopener noreferrer" class="enter-button-container">
        <img src="https://triviaglobe.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenter.9bc9986f.png&w=640&q=75" alt="Enter Button" class="enter-button" />
      </a>

      <div class="content">
        <h1>Consulta el estado de tu equipo</h1>
        <div class="search-container">
          <input v-model="numeroServicio" type="text" placeholder="Introduce tu número de servicio..." class="search-bar" />
          <div class="button-container">
            <button @click="buscar" class="search-button">Buscar</button>
            <button class="no-service-button">No tengo mi número de servicio</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Animacion from '@/components/animacion.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    Animacion,
  },
  data() {
    return {
      numeroServicio: '', 
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    buscar() {
      if (this.numeroServicio.trim()) {
        this.router.push(`/tu_equipo?numero=${encodeURIComponent(this.numeroServicio)}`);
      } else {
        alert('Por favor, introduce un número de servicio.');
      }
    },
  },
};
</script>

  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgb(0,83,123);
    background: radial-gradient(circle, rgba(0,83,123,1) 0%, rgba(0,33,86,1) 35%);
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
  
  .search-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .search-bar {
    width: 100%;
    max-width: 600px;
    padding: 12px 20px;
    border: 2px solid #444;
    border-radius: 25px;
    font-size: 16px;
    margin-bottom: 20px;
    background: #fff;
    color: #333;
    transition: border-color 0.3s ease;
  }
  
  .search-bar:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .button-container {
    display: flex;
    gap: 10px;
  }
  
  .search-button, .no-service-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .search-button:hover, .no-service-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  .no-service-button {
    background-color: #6c757d; 
  }
  
  .no-service-button:hover {
    background-color: #5a6268;
  }
  
  @media (max-width: 768px) {
    .top-left-image {
      width: 20vw;
      max-width: 120px;
    }
  
    .enter-button {
      width: 10vw;
      max-width: 40px;
    }
  
    .search-bar {
      max-width: 90%;
      font-size: 14px;
    }
  
    .search-button, .no-service-button {
      padding: 10px 20px;
      font-size: 14px;
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
  
    .search-bar {
      max-width: 90%;
      font-size: 12px;
    }
  
    .search-button, .no-service-button {
      padding: 8px 16px;
      font-size: 12px;
    }
  }
  </style>
  