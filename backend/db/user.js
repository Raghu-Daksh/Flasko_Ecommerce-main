const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
    firstname: {
        type : String
    },
    lastname: {
        type : String
    },
    username: {
        type : String
    },
    email :{
        type: String,
    },
    password : {
        type: Number,
    },
})

const user = new mongoose.model('users', userShcema);
module.exports = user;