<template>
   <Animacion />
  <div class="container">
   
    <div class="window">
      <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="top-left-image" />

      <a href="/login" rel="noopener noreferrer" class="enter-button-container">
  <span class="material-symbols-outlined enter-button">login</span>
</a>


      <div class="content">
        <h1>Consulta el estado de tu equipo</h1>
        <div class="search-container">
          <input v-model="numeroServicio" type="text" placeholder="Introduce tu número de servicio..." class="search-bar" />
          <div class="button-container">
            <button @click="buscar" class="search-button">
  <span class="material-symbols-outlined">search</span>
</button>

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
    box-shadow: 12px 13px 15px -4px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .top-left-image {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 200px; 
    height: auto;
  }


  .enter-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 7vw; 
    max-width: 50px;
    height: auto;
    font-size: 40px; 
    color: white;
    transition: transform 0.3s ease, filter 0.3s ease;
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
  align-items: center; /* Alinea verticalmente el input y el botón */
  gap: 10px; /* Espacio entre el input y el botón */
}

  
.search-bar {
  flex: 1; /* Permite que el input tome el máximo espacio disponible */
  padding: 12px 20px;
  border: 2px solid #444;
  border-radius: 25px;
  font-size: 16px;
  margin-bottom: 0; /* Quita el margen inferior */
  background: #fff;
  color: #333;
}

  
  .search-bar:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .button-container {
    display: flex;
    gap: 10px;
  }
  
  .search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}



.search-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
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
  