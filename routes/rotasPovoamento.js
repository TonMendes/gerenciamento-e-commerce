var express = require('express');
var router = express.Router();
var controllerPovoamento = require('../controller/controllerPovoamento');

router.get('/', controllerPovoamento.povoar);

module.exports = router;
