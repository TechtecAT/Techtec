<template>
    <div class="row vh-100 no-gutters">
        <!-- Menú lateral -->
        <menu-lateral />

        <!-- Contenido principal (solo tabla y barra de búsqueda) -->
        <div class="col-12 col-md-9 col-lg-10 main-content">
            <div class="content mt-4">
                <!-- Barra de búsqueda pequeña alineada a la izquierda -->
                <div class="d-flex justify-content-start mb-4">
                    <input v-model="searchQuery" type="text" class="form-control search-bar"
                        placeholder="Buscar equipo por nombre, ID o propietario" />
                </div>

                <!-- Tabla de equipos -->
                <div class="table-responsive">
                    <table class="table table-dark table-hover text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre del Equipo</th>
                                <th>Estado</th>
                                <th>Ubicación</th>
                                <th>Fecha de Registro</th>
                                <th>Etiquetas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="equipo in orderedEquipos" :key="equipo.id">
                                <td>{{ equipo.id }}</td>
                                <td>{{ equipo.nombre }}</td>
                                <td>{{ equipo.estado }}</td>
                                <td>
                                    <select v-model="equipo.ubicacion" @change="updateUbicacion(equipo)"
                                        class="form-select">
                                        <option value="Sin asignar">Sin asignar</option>
                                        <option value="En espera">En espera</option>
                                        <option value="Trabajador 1">Trabajador 1</option>
                                        <option value="Trabajador 2">Trabajador 2</option>
                                        <option value="Almacén">Almacén</option>
                                        <option value="Listo para entrega">Listo para entrega</option>
                                    </select>
                                </td>
                                <td>{{ equipo.fechaRegistro }}</td>
                                <td>
                                    <select v-model="equipo.etiqueta" @change="updateEtiqueta(equipo)"
                                        class="form-select">
                                        <option value="Urgente">Urgente</option>
                                        <option value="No urgente">No urgente</option>
                                        <option value="Poco urgente">Poco urgente</option>
                                        <option value="Personalizada">Personalizada</option>
                                    </select>
                                    <input v-if="equipo.etiqueta === 'Personalizada'" type="text"
                                        v-model="equipo.etiquetaPersonalizada" placeholder="Etiqueta personalizada"
                                        class="form-control mt-2" @input="updateEtiqueta(equipo)" />
                                </td>
                                <td>
                                    <div class="info-button-panel">
                                        <button type="button" class="btn btn-primary ms-2 info-button"
                                            @click="showDetails(equipo)" data-bs-toggle="modal"
                                            :data-bs-target="'#modal' + equipo.id">
                                            <span class="material-symbols-outlined">info</span>
                                        </button>
                                        <button @click="go" class="info-button">
                                            <span class="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modales para cada equipo -->
        <div v-for="equipo in equipos" :key="'modal' + equipo.id" class="modal fade" :id="'modal' + equipo.id"
            tabindex="-1" aria-labelledby="'modalLabel' + equipo.id" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark text-white"> <!-- Clases para fondo oscuro y texto claro -->
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'modalLabel' + equipo.id">{{ equipo.nombre }}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button> <!-- Botón de cerrar en blanco -->
                    </div>
                    <div class="modal-body">
                        <p><strong>Modelo:</strong> {{ equipo.modelo }}</p>
                        <p><strong>Estado:</strong> {{ equipo.estado }}</p>
                        <p><strong>Última revisión:</strong> {{ equipo.ultimaRevision }}</p>
                        <p><strong>Ubicación:</strong> {{ equipo.ubicacion }}</p>
                        <p><strong>Propietario:</strong> {{ equipo.propietario }}</p>
                        <p><strong>Fecha de Registro:</strong> {{ equipo.fechaRegistro }}</p>
                        <p><strong>Etiqueta:</strong> {{ equipo.etiqueta === 'Personalizada' ?
                            equipo.etiquetaPersonalizada : equipo.etiqueta }}</p>
                        <p><strong>Descripción:</strong> {{ equipo.descripcion }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MenuLateral from '@/components/menu.vue'; // Importar el componente del menú lateral

export default {
    components: {
        MenuLateral, // Registrar el componente
    },
    setup() {
        const router = useRouter();
        const searchQuery = ref('');

        const equipos = ref([
            {
                id: 2,
                nombre: 'Laptop Msi',
                modelo: 'Msi Gf63',
                estado: 'En reparacion',
                ultimaRevision: '2024-09-20',
                propietario: 'Tadeo Martinez',
                ubicacion: 'Trabajador 1',
                fechaRegistro: '2024-06-14',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop Msi Core I5 Ram 16gb Ssd 1tb Geforce Rtx 3050.',
            },
            {
                id: 3,
                nombre: 'MacBook Pro',
                modelo: 'M1 13-inch',
                estado: 'En diagnóstico',
                ultimaRevision: '2024-09-01',
                propietario: 'Juan González',
                ubicacion: 'Trabajador 1',
                fechaRegistro: '2024-07-15',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'MacBook Pro con chip M1, 8GB de RAM.',
            },
            {
                id: 4,
                nombre: 'Samsung Galaxy S21',
                modelo: 'SM-G991B',
                estado: 'En reparación',
                ultimaRevision: '2024-09-02',
                propietario: 'Laura Martínez',
                ubicacion: 'Trabajador 2',
                fechaRegistro: '2024-08-01',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Teléfono con pantalla de 6.2 pulgadas.',
            },
            {
                id: 5,
                nombre: 'Lenovo ThinkPad',
                modelo: 'X1 Carbon Gen 9',
                estado: 'Listo para entrega',
                ultimaRevision: '2024-08-28',
                propietario: 'Roberto Ramírez',
                ubicacion: 'Almacén',
                fechaRegistro: '2024-08-20',
                etiqueta: 'No urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop ligera con procesador Intel Core i7.',
            },
            {
                id: 6,
                nombre: 'iPad Air',
                modelo: 'A2316',
                estado: 'En espera de piezas',
                ultimaRevision: '2024-08-29',
                propietario: 'Ana Torres',
                ubicacion: 'Sin asignar',
                fechaRegistro: '2024-09-01',
                etiqueta: 'Poco urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Tableta con pantalla de 10.9 pulgadas.',
            },

            {
                id: 7,
                nombre: 'Dell XPS 13',
                modelo: '9310',
                estado: 'En reparación',
                ultimaRevision: '2024-09-15',
                propietario: 'Carlos Pérez',
                ubicacion: 'Trabajador 2',
                fechaRegistro: '2024-07-10',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop ultradelgada con pantalla de 13.4 pulgadas.',
            },
            {
                id: 8,
                nombre: 'Sony PlayStation 5',
                modelo: 'CFI-1015A',
                estado: 'En diagnóstico',
                ultimaRevision: '2024-09-05',
                propietario: 'Luis Gómez',
                ubicacion: 'Almacén',
                fechaRegistro: '2024-08-20',
                etiqueta: 'No urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Consola de videojuegos de última generación.',
            },
            {
                id: 9,
                nombre: 'Samsung Galaxy Tab S7',
                modelo: 'SM-T870',
                estado: 'Listo para entrega',
                ultimaRevision: '2024-09-22',
                propietario: 'María Rodríguez',
                ubicacion: 'Trabajador 1',
                fechaRegistro: '2024-07-30',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Tableta de 11 pulgadas con S Pen incluido.',
            },
            {
                id: 10,
                nombre: 'HP Spectre x360',
                modelo: '13-aw2006ns',
                estado: 'En espera de piezas',
                ultimaRevision: '2024-08-29',
                propietario: 'Sofía Martínez',
                ubicacion: 'Sin asignar',
                fechaRegistro: '2024-09-01',
                etiqueta: 'Poco urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop convertible con pantalla táctil de 13.3 pulgadas.',
            },
            {
                id: 11,
                nombre: 'Google Pixel 6',
                modelo: 'GBH1G',
                estado: 'En reparación',
                ultimaRevision: '2024-09-14',
                propietario: 'Fernando Díaz',
                ubicacion: 'Trabajador 1',
                fechaRegistro: '2024-07-12',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Smartphone con cámara de 50 MP y pantalla AMOLED.',
            },
            {
                id: 12,
                nombre: 'Asus ROG Strix G15',
                modelo: 'G513IH',
                estado: 'En diagnóstico',
                ultimaRevision: '2024-09-03',
                propietario: 'Juan Carlos Fernández',
                ubicacion: 'Trabajador 2',
                fechaRegistro: '2024-08-01',
                etiqueta: 'No urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop gamer con procesador Ryzen y RTX 3050.',
            },
            {
                id: 13,
                nombre: 'Fitbit Charge 5',
                modelo: 'FB421BKBK',
                estado: 'Listo para entrega',
                ultimaRevision: '2024-09-20',
                propietario: 'Clara Sánchez',
                ubicacion: 'Almacén',
                fechaRegistro: '2024-08-10',
                etiqueta: 'Poco urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Reloj inteligente con monitor de salud y GPS.',
            },
            {
                id: 14,
                nombre: 'Xiaomi Mi Band 7',
                modelo: 'M2104B1',
                estado: 'En espera de piezas',
                ultimaRevision: '2024-09-16',
                propietario: 'Pedro Alvarado',
                ubicacion: 'Sin asignar',
                fechaRegistro: '2024-08-15',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Pulsera inteligente con monitor de actividad.',
            },
            {
                id: 15,
                nombre: 'Nikon D3500',
                modelo: 'D3500',
                estado: 'En reparación',
                ultimaRevision: '2024-09-25',
                propietario: 'Laura Ríos',
                ubicacion: 'Trabajador 2',
                fechaRegistro: '2024-07-25',
                etiqueta: 'No urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Cámara réflex digital para fotografía profesional.',
            },
            {
                id: 16,
                nombre: 'Microsoft Surface Pro 8',
                modelo: '1810',
                estado: 'En diagnóstico',
                ultimaRevision: '2024-09-12',
                propietario: 'Roberto López',
                ubicacion: 'Trabajador 1',
                fechaRegistro: '2024-07-05',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Dispositivo 2 en 1 con pantalla táctil de 13 pulgadas.',
            },
            {
                id: 17,
                nombre: 'Amazon Kindle Paperwhite',
                modelo: 'PQ94WIF',
                estado: 'Listo para entrega',
                ultimaRevision: '2024-09-18',
                propietario: 'María Elena',
                ubicacion: 'Almacén',
                fechaRegistro: '2024-08-22',
                etiqueta: 'Poco urgente',
                etiquetaPersonalizada: '',
                descripcion: 'E-reader con luz integrada y pantalla de alta resolución.',
            },
            {
                id: 18,
                nombre: 'Apple Watch Series 7',
                modelo: 'A2473',
                estado: 'En espera de piezas',
                ultimaRevision: '2024-09-08',
                propietario: 'Esteban Torres',
                ubicacion: 'Sin asignar',
                fechaRegistro: '2024-07-20',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Reloj inteligente con funciones avanzadas de salud.',
            },
            {
                id: 19,
                nombre: 'Lenovo Yoga 7i',
                modelo: '82KU00B2US',
                estado: 'En reparación',
                ultimaRevision: '2024-09-09',
                propietario: 'Gabriela Ruiz',
                ubicacion: 'Trabajador 1',
                fechaRegistro: '2024-06-25',
                etiqueta: 'No urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop convertible con bisagra de 360 grados.',
            },
            {
                id: 20,
                nombre: 'Oculus Quest 2',
                modelo: '301-00109-01',
                estado: 'En diagnóstico',
                ultimaRevision: '2024-09-30',
                propietario: 'José González',
                ubicacion: 'Trabajador 2',
                fechaRegistro: '2024-07-15',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Auriculares de realidad virtual para gaming.',
            },
            {
                id: 21,
                nombre: 'GoPro HERO9',
                modelo: 'CHDHX-901',
                estado: 'Listo para entrega',
                ultimaRevision: '2024-09-11',
                propietario: 'Valeria Castro',
                ubicacion: 'Almacén',
                fechaRegistro: '2024-08-05',
                etiqueta: 'Poco urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Cámara de acción con grabación en 5K.',
            },
            {
                id: 22,
                nombre: 'Bose QuietComfort 35 II',
                modelo: '783342-0010',
                estado: 'En espera de piezas',
                ultimaRevision: '2024-09-13',
                propietario: 'Andrés Jiménez',
                ubicacion: 'Sin asignar',
                fechaRegistro: '2024-08-18',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Auriculares inalámbricos con cancelación de ruido.',
            },
            {
                id: 23,
                nombre: 'Lenovo IdeaPad 3',
                modelo: '81W10068US',
                estado: 'En reparación',
                ultimaRevision: '2024-09-27',
                propietario: 'Santiago Castro',
                ubicacion: 'Trabajador 2',
                fechaRegistro: '2024-07-19',
                etiqueta: 'No urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop económica con buen rendimiento.',
            },
            {
                id: 24,
                nombre: 'HP Envy x360',
                modelo: '15-ed1010nr',
                estado: 'En diagnóstico',
                ultimaRevision: '2024-09-29',
                propietario: 'Silvia Ramos',
                ubicacion: 'Trabajador 1',
                fechaRegistro: '2024-07-29',
                etiqueta: 'Urgente',
                etiquetaPersonalizada: '',
                descripcion: 'Laptop convertible con procesador Ryzen.',
            },



        ]);

        const closeModalAndNavigate = () => {
            document.querySelectorAll('.modal').forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
            });

            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }

            router.push('/hoja_servicio');
        };

        const showDetails = (equipo) => {
            console.log('Detalles del equipo:', equipo);
        };

        const updateEtiqueta = (equipo) => {
            console.log(`Etiqueta actualizada para el equipo ${equipo.id}: ${equipo.etiqueta === 'Personalizada' ? equipo.etiquetaPersonalizada : equipo.etiqueta}`);
        };

        const updateUbicacion = (equipo) => {
            console.log(`Ubicación actualizada para el equipo ${equipo.id}: ${equipo.ubicacion}`);
        };
        const go = () => {
            router.push('/detalles_equipo');
        };

        const orderedEquipos = computed(() => {
            return equipos.value
                .filter(
                    (equipo) =>
                        equipo.id.toString().includes(searchQuery.value) ||
                        equipo.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        equipo.estado.toLowerCase().includes(searchQuery.value.toLowerCase())
                )
                .sort((a, b) => a.id - b.id);
        });

        return {
            equipos,
            searchQuery,
            showDetails,
            updateEtiqueta,
            updateUbicacion,
            closeModalAndNavigate,
            orderedEquipos,
            go
        };
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


