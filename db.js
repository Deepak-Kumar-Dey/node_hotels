

const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'  //Replace 'hotels' with your database name

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