let mysql=require('mysql');
var express=require('express');
var app=express();
const { validationResult, matchedData } = require('express-validator');

let fs=require('fs');
let multer=require('multer');
var products=[];
const upload=multer({storage:storage});
var isLogged=false;

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/uploads/');
  },
  filename:(req,file,cb)=>{
    cb(null, file.originalname)
  }
});

let db=mysql.createConnection({
  host:'localhost',
  user: 'username',
  password: 'password',
  database: 'restapi'
})

db.connect((err)=>{
  if(err) throw err;
})

const loadIndex = (req,res)=>{
  res.render('home');
}

const getLogin = (req,res)=>{
  res.render("login",{status:""});
}

const handleForm = (req,res)=>{
  let sql="select email,password from users where email='" + req.body.email + "' and password='" + req.body.password + "'";
  db.query(sql,(err,result,field)=>{
    if(err) throw err;
    if(result.length>0) {
      isLogged=true;
      res.render("products",{data:products,status:"Login is succeeful",name: req.body.name})
    } else {
      res.render('login',{status:"Invalid Credentials"});
    }
  })
}

const getProducts = (req,res)=>{
  fetchProducts(req,res);
  if(isLogged) {
    res.render('products',{data:products,status:"",name: req.body.name});
  } else {
    res.render('login',{status:"Please login to access the products page"});
  }
}

const fetchProducts = (req,res)=>{
  let sql="select * from products";
  db.query(sql,(err,result,fields)=>{
    if(err) throw err;
      if(result.length>0) {
        for(var i in result) {
          for(var j in result[i]) {
            if(j == 'qrcode' && (result[i][j].length == 0)) {
                result[i]['code'] = 0;
              } else {
                result[i]['code'] = 1;
              }
            }
          }
      products=result;
      return products;
    } else {
      return 0;
    }
  })
}

const uploadImage = (req,res) => post("/upload", upload.single('picture'),(req,res,next)=>{
  let id=req.body.pid;
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  let sql="update products set image='" + file.originalname + "' where p_id=?";
  let data=[id];
  db.query(sql,data,(error,result,fields)=>{
    if(error) throw error;
    res.render("products",{data:products,status:"Product "+id+" has been updated",name: req.body.name});
  })
})

const processForm = (req,res) =>{
  const errors= validationResult(req);
  if(!errors.isEmpty()) {
    var errMsg= errors.mapped();
    var inputData = matchedData(req);
    res.render('login', {errors:errMsg, inputData:inputData,status:""});
    } else {
       var inputData = matchedData(req);
       let sql="select email,password from users where email='" + req.body.email + "' and password='" + req.body.password + "'";
       db.query(sql,(err,result,field)=>{
        if(err) throw err;
         if(result.length>0) {
           isLogged=true;
           res.render("products",{data:products,status:"Login is succeeful", name:req.body.name})
         } else {
           res.render('login', {errors:errMsg, inputData:inputData,status:"Invalid Credentials"});
         }
      })
   }
}

const userForm = (req, res) => {
    res.render('login',{status:""});
}

module.exports = {
  loadIndex,
  getLogin,
  handleForm,
  getProducts,
  fetchProducts,
  uploadImage,
  processForm,
  userForm
}
