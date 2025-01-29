const express = require('express')
const Product = require('../model/product')
const User = require('../model/userModel')
const router = express('../middleware/multer')

const validateProductData = (data) => {
    const errors = [];

    if(!data.name) errors.push('Product name is required');
    if(!data.description) errors.push('Product description if required');
    if(!data.catagory) errors.push('Product catagory is required');
    if(!data.price || isNaN(data.price) || data.price <= 0) errors.push('Valid product price is required')
    if(!data.stock || isNaN(data.stock) || data.stock <= 0) errors.push('Valid product stock is required')
    if(!data.email) errors.push('Email is required')

    return errors;
}

router.post('/create-product', pupload.array('images',10), async (req, res) => {
    const { name, description, catagory, tags, price, stock, email} = req.body;
    const images = req.filter.map((file) => file.path)
    const ValidationErrors = ValidationErrors({ name, description, catagory, stock, email});
    if(ValidationErrors.length > 0) {
        return res.status(400).json({errors: ValidationErrors})
    }
    if (images.length===0) {
        return res.status(400).json({errors: 'Atleast one image is required'})

    }
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({error: 'Email does not exist in the users database'})
        }
    
    const newProduct = new Product({
        name,
        description,
        catagory,
        tags, 
        price, 
        stock,
        email,
        images
    })
    await newProduct.save();

    res.status(201).json({
        message: ''
    })
    }
})