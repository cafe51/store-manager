const express = require('express');
const { productRoutes, salesRoutes } = require('./routers');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo server.js para executar sua aplicação 

app.use('/products', productRoutes);

app.use('/sales', salesRoutes);

module.exports = app;