const express = require('express');
const router = express.Router();
require('dotenv').config();
const Tables = require('../models/table.model');
const Armed = require('../models/timearmed.model');



router
    .route('/')
    .get( async function (req, res){
        const tables = await Tables.mostRecent()
        res.render('tables/tables', {tables});
    })
    .patch(async function (req,res){
             try {

                 if(req.body.status === 'busy'){
                     const table = await Tables.updateOne({number: req.body.numTable}, {status: 'busy'})
                 } else if(req.body.status === 'free') {
                     const table = await Tables.updateOne({number: req.body.numTable}, {status: 'free'})
                 }
                 res.end()

             }  catch (err){
                 res.send(err);
             }

    })
    .post( async function (req, res){
        try {
            // console.log(req.body);
            const armed = await new Armed({
                name: req.body.username,
                phone: req.body.numberPhone,
                content: req.body.contentText,
                date: req.body.dateOut.split('T')[0],
                time: req.body.dateOut.split('T')[1]
            }).save()
            const table = await Tables.updateOne({number: req.body.tableOut}, {$push: {armed: armed}});
            res.redirect('/tables');
        } catch (err){

            res.end(err);
        }
    })
    .delete( async function (req, res) {
        try {
            // console.log(await  Tables.findOne({"armed._id": "5f63634f2a6d25b45b84ea0a"}))
            const arm = await Armed.findOne({_id: req.body.idUnBlock});
            const table = await Tables.find();
            for (let el of table) {
                const del = await Tables.updateOne(el, {$pull: {armed: arm}});
                // console.log(del);
            }
            res.end()
        } catch (err){
            res.end(err);
        }
    });

module.exports = router;
