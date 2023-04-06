const express = require('express');
const router = express.Router();
const authenticat = require('../middleware/authenticat');
const homeController = require('../controllers/home_controller');


console.log('router loaded');

router.get('/',authenticat, homeController.home);
router.use('/users', require('./users'));
router.use('/review', require('./review'));


// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;