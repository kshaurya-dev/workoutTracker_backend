const express = require('express')

const path = require('path')
const app = express()

const myLogger = function(req , res , next){
    console.log('LOGGED')
    console.log(req.url)
    next()
}
app.use(myLogger)

app.get('/hello' , (req , res)=>{
    res.send('Hello World!')
})
app.listen(3000)