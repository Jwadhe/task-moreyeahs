const express = require('express')
const app = express()
const authRoute = require("./routes/authRoute")
const swaggerUi=require('swagger-ui-express');
const swaggerDocument=require('./swagger.json');
const Mysqlconnection = require('./config/db')
var mysql = require('mysql');


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



//express middleware
app.use(express.json()) 
app.use(express.urlencoded({
    extended: true,
  })
) 

app.use(authRoute)
// app.use(Mysqlconnection) 

//database
require('./config/db')


PORT = process.env.PORT || 8000

//Create a server
app.listen(PORT, () => {
    console.log(`server is listen on port ${PORT}`)
})