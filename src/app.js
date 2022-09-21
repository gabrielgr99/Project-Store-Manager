const express = require('express');
const productsRoutes = require('./routes/productsRouter');
const salesRoutes = require('./routes/salesRouter');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;