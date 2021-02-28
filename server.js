const express = require('express')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const app = express()
const PORT = process.env.PORT || 5000
const points = require('./routes/points')
const swaggerDocument = YAML.load('./swagger.yml')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/points', points)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get("/", (req, res)=>{
    res.send("<h1>Hello, Welcome to Rewards Points API</h1>")
})



app.listen(PORT, ()=>{
    console.log(`Server Running at Port: ${PORT}`)
})