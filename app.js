const express = require('express');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const ws = require('ws');

const path = require('path');
require('dotenv').config();
const hbs = require('hbs');
const dbConnect = require('./dbConnect');
const rollOut = require('./src/middlewares/roll');
const bot = require('./src/controllers/bot');
// const localStorage = require('localStorage')
bot();
// localStorage.test = "abc";


const indexRouter = require('./src/router/index');
const userRouter = require('./src/router/user');
const tablesRouter = require('./src/router/tables');
const adminPanelRouter = require('./src/router/adminpanelRouter');



const app = express();
const FileStore = sessionFileStore(session);
dbConnect();

const check = require('./src/controllers/testTime');
setInterval(check, 5000);

// app.locals.settings['view engine'] = 'hbs';
app.set('view engine', 'hbs'); //+++
app.set('views', path.join(__dirname, '/src/views'));
app.set('session cookie name', 'sid');
hbs.registerPartials(path.join(__dirname, '/src/views', 'partials'));
hbs.registerHelper('ifEq', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});


app.use(
    session({
        name: app.get('session cookie name'),
        secret: process.env.SECRET_KEY,
        store: new FileStore({
// Шифрование сессии
            secret: process.env.SECRET_KEY,
        }),
// Если true, сохраняет сессию, даже если она не поменялась
        resave: false,
// Если false, куки появляются только при установке req.session
        saveUninitialized: false,
        cookie: {
// В продакшне нужно "secure: true" для HTTPS
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        },
    }),
);
//
// app.use(session({
//     name: app.get('session cookie name'),
//     secret: process.env.SECRET_KEY,
//     store: new FileStore({
//         secret: process.env.SECRET_KEY,
//
//     }),
//     resave: false,
//     saveUninitialized: false,
//
// }))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(rollOut);

app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/tables', tablesRouter);
app.use('/adminpanel', adminPanelRouter);

// console.log(process.env)


const httpServer =  app.listen(process.env.PORT || 3000, (err)=>{
    if(err) throw err;
    console.log(`server start ${process.env.PORT}`)
})

const wsServer = new ws.Server({
    server: httpServer,
})

wsServer.on('connection', (client) => {
    console.log('connect')
    client.on('message', (data) => {
        console.dir(data)
        client.send(data)
    })
})










