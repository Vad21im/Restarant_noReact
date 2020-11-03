const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    id: Number,
    text: String,
});

chatSchema.statics.mostRecent = async function(){
    return this.find().sort('id').exec();
}

module.exports = mongoose.model('Chat', chatSchema);


