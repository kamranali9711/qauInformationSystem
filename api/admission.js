const exprss = require('express');
const Admission = require('../models/admission.js');


//function is used to post data in database
exports.add= function(req, res){
    let newAdmission = new Admission({
        discipline: req.body.discipline,
        requirement: req.body.requirement,
        lastdate: req.body.lastdate
    });

    newAdmission.save((err, admission)=>{
        if(err){
            res.json({msg: 'Failed to add the notifications'});
        }
        else{
            res.json({msg: 'notifications is added successfully'});
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
            res.json(result);
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
    Scholarship.findOne({_id:req.params.id}).exec(function(error,Admission){
    //  console.log(Admission);
      Admission.title=req.body.title?req.body.title:Admission.title;
      Admission.requirement=req.body.requirement?req.body.requirement:Admission.requirement;     
      Admission.lastdate=req.body.lastdate?req.body.lastdate:Admission.lastdate;           
      Admission.save(function(error,Admission){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}