const exprss = require('express');
const Dining = require('../models/dining.js');

exports.add= function(req, res){
    let newDining = new Dining({
        name: req.body.name,
        menu: req.body.menu
    });

    newDining.save((err, dining)=>{
        if(err){
            res.json({msg: 'Failed to add the dining'});
        }
        else{
            
            res.render("dining");
          //  res.json({msg: 'dining is added successfully'});
        }
    });
}


//function is used to get all routes 
exports.getAll = function (req, res) {
    Dining
        .find({})
        .exec(function (error, dining) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(dining);
            }
        })
}

//function is used to delete route from database
exports.delete = function(req, res, next){
    Dining.remove({_id: req.params.id},function(err, result){
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
    Dining.findOne({_id:req.params.id}).exec(function(error,Dining){
    //  console.log(Dining);
      Dining.name=req.body.name?req.body.name:Dining.name;
      Dining.menu=req.body.menu?req.body.menu:Dining.menu;     
      Dining.save(function(error,Dining){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}