.main-content {
    margin-left: 265px;
    /* Ajusta este valor según el ancho de tu menú */
    padding: 20px;
    /* Agrega un poco de padding si es necesario */
    overflow-y: auto;
    /* Agrega scroll si es necesario */
    height: calc(100vh - 40px);
    /* Ajusta la altura para que no exceda la pantalla */
}

.info-button-panel {
    display: flex;
}

.info-button {
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
    margin-right: 10px;
    /* Espacio entre los botones */
}

.info-button:last-child {
    margin-right: 0;
    /* Elimina el margen derecho del último botón */
}



.info-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

.table-responsive {
    overflow-x: auto;
}

.container-fluid {
    padding: 0;
    margin: 0;
}


.table {
    width: 100%;
    text-align: center;
    background-color: #343a40;
    /* Color de fondo de la tabla */
    border-radius: 10px;
    /* Bordes redondeados */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    /* Sombra de la tabla */
    overflow: hidden;
    /* Para asegurar que los bordes redondeados se vean bien */
    animation: slideIn 0.5s ease forwards;
}

.table th,
.table td {
    padding: 12px;
    border: none;
    /* Eliminar bordes predeterminados */
}

.table th {
    background-color: #495057;
    /* Color de fondo de los encabezados */
    color: white;
    /* Color del texto de los encabezados */
}

.table tr:hover {
    background-color: #6c757d;
    /* Color de fondo al pasar el cursor */
}

.search-bar {
    width: 30%;
    
}

input[type="text"] {
    margin-top: 30px;
    margin-bottom: 10px;
    animation: slideIn 0.5s ease forwards;
}

.no-gutters {
    margin-right: 0;
    margin-left: 0;
}

.row {
    margin: 0;
}
</style>