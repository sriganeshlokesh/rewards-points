const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const points = require('./routes/points')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/points', points)

app.listen(PORT, ()=>{
    console.log(`Server Running at Port: ${PORT}`)
})