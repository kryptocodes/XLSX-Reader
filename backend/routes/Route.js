var express = require('express');
var router = express.Router();
const User = require("../models/user") 
const Admin = require("../models/admin")
const Products = require("../models/products")

router.post("/user",(req,res)=> {
    
    User.insertMany(req.body).then((user) => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
    
})
router.post("/admin",(req,res)=> {
    
    Admin.insertMany(req.body).then((admin) => {
        res.status(201).send(admin);
    }).catch((error) => {
        res.status(400).send(error);
    })
    
})
router.post("/products",(req,res)=> {
    
    Products.insertMany(req.body).then((products) => {
        res.status(201).send(products);
    }).catch((error) => {
        res.status(400).send(error);
    })
    
})




module.exports = router;