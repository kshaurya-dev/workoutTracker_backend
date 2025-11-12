const mongoose = require('mongoose')

const setScehma = new mongoose.model({
    setNumber:{
        required:true,
        type:Number
    },
    reps:{
        required:true,
        type:Number
    },
    weight:{
        required:true,
        type:Number
    }
})
mongoose.set('toJSON' , {
    transform:(document , returnedObject)=>{
        returnedObject.id =returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports= mongoose.model('Set' , setSchema)