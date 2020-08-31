const mongoose = require('mongoose')
const validator = require('validator')


const employeeSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim :true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error ('Email is invalid!')
            }
        }
    },
    name : {
        type : String,
        trim :true,
        lowercase : true,
        required : true
    },
    password :{
        type : String,
        required : true,
        trim : true,
        minLength : 7,
        trim : true,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error ('Password cannot contain "Password" ')
            }
        }
    }
    
})





const Emp   = mongoose.model('Emp', employeeSchema )

 

module.exports = Emp