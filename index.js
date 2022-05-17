// Creating the htpp Server
const express = require('express');
const dotenv =  require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

// calling the mongodb connection File
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

//log request using morgan
app.use(morgan('tiny'));

//mongodb connection
connectDB();

// Parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// Set view engine
app.set('view engine', 'ejs')
// if the ejs views in not in the folder called 'views' you specify the path using the below:
// app.set('views', path.resolve(__dirname,'views/ejs'))

// Load the assets
//1. loading the css folder
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});