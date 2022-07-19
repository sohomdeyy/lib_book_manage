const express=require('express');
const router=express.Router();
const Author=require('../models/author');




//all author
router.get('/',async (req,res)=>{
    let searchoption={};
    if(req.query.name!=null && req.query.name!==''){
        searchoption.name=new RegExp(req.query.name,'i');
    }
    try{
   const authors=await Author.find(searchoption);
    res.render('authors/index',{authors:authors,
    searchoption:req.query});
    }
    catch{
        res.redirect('/');
    }
});



//new author
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()});
});




//create author
router.post('/',async (req,res)=>{
    const author=new Author({
        name:req.body.name,
    })
    try{
        const newAuthor=await author.save();
        // res.redirect(`authors/${newAuthor.id}`);
             res.redirect(`authors`);
    }catch{
        res.render('authors/new',{
                        author:author,
                        errorMessage:'Error creating creating author'
                    })
    }
});
module.exports=router;