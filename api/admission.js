const exprss = require('express');
const Admission = require('../models/admission.js');
// const driver = require('../models/admission.js');



exports.openAdmission=function(req,res){
  console.log("check1");

res.render('admission',{admissions:1234});
}

exports.viewAdmission = function(req,res){
  console.log(req.body);
  Admission.find({}).exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
          res.render('viewadmission',{admissions:result});
    }
  })
}



exports.add = function(req, res){
  console.log(req.body);
  let newAdmission = new Admission({
    discipline:req.body.discipline,
    requirement:req.body.requirement,
    lastdate:req.body.lastdate,
  });
  newAdmission.save(function(err,admissions){
    if(err){
      // console.log(err);
      res.status(500).send({err:err});
      // console.log("Admission is not added");
    }
    else{
      // console.log("Admission is added successfully");
      
      res.render('admission',{admissions:admissions});
    }
  });
}





//function is used to get all scholarship detail 
exports.getAll = function (req, res) {
    Admission
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

//function is used to delete Admission from database
exports.delete = function(req, res, next){
    Admission.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
          Admission.findOne({}).then(function(result){
            res.render("viewadmission",{admissions:result});
          })
        }
    });
}



exports.edit = function(req, res){
  if(req.params.id==undefined){
    res.status(404).send({message:"No result found"});
  }else{
    Admission.findOne({_id:req.params.id}).then(function(result){
      if(!result){
        res.status(404).send({message:"No data found"});
      }
      else{
        console.log(req.body);
        res.render("editAdimssionForm",{admissions:result});
        // res.send({admissions:result});
      }
    })
  }
}

exports.editAdmission = function(req,res){
  
  Admission.findOne({_id:req.body.id}).exec(function(err,admissions){
      if(err){
          res.status('500').send({message:'error'})
      }
      else{
          console.log(admissions);
          admissions.discipline=req.body.discipline;
          admissions.requirement=req.body.requirement;
          admissions.lastdate=req.body.lastdate;
          admissions.save(function(err,result){
              if(err){
                  res.status('500').send({message:'error found'})
              }
              else{
                  console.log(result);
                  res.render("viewadmission",{admissions:result});
              }
          });
      }
  })
}



// exports.add = function(req,res){
//     console.log(req.body);
//     driver.create({
//       discipline:req.body.discipline,
//       requirement : req.body.requirement,
//       lastdate : req.body.lastdate,
//     }).then(function(result){
//       console.log("Admission Details added successfully");
//       driver.find({}).exec(function(error,result){
//           if(error){
//             console.log(error);
//             res.status(500).send({error:error});
//           }else{
//             res.set('Content-Type', 'application/javascript');
//             res.render('allDrivers', {
//                 driver:result
//             });
//           }
//         })
  
//     })
//   }

//function used to edit some data in database
// exports.edit=function(req,res){
//   if(req.params.id==undefined){
//     res.status(404).send({
//       message:'one or more perameters missing'
//     });
//   }else{
//     Scholarship.findOne({_id:req.params.id}).exec(function(error,driver){
//     //  console.log(Admission);
//       driver.title=req.body.title?req.body.title:driver.title;
//       driver.requirement=req.body.requirement?req.body.requirement:driver.requirement;     
//       driver.lastdate=req.body.lastdate?req.body.lastdate:driver.lastdate;           
//       driver.save(function(error,driver){
//         if(error){
//           res.status('500').send({message:'error found'})
//         }else{
//           res.status('202').send({message:'updated'})
//         }
//       });
//     })
//  }
// }


//function is used to post data in database
// exports.add= function(req, res){
//     let newAdmission = new Admission({
//         discipline: req.body.discipline,
//         requirement: req.body.requirement,
//         lastdate: req.body.lastdate
//     });

//     newAdmission.save((err, admission)=>{
//         if(err){
//             res.json({msg: 'Failed to add the Admission'});
//         }
//         else{
//             // res.json({msg: 'Admission is added successfully'});
//             // res.resder("admission");
//             res.render("admission");
//         }
//     });
// }



// exports.add= function(req, res){
//     let newAdmission = new Admission({
//         discipline: req.body.discipline,
//         requirement: req.body.requirement,
//         lastdate: req.body.lastdate
//     });

//     newAdmission.save((err, admission)=>{
//         if(err){
//             res.json({msg: 'Failed to add the notifications'});
//         }
//         else{
//             // res.json({msg: 'notifications is added successfully'});
//             res.render("admission");
//             // res.render("notification")
//         }
//     });
// }


// exports.add= function(req, res){
//     let newAdmission = new Admission({
//         discipline: req.body.discipline,
//         requirement: req.body.requirement,
//         lastdate: req.body.lastdate
//     });

//     newAdmission.save((err, admission)=>{
//         if(err){
//             res.json({msg: 'Failed to add the Scholarship'});
//         }
//         else{
//             // res.render("scholarship");
//             // res.json({msg: 'notifications is added successfully'});
//             res.render("admission");
//         }
//     });
// }