//Imports
const express = require('express');
const router = express.Router();
const comCtrl = require('../controllers/commentaire');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routage

router.post("/create", auth, multer, comCtrl.create);

module.exports = router; 