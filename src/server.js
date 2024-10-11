import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

// Crear la aplicación Express

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Habilita CORS

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '',  
  database: 'techtec'  
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Rutas (endpoints) GET


app.get('/api/agregados', (req, res) => {
    db.query('SELECT * FROM   AGREGADOS', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  app.get('/api/celulares', (req, res) => {
    db.query('SELECT * FROM   CELULARES', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  app.get('/api/clientes2', (req, res) => {
    db.query('SELECT * FROM   CLIENTES', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  

  app.get('/api/equipo', (req, res) => {
    db.query('SELECT * FROM   EQUIPO', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  app.get('/api/servicio', (req, res) => {
    db.query('SELECT * FROM   SERVICIO', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  app.get('/api/tipos_equipo', (req, res) => {
    db.query('SELECT * FROM   TIPOS_EQUIPO', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  app.get('/api/tipos_servicio', (req, res) => {
    db.query('SELECT * FROM   TIPOS_SERVICIO', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  app.get('/api/trabajadores', (req, res) => {
    db.query('SELECT * FROM   TRABAJADORES', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });


// Rutas (endpoints) POST 

// Agregar Cliente
app.post('/api/clientes', (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, domicilio, email } = req.body;
    db.query('INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, domicilio, email) VALUES (?, ?, ?, ?, ?)', 
    [nombre, apellidoPaterno, apellidoMaterno, domicilio, email], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Cliente agregado', id_cliente: result.insertId });
    });
  });
  
  
  // Agregar Celular
  app.post('/api/celulares', (req, res) => {
    const { idCliente, celular } = req.body;
    db.query('INSERT INTO celulares (id_cliente, celular) VALUES (?, ?)', 
    [idCliente, celular], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Celular agregado', id_celular: result.insertId });
    });
  });
  
  
  app.post('/api/equipo', (req, res) => {
    const { marca, serie, modelo, descripcion, estado,descripcion_agregado, idTipoEquipo, idAgregados } = req.body;
    db.query('INSERT INTO equipo (marca, serie, modelo, descripcion, estado,descripcion_agregado, id_tipo_equipo, id_agregados) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [marca, serie, modelo, descripcion, estado,descripcion_agregado, idTipoEquipo, idAgregados], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Equipo agregado', id_equipo: result.insertId });
    });
  });
  
  
  app.post('/api/tipos_servicio', (req, res) => {
    const { servicio, idTipoEquipo } = req.body;
    db.query('INSERT INTO tipos_servicio (servicio, id_tipo_equipo) VALUES (?, ?)', 
    [servicio, idTipoEquipo], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Tipo de servicio agregado', id_tipo_servicio: result.insertId });
    });
  });
  
  
  // Agregar Tipo de Equipo
  app.post('/api/tipos_equipo', (req, res) => {
    const { equipo } = req.body;
    db.query('INSERT INTO TIPOS_EQUIPO (equipo) VALUES (?)', 
    [equipo], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Tipo de equipo agregado', id_tipo_equipo: result.insertId });
    });
  });
  
// Agregar Agregado
app.post('/api/agregados', (req, res) => {
    const { tipoAgregado } = req.body;
    db.query('INSERT INTO AGREGADOS (tipo_agregado) VALUES (?)', 
    [tipoAgregado], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Agregado agregado', id_agregado: result.insertId });
    });
  });
  

  // Agregar Servicio
app.post('/api/servicio', (req, res) => {
    const { observaciones, tiempoEntrega, medidaTiempo, idCliente, idEquipo, idTipoServicio, idTrabajador } = req.body;
    db.query('INSERT INTO servicio (observaciones, tiempo_entrega, medida_tiempo, id_cliente, id_equipo, id_tipo_servicio, id_trabajador) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [observaciones, tiempoEntrega, medidaTiempo, idCliente, idEquipo, idTipoServicio, idTrabajador], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Servicio agregado', id_servicio: result.insertId });
    });
  });
  
  app.post('/submitForm', async (req, res) => {
    const { cliente, celular, equipo, servicio } = req.body;

    // Usar la conexión directamente
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Insertar en la tabla de clientes
        db.query(
            "INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, domicilio, email) VALUES (?, ?, ?, ?, ?)", 
            [cliente.nombre, cliente.apellidoPaterno, cliente.apellidoMaterno, cliente.domicilio, cliente.email],
            (err, resultCliente) => {
                if (err) {
                    return db.rollback(() => res.status(500).json({ error: err.message }));
                }
                const idCliente = resultCliente.insertId;

                // Insertar cada celular
                const celularPromises = celular.celulares.map(numeroCelular => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            "INSERT INTO celulares (celular, id_cliente) VALUES (?, ?)", 
                            [numeroCelular, idCliente],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                });

                Promise.all(celularPromises)
                    .then(() => {
                        // Insertar en la tabla de equipo
                        db.query(
                            "INSERT INTO equipo (marca, serie, modelo, descripcion, estado, descripcion_agregado, id_tipo_equipo, id_agregados) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                            [equipo.marca, equipo.serie, equipo.modelo, equipo.descripcion, equipo.estado, equipo.descripcionAgregado, equipo.idTipoEquipo, equipo.idAgregados],
                            (err, resultEquipo) => {
                                if (err) {
                                    return db.rollback(() => res.status(500).json({ error: err.message }));
                                }
                                const idEquipo = resultEquipo.insertId;

                                // Insertar en la tabla de servicio
                                db.query(
                                    "INSERT INTO servicio (observaciones, tiempo_entrega, medida_tiempo, id_cliente, id_equipo, id_tipo_servicio, id_trabajador) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                                    [servicio.observaciones, servicio.tiempo_entrega, servicio.medida_tiempo, idCliente, idEquipo, servicio.id_tipo_servicio, servicio.id_trabajador],
                                    (err) => {
                                        if (err) {
                                            return db.rollback(() => res.status(500).json({ error: err.message }));
                                        }
                                        db.commit((err) => {
                                            if (err) {
                                                return db.rollback(() => res.status(500).json({ error: err.message }));
                                            }
                                            res.json({ success: true });
                                        });
                                    }
                                );
                            }
                        );
                    })
                    .catch(err => {
                        db.rollback(() => res.status(500).json({ error: err.message }));
                    });
            }
        );
    });
});


// Endpoints para CRUD

// 1. Obtener todos los datos de clientes con sus equipos, servicios y trabajadores
app.get('/api/clientes', (req, res) => {
  const query = `
      SELECT clientes.id_cliente, 
             clientes.nombre, 
             clientes.apellido_paterno, 
             clientes.apellido_materno, 
             clientes.domicilio, 
             clientes.email,
             celulares.celular,
             equipo.marca, 
             equipo.serie, 
             equipo.modelo, 
             equipo.descripcion, 
             equipo.estado, 
             equipo.descripcion_agregado,
             tipos_equipo.equipo AS tipo_equipo,
             agregados.tipo_agregado,
             servicio.observaciones, 
             servicio.tiempo_entrega, 
             servicio.medida_tiempo, 
             tipos_servicio.servicio AS tipo_servicio,
            trabajadores.nombre AS trabajador_nombre,
            CONCAT(trabajadores.apellido_paterno, ' ', trabajadores.apellido_materno) AS trabajador_apellido
      FROM clientes
      LEFT JOIN celulares ON clientes.id_cliente = celulares.id_cliente
      LEFT JOIN servicio ON clientes.id_cliente = servicio.id_cliente
      LEFT JOIN equipo ON servicio.id_equipo = equipo.id_equipo
      LEFT JOIN tipos_equipo ON equipo.id_tipo_equipo = tipos_equipo.id_tipo_equipo
      LEFT JOIN agregados ON equipo.id_agregados = agregados.id_agregados
      LEFT JOIN tipos_servicio ON servicio.id_tipo_servicio = tipos_servicio.id_tipo_servicio
      LEFT JOIN trabajadores ON servicio.id_trabajador = trabajadores.id_trabajador
      ORDER BY clientes.id_cliente;
  `;

  db.query(query, (err, results) => {
    if (err) throw err;

    // Agrupar celulares por cliente
    const clientes = {};
    
    results.forEach(row => {
      const { id_cliente, nombre, apellido_paterno, apellido_materno, domicilio, email, celular, marca, serie, modelo, descripcion, estado, descripcion_agregado, tipo_equipo, tipo_agregado, observaciones, tiempo_entrega, medida_tiempo, tipo_servicio, trabajador_nombre, trabajador_apellido } = row;

      // Si el cliente no está en el objeto, lo inicializamos
      if (!clientes[id_cliente]) {
        clientes[id_cliente] = {
          id_cliente,
          nombre,
          apellido_paterno,
          apellido_materno,
          domicilio,
          email,
          celulares: [],
          servicios: []
        };
      }

      // Agregar el celular si existe
      if (celular) {
        clientes[id_cliente].celulares.push(celular);
      }

      // Agregar el servicio si existe
      if (observaciones) {
        clientes[id_cliente].servicios.push({
          marca,
          serie,
          modelo,
          descripcion,
          estado,
          descripcion_agregado,
          tipo_equipo,
          tipo_agregado,
          observaciones,
          tiempo_entrega,
          medida_tiempo,
          tipo_servicio,
          trabajador: {
            nombre: trabajador_nombre,
            apellido: trabajador_apellido
          }
        });
      }
    });

    // Convertir el objeto a un array
    res.json(Object.values(clientes));
  });
});

app.delete('/api/clientes/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Primero, elimina los celulares del cliente
    await db.promise().query('DELETE FROM celulares WHERE id_cliente = ?', [id]);

    // Luego, obtiene los id_equipo relacionados con los servicios del cliente
    const [servicios] = await db.promise().query('SELECT id_equipo FROM servicio WHERE id_cliente = ?', [id]);
    
    // Elimina los servicios del cliente
    await db.promise().query('DELETE FROM servicio WHERE id_cliente = ?', [id]);

    // Elimina los equipos del cliente usando la tabla servicio
    for (const servicio of servicios) {
      await db.promise().query('DELETE FROM equipo WHERE id_equipo = ?', [servicio.id_equipo]);
    }

    // Finalmente, elimina al cliente
    await db.promise().query('DELETE FROM clientes WHERE id_cliente = ?', [id]);

    res.status(200).json({ message: 'Cliente eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ message: 'Error al eliminar el cliente.' });
  }
});



// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
