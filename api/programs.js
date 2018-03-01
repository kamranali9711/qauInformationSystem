const express = require('express');

// const Hurts = require('../models/programs.js');
// const Dish = require('../models/programs.js');
const Hurt = require('../models/programs.js');


// exports.add = function (req, res) {
//     new Dish.Dish({ name : req.body.name,
//                     price: req.body.price }).save(function (err, response) {
//         if (err) console.log(err);
//         res.json(response);
//     });
// };






// exports.add = function (req, res) {
//     var Hurts = new hurtsSchema.Hurts(req.body.dataHurts);

//     Hurts.save(function (err) {
//         if (err)  throw err;        
//         hurtsSchema.Dish.findByIdAndUpdate(
//             req.body.DishId,
//             { "$push": { "Hurts": Hurts._id } },
//             { "new": true },
//             function (err, Dish) {
//                 if (err) throw err;
//                 res.json(Dish);
//             }
//         );
//     });
// }


exports.add = function(request, response, next) {

  const Hurt = [];
  Hurt.push({
     dish_id: request.body. dish_id,
    dish_name : request.body.dish_name,
    dish_price : request.body.dish_price
  });


  let newHurt = new Hurt({
     hurt_id : request.body.hurt_id,
     hurt_name : request.body.hurt_name,
     hurt_dish : {
       dish : [Hurt]
     }
  });
  Hurt.addHurt(newHurt, (err, hurt) =>{
    console.log('came here');
    if(err){
      response.json({
        success : false,
        message : 'failed to add hurt' + err
      });
    }else {
      response.json({
        success : true,
        message : 'country added successfully'
      });
    }
  });
}