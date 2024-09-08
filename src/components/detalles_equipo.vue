<template>
    <div class="details-container">
      <h1>Detalles del Equipo</h1>
      <div v-if="equipo">
        <p><strong>Nombre:</strong> {{ equipo.nombre }}</p>
        <p><strong>Modelo:</strong> {{ equipo.modelo }}</p>
        <p><strong>Estado:</strong> {{ equipo.estado }}</p>
        <p><strong>Última revisión:</strong> {{ equipo.ultimaRevision }}</p>
        <p><strong>Propietario:</strong> {{ equipo.propietario }}</p>
        <p><strong>Descripción:</strong> {{ equipo.descripcion }}</p>
      </div>
      <button @click="goBack">Volver</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        equipo: null,
      };
    },
    beforeRouteEnter(to, from, next) {
      // Aquí puedes definir cómo obtener el equipo basado en la ruta, si es necesario
      next(vm => {
        // Realiza una acción una vez que el componente esté montado
        vm.updateEquipo();
      });
    },
    methods: {
      updateEquipo() {
        // Simular la actualización del equipo
        this.equipo = this.getEquipo();
      },
      getEquipo() {
        // Devuelve un equipo estático o selecciona uno basado en algún criterio local
        return {
          nombre: 'Laptop Dell',
          modelo: 'Inspiron 15',
          estado: 'En reparación',
          ultimaRevision: '2024-08-25',
          propietario: 'Carlos Pérez',
          descripcion: 'Laptop con pantalla de 15 pulgadas.',
        };
      },
      goBack() {
        this.$router.go(-1); // Volver a la página anterior
      },
    },
  };
  </script>
  
  <style scoped>
  .details-container {
    padding: 20px;
    background-color: #1a1a1a;
    color: white;
  }
  </style>
  
  