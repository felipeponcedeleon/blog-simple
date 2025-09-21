require('dotenv').config();
const express = require('express');
const path = require('path');

const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', postRoutes);

// Arranque
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor arriba en http://localhost:${PORT}`);
});
