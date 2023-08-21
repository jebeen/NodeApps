var EventEmitter=require('events');
var fs=require('fs');

class Logger extends EventEmitter {

  log(userData){

    let status=0, data, logFile, callback;

    switch(userData.type) {
      case "signup":
        data = userData.name + " registered on " + new Date().toLocaleString() + "\n";
        logFile = "newusers.txt";
        callback = "newUsersignupCompleted";
      break;

      case "email":
        data = "Payment followup email has been to "+ userData.name + "(" + userData.email + ")";
        data += "on" + new Date().toLocaleString() + "for the invoice"+ userData.invoice + "\n";
        logFile = "emailLogs.txt";
        callback = "emailLogCompleted";
      break;
    }

    fs.appendFile('./logs/'+logFile, data, (err)=>{
        if( err ) {
          throw err;
        }
        status=1;
        this.emit(callback, status);
      });
    }
  }

module.exports = Logger;
