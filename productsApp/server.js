var express=require('express');
var app=express();
var ejs=require('ejs');
let fs=require('fs');
let multer=require('multer');
let mysql=require('mysql');
var products=[];

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/uploads/');
  },
  filename:(req,file,cb)=>{
    cb(null, file.originalname)
  }
});

const upload=multer({storage:storage});

app.use(express.static(__dirname +'/public'));
app.set('view engine','ejs');
app.use(express.json());

let db=mysql.createConnection({
  host:'localhost',
  user: 'username',
  password: 'password',
  database: 'restapi'
})

db.connect((err)=>{
  if(err) throw err;
})

app.get('/',(req,res)=>{
  res.render('home');
})

app.get('/home',(req,res)=>{
  res.render('home');
})

function readDir() {
let dirPath='./public/qr_codes/';
  fs.readdir(dirPath, (error, files) => {
  if (error) console.log(error)
    files.forEach( (file) => {
      row_id=file.split('_');
      id=row_id[1];
      const image = readImageFileWithBuffer(dirPath+file);
      let sql="update products set qrcode=? where p_id=?";
      const data=[image,id];
      db.query(sql, data, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      console.log('Number of rows affected:', results.affectedRows);
      });
    });
  });
}

function readImageFileWithBuffer(file) {
  const filebitmap = fs.readFileSync(file);
  const filebuf = new Buffer(filebitmap);
  return filebuf;
}

app.listen(8081,()=>{
  console.log("server starts");
  readDir();
})

app.get('/products',(req,res)=>{
  res.render('products',{data: products, status: ""});
})

app.get('/getproducts', (req,res)=>{
  let sql="select * from products";
  db.query(sql, (err, result, fields) => {
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
      res.status(200).json({records: 1, data: result});
    } else {
      res.status(200).json({records: 0});
    }
  })
})

app.post("/upload", upload.single('picture'),(req,res,next)=>{
let id=req.body.pid;
const file = req.file;
  if ( !file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  let sql="update products set image='" + file.originalname + "' where p_id=?";
  let data=[id];
  db.query(sql,data,(error,result,fields)=>{
    if(error) throw error;
    res.render("products",{data: products, status: "Product "+id+" has been updated"});
  })
})
