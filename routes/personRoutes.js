const express = require('express')
const router =  express.Router()

const Person = require('./../models/Person');

// POST route to add person
router.post('/' , async(req,res)=>{
   try{
    
    const data = req.body; // Assuming the request body contains the person data
    // create a new Person document using the mongoose model
    const person1 = new Person(data);
    // save the new person to the data base
   const response =  await person1.save();

  console.log('data saved', response);
  res.status(200).json(response)

   }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'})
   }
})


// GET method to get the person
router.get('/',async(req,res)=>{

  try{
   
    const data = await Person.find();
    
     console.log('data fetched successfully');
     res.status(200).json(data)

  }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'})
  }
})


router.get('/:workType', async(req,res)=>{

      try{
           const workType = req.params.workType;
           if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){

            const response = await Person.find({work : workType})
            res.status(200).json(response)

           }else{
              res.status(404).json({error: 'Invalid work type'});
           }

        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server error'}) 
        }

})


router.put('/:id', async(req,res)=>{
   try{

      const personId = req.params.id;
      const updatedPersonData =  req.body;

      const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
         new: true,  // Return the updated document
         runValidators: true  // Run mongoose validation
      })

      if(!response){
         res.status(404).json({error : 'Person not found'})
      }

      console.log("Data updated");
      res.status(200).json(response)


   }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server error'}) 
   }
})


router.delete('/:id', async(req,res)=>{
   
   try{

      const personId =  req.params.id; // Extract the person's ID from the URL parameter

      // Assuming you have a Person Model
      const response = await Person.findByIdAndDelete(personId)

      if(!response){
         res.status(404).json({error : 'Person not found'})
      }

      console.log("Data deleted");
      res.status(200).json({message :  'person deleted successfully'})
      

   }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'}) 
   }
})

module.exports = router;
