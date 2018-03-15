// import external moduels ==========================================================================
var app = require('express')();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var ejs = require('ejs');
const morgan = require('morgan');
const multer = require('multer');
const uploads = multer({dest: './uploads'});
const fs = require('fs'); 
// const passport = require('passport');
var path = require('path');
// const config = require('./config/main.js');
// const User = require('./models/user.js');
const cookieParser = require('cookie-parser');

app.use(cookieParser());



const route = require('./routes/routes');
// require("./routes/index")(app, route);
var routes = require('./routes/index.js');



//const app = require('./routes/index');

// initialize variables ==============================================================================

var port = process.env.PORT || 3000;



// configure middlewear ==============================================================================
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // connect to database ================================================================================

//connect to mongodb
 mongoose.connect('mongodb://admin:admin@ds115035.mlab.com:15035/qauinformatiosystem');
 mongoose.Promise = global.Promise;
mongoose.connection.on('connected',function(){
   
    console.log('Connected to database  mongodb');
});

mongoose.connection.on('error',function(err){
    if(err){
        console.log('Error on database connection to mongodb' +err);
    }
});

// routes ================================================================================
app.use('/api',route);
   app.set('view engine', 'ejs');
   routes(app);
app.use(express.static(path.join(__dirname, 'layout')));
app.use(express.static(path.join(__dirname, 'public')));



app.get('*', (req, res) => res.status(404).send({error:'page not found'}));

app.listen(port, () => console.log('Server is live on port : ', port));



