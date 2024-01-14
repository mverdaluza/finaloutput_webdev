const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database connection with mongo db
mongoose.connect("mongodb+srv://maverdaluza:maverdaluzaMongo2024@cluster0.j2x6iej.mongodb.net/stylesphere");

// API 
app.get("/", (req, res)=>{
    res.send("Express App is running");
})

const storage = multer.diskStorage({
    destination: './upload/images', 
    filename: (req, file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload endpoint for images
app.use("/images", express.static('upload/images'))

app.post("/upload",upload.single('product'),(req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating product
const Product = mongoose.model("Fashion",{
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

// API for adding, deleting, all products, 
app.post('/addproduct', async(req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_arr = products.slice(-1);
        let last_product = last_product_arr[0];
        id = last_product.id+1;
    }
    else{
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
    });
    console.log(product);
    await product.save();
    console.log("Product Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.post('/remove', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Product is Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("Products Fetched");
    res.send(products);
})





app.listen(port, ((error)=>{
    if (!error){
        console.log("Server running on port "+port);
    }
    else{
        console.log("Error: "+error)
    }
}))