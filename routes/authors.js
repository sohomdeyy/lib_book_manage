const express=require('express');
const router=express.Router();
const Author=require('../models/author');
const Book=require('../models/book');



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
         res.redirect(`authors/${newAuthor.id}`);
          
    }catch{
        res.render('authors/new',{
                        author:author,
                        errorMessage:'Error creating creating author'
                    })
    }
});
router.get('/:id',async (req,res)=>{
    try {
        const author=await Author.findById(req.params.id)
        const books=await Book.find({author:author.id}).limit(5).exec()
        res.render('authors/show',{
            author:author,
            booksbyauthor:books
        })
    } catch (e){
        console.log(e);
        res.redirect('/')
    }
    
})
router.get('/:id/edit',async(req,res)=>{
    try {
        const author=await Author.findById(req.params.id)
        res.render('authors/edit',{author:author});
    } catch {
        res.redirect('/authors')
    }
   
})
router.put('/:id',async(req,res)=>{
    let author
    try{
        author=await Author.findById(req.params.id)
        author.name=req.body.name;
        await author.save();
         res.redirect(`/authors/${author.id}`);
           
    }catch{
        if(author==null){
            res.redirect('/');
        }
        else{
        res.render('authors/edit',{
            author: author,
            errorMessage:'Error updating author'
        })
    }
    }
})
router.delete('/:id',async(req,res)=>{
    let author
    try{
        author=await Author.findById(req.params.id)
        
        await author.remove();
         res.redirect('/authors');
           
    }catch{
        if(author==null){
            res.redirect('/');
        }
        else{
        res.redirect(`/authors/${author.id}`)
    }
    }
})

module.exports=router;