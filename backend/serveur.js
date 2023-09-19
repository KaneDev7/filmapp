const express = require('express')
const  bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser');
const connection = require('./db/connexion.js');
const cors = require('cors')
const { corsOptions } = require('./config/corpOptions.js');

const app = express()
const port = 3000

//config
require('dotenv').config()

// middlewhere
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
app.use('/', require('./rooteurs/router.js'))

app.listen(port || 3000 , (eror) =>{
    if(eror){
        return eror
    }
    console.log('serveur lencé')

} )