var express = require('express');
var router = express.Router();
var controllerPedido = require('../controller/controllerPedido');

router.get('/', controllerPedido.listar);
router.get('/status/:id/:status', controllerPedido.alterar_status);

module.exports = router;
