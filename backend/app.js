const express = require('express')
const cors = require('cors')
const path = require("path")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors)
app.use(express.json())



app.listen(port, ()=>{
    console.log("server is runing on PORT :", port )
})