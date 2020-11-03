const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    number: Number,
    places: Number,
    status: String,
    armed: Array
});

tableSchema.statics.mostRecent = async function(){
    return this.find().sort('id').exec();
}

module.exports = mongoose.model('Table', tableSchema);
