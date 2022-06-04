let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    fname: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    lname: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        maxlength: 100,
        required: true
    },
    role: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true
    }
});

let model = mongoose.model('UserData', userSchema)

module.exports = model;