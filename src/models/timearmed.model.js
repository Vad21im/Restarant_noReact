const mongoose = require('mongoose');

const armedSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: String,
    time: String,
    content: String
});

armedSchema.statics.mostRecent = async function(){
    return this.find().sort('date').exec();
}

module.exports = mongoose.model('Armed', armedSchema);
