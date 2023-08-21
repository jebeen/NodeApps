var express=require('express');
var app=express();
var routes=require('./routes/route');
var ejs=require('ejs');

app.use('/', routes);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.listen(8081, ()=>{
  console.log('Server starts at port 8081');
});
