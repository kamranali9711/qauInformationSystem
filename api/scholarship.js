const exprss = require('express');
const Scholarship = require('../models/scholarship.js');


exports.openScholarship=function(req,res){
    console.log("check1");
  
  res.render('scholarship',{scholarship:1234});
  }

exports.viewScholarship = function(req,res){
    Scholarship.find({}).exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
            res.render('viewscholarship',{scholarship:result});
      }
    })

  }

exports.add= function(req, res){
    console.log(req.body);
    let newScholarship = new Scholarship({
        title: req.body.title,
        requirement: req.body.requirement,
        description: req.body.description,
        date: req.body.date
    });

    newScholarship.save((err, scholarship)=>{
        if(err){
            res.json({msg: 'Failed to add the Scholarship'});
        }
        else{
            // res.render("scholarship");
            // res.json({msg: 'notifications is added successfully'});
            res.render("scholarship",{scholarship:scholarship});
        }
    });
}

//function is used to post data in database
// exports.add= function(req, res){
//     let newScholarship = new Scholarship({
//         title: req.body.title,
//         requirement: req.body.requirnments,
//         description: req.body.description,
//         date: req.body.lastdate
//     });

//     newScholarship.save((err, scholarship)=>{
//         if(err){
//             res.json({msg: 'Failed to add the Scholarship'});
//         }
//         else{
//             res.render("scholarship");
//             // res.json({msg: 'Scholarship is added successfully'});
//         }
//     });
// }


//function is used to get all scholarship detail 
exports.getAll = function (req, res) {
    Scholarship
        .find({})
        .exec(function (error, route) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(route);
            }
        })
}

//function is used to delete scholarship from database
exports.delete = function(req, res, next){
    Scholarship.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
            Scholarship.find({}).then(function(result){
                res.render("viewscholarship",{scholarship:result});
            })
            // res.json(result);
        }
    });
}

//function used to edit some data in database
exports.edit=function(req,res){
  if(req.params.id==undefined){
    res.status(404).send({
      message:'one or more perameters missing'
    });
  }else{
    Scholarship.findOne({_id:req.params.id}).exec(function(error,Scholarship){
    //  console.log(Scholarship);
      Scholarship.title=req.body.title?req.body.title:Scholarship.title;
      Scholarship.requirement=req.body.requirement?req.body.requirement:Scholarship.requirement;
      Scholarship.description=req.body.description?req.body.description:Scholarship.description;     
      Scholarship.date=req.body.date?req.body.date:Scholarship.date;           
      Scholarship.save(function(error,Scholarship){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}

// //function used to post some data in database
// exports.add=function(req,res){
//   console.log(req.body);
//   var params = req.body;
//  if(params.title==undefined ){
//    res.status(404).send({
//      message:'one or more perameters missing'
//    });
//  }else{
//   new Routes({
//     route:params.route,
//     detail:params.detail
//   }).save(function(error,result){
//     if(error){
//         //  res.json({msg: 'Failed to add the Routes'});
//       console.log(error);
// }else{
//     //  res.json({msg: 'Event is added in database'});
//        console.log(result);
//     }
//   });
//   res.end();
// }
// }