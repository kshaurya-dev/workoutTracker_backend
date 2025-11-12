const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/' , async(request , response , next)=>{
    try{
        const {username , name , password}=request.body

        if(password.length < 4){
            return response.status(400).json({error :'password must be at least 5 characters long'})
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password , saltRounds)

        const user = new User({username , name , passwordHash})
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
    catch(error){next(error)}
})

userRouter.get('/'  , async(request , response)=>{

    const users = await User.find({})
    .populate('workouts' , {name:1, exercises:1})
    response.json(users)

})

module.exports = userRouter