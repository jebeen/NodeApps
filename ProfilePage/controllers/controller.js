var express=require('express');
var events=require('events');
var fs=require('fs');
var eventEmitter = new events.EventEmitter();
var userData={};
const { validationResult, matchedData } = require('express-validator');
var formidable=require('formidable')

let app = express();
app.use(express.json());

var cookieParser=require('cookie-parser');
app.use(cookieParser());

const mysql=require('mysql');

const db=mysql.createConnection({
  host: 'localhost',
  user:'username',
  passwrod:'password',
  database: 'dabasename'
})

db.connect((err)=>{
  if(err) throw err;
  else {
    console.log("DB was connected");
  }
})

eventEmitter.on('logLogin',(data)=>{
  let txt=data.email + "is logged on "+ data.date;
  fs.writeFileSync('./logs/logs.txt', txt,'utf-8', (err) => {
    if (err) throw err;
  });
})

const login = (req,res) => {
  res.render('login',{message:""});
}

function saveProfile(name, email, profession, doj, dept, path) {
  return new Promise((resolve)=>{
    let sql="update users set name=?, profession=?, doj=?, dept=?, picture=? where email='"+email+"'";
    let data=[name, profession, doj, dept, path];
    db.query(sql, data, (error,result,fields)=>{
      if(error) throw error;
      else {
        setTimeout(()=>{
          resolve(1);
        }, 100);
      }
    })
  })
}

function getDepartments() {
  return new Promise((resolve) => {
    let mysql="select dept_id, name from dept";
      db.query(mysql, (err, result, fields)=>{
        if(err) throw err;
        else {
          setTimeout(() => {
              resolve(result);
            }, 100);
          }
      })
  });
}

const auth = (req,res) => {
  const errors= validationResult(req);
  if(!errors.isEmpty()) {
    var errMsg= errors.mapped();
    var inputData = matchedData(req);
     res.render('login', {message:"", errors:errMsg, inputData:inputData});
   } else {
     const {email, password} = req.body;
     let mysql="select * from users where email='" +email + "' and password='" +password +"' ";
     db.query(mysql,(err,result,field)=>{
       if(err) throw err;
       else {
         if(result.length) {
           userData = result;
           const cookieOptions = {
             httpOnly: true,
             secure: false,
             sameSite: 'lax'
           };
           let user={
             user: email
           }
           eventEmitter.emit('logLogin',{email:email, date: new Date(Date.now())});
           res.cookie('loginUser',user, cookieOptions);
           res.render('login', {message:"Success", errors:errMsg, inputData:inputData});
         } else {
           res.render('login', {message:"Invalid Credentials"});
         }
       }
     })
   }
}

const profile = async (req,res) => {
  let data=await getDepartments();
  res.render('profile',{name: req.cookies.loginUser.user, data: userData, depts: data, message: ""});
}

const updateProfile = async (req,res) => {
  const files = req.files;
  let filePath;
  files.forEach((file) => {
    filePath = `pictures/${file.filename}`;
    fs.rename(file.path, filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to store the file' });
      }
    });
  });
  var formdata=new formidable.IncomingForm();
  var {name, email, profession, doj, department}=req.body;
  let resp = await saveProfile(name, email, profession, doj, department, filePath);
  let data = await getDepartments();
  res.render('profile',{name: name, data: userData, depts: data, message: 'Success'});
}

module.exports={
  login,
  auth,
  profile,
  updateProfile
}
