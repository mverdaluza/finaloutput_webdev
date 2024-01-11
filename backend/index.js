import express from "express";
import multer from "multer";
import mysql from "mysql";
import path from 'path';
import cors from 'cors';

const app = express() // call express function
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ecommerce"
})

app.use(express.json()) // execute statement to insert

app.get("/", (req, res)=>{
    res.json("This is the backend")
})




// image storage

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload, images endpoint
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'),(req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:8800/images/${req.file.filename}`
    })
})



// API for allproducts, add, delete
app.get("/allproducts", (req,res)=>{
    const q = "SELECT * FROM fashion"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/addproduct", (req,res)=>{
    const q = "INSERT INTO fashion (`id`, `name`, `image`, `category`, `new_price`, `old_price`) VALUES(?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.image,
        req.body.category,
        req.body.new_price,
        req.body.old_price,
    ];
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Successfully inserted")
    })
})

app.delete("/deleteproduct/:id", (req,res)=>{
    const fashionId = req.params.id;
    const q = "DELETE FROM fashion WHERE id = ?";
    db.query(q, [fashionId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Successfully deleted");
    });
});

app.put("/updateproduct/:id", (req, res) => {
    const fashionId = req.params.id;
    const q = "UPDATE fashion SET name=?, image=?, category=?, new_price=?, old_price=? WHERE id=?";
    const values = [
        req.body.name,
        req.body.image,
        req.body.category,
        req.body.new_price,
        req.body.old_price,
        fashionId,
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Successfully updated");
    });
});



app.listen(8800, ()=>{
    console.log("Connected to backend")
}) // establish network protocol
