"use strict"

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl')

// ctrl 폴더에서 output이나 process 꺼내기
router.get('/', ctrl.output.home)
router.get('/basket', ctrl.output.basket)
router.get('/product', ctrl.output.product)
router.get('/register', ctrl.output.register)

// router.post('/login', ctrl.process.login)
// router.post('/register', ctrl.process.register)

module.exports= router;