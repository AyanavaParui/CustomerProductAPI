const express=require('express');
const router = express.Router();
const customer = require('./../models/customer');

//add Customer
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newCustomer = new customer(data);
        const response = await newCustomer.save();
        console.log('data Saved...');

        res.status(200).json(response);

    } catch (error) {
        console.log('data not Saved...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//GET customer all 
router.get('/', async (req, res) => {
    try {
        const customerData = await customer.find();
        console.log('All Customer Fetched...');
        res.status(200).json(customerData);

    } catch (error) {
        console.log('Menu not Found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//find customer by email
router.get('/:email',async(req,res)=>{
    try {
        const emailType=req.params.email;//Extract work from url parameter (this is called parameterised url)
   
        const response=await customer.find({email:emailType});
        console.log('response fetched');
        res.status(200).json(response)
    
    } catch (error) {
        console.log('data not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    })

     //update product

     router.put('/:email',async(req,res)=>{
        try {
            const emailType=req.params.email; //extract id from the Url Parameter
            const updatedemailData=req.body;//updated data from the person

            const response = await customer.findOneAndUpdate({ email: emailType }, updatedemailData, {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validation
            });
    
            if (response === null) {
                return res.status(404).json({error:'email Not Found'});
            }
            console.log('customer product Updated...')
            res.status(200).json(response)
        } catch (error) {
            console.log('customer product not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    })


module.exports=router;