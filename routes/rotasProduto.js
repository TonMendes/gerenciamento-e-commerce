var express = require('express');
var router = express.Router();
var controllerProduto = require('../controller/controllerProduto');

router.get('/detalhes/:id', controllerProduto.detalhes);
router.get('/comprar/:id', controllerProduto.tela_comprar);
router.post('/comprar/:id', controllerProduto.confirmar_compra);

module.exports = router;
