const exprss = require('express');
const User = require('../models/user.js');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// var jwt = require('jwt-simple');
// const config = require('../config/main.js');

// exports.register = function (req, res) {
//     var email = req.body.email;
//     var username = req.body.username;
//     var password = req.body.password;
    
//         var newUser = new User({
//             email: req.body.email,
//             username: req.body.username,
//             password: req.body.password
             
//             // registration: req.body.registration,
//             // department: req.body.department,
//             // semester: req.body.semester,
//             // degree: req.body.degree,
//             // role:req.body.role
//         });
//         newUser.save((err) => {
//             if (err) {
//                 return res.json({ success: false, message: 'Please enter all credentials.' });
//             } else {
//                 return res.json({ success: true, message: 'registered successfully' });
//             }
//         });
//     }

exports.register= function(req, res){
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    newUser.save((err, user)=>{
        if(err){
            res.json({msg: 'Failed to add the User'});
        }
        else{
            res.json({msg: 'User is added successfully'});
        }
    });
}


exports.login = function (req, res) {
  
    User.findOne({username:req.body.username, password:req.body.password}, function (err, user) {
        if (err) {
            throw err;
        } else if (user) {
           
                    // var token = jwt.sign(user, config.secret, { expiresIn: 10000 });
                    res.render("dashboard");
        } 
        
        else {
            res.send({ success: false, message: 'Authentication failed.' })
        }
    });
}

// exports.login = function(req, res){
//     var username = req.body.username;
//     var password = req.body.password;

//     User.findOne({username: username, password: password}, function(err, user){
//         if(err){
//             res.redirect('/login');
//             res.json({msg: 'Unaunticated user'});
//             // return res.status(500).send;
//         }
//         if(user){
//             res.render('dashboard');
//             // res.json({msg: 'User is not register.Please register first'});
//         }
//         // (user)
//         {
//             res.json({msg: 'User is not register.Please register first'});
//         // res.json({msg: 'User is sussesfully login'});
//         // res.render('dashboard');
    
//     }
//     // console.log("Not redirect")
//     // res.redirect('/login');
    
//     });

// }

exports.getAll = function (req, res) {
    User
        .find({})
        .exec(function (error, user) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(user);
            }
        })
}

exports.delete = function(req, res, next){
    User.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
}

