const mongoose=require('mongoose');
const coverimageBAsePath='uploads/bookCovers';
const bookschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    publishdate:{
        type:Date,
        required:true
    },
    pagecount:{
        type:Number,
        required:true
    },
    creatat:{
        type:Date,
        default:Date.now,
        required:true
    },
    coverimagename:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }
})
module.exports=mongoose.model('Book',bookschema);
module.exports.coverimageBAsePath=coverimageBAsePath;