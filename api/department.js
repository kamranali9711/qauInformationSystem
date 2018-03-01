const exprss = require('express');
const Department = require('../models/department.js');

exports.add= function(req, res){
    let newDepartment = new Department({
        title: req.body.title,
        department: req.body.department,
        description: req.body.description   
    });

    newDepartment.save((err, department)=>{
        if(err){
            res.json({msg: 'Failed to add the Department'});
        }
        else{
            res.json({msg: 'Department is added successfully'});
        }
    });
}

// exports.add = function(request, response){
//     var newDepartment = new Department({
//         title: request.body.title,
//         department: request.body.department,
//         description: request.body.description
        
//     });

//     newDepartment.save(function(err) {
//         if (err)
//            throw err;
//         else 
//            console.log('save department successfully...');
//     });
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
//   new Department({
//     title:params.title,
//     department:params.department,
//     description:params.description
//   }).save(function(error,result){
//     if(error){
//         //   res.json({msg: 'Failed to add the Department'});
//        console.log(error);
// }else{
//     //   res.json({msg: 'Department is added in database'});
//         console.log(result);
//     }
//   });
//   res.end();
// }
// }


//function is used to get all Departments 
exports.getAll = function (req, res) {
    Department
        .find({})
        .exec(function (error, department) {
            if (error) {
                res
                    .status(500)
                    .send({message: error});
            } else {
                res
                    .status(200)
                    .send(department);
            }
        })
}

//function is used to delete route from database
exports.delete = function(req, res, next){
    Department.remove({_id: req.params.id},function(err, result){
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
    Department.findOne({_id:req.params.id}).exec(function(error,Department){
    //  console.log(Department);
      Department.title=req.body.title?req.body.title:Department.title;
      Department.department=req.body.department?req.body.department:Department.department;
      Department.description=req.body.description?req.body.description:Department.description;                
      Department.save(function(error,Department){
        if(error){
          res.status('500').send({message:'error found'})
        }else{
          res.status('202').send({message:'updated'})
        }
      });
    })
 }
}
