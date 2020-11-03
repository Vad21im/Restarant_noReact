const express = require('express');
const router = express.Router();
const Chat = require('../models/chat.model')

// главная страница
router
    .route('/')
    .get( async function (req, res){
        const messages = await Chat.mostRecent();



        res.render('index', {messages});
})
    .post( async (req, res) => {
        let text = 'Гость: '+req.body.message;
        const messages = await Chat.find();
        const messageNew = await new Chat({
            id: messages.length,
            text: text
        }).save();
        res.json(messageNew);
    })
    .delete();
router
    .route('/new/')
    .get( function (req, res){
        res.render('index');
    })
    .post()
    .delete();
// Тестовые роутер для проверки как летят гет запросы
router
        .route('/test/')
    .get( function (req, res){
        console.log(req.query)
    })


module.exports = router;
