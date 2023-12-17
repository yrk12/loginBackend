require('dotenv').config()

const express = require('express')
const yogaRoutes = require('./routes/yoga')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());
const BASE_URL = process.env.BASE_URL

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(yogaRoutes)

mongoose.connect(process.env.URI)
    .then(()=>{
        app.listen(process.env.PORT, () =>{
            console.log("Server running on port")
        });
        console.log("DB connected")
    })
    .catch((error)=>{
        console.log(error)
    })

