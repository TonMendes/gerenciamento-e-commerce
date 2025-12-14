var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex');

router.get('/', controllerIndex.tela_principal);

module.exports = router;
