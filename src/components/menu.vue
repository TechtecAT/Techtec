<template>
    <div class="col-100 col-md-300 col-lg-2 sidebar d-flex flex-column align-items-center py-4">
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
           alt="Foto del trabajador" class="profile-pic" />
      <h4 class="text-white">{{ trabajador.nombre }}</h4>
      <div class="buttons-container">
        <button @click="goToHojaServicio" class="action-button" aria-label="Registrar equipo nuevo">
          <span class="material-symbols-outlined">app_registration</span>
        </button>
        <button @click="go" class="action-button" aria-label="Cerrar sesión">
          <span class="material-symbols-outlined">logout</span>
        </button>
      </div>
      <ul class="nav flex-column mt-4 w-100">
        <li class="nav-item">
          <a href="/panel" class="nav-link">Equipos</a>
        </li>
        <li class="nav-item">
          <a href="/" class="nav-link">Reportes</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const router = useRouter();
      const trabajador = ref({ nombre: '' });
  
      // Función para obtener los datos del trabajador basado en el ID guardado
      const fetchTrabajador = async () => {
  const userId = localStorage.getItem('userId'); // Obtener el ID del usuario desde localStorage
  if (userId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/trabajadores/${userId}`);
      const { nombre, apellido_paterno, apellido_materno } = response.data;

      // Concatenar el nombre completo
      trabajador.value.nombre = `${nombre} ${apellido_paterno} ${apellido_materno}`;
    } catch (error) {
      console.error('Error al obtener los datos del trabajador:', error);
    }
  }
};

  
      // Llamar a fetchTrabajador cuando el componente se monte
      onMounted(() => {
        fetchTrabajador();
      });
  
      const goToHojaServicio = () => {
        router.push('/hoja_servicio');
      };
  
      const go = () => {
        localStorage.clear(); // Limpiar el localStorage y cerrar sesión
        router.push('/login');
      };
  
      return {
        trabajador,
        goToHojaServicio,
        go,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos mantenidos como están */
  .sidebar {
    position: fixed;
    background-color: #292a2b;
    height: 100vh;
    color: white;
    text-align: center;
    box-shadow: 14px 5px 20px 0px rgba(0, 0, 0, 0.4);
  }
  .profile-pic {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    margin-bottom: 10px;
    border-radius: 50%;
    object-fit: cover;
  }
  .nav-link {
    color: white;
  }
  .nav-link:hover {
    color: #007bff;
  }
  .buttons-container {
    display: flex;
    margin-bottom: -15px;
  }
  .action-button {
    margin-left: 5px;
    margin-right: 5px;
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
  .action-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  </style>
  