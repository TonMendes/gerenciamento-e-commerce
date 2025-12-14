const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => console.log('Conexão com MongoDB estabelecida.'))
    .catch((error) => console.error('Erro ao conectar com MongoDB:', error));

module.exports = mongoose;
