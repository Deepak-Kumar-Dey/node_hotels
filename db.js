

const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL  //Replace 'hotels' with your database name
const mongoURL = process.env.MONGODB_URL; 


// set up mongodb connection
mongoose.connect(mongoURL)

// Get the default connection
//Mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;


// Define event listeners for database connection
db.on('connected',()=>{
    console.log('Connected to mongodb server');   
})

db.on('error',(err)=>{
    console.log('Mongodb connection error:',err);   
})

db.on('disconnected',()=>{
    console.log('Mongodb disconnected');   
})

// Exports the database connection
module.exports = db;