const mongoose=require('mongoose');
const Book=require('./book');
const authorschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})
authorschema.pre('remove',function (next) {
    Book.find({author:this.id},(err,books)=>{
        if(err){
            next(err)
        }else if(books.length>0){
            next(new Error("This Author Doesn't Exist"))
        }else{
            next()
        }
    })
})
module.exports=mongoose.model('Author',authorschema);