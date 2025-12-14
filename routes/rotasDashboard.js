var express = require('express');
var router = express.Router();
var controllerDashboard = require('../controller/controllerDashboard');

router.get('/', controllerDashboard.dashboard);

module.exports = router;
