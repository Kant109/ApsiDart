const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/auth');

mongoose.connect("mongodb+srv://2f2f:QW4yfGN5tsUbgVk8@apsidart.yozuq.mongodb.net/",
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log("connection à MongoDB réussie ! "))
    .catch((e) => console.error("connection à MongoDB échouée ..." + e))

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('x-Trigger','CORS')
    next();
    });
    
app.use("/auth", authRoute);

module.exports = app;