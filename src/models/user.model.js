const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    phone: String,
    email: {type: String, unique: true},
    password: String,
    role: String,
});

userSchema.statics.mostRecent = async function(){
    return this.find().sort('id').exec();
}

module.exports = mongoose.model('User', userSchema);
