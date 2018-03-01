const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({dest: './uploads'});
const News = require('../models/news.js');


// exports.add = upload.any(), function(req, res, next){
//     if(req.file){
//         req.file.forEach(function(file){
//             var filename = (new Date).valueOf()+"_"+file.originalname
//             fs.rename(file.path,'uploads/'+filename,function(err){
//                 if(err){
//                     throw err;
//                 }
//                 var News = new News({
//                     title: req.body.title,
//                     subtitle: req.body.subtitle,
//                     description: req.body.description,
//                     date: req.body.date,
//                     imageurl: filename                    
//                 });
//                 News.save(function(err, result){
//                     if(err){
//                         throw err;
//                     }
//                     res.json(result);
//                 });
//             });
//         });
//     }
// }

// exports.add = function(req, res){
//     console.log(req.body.title);
// }

exports.add = upload.single('image'), function(req, res, next){
    console.log('hello world')
}

// exports.add = upload.single('imageurl'), function(req, res){
//     var title = req.body.title;
//     var subtitle = req.body.subtitle;
//     var description = req.body.description;
//     var date = req.body.date;

//     if(req.file){
//         console.log('file uploaded....');
//         var imageurl = req.file.filename;
//     }else{
//         console.log('file did not uploaded....');
//         var imageurl = 'noimage.jpg';
//     }

//     var newNews = News ({
//         title: title,
//         subtitle: subtitle,
//         description: description,
//         date:date

//     });
//     newNews.save(function(err, result){
//         if(err){
//             throw err;
//         }
//         res.json(result);
//     });
// }