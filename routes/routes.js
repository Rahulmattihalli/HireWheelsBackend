var express = require('express');
var router = express.Router();
var {signup} = require('../controller/signup')
var {login} = require('../controller/login')
var { addVehicle} = require('./../controller/addvehicle')
var {book} = require('./../controller/booking')
var {GetVehicle} = require('./../controller/getVehicle')

router.post('/hirewheels/v1/users',signup)

router.post('/hirewheels/v1/users/access-token',login)

router.get('/hirewheels/v1/vehicles',GetVehicle)

router.post('/hirewheels/v1/vehicles',addVehicle)

router.post('/hirewheels/v1/bookings',book)

module.exports = router;