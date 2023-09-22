var express=require('express');
var formidable=require('formidable');
var fs=require('fs');

var app=express();
app.use(express.static(__dirname +'/'));

var event = require('events');
var emitter=new event.EventEmitter();

var multer=require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getDate() + '-' + new Date().getFullYear() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const setLogger = ({data}) => {

  fs.appendFile('./logs/logger.txt', data.name + " has been uploaded " +  "with image" + data.path + " on" + data.created_on, function (err) {
  if (err) throw err;
      console.log('Log is added.');
   });
}

const uploadFiles = (req, res) => {
    let data = {
      "name" : req.body.name,
      "path" : req.files[0].originalname ,
      "created_on" : new Date()
    };
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      fs.rename(String(oldpath), newpath, function (err) {
        if (err) throw err;
      });

});
emitter.on('upload', setLogger);
emitter.emit('upload',{"data": data});
res.status(200).redirect("/");
}

app.get("/", (req,res)=>{
  res.sendFile(__dirname+"/"+"form.html");
})

app.post("/upload_files", upload.array("files"), async function(req,res) {
  try {
  let response = await uploadFiles(req,res);
  } catch(error) {
  console.log(error);
  }
});

app.listen(5000,()=>{
  console.log("server start");
})
