if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')

const app = express()
const port = process.env.PORT || 3030

app.use(cors())
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

//*Midleware
app.use(router)
app.use(errHandler)


app.listen(port, ()=> console.log(`app runing in port => ${port}`))