const mongoose =require('mongoose');

//Define the customer schema
const productschema=new mongoose.Schema({
    productname:{
        type:String,
        require:true,
        unique:true
    },
    productdetails:{
        type:String,
        require:true
    },
    productcompany:{
        type:String,
        require:true,
      
    },
    orderProductQuantity:{
        type:Number,
        require:true
    },
    
})

//Create Person Model
const products=mongoose.model('products',productschema);


module.exports=products

