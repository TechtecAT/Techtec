<template>
    <div class="container">
      <div class="window">
        <!-- Contenedor para el logo, botón y barra de búsqueda -->
        <div class="header-section">
          <div class="logo-container">
            <img src="https://i.postimg.cc/rpZKd7mT/Dise-o-sin-t-tulo-3.png" alt="Logo" class="logo" />
          </div>
  
          <!-- Barra de búsqueda y botón para registrar equipo nuevo -->
          <div class="controls-container">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar por ID, nombre, modelo o propietario"
              class="search-bar"
            />
            <button class="register-button">Registrar equipo nuevo</button>
          </div>
        </div>
  
        <div class="content">
          <h1>Equipos a tu cargo</h1>
          <div class="equipment-container">
            <div
              v-for="equipo in filteredEquipos"
              :key="equipo.id"
              class="equipment-card"
            >
              <div class="equipment-info">
                <h2>{{ equipo.nombre }}</h2>
                <p><strong>Modelo:</strong> {{ equipo.modelo }}</p>
                <p><strong>Estado:</strong> {{ equipo.estado }}</p>
                <p><strong>Última revisión:</strong> {{ equipo.ultimaRevision }}</p>
                <p><strong>Propietario:</strong> {{ equipo.propietario }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        equipos: [
          {
            id: 1,
            nombre: 'Laptop Dell',
            modelo: 'Inspiron 15',
            estado: 'En reparación',
            ultimaRevision: '2024-08-25',
            propietario: 'Carlos Pérez',
          },
          {
            id: 2,
            nombre: 'iPhone 12',
            modelo: 'A2172',
            estado: 'Listo para entrega',
            ultimaRevision: '2024-08-30',
            propietario: 'María López',
          },
          // Más equipos
        ],
      };
    },
    computed: {
      filteredEquipos() {
        return this.equipos.filter((equipo) => {
          const searchTerm = this.searchQuery.toLowerCase();
          return (
            equipo.id.toString().includes(searchTerm) ||
            equipo.nombre.toLowerCase().includes(searchTerm) ||
            equipo.modelo.toLowerCase().includes(searchTerm) ||
            equipo.propietario.toLowerCase().includes(searchTerm)
          );
        });
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
    justify-content: flex-start;
    align-items: center;
  }
  
  .header-section {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .logo-container {
    display: flex;
    justify-content: flex-start;
  }
  
  .logo {
    width: 10vw;
    max-width: 150px;
  }
  
  .controls-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .search-bar {
    padding: 10px;
    border-radius: 20px;
    border: 2px solid #ccc;
    width: 300px;
    transition: border-color 0.3s ease;
  }
  
  .search-bar:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .register-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .register-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  .content {
    text-align: center;
    color: white;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .equipment-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
    padding: 10px;
  }
  
  .equipment-card {
    display: flex;
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    color: white;
    width: 250px;
    max-width: 100%;
    flex-direction: column;
    text-align: left;
  }
  
  .equipment-info h2 {
    margin-bottom: 10px;
  }
  
  /* Estilos responsivos */
  @media (max-width: 768px) {
    .logo {
      width: 20vw;
      max-width: 120px;
    }
  
    .register-button {
      width: auto;
      font-size: 14px;
      padding: 10px 20px;
    }
  
    .equipment-card {
      width: 200px;
    }
  
    .search-bar {
      width: 200px;
    }
  }
  </style>