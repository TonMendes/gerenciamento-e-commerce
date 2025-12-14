var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

require('./model/modelosSQL');
require('./model/modelosNoSQL');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper('verificarAtivo', function (valorAtual, valorEsperado) {
    return valorAtual === valorEsperado ? 'active' : '';
});

var rotasIndex = require('./routes/rotasIndex');
var rotasPovoamento = require('./routes/rotasPovoamento');
var rotasProduto = require('./routes/rotasProduto');
var rotasDashboard = require('./routes/rotasDashboard');
var rotasPedido = require('./routes/rotasPedido');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rotasIndex);
app.use('/povoamento', rotasPovoamento);
app.use('/produto', rotasProduto);
app.use('/dashboard', rotasDashboard);
app.use('/pedidos', rotasPedido);

module.exports = app;
