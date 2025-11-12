const Workout=require('../models/workouts')
const workoutRouter = require('express').Router()
const User = require('../models/user')
const jwt =require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }
    return null
}
workoutRouter.get('/' , async(request , response, next)=>{
    try{
        const workouts = await Workout.find({})
       .populate('user', {username:1 , name:1})
       return response.json(workouts)
    }
    catch(error){next(error)}
})
workoutRouter.get('/:id' , async(request , response , next)=>{
    try{
        const workout = await Workout.findById(request.params.id)
        return response.json(workout)
    }
    catch(error){next(error)}
})
workoutRouter.post('/' , async(request , response , next)=>{
    try{
        const body = request.body
        const decodedToken = jwt.verify(getTokenFrom(request) , process.env.SECRET)
        
        if(!decodedToken.id){
        return response.status(401).json({error:'token invalid'})}
        
        const user = await User.findById(decodedToken.id)
        if(!user){
        return response.status(400).json({error:'userID missing or  invalid'})} 

        const workout = new Workout({
            name : body.name , 
            exercises: body.exercises,
            duration:body.duration,
            date:body.date,
            user: user._id
        })

        const savedWorkout = await workout.save()
        user.workouts=user.workouts.concat(savedWorkout._id)
        await user.save()
        response.status(201).json(savedWorkout)
    }
    catch(error) {next(error)}
})
workoutRouter.delete('/:id' ,async(request , response , next)=>{
   try{
    await Workout.findByIdAndDelete(request.params.id)
    response.status(204).end()
}
   catch(error){next(error)}
})

workoutRouter.put('/:id' , async(request , response , next)=>{
    try{
        const {name , exercises , duration , date}=request.body
        const updatedWorkout = await Workout.findByIdAndUpdate(request.params.id  ,{ name, exercises, duration, date },{ new: true, runValidators: true })
        if(updatedWorkout)response.json(updatedWorkout)
        else response.status(404).end()
    }
    catch(error){next(error)}
})
module.exports=workoutRouter