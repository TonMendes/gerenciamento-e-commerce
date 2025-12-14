const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'fullstack', 'senha_fullstack', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Conexão com MySQL estabelecida.');
}).catch((error) => {
    console.error('Erro ao conectar com MySQL:', error);
});

module.exports = sequelize;
