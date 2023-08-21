const { validationResult, matchedData } = require('express-validator');
var express=require('express');
var cookieParser=require('cookie-parser');
var fs=require('fs');
const async = require("async");
var Logger=require('../logs/logger');
const logger=new Logger();
var nodemailer = require('nodemailer');
express().use(cookieParser());

let users=[];

const utilities={

  loginForm:function(req, res) {
      res.render('login',{message:""});
  },

  registerForm: function(req,res) {
    res.render('register');
  },

  validateForm:async function(req,res){
      const errors= validationResult(req);
      if(!errors.isEmpty()){
        var errMsg= errors.mapped();
        var inputData = matchedData(req);
        if(req.route.path == '/process-register') {
          res.render('register', {errors:errMsg, inputData:inputData});
         } else {
           res.render('login', {message:[],errors:errMsg, inputData:inputData});
         }
       } else {
          var inputData = matchedData(req);
          const {email, password} = req.body;
          const cookieOptions = {
            maxAge: 5000,
            expires: new Date(Date.now()+24*60*60*1000),
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
          };
          res.cookie('user',email, cookieOptions);

          if(req.route.path == '/process-register') {
            let user={
              name: inputData.firstName + " " + inputData.lastName,
              email: inputData.email,
              password: inputData.password,
              type: "signup"
            }
            users.push(user);
            const data = fs.readFileSync('./user.json');
            const jsonData = JSON.parse(data);
            jsonData.users.push(user);
            fs.writeFileSync('./user.json', JSON.stringify(jsonData),'utf-8', (err) => {
              if (err) throw err;
            });
            logger.log(user);
            logger.on('newUsersignupCompleted', (status)=>{
              status ? console.log("Log is updated") : console.log("Error in updating the log");
            })
            res.render('login',{message: "Please login to proceed"});
            } else {
              const data = fs.readFileSync('./user.json');
              const jsonData = JSON.parse(data);
              let filteredUser = (jsonData.users).filter((item)=>item.email == email && item.password == password);
              if(filteredUser) {
                let result;
                try {
                  result=await getInvoices(req,res);
                } catch (err) {
                  console.log(err);
                }
                res.render('home', {user: email, data: result, message: ""});
              } else {
                res.render('login', {message: "Invalid Credentials"});
            }
         }
      }
  },

  sendFollowupEmail : async (req,res) => {
    let {name, email, price, dueDate, invoice_ref } = req.body;

    let logData={
      name: name,
      email: email,
      invoice: invoice_ref,
      type: 'email'
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });

    var mailOptions = {
      from: 'youremail@gmail.com',
      to: 'receiveremail@gmail.com',
      subject: 'Payment Followup Email',
      text: `<h3><b>Dear ${name} </b></h3><p> Your payment was due on ${dueDate} for the invoice ${invoice_ref}</p>.<p>It would be grateful if you could let me know when we can expect to receive payment.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        logger.log(logData);
        logger.on('emailLogCompleted', (status)=>{
          status ? console.log("Log is updated") : console.log("Error in updating the log");
        })
        res.render("home", { user: email, data: result, message: "Email has been sent" });
      }
    });
  },

}

function searchInvoice(req,res) {
  var user=req.body.user;
  let result=getInvoices(req,res);
  res.render('home',{ user: result.email, data: result, message: "" });
}

function getInvoices (req,res) {
  var user=req.body.user ? req.body.user : null;
    return new Promise((resolve) => {
      fs.readFile("./invoices.json", function(err, data) {
        if (err) throw err;
        var userss = JSON.parse(data);
        if(user != null) {
          userss= (userss.invoices).filter(usr=>usr.name === user)
        }
        setTimeout(() => {
            resolve(userss);
          }, 100);
        });
    });
}

module.exports={
  utilities,
  searchInvoice
}
