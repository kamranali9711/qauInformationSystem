const exprss = require('express');
const Scholarship = require('../models/scholarship.js');


exports.openScholarship=function(req,res){
    
  res.render('scholarship');
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
    let newScholarship = new Scholarship({
        title: req.body.title,
        requirement: req.body.requirement,
        description: req.body.description,
        date: req.body.date
    });

    newScholarship.save((err, scholarship)=>{
        if(err){
            res.json({msg: 'Failed to add the notifications'});
        }
        else{
          console.log("notifications is added successfully");
            // res.json({msg: 'notifications is added successfully'});
            res.render('scholarship',{scholarship:scholarship});
            // res.render("notification")
        }
    });
}


  // exports.add = function(req, res){
  //   // console.log(req.body);
  //   let newScholarship = new Scholarship({
  //     title:req.body.title,
  //     requirement:req.body.requirement,
  //     description:req.body.description,
  //     date:req.body.date,
  //   });
  //   newScholarship.save(function(err,scholarship){
  //     if(err){
  //       // console.log(err);
  //       res.status(500).send({err:err});
  //       // console.log("Admission is not added");
  //     }
  //     else{
  //     // res.json({msg: 'notifications is added successfully'});
  //       console.log("data insterted successfully");
  //       res.render('scholarship',{scholarship:scholarship});
  //     }
  //   });
  // }
  
/*
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
*/

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




exports.edit = function(req, res){
    if(req.params.id==undefined){
      res.status(404).send({message:"No result found"});
    }else{
        Scholarship.findOne({_id:req.params.id}).then(function(result){
        if(!result){
          res.status(404).send({message:"No data found"});
        }
        else{
          console.log(req.body);
          res.render("editScholarshipForm",{scholarship:result});
          // res.send({admissions:result});
        }
      })
    }
  }
  
  exports.editScholarship = function(req,res){
    
    Scholarship.findOne({_id:req.body.id}).exec(function(err,scholarship){
        if(err){
            res.status('500').send({message:'error'})
        }
        else{
            // console.log(admissions);
            scholarship.title=req.body.title;
            scholarship.requirement=req.body.requirement;
            scholarship.description=req.body.description;
            scholarship.date=req.body.date;
            scholarship.save(function(err,result){
                if(err){
                    res.status('500').send({message:'error found'})
                }
                else{
                    console.log(result);
                    res.render("viewscholarship",{scholarship:result});
                }
            });
        }
    })
  }
  

//function used to edit some data in database
// exports.edit=function(req,res){
//   if(req.params.id==undefined){
//     res.status(404).send({
//       message:'one or more perameters missing'
//     });
//   }else{
//     Scholarship.findOne({_id:req.params.id}).exec(function(error,Scholarship){
//     //  console.log(Scholarship);
//       Scholarship.title=req.body.title?req.body.title:Scholarship.title;
//       Scholarship.requirement=req.body.requirement?req.body.requirement:Scholarship.requirement;
//       Scholarship.description=req.body.description?req.body.description:Scholarship.description;     
//       Scholarship.date=req.body.date?req.body.date:Scholarship.date;           
//       Scholarship.save(function(error,Scholarship){
//         if(error){
//           res.status('500').send({message:'error found'})
//         }else{
//           res.status('202').send({message:'updated'})
//         }
//       });
//     })
//  }
// }

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