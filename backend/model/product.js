const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Provide the product name"],

        },
        description: {
            type: String,
            required:[true, "Please provide the description of the product"]
        },
        catagory: {
            type: String,
            required: [true, "Please provide product catagory"]
        },
        tags: {
            type: String,
            default: [],
        },
        price: {
            type: Number,
            required: [true, "PLease provide the product price"]
        },
        stock: {
            type: Number,
            required: [true, "PLease provide the stock"]
        },
        images: {
            type: [String],
            required: [true, "Please upload product images"]
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            match: [/,+@.+\..+/, "Please provide a valid email address"],
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        },
    },
    {
        timestamps : true, 
    }
)
module.exports = mongoose.model("Product", productSchema)