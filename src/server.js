import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors()); 

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

  app.get('/api/clientes', (req, res) => {
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
    db.query('INSERT INTO tipos_servicio (servicio) VALUES (?)', 
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






// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
