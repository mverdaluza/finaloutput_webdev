const port = 4000; // port number 
const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); // database
const jwt = require("jsonwebtoken"); 
const multer = require("multer"); // image storage system and it will be stored in upload folder 
const path = require("path"); 
const cors = require("cors"); // access to react project and to connect to backend


app.use(express.json()); 
app.use(cors()); 

// Database connection with mongo db
mongoose.connect("mongodb+srv://maverdaluza:maverdaluzaMongo2024@cluster0.j2x6iej.mongodb.net/stylesphere");

// API to check express app
app.get("/", (req, res)=>{
    res.send("React App is running");
})

// image storage system
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

// schema for creating Product using mongoose db
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

// API for adding product 
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

// api for remove product with id
app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Product is Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.put('/updateproduct/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProductData = req.body;

        // Update the product in the database
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            { $set: updatedProductData },
            { new: true }
        );

        if (updatedProduct) {
            res.json({ success: true, message: 'Product updated successfully', updatedProduct });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// api to fetch all products from database
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("Products Fetched");
    res.send(products);
})



// schema for user
const Users = mongoose.model('Users',{
    name: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData: {
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// endpoint for signup 
app.post('/signup', async (req, res) => {

    let check = await Users.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// endpoint for user login, verifying the user id and password from database
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passwordCompare = req.body.password === user.password;
        if(passwordCompare){
            const data ={
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');  
            res.json({success:true, token})  // generate token if success
        }
        else{
            res.json({success:false, errors: "Incorrect password"});
        }
    }
    else{
        res.json({success:false,errors:"Incorrect email address"});
    }
})

// endpoint for new collection
app.get('/newcollections', async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);  // added new collection
    console.log("New Collection Fetch");
    res.send(newcollection); 
})

//endpoint for popular in clothing
app.get('/popularintops',async(req, res)=>{
    let products = await Product.find({category:"tops"});
    let popularinTops = products.slice(0,4);
    console.log('Popular in Tops Fetched');
    res.send(popularinTops);
})

// middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};


// endpoint for add to cart 
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added product to Cart",req.body.itemId);
    let usersData = await Users.findOne({_id:req.user.id});
    usersData.cartData[req.body.itemId]+= 1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: usersData.cartData});
    res.send("Added")
})

// endpoint for deleting product from cart
app.post("/removecart",fetchUser, async(req,res)=>{
    console.log("Removed product from Cart",req.body.itemId);
    let usersData = await Users.findOne({_id:req.user.id});
    if(usersData.cartData[req.body.itemId]>0)
    usersData.cartData[req.body.itemId]-= 1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: usersData.cartData});
    res.send("Removed")
})

// endpoint for getting cartdata
app.post('/getCart',fetchUser, async(req,res)=>{
    console.log("GetCart");
    let usersData = await Users.findOne({_id:req.user.id});
    res.json(usersData.cartData);

})


app.listen(port, ((error)=>{
    if (!error){
        console.log("Server running on port "+port);
    }
    else{
        console.log("Error: "+error)
    }
}))