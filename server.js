const express = require('express');
const { connect } = require("./config/db");
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Method",
    "GET"
  ); /* header del html de respuesta */
  /* Metodos que permitimos hacer a alguien, en este caso como el usuario solo va a poder hacer un GET de info no ponemos el resto (DELETE, POST, etc.*/
  res.header("Access-Control-Allow-Credentials", "true");
  /* CREDENCIALES con el TOKEN. si no aparece esto nunca podríamos atacar al token, que va dentro del header de respuesta que recibimos. Con esto permitimos la conexion con el token */
  res.header("Access-Control-Allow-Headers", "Content-Type");
  /* Permitimos los header del tipo content-type */
  next(); /* le decimos que pase a la siguiente función, que no se quede aquí */
});
// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // El origen de tu frontend
  credentials: true, // Permitir el uso de credenciales (cookies, autenticación)
};

app.use(cors(corsOptions));

// Middleware para manejar solicitudes OPTIONS (preflight)
app.options('*', cors(corsOptions));


app.use(express.json());
connect();



// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Manejo de errores
app.use((error, req, res, next) =>
  res.status(error.status || 500).json(error.message || "Unexpected error")
);

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
