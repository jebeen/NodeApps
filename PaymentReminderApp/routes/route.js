var express=require('express');
var route=express.Router();
var { utilities, searchInvoice} = require('../controllers/controller');
var middleware = require('../middlewares/middleware');
var parser = require('body-parser');
const urlencodedParser = parser.urlencoded({ extended: true })

route.get('/', utilities.loginForm);
route.post('/search', urlencodedParser, searchInvoice);
route.post('/sendEmail', urlencodedParser, utilities.sendFollowupEmail);
route.get('/register', utilities.registerForm);
route.post('/process-register', urlencodedParser,middleware.signupForm, utilities.validateForm)
route.post('/process-login', urlencodedParser,middleware.loginForm, utilities.validateForm)
module.exports = route;
