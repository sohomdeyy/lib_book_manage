
const express=require('express');
const expresslayout=require('express-ejs-layouts');
const indexrouter=require('./routes/index');
const authorrouter=require('./routes/authors');
const bookrouter=require('./routes/books');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const methodoverride=require('method-override');
///const fileupload = require("express-fileupload");

const app=express(); 
//app.use(fileupload());
require('dotenv').config();

mongoose.connect(process.env.DB,{
    useNewUrlParser:true
})
// const db=mongoose.connection;
// db.on('error',error=>console.log(error));
// db.once('open',()=>console.log('connected to mongo'));

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.set('view engine','ejs');
app.set('views',__dirname+'/views'); 
app.set('layout','layouts/layout');
app.use(expresslayout);
app.use(express.static('public'));
app.use(bodyparser.urlencoded({limit:'10mb',extended:false}));
app.use(methodoverride('_method'));


app.use('/',indexrouter); 
app.use('/authors',authorrouter);
app.use('/books',bookrouter);
app.listen(process.env.PORT||3000);
