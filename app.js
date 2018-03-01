// import external moduels ==========================================================================
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



const route = require('./routes/routes');
// require("./routes/index")(app, route);
var routes = require('./routes/index.js');



//const app = require('./routes/index');

// initialize variables ==============================================================================
var app = express();
var port = process.env.PORT || 3000;



// configure middlewear ==============================================================================
// logger
app.use(morgan('dev'));
// json manipulation on server side
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport initializtion 
// app.use(passport.initialize());

//cookieParser
// app.use(cookieParser());

// app.use(multer({dest:'./uploads'}));

// // connect to database ================================================================================

//connect to mongodb
 mongoose.connect('mongodb://admin:admin@ds115035.mlab.com:15035/qauinformatiosystem');
 mongoose.Promise = global.Promise;
// mongoose.connect('localhost: mongodb://127.0.0.1:27017/test');
//on connect to database 
mongoose.connection.on('connected',function(){
   
    console.log('Connected to database  mongodb');
});

mongoose.connection.on('error',function(err){
    if(err){
        console.log('Error on database connection to mongodb' +err);
    }
});
// mongoose.connect(config.database);
// mongoose.connection.once('connected', () => console.log("Connected to database"));

// routes ================================================================================
app.use('/api',route);
// app.use('/api',require('./routes/unauthenticated.js')); //routes which does't require token authentication
// require('./config/passport')(passport);
//app.use('/api',passport.authenticate('jwt', { session: false }),require('./routes/authenticated.js'));

// app.set('view engine', 'ejs');
//     app.get('/',function(req,res){
//       res.render("login");
//     })

   app.set('view engine', 'ejs');
   routes(app);
    // app.get('/',function(req,res){
    //   res.render("login");
    // })

    //  app.get('/transport',function(req,res){
    //   res.render('transport', title, 'Transport');
    // });


// app.get('/', (req, res) => {
//   // render `home.ejs` with the list of posts
//   res.render('transport', { posts: posts })
// })

   
// app.get('/notification',function(req,res){
//       res.render("feedback");
//     })

//     app.get('/feedback',function(req,res){
//       res.render("notification");
//     })


// initialize laYOUT ==============================================================================
//var routes = require('./routes/authentication.js');




//View engine ===================================
// app.use('views',path.join(__dirname,'views'));
// app.engin('ejs',exphbs({defaultLayout:'layout'}));
// app.set('view engin', 'ejs');
app.use(express.static(path.join(__dirname, 'layout')));
app.use(express.static('public'));
app.use('/public',express.static('public'));
// app.get('/', function(req, res){
//     res.send('hello world');
// });




app.get('*', (req, res) => res.status(404).send({error:'page not found'}));

app.listen(port, () => console.log('Server is live on port : ', port));


// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var app = express();

// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);

// app.use(session({secret: 'ssshhhhh'}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// var sess;

// app.get('/',function(req,res){
// sess = req.session;
// //Session set when user Request our app via URL
// if(sess.email) {
// /*
// * This line check Session existence.
// * If it existed will do some action.
// */
//     res.redirect('/admin');
// }
// else {
//     res.render('index.html');
// }
// });

// app.post('/login',function(req,res){
//   sess = req.session;
// //In this we are assigning email to sess.email variable.
// //email comes from HTML page.
//   sess.email=req.body.email;
//   res.end('done');
// });

// app.get('/admin',function(req,res){
//   sess = req.session;
// if(sess.email) {
// res.write('
// <h1>Hello '+sess.email+'</h1>
// ');
// res.end('<a href="+">Logout</a>');
// } else {
//     res.write('
//      <h1>Please login first.</h1>
//     ');
//     res.end('<a href="+">Login</a>');
// }
// });

// app.get('/logout',function(req,res){
// req.session.destroy(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     res.redirect('/');
//   }
// });

// });
// app.listen(3000,function(){
// console.log("App Started on PORT 3000");
// });

/*
<html>
<head>
<title>Session Management in NodeJS using Express4.2</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> 
<script>
$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        email=$("#email").val();
        pass=$("#password").val();
        /*
        * Perform some validation here.
        */
        /*$.post("http://localhost:3000/login",{email:email,pass:pass},function(data){        
            if(data==='done')           
            {
                window.location.href="/admin";
            }
        });
    });
});
</script>
</head>
<body>
<input type="text" size="40" placeholder="Type your email" id="email"><br />
<input type="password" size="40" placeholder="Type your password" id="password"><br />
<input type="button" value="Submit" id="submit">
</body>
</html>*/