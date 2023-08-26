const express = require('express');
const app=express();
const mysql=require('mysql');

app.use(express.json());
app.use(express.static(__dirname + '/public'));

let movie, moviesList, isLogged=false, mid, reviews=[];
var urlEncoded=express.urlencoded({extended: true});

const db=mysql.createConnection({
  host:'localhost',
  user:'username',
  password:'password',
  database:'database',
});

db.connect((err)=>{
  if(err) throw err;
  console.log("DB was connected");
})
app.set('view engine','ejs');

app.listen(8081,()=>{
  console.log("Server has been started at port 8081");
})

app.get('/', (req,res) => {
    let sql="select movies.*,count(reviews.comment) as count, MAX(reviews.rating) as rating from movies left join reviews on (movies.mid=reviews.mid) group by movies.mid";
    db.query(sql,(err,result,fields) => {
    if(err) throw err;
    else {
      moviesList = result;
      if(result) {
        res.render('home',{data: result});
      }
    }
  })
})

app.get('/details/:id', (req,res) => {
    let sql="select reviews.id, reviews.comment, date_format(reviews.posted_on,'%M %d %Y') as posted_on, users.name, users.eid, users.email from reviews join users on(reviews.uid = users.eid) where reviews.mid="+req.params.id;
    movie = moviesList.filter(movie => movie.mid == req.params.id)
    db.query(sql, (error, result, fields) => {
      if(error) throw error;
      else {
        for(var [i] of Object.keys(result)) {
          let obj={};
          const {comment, name, email, posted_on, eid, id} = result[i];
          obj['comment']=comment;
          obj['name']=name;
          obj['email']=email;
          obj['posted_on']=posted_on;
          obj['uid'] = eid;
          obj['review_id']= id;
          reviews.push(obj);
        }
        mid=req.params.id;
        res.render('details',{data: movie, mid: mid, reviews: reviews, logged: false, status: ""})
      }
    })
})

app.get('/login', (req,res) => {
  res.render('login',{status:""});
})

app.post("/process-form", urlEncoded, (req,res) => {
  if(req.body.email == "email" && req.body.password == "password") {
    isLogged=true;
    res.render('details',
    {
      data: movie,
      mid: mid,
      reviews: reviews,
      logged: isLogged,
      status: ""
    })
  }
})

app.post('/save-comment', (req,res) => {
  let sql="update reviews set comment='"+req.body.comment+"' where id=? AND uid=?";
  let data=[req.body.rid, req.body.uid];
  db.query(sql,data,(err,result,fields) => {
    if(err) throw err;
    else {
      res.status(200).json({status: "Success"});
    }
  })
})

app.post('/delete-comment', (req,res) => {
  let sql="delete from reviews where uid=? and id=?";
  let data=[req.body.uid, req.body.rid];
  db.query(sql,data,(err)=>{
    if(err) throw err;
    else {
      res.status(200).json({status:1});
    }
  })
})

app.post("/add-comment", (req,res) => {
  let post = { name: req.body.name, email: req.body.email };
  let sql="insert into users set ?";
  db.query(sql,post, (err, result) => {
    if(err) throw err;
    else {
      let id=result.insertId;
      sql= "insert into reviews set ?";
      post={mid: req.body.mid, uid: id, comment: req.body.comment, posted_on: curdate()};
      db.query(sql, post, (err,result) => {
        if(err) throw err;
        else {
          res.status(200).json({status:1});
        }
      })
    }
  })
})
