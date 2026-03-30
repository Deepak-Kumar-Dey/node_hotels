
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 3000


const bodyParser = require('body-parser');
app.use(bodyParser.json());



const Task = require('./models/Task')



app.listen(PORT, ()=> {
  console.log('Server is running on Port 3000')
})
app.get('/', (req, res) => {
  res.send('Welcome to my hotel... How can i help you?')
})


// Import the router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);



app.post('/api/tasks',async(req,res)=>{
 
  try{
    const data = req.body;
    const task1 = new Task(data);

    const response = await task1.save();
    console.log("Data saved",response);
    res.status(200).json(response);  

  }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server error'}) 
  }
})

app.get('/api/tasks', async(req,res)=>{
  
    try{
      const data = await Task.find();
      console.log("data fetched successfully");
      res.status(200).json(data);
      
    }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server error'}) 
    }

})


