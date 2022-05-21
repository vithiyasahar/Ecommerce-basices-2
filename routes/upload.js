const router = require('express').Router()
const cloudinary = require('cloudinary')
const fs = require('fs')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')



// we wiil upload the image 


 cloudinary.config(
     {
         cloud_name : process.env. CLOUD_NAME,
         api_key: process.env.CLOUD_API_KEY ,
         api_secret : process.env.CLOUD_API_SECRET
     }
 )  
 // upload image
 router.post('/upload',auth,authAdmin,(req,res)=>{
    
    try {

        
        
        if(!req.files || Object.keys(req.files).length === 0){
             removeTmp(file.tempFilePath)
             return res.status(400).json({msg:"No files were uploaded"})
        }

        const file = req.files.file;
        if(file.size > 1024 *1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:"Size too large"}) }


        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){

            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:"File format is incorrect."})
        }
            
       console.log(file);

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, Result)=>{
            
            if(err) throw err;

            removeTmp(file.tempFilePath)
            res.json({public_id:Result.public_id,url:Result.secure_url})
          });
        
        
      
        

         
     } catch (err) {
         res.status(500).json({msg:err.message})
         
     }
 })
 // delete image

 router.post('/destroy',auth,authAdmin,(req,res)=>{
     try {
         const {public_id} = req.body;
         if(!public_id) return res.status(500).json({msg:'No images Selected'})

         cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
             if(err) throw err;

             res.json({msg:"deleted sucesss"})


         })
         
     } catch (err) {
         return res.status(500).json({msg:err.message})
         
     }
 })
 const removeTmp = (path) => {
     fs.unlink(path,err =>{
         if(err) throw err;
     })

 }
 

 module.exports = router


