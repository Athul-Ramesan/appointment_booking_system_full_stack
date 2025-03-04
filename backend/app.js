const express = require('express')
const cors = require('cors')
const path = require("path")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../frontend'), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === '.css') {
        res.setHeader('Content-Type', 'text/css');
      } else if (path.extname(filePath) === '.js') {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));

  const routes = require("./routes/index")
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  });  

app.listen(port, ()=>{
    console.log("server is runing on PORT :", port )
})