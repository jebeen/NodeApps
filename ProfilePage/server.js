let express = require("express");
let routes=require('./routes/route');
var ejs=require('ejs');

let app = express();

var cookieParser=require('cookie-parser');
app.use(cookieParser());

app.set(express.static(__dirname + '/public'));

app.set('view engine','ejs');
app.use('/', routes);

app.listen(8000, (err) => {
   if (err) throw err;
   console.log("listening on port 8000");
});
