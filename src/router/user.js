const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// главная страница
// Регистрация пользователя

function failAuth(res) {
    return res.status(401).end();
}

function serializeUser(user) {
    return {
        id: user._id,
        username: user.username,
        role: user.role,
    }
}


router
    .route('/signup')
    .get( function (req, res){
       res.render('user/auth/signup', {isSignin: true});
    })
    .post(async function (req,res){

        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
        const {username, password, email, numberPhone, roll} = req.body;
        console.log(req.body);
        try {

            const user = await new User({
                id: 10,
                username: username,
                password: bcrypt.hashSync(password, salt),
                email: email,
                phone: numberPhone,
                role: roll
            }).save();
            req.session.user = serializeUser(user);
            await console.log(req.session.user);
            res.redirect('/');
        } catch (err){
            console.log(err);
            res.status(403).end()
        }
    });
// Выход пользователя
router
    .route('/signout')
    .get( function (req,res,next){
          console.log('Выход');
        req.session.destroy((err) => {
            if (err){
                return next(err);
            }
            res.clearCookie(req.app.get('session cookie name'));
            return res.redirect('/')
        })


    });
// Редактирование пользователя
router

    .route('/edit/:id')
    .get( async function (req,res){
        const user = await User.find({id: req.params.id});
        const userOut = user[0];


        res.render('user/profile/edit', userOut);

    })
    .post(async function (req, res){
        console.log(req.body)
    });

router
    .route('/login')
    .get(  function (req, res){
        res.render('user/auth/login');

    })
    .post(async function (req, res){
        const {username, password} = req.body;
       // Проверка есть ли пользователь в базе
        try{
            const userTest = await User.findOne({
                username,
            }).exec();
            if (!userTest) {
                return res.redirect('/user/loginError');
            }
            const isValidPassword = await bcrypt.compare(password, userTest.password);
            if(!isValidPassword){
                return res.redirect('/user/loginError');
            }
            req.session.user = serializeUser(userTest);
        } catch (err){
            console.log(err);

        }
        return res.redirect('/');
    })

router
    .route('/loginError')
    .get(  function (req, res){
        res.render('user/auth/loginError');

    })

module.exports = router;
