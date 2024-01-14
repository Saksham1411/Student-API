const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        unique:true,
        required:true
    }
})

module.exports = mongoose.model('Students',studentSchema);