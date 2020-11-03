require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
}

const dbConnect = () => {
    mongoose.connect(
        `${process.env.DB_PATH}${process.env.DB_NAME}`, options,
        (err) => {
            if (err) throw err;
            console.log('DB connection success');
        }
    );
};

module.exports = dbConnect;
