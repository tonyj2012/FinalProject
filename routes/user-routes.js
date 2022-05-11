const express = require('express');
const router = express.Router(); //Create router object
const User = require("../models/user-model");
const controller = require("../controllers/user-controls");
router.get('/login',controller.getLogin);
router.get('/register',controller.getRegister);
router.post('/register',controller.postRegister);


module.exports = router;