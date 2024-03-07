const mongoose =require('mongoose');

//Define the customer schema
const customerschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    orderProducts: [{
        productId: {
            type: String,
            required: true
        },
        productQuantity: {
            type: Number,
            required: true
        }
    }]
    
})

//Create Person Model
const customer=mongoose.model('customer',customerschema);


module.exports=customer