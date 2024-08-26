const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const User = mongoose.Schema({
    email: {type:String, required:true, unique:true},
    password: { type:String, required: true},
    role : {type:String, enum: ['ADMIN', 'USER'], default:'USER'}
});

User.plugin(unique);

module.exports = mongoose.model('User', User);