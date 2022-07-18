const mongoose=require('mongoose');
const authorschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Author',authorschema);