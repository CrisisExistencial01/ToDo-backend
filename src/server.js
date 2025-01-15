const app = require('./app');
const connectDB = require('./config/db');

// ---------------------------------------------------------------------------
// VARIABLES DE ENTORNO
// ---------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

