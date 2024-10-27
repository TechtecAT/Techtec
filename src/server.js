import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

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

  app.get('/api/trabajadores/:id', (req, res) => {
    const { id } = req.params;
  
    db.query('SELECT * FROM TRABAJADORES WHERE id_trabajador = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(404).json({ message: 'Trabajador no encontrado' });
      }
      res.json(results[0]); // Retornar el primer resultado, que será el trabajador
    });
  });


// Endpoint para obtener el registro
app.get('/api/registro', (req, res) => {
  const query = `
    SELECT 
      s.id_servicio,
      CONCAT(c.nombre, ' ', c.apellido_paterno, ' ', c.apellido_materno) AS cliente,
      c.domicilio,
      c.email,
      GROUP_CONCAT(cel.celular SEPARATOR ', ') AS celulares,
      te.equipo AS tipo_equipo,
      a.tipo_agregado AS agregado,
      ts.servicio AS tipo_servicio,
      e.descripcion_agregado,
      e.marca,
      e.serie,
      e.modelo,
      e.estado,
      e.descripcion AS descripcion_equipo,
      s.observaciones,
      CONCAT(s.tiempo_entrega, ' ', s.medida_tiempo) AS tiempo_entrega,
      DATE_FORMAT(s.fecha, '%d-%m-%Y') AS fecha  -- Formato de fecha ajustado
    FROM 
      clientes c
    JOIN 
      celulares cel ON c.id_cliente = cel.id_cliente
    JOIN 
      servicio s ON c.id_cliente = s.id_cliente
    JOIN 
      equipo e ON s.id_equipo = e.id_equipo
    JOIN 
      tipos_equipo te ON e.id_tipo_equipo = te.id_tipo_equipo
    JOIN 
      agregados a ON e.id_agregados = a.id_agregados
    JOIN 
      tipos_servicio ts ON s.id_tipo_servicio = ts.id_tipo_servicio
    GROUP BY 
      c.id_cliente, s.id_servicio;`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      return res.status(500).json({ error: 'Error al recuperar los datos' });
    }
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
  
    db.beginTransaction((err) => {
      if (err) return res.status(500).json({ error: err.message });
  
      db.query(
        "INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, domicilio, email) VALUES (?, ?, ?, ?, ?)",
        [cliente.nombre, cliente.apellidoPaterno, cliente.apellidoMaterno, cliente.domicilio, cliente.email],
        (err, resultCliente) => {
          if (err) {
            return db.rollback(() => res.status(500).json({ error: err.message }));
          }
          const idCliente = resultCliente.insertId;
  
          const celularPromises = celular.celulares.map(numero => {
            return new Promise((resolve, reject) => {
              db.query(
                "INSERT INTO celulares (celular, id_cliente) VALUES (?, ?)",
                [numero, idCliente],
                (err) => (err ? reject(err) : resolve())
              );
            });
          });
  
          Promise.all(celularPromises)
            .then(() => {
              db.query(
                "INSERT INTO equipo (marca, serie, modelo, descripcion, estado, descripcion_agregado, id_tipo_equipo, id_agregados) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [equipo.marca, equipo.serie, equipo.modelo, equipo.descripcion, equipo.estado, equipo.descripcionAgregado, equipo.idTipoEquipo, equipo.idAgregados],
                (err, resultEquipo) => {
                  if (err) {
                    return db.rollback(() => res.status(500).json({ error: err.message }));
                  }
                  const idEquipo = resultEquipo.insertId;
  
                  db.query(
                    "INSERT INTO servicio (observaciones, tiempo_entrega, medida_tiempo, id_cliente, id_equipo, id_tipo_servicio, id_trabajador) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [servicio.observaciones, servicio.tiempo_entrega, servicio.medida_tiempo, idCliente, idEquipo, servicio.id_tipo_servicio, servicio.id_trabajador],
                    (err, resultServicio) => {
                      if (err) {
                        return db.rollback(() => res.status(500).json({ error: err.message }));
                      }
  
                      db.commit((err) => {
                        if (err) {
                          return db.rollback(() => res.status(500).json({ error: err.message }));
                        }
                        res.json({ success: true, id_servicio: resultServicio.insertId }); // Devolver id_servicio
                      });
                    }
                  );
                }
              );
            })
            .catch(err => db.rollback(() => res.status(500).json({ error: err.message })));
        }
      );
    });
  });
  

  

  
// Endpoint de login
app.post('/api/login', (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  db.query('SELECT * FROM trabajadores WHERE user = ?', [user], (err, results) => {
    if (err) {
      console.error('Error en la consulta de inicio de sesión:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const trabajador = results[0];

    bcrypt.compare(password, trabajador.password, (err, match) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }

      if (!match) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Generar token JWT con el ID del usuario
      const token = jwt.sign({ userId: trabajador.id }, SECRET_KEY, { expiresIn: '1h' });

      // Responder solo con el token y el ID del trabajador
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        userId: trabajador.id_trabajador, // Enviar solo el ID del trabajador
      });
    });
  });
});




  




// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
