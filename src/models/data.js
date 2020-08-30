const mongoose = require('mongoose')


const Data   = mongoose.model('Count', {
    date : {
        type : String,
        required :true
    },
    state_short_code : {
        type : String,
        required :true,
        trim: true

    },
    district : {
        type : String,
        required :true,
        trim: true

    },
    confirmed : {
        type : Number,
        required :true

    },
    hospitalized : {
        type : Number,
        required :true

    },
    recovered : {
        type : Number,
        required :true

    },
    fatal : {
        type : Number,
        required :true

    },
    count : {
        type : Number,
        required :true

    },
    district_id : {
        type : Number,
        required : true,
        validate(value){
             if(value>739 || value<0){
                 throw new Error('District id must be less than 739 and greater than zero')
             }
         }

    },
    adjacent_district : {
        type : Array,
        required :true,
        

    }
})



module.exports = Data