const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const axios = require('axios')

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.set('views',path.join(__dirname,"views"));
app.set("view engine","pug");

const PORT = process.env.PORT || 5000;


app.get("/",async (req,res) => {
    const items = await axios.get('https://jsonplaceholder.typicode.com/todos');
    res.render('index',{items:items.data})
})

app.get("/about",(req,res) => {
    res.render('about');
})

app.get("/contacts",(req,res) => {
    res.render('contacts');
})

app.listen(PORT,()=>{
    console.log("Server running on port " + PORT);
})