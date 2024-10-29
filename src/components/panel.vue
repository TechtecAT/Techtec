<template>
    <div class="row vh-100 no-gutters">
        <menu-lateral />

        <div class="col-12 col-md-9 col-lg-10 main-content">
            <div class="content mt-4">
                <div class="d-flex justify-content-start mb-4">
                    <input v-model="searchQuery" type="text" class="form-control search-bar"
                        placeholder="Buscar equipo por nombre, ID o propietario" />
                </div>

                <div class="table-responsive">
                    <table class="table table-dark table-hover text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Equipo</th>
                                <th>Ubicación</th>
                                <th>Trabajador Asignado</th>
                                <th>Fecha de Registro</th>
                                <th>Etiquetas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="equipo in orderedEquipos" :key="equipo.id">
                                <td>{{ equipo.id }}</td>
                                <td>{{ equipo.nombre }}</td>
                                <td>{{ equipo.ubicacion }}</td> <!-- Muestra la ubicación directamente -->
                                <td>{{ equipo.propietario }}</td>
                                <td>{{ equipo.fechaRegistro }}</td>
                                <td>
                                    <div class="etiquetas">
                                        <span v-if="equipo.etiquetas.length > 0">
                                            <span v-for="(etiqueta, index) in equipo.etiquetas" :key="index">
                                                {{ etiqueta }}<span v-if="index < equipo.etiquetas.length - 1">, </span>
                                            </span>
                                        </span>
                                        <span v-else>No hay etiquetas</span>
                                    </div>
                                    <div class="add">
                                        <button class="info-button" @click="editEtiqueta(equipo)">
                                            <span class="material-symbols-outlined">add</span>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div class="info-button-panel">
                                        <button class="btn btn-primary ms-2 info-button" @click="showDetails(equipo)"
                                            data-bs-toggle="modal" :data-bs-target="'#modal' + equipo.id">
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

         <!-- Modal de Detalles del Equipo -->
         <div v-for="equipo in equipos" :key="'modal' + equipo.id" class="modal fade" :id="'modal' + equipo.id"
            tabindex="-1" aria-labelledby="'modalLabel' + equipo.id" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'modalLabel' + equipo.id">{{ equipo.nombre }}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-dark table-bordered text-white">
                            <tbody>
                                <tr>
                                    <th>Equipo</th>
                                    <td>{{ equipo.nombre }}</td>
                                </tr>
                                <tr>
                                    <th>Marca</th>
                                    <td>{{ equipo.marca }}</td>
                                </tr>
                                <tr>
                                    <th>No. Serie</th>
                                    <td>{{ equipo.noSerie }}</td>
                                </tr>
                                <tr>
                                    <th>Modelo</th>
                                    <td>{{ equipo.modelo }}</td>
                                </tr>
                                <tr>
                                    <th>Descripción</th>
                                    <td>{{ equipo.descripcion }}</td>
                                </tr>
                                <tr>
                                    <th>Estado</th>
                                    <td>{{ equipo.estado }}</td>
                                </tr>
                                <tr>
                                    <th>Etiquetas</th>
                                    <td>
                                        <span v-if="equipo.etiquetas.length > 0">
                                            <span v-for="(etiqueta, index) in equipo.etiquetas" :key="index">
                                                {{ etiqueta }}<span v-if="index < equipo.etiquetas.length - 1">, </span>
                                            </span>
                                        </span>
                                        <span v-else>No hay etiquetas</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Cliente</th>
                                    <td>{{ equipo.cliente.nombre }}</td>
                                </tr>
                                <tr>
                                    <th>Domicilio</th>
                                    <td>{{ equipo.cliente.domicilio }}</td>
                                </tr>
                                <tr>
                                    <th>Celulares</th>
                                    <td>
                                        <ul>
                                            <li v-for="numero in equipo.cliente.celulares" :key="numero">
                                                <a :href="`https://wa.me/${numero}`" target="_blank"
                                                    class="text-info text-decoration-none">
                                                    {{ numero }}
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>
                                        <a :href="`mailto:${equipo.cliente.email}`"
                                            class="text-info text-decoration-none">
                                            {{ equipo.cliente.email }}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Asegúrate de importar axios
