var express=require('express');
var routes=express.Router();
let {login, auth, profile, updateProfile} = require("../controllers/controller");
let {rules, uploadMiddleware} = require("../middlewares/middleware");

var parser=require('body-parser');
const urlencodedParser = parser.urlencoded({ extended: true })

routes.get('/', login);
routes.post('/auth-login', urlencodedParser, rules, auth);
routes.get('/profile', profile);
routes.post('/updateProfile', urlencodedParser, uploadMiddleware, updateProfile );
module.exports=routes;
