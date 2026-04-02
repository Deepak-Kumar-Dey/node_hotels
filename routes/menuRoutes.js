const express = require('express')
const router = express.Router();

const MenuItem = require('./../models/MenuItem')

router.post('/', async(req,res)=>{ 
  try{
     
      const data = req.body;
      const menu1 = new MenuItem(data);

      const response = await menu1.save();

      console.log("Data saved",response);
      res.status(200).json(response)     

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'}) 
  }
})

router.get('/',async(req,res)=>{
    try{
       
      const data = await MenuItem.find();
      console.log("Data fetched successfully");
      res.status(200).json(data)
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'}) 
    }
})

router.get('/:tasteType', async(req,res)=>{
   try{
       const tasteType = req.params.tasteType
       if(tasteType == 'Sweet' || tasteType == 'Spicy' || tasteType == 'Sour' || tasteType == 'Creamy'){

          const response = await MenuItem.find({taste : tasteType})
         console.log("Data fetched successfully");
         res.status(200).json(response)
    }else{
        res.status(404).json({error: 'Invalid taste Type'})
    }
}catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'}) 
}
})


router.put('/:id', async(req,res)=>{
    try {

         const menuId = req.params.id;
         const updatedMenu = req.body;

         const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenu,{
            new: true,
            runValidators: true
         })

         if(!response){
            res.status(404).json({error : "Menu Item not found"})
         }

         console.log("Menu updated Successfully");
         res.status(200).json(response);
         
        
    } catch (err) {
         console.log(err);
         res.status(500).json({error: 'Internal server error'}) 
    }
})

router.delete('/:id', async(req,res)=>{
    try{

      const menuId = req.params.id;

      const response = await MenuItem.findByIdAndDelete(menuId)

       if(!response){
            res.status(404).json({error : "Menu Item not found"})
         }

         console.log("Menu Deleted");
         res.status(200).json({message :  'Menu deleted successfully'})
         

    }catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal server error'}) 
    }
})

module.exports = router;