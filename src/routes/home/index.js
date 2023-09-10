"use strict"

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl')

// ctrl 폴더에서 output이나 process 꺼내기
router.get('/', ctrl.output.home)
router.get('/basket', ctrl.output.basket)
router.get('/product', ctrl.output.product)
router.get('/register', ctrl.output.register)

router.post('/', ctrl.server.home)
router.post('/product', ctrl.server.product)
router.post('/basket', ctrl.server.basket)
router.post('/register', ctrl.server.register)

module.exports= router;