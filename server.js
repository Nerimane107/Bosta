require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = 3000;
const userRouter = require ('./routes/user');
const bostaRouter = require('./routes/bosta');
const db = mongoose.connection;

mongoose.connect(process.env.Database_URL);

db.once('open',()=>console.log("Connected to database"));

app.use(express.json());
app.use('/bosta',bostaRouter);
app.use('/user',userRouter);

app.listen(port,()=>console.log('Server Started'));


