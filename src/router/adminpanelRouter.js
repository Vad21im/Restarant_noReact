const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const Tables = require('../models/table.model');
const testAdm = require('../middlewares/isitAdmin');

router
    .route('/')
    .get( testAdm, function  (req, res){
        res.render('adminpanel');
    });
router
    .route('/addTables')
    .post( function (req, res){
        const table = new Tables({
            number: req.body.number,
            places: req.body.places,
            status: 'free',
            armed: []
        }).save();
        const addTable = 'Стол добавлен';
        res.render('adminpanel', {addTable});
    });
module.exports = router;
