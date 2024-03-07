const express = require('express');
const app = express();

//config  by dotenv
require('dotenv').config();
//fetichimg data from env
const PORT = process.env.PORT||3000;

const db = require('./db');


var bodyParser = require('body-parser');
app.use(bodyParser.json())//it will store all data in req.boy



app.get('/', function (req, res) {
    res.send('Customer and Product Relation')
})


// import the router files customerroutes
const customerroutes =require("./routes/customerroutes");
//Use the Routes
app.use('/customer',customerroutes)

// import the router files products
const productsroutes =require("./routes/productrouts");
//Use the Routes
app.use('/products',productsroutes)


//LISTENING ON PORT 3000
app.listen(PORT, () => {
    console.log("Server is Running on the port"+PORT)
})