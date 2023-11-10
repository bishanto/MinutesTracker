const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({

   connectionLimit: 10,
   host: "db4free.net", 
   user: "minutestracker", 
   password: "cQEA7ZSdJY$L@m", 
   database: "minutesdb", 

})

db.getConnection( (err, connection)=> {

   if (err) throw (err)
   console.log ("DB connected successfully: " + connection.threadId)

})

const port = 8081
app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))

app.post('/createaccount',(req,res)=> {

   var fname = req.body.fname;
   var lname = req.body.lname;
   var email = req.body.email;
   var password = req.body.password;

   var sql = `INSERT INTO usertable (fname, lname, email, password) VALUES (?, ?, ?, ?)`;

   db.query(sql,[fname,lname,email,password],function(err,data){

      if(err) {

         console.log("Unsuccessfull");

      }

      return res.json(data);

   })

})

app.post('/login',(req,res)=> {

   var email = req.body.email;
   var password = req.body.password;

   var sql = `SELECT * FROM usertable WHERE email = ? AND password = ?`;

   db.query(sql,[email,password],function(err,data){

      if(err) {

         console.log("Error");

      }

      if(data.length > 0) {

         return res.json("Success");

      }

      else {

         return res.json("Incorrrect Login");

      }

   })

})