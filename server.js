const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const axios = require('axios');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(fileUpload({useTempFiles : true,}));

app.set('views',path.join(__dirname,"views"));
app.set("view engine","pug");

const PORT = process.env.PORT || 5000;






app.get("/",async (req,res) => {
    res.render('index');
})

app.post("/pdf",async (req,res) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('output.pdf'));
    const data = req.body;

    const imgPath = (req.files) ? req.files.img.tempFilePath : "img/img.png";
    req.files && req.files.img.mv(__dirname + '/img/' + req.files.img.name ,err => {
        console.log("Image Saved");
    })

    doc
        .image(imgPath , {width:80,height:80})
        .moveDown(1)
        .fontSize(28)
        .text(data.name,{align:"center",link: 'http://apple.com/', underline: true})
        .moveDown(1)
        .fontSize(14)
        .text(data.text)
        .moveDown(1)
        .fontSize(22)
        .text("Price: " + data.price + "$")
    doc.end();


    setTimeout(function(){
        res.download(__dirname + '/output.pdf');
        setTimeout(function(){
            fs.unlink(`${__dirname}/output.pdf`, (err)=>{
                console.log("PDF Deleted")
            })
        },100)
    },500)
})

app.listen(PORT,()=>{
    console.log("Server running on port " + PORT);
})