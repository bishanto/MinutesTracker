const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const config = require("./dbconfig");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool(config.dbconfig);

db.getConnection( (err, connection)=> {

   if (err) throw (err)
   console.log ("DB connected successfully: " + connection.threadId)

})

checkIDPromise = () =>{
	return new Promise((resolve, reject)=>{
        db.query(`Select max(ID) As ID From Adult`,
            	function(err,data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
};

checkLoginPromise = (email) =>{
	return new Promise((resolve, reject)=>{
        db.query(`Select login From Adult where login = ?`,[email],
            	function(err,data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
};

const port = 8081
app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))

app.post('/createaccount',async(req,res)=> {

   	var fname = req.body.fname;
   	var lname = req.body.lname;
   	var email = req.body.email;
   	var password = req.body.password;
	const checkLoginExist = await checkLoginPromise(email);
	const checkIDinBase = await checkIDPromise();
	if(checkLoginExist[0] === undefined){
		db.query(`INSERT INTO Adult (ID, fname, lname, parent_role, admin_role, login, password) 
	   		VALUES (?, ?, ?, ?, ?, ?, ?)`,[(checkIDinBase[0].ID + 1),fname,lname,1,0,email,password],
            		function(err,data){

      			if(err) { 
				console.log("Unsuccessfull!Error:");
				console.log(err);
			}	
        		else	{ 
				console.log("Insert sucessful");
				return res.json(data);
			}	
		});
	}
	else{
		if(checkLoginExist[0].login === email[0]){
			console.log('This email already have an account!');
		}
		else
		{		
   			console.log('An error occurs!');
		}
	}
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
