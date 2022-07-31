const mongoose=require('mongoose');
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
    coverimage:{
        type:Buffer,
        required:true
    },
    coverimagetype:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }
})
bookschema.virtual('coverimagepath').get(function () {
    if(this.coverimage!=null && this.coverimagetype!=null){
        return `data:${this.coverimagetype};charset=utf-9;base64,${
            this.coverimage.toString('base64')}`
    }
})
module.exports=mongoose.model('Book',bookschema);