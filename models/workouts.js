const mongoose = require('mongoose')
mongoose.set('strictQuery' , false)

const url = process.env.MONGODB_URI

console.log('connecting to ' , url)

mongoose.connect(url)
.then(result =>{
    console.log('connected to mongoDB')
})
.catch(error=>{
    console.log('some error occured : ', error.message)
})
const setSchema = new mongoose.Schema({
    setNumber:{ required : true , type : Number},
    reps : { required : true , type:Number },
    weight :{ required:true , type:Number }
})
const exerciseSchema = new mongoose.Schema({
    name:{required: true,type:String},
    sets:[setSchema]
})

const workoutSchema = new mongoose.Schema({
    name:{ type:String , required : true },
    exercises : [ exerciseSchema],
    date:{ required : true , type : Date },
    duration: { required:true, type : Number },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
mongoose.set('toJSON' , {
    transform:(document , returnedObject)=>{
        returnedObject.id =returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Workout' , workoutSchema)