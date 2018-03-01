var mongoose = require('mongoose');

// var hurtsSchema = new mongoose.Schema({
//     title: String
// });

// var dishSchema = new mongoose.Schema({
//     name: String,
//     price:String,
//     products: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product'
//         }]
// });

// module.exports = {
//     dish: mongoose.model('Partner', dishSchema),
//     Hurts: mongoose.model('hurtsSchema', hurtsSchema)
// }




const hurtSchema = mongoose.Schema({
    hurt_id: {
      type : Number,
      required: true
    },
    hurt_name : {
      type : String,
      required : true
    },
    
    hurt_dish : {
      dish : [
        {
          dish_id : {
            type : Number,
            // required : true,
          },
          dish_name : {
            type : String,
            // required : true,
          },
         dish_price : {
            type : String,
            // required : true,
          }
          
        }
      ]
    }
});

const Hurt = module.exports = mongoose.model('Hurt', hurtSchema);










//const News = module.exports = mongoose.model('News', eventSchema);