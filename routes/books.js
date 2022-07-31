const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');
const Book=require('../models/book');
const Author=require('../models/author');
//  
 const imageMimeTypes=['image/jpeg','image/png','image/jpg']
// const upload=multer({
//     dest:uploadPath,
//     fileFilter:(req,file,callback)=>{
//         callback(null,imageMimeTypes.includes(file.mimetype))
//     }
// })



//all book
router.get('/',async (req,res)=>{
    let query=Book.find();
    if(req.query.title!=null && req.query.title!=''){
        query=query.regex('title',new RegExp(req.query.title,'i'))
    }
    if(req.query.publishbefore!=null && req.query.publishbefore!=''){
        query=query.lte('publishdate',req.query.publishbefore);
    }
    if(req.query.publishafter!=null && req.query.publishafter!=''){
        query=query.gte('publishdate',req.query.publishafter);    //publishdate greater than equal publishafter date
    }
    
    try{
        const books=await query.exec();
       res.render('books/index',{
        books:books,
        searchoption:req.query
    }) 
    }catch{
        res.redirect('/');
    }
    
});
//new book route
router.get('/new',async (req,res)=>{  
renderNewPage(res,new Book());
});

//create book route
router.post('/',async (req,res)=>{
    const book=new Book({
        title:req.body.title,
        author:req.body.author,
        publishdate:new Date(req.body.publishdate),
        pagecount:req.body.pagecount,
        description:req.body.description
    });
    saveCover(book,req.body.cover);

  try{
        const newBook=await book.save()
        res.redirect(`books`)

    }catch{
        
      renderNewPage(res,book,true);
    }
});

async function renderNewPage(res,book,hasError=false) {
   try{
        const authors=await Author.find({});
        const params={
            authors:authors,
            book:book
       }
       if (hasError) params.errorMessage='error creating user';
       res.render('books/new',params)
      }
   catch{
       
       res.redirect('/books')
    }
}

function saveCover(book, coverEncoded) {
    if(coverEncoded==null){
    return;
    }
    const cover=JSON.parse(coverEncoded)
    if(cover!=null && imageMimeTypes.includes(cover.type)){
        book.coverimage=new Buffer.from(cover.data,'base64');
        book.coverimagetype=cover.type
    }
}

module.exports=router;