const express=require('express');
const router=express.Router();
const Book=require('../models/book')
router.get('/',async (req,res)=>{
    let books;
    try{
        books= await Book.find().sort({creatat:'desc'}).limit(5).exec();
    }catch{
        books=[]
    }
    res.render('index',{books:books});
});
module.exports=router;