import Swal from 'sweetalert2';
import MenuLateral from '@/components/menu.vue';

export default {
    components: { MenuLateral },
    setup() {
        const router = useRouter();
        const searchQuery = ref('');
        const equipos = ref([]); // Inicializa el array vacío
        const etiquetas = ref([]); // Inicializa el array vacío para las etiquetas

        // Función para obtener los equipos del endpoint
        const fetchEquipos = async () => {
    try {
        const userId = localStorage.getItem('userId'); // Asegúrate de que estás usando la clave correcta
        const response = await axios.get(`http://localhost:3000/api/servicios/${userId}`);
        equipos.value = response.data;
        await fetchEtiquetas(); // Llama a la función para obtener etiquetas
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
    }
};

        // Función para obtener todas las etiquetas
        const fetchEtiquetas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/etiquetas');
                etiquetas.value = response.data; // Almacena las etiquetas
                // Asocia las etiquetas a los equipos
                equipos.value.forEach(equipo => {
                    // Filtrar las etiquetas que pertenecen al equipo
                    equipo.etiquetas = etiquetas.value
                        .filter(et => et.id_servicio === equipo.id)
                        .map(et => et.etiqueta); // Guarda solo la etiqueta
                });
            } catch (error) {
                console.error('Error al obtener las etiquetas:', error);
            }
        };

        // Llama a la función fetchEquipos cuando el componente se monte
        onMounted(() => {
            fetchEquipos();
        });

        // Modificar la función editEtiqueta para agregar la etiqueta
        const editEtiqueta = (equipo) => {
            Swal.fire({
                title: 'Agregar etiqueta',
                input: 'text',
                inputPlaceholder: 'Escribe la etiqueta aquí...',
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const nuevaEtiqueta = result.value || 'Sin etiqueta';

                    try {
                        // Realiza la solicitud POST al endpoint para agregar la etiqueta
                        await axios.post('http://localhost:3000/api/etiquetas', {
                            etiqueta: nuevaEtiqueta,
                            id_servicio: equipo.id // Usa el id del equipo
                        });
                        // Añadir la nueva etiqueta al array del equipo
                        equipo.etiquetas.push(nuevaEtiqueta);
                        Swal.fire('Etiqueta agregada', '', 'success'); // Muestra un mensaje de éxito
                    } catch (error) {
                        console.error('Error al agregar la etiqueta:', error);
                        Swal.fire('Error al agregar la etiqueta', error.response.data.error, 'error');
                    }
                }
            });
        };

        const go = () => router.push('/detalles_equipo');

        const orderedEquipos = computed(() =>
            equipos.value.filter((equipo) =>
                equipo.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        );

        return {
            equipos,
            searchQuery,
            orderedEquipos,
            editEtiqueta,
            go,
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
    justify-content: center; /* Centra horizontalmente los botones */
    align-items: center; /* Centra verticalmente los botones */
    gap: 10px; /* Espaciado entre los botones */
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

.etiquetas{
    display: none;
}

.table-responsive {
    overflow-x: auto;
}

.container-fluid {
    padding: 0;
    margin: 0;
}

.add{
    margin-left: 40px;
}


.table {
    width: 100%;
    text-align: center;
    background-color: #343a40; /* Color de fondo de la tabla */
    border-radius: 10px; /* Bordes redondeados */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Sombra de la tabla */
    overflow: hidden; /* Para asegurar que los bordes redondeados se vean bien */
    animation: slideIn 0.5s ease forwards;
}

.table th,
.table td {
    padding: 12px;
    border: none;
     vertical-align: middle;
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