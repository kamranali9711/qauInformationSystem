const exprss = require('express');
const Routes = require('../models/transport.js');

exports.openTransport = function(req, res){
    res.render("transport");
}

exports.viewTransport = function(req, res){
    Routes.find({}).exec(function(error,result){
        if(error){
            res.send(500).send({error:error});
        }
        else{
            res.render("viewtransport",{transport:result});
        }
    });
}

exports.add= function(req, res){
    let newRoute = new Routes({
        route: req.body.route,
        detail: req.body.detail,
        busno: req.body.busno,
        time: req.body.time
    });

    newRoute.save((err, route)=>{
        if(err){
            res.json({msg: 'Failed to add the Route'});
        }
        else{
            res.render("transport",{transport:route});
         //   res.json({msg: 'Route is added successfully'});
        }
    });
}


//function is used to get all routes 
exports.getAll = function (req, res) {
    Routes
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

//function is used to delete route from database
exports.delete = function(req, res, next){
    Routes.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json(err);
        }
        else{
            Routes.find({}).then(function(result){
                res.render("viewtransport",{transport:result});
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
    Routes.findOne({_id:req.params.id}).exec(function(error,Routes){
    //  console.log(Routes);
      Routes.route=req.body.route?req.body.route:Routes.route;
      Routes.detail=req.body.detail?req.body.detail:Routes.detail;
      Routes.busno=req.body.busno?req.body.busno:Routes.busno;     
      Routes.time=req.body.time?req.body.time:Routes.time;           
      Routes.save(function(error,Routes){
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