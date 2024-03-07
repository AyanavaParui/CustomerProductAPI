const express=require('express');
const router = express.Router();
const products = require('./../models/products');

//add product
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newproduct = new products(data);
        const response = await newproduct.save();
        console.log('product Saved...');

        res.status(200).json(response);

    } catch (error) {
        console.log('product not Saved...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//GET product all 
router.get('/', async (req, res) => {
    try {
        const productData = await products.find();
        console.log('All products Fetched...');
        res.status(200).json(productData);

    } catch (error) {
        console.log('products not Found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//find customer by productname
router.get('/:pname',async(req,res)=>{
    try {
        const productname=req.params.pname;//Extract work from url parameter (this is called parameterised url)
   
        const response=await products.find({productname:productname});
        console.log('response fetched');
        res.status(200).json(response)
    
    } catch (error) {
        console.log('data not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    })

     //update product

     router.put('/:pname',async(req,res)=>{
        try {
            const productname=req.params.pname; //extract id from the Url Parameter
            const updatedproductlData=req.body;//updated data from the person

            const response = await products.findOneAndUpdate({ productname: productname }, updatedproductlData, {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validation
            });
    
            if (response === null) {
                return res.status(404).json({error:'email Not Found'});
            }
            console.log('product Updated...')
            res.status(200).json(response)
        } catch (error) {
            console.log('customer product not found...' + error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    //Delete
    router.delete('/:pname',async(req,res)=>{
        try {
            const pname=req.params.pname; //extract id from the Url Parameter
            //Assuming you have a person model
            const response =await products.findOneAndDelete(pname);
            if (response === null) {
                return res.status(404).json({error:'Menu Not Found'});
            }
            console.log('product Deleted Sucessfully!!!')
                res.status(200).json({message :"Menu Deleted Sucessfully!!!"})
        } catch (error) {
            console.log('Menu not found...' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })


   

module.exports=router;