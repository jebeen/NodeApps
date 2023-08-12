/*
var http=require('http');
http.createServer((req,res)=>{
  console.log("Server starts");
  res.writeHead(200,{'Content-Type': 'text/html'});
  res.end("hello");
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
*/
var http=require("http");
const path = require('path');
var express=require("express");
var app=express();
var ejs=require("ejs");
var formidable=require("formidable");
var multer=require("multer");
var fs=require("fs");
var mysql=require("mysql");
var parser=require("body-parser");
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
var urlEncoded=express.urlencoded({extended: false});
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,file.originalname);
  },
  file:(req,file,cb)=>{
    cb(null, Date.now()+"-"+file.originalname);
  }
})
const upload=multer({storage:storage});

const db=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restapi'
})

db.connect((err)=>{
  if(err) throw err;
})

app.listen(8081,()=>{
  console.log("server started");
})

app.get("/",(req,res)=>{
res.render('index');
})

app.post('/addBlog',(req,res)=>{
  let sql="insert into posts set ?";
  db.query(sql,req.body.data,(err)=>{
    if(err) throw err;
    else{
      res.status(200).json({status:1});
    }
  })
})

app.post("/getBlogs",(req,res)=>{
  let sql;
  if(req.body.fetch == "all") {
    sql=`select name,message,date_format(created_ts,'%y %m %d') as date,image, category from posts LIMIT ${req.body.limit}`;
  } else {
    sql="select name,message,date_format(created_ts,'%y %m %d') as date,image, category from posts where category='" + req.body.data.cat + "'";
  }
  db.query(sql,(err,result,fields)=>{
    if(err) throw err;
    else {
      if(result.length>0) {
        res.status(200).json({status:1, data: result});
      } else {
        res.status(400).json({status:0});
      }
    }
  })
})
