let express=require('express');
let app=express();
let mysql=require('mysql');
let fs=require('fs');
var cookieParser=require('cookie-parser');

const cookieOptions = {
  maxAge: 5000,
  expires: new Date(Date.now()+24*60*60*1000),
  secure: false,
  httpOnly: true,
  sameSite: 'lax'
};

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname +'/public'));
app.set('view engine','ejs');

let db=mysql.createConnection({
  host:'hostname',
  user : 'username',
  password : 'password',
  database : 'dbname'
});

db.connect((err) => {
  if(err) throw err;
  console.log('DB is connected ...');
});

app.get("/signup", (req,res) => {
  res.render("signup");
});

app.get("/login", (req,res) => {
  res.render("login", {message: ""});
});

app.post("/handleLogin", (req,res) => {
  let name=req.body.name;
  let password=req.body.password;
  let status="";
  if(name == "user" && password=="password") {
    status="success";
    res.cookie('loginUser','user',cookieOptions);
    res.writeHead(301, { Location: "/services/1" });
    res.end();
  } else {
    status="fail";
  }
  res.render('login',{message: status});
});

app.get('/other', (req,res) => {
  res.render('other');
});

app.get("/services/:id", (req,res) => {
  let user=req.cookies.loginUser;
  if(user !== 'undefined') {
    res.cookie('loginUser',user, cookieOptions);
  } else {
    res.render('services', {page:"", data:"",status: 'Login to access the page',user: user});
  }
  let sql="select services.sid, title, budget, technology, description, category1, desc1, category2, desc2, category3, desc3 from services join category on(services.id = category.sid) where services.sid="+req.params.id;
  db.query(sql, (err,result, fields) => {
    if(err) throw err;
    res.render('services', {data: result, page : req.params.id, status:"", user: user});
  });
});

app.get('/about', (req,res) => {
  fs.readFile('./about.json', 'utf-8', (err, data) => {
    if(err) throw err;
    let obj=JSON.parse(data);
    res.render('about',{data: obj});
  })
});

app.get('/', (req,res) => {
  res.render('home');
})

app.listen(5000, ()=>{
  console.log('Server starts ...');
})
