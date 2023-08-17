var express=require('express');
var ejs=require('ejs');
var routes=require('./routes/route');
var app=express();

var parser=require('body-parser');
app.use(parser.urlencoded({extended: true}));

app.use(express.static(__dirname +'/public'));

app.use('/',routes);

app.listen(8081,()=>{
  console.log("server starts");
  setInterval(readDir, 6000);
})

function readDir() {
  let dirPath='./public/qr_codes/';
  fs.readdir(dirPath, (error, files) => {
    if (error) console.log(error)
      files.forEach( (file) => {
      row_id=file.split('_');
      id=row_id[1];
      const image = readImageFile('./public/qr_codes/'+file); // `data`'s type is Buffer
      let sql="update products set qrcode=? where p_id=?";
      const data=[image,id];
      db.query(sql, data, (error, results, fields) => {
      if (error){
       return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows);
   });
 });
})
}

function readImageFile(file) {
  const bitmap = fs.readFileSync(file);
  const buf = new Buffer(bitmap);
  return buf;
}

function fileExists(path) {
  if (fs.existsSync(path)) {
  return 1;
  }
  return 0;
}
