import cookieParser from "cookie-parser";
import express, {Router} from "express";
import session from "express-session";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {dbconfig} from "./dbconfig.js";
import {Database} from "./db/database.repository.js";
import StudentController from "./controllers/student.controller.js";
import {econfig} from "./econfig.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import nodemailer from "nodemailer";
const app = express();
const path = __dirname + '/build/';
app.use(express.static(path));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
}));
const emailsender = nodemailer.createTransport(econfig);
const db = mysql.createPool(dbconfig);

db.getConnection( (err, connection)=> {

   if (err) throw (err)
   console.log ("DB connected successfully: " + connection.threadId)

})

function checkIDPromise() {
	return new Promise((resolve, reject)=>{
        db.query(`Select max(ID) As ID From Adult`,
            	function(err,data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function checkLoginPromise(email) {
	return new Promise((resolve, reject)=>{
        db.query(`Select login From Adult where login = ?`,[email],
            	function(err,data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function checkPasswordPromise(ID) {
	return new Promise((resolve, reject)=>{
        db.query(`Select password From Adult where ID = ?`,[ID],
            	function(err,data){
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function isAuthenticated (req, res, next) {
	if (req.session.adultId) {
		next();
		return;
	}
	res.status(401).send({error: "Unauthorized"});
	next("Unauthorized");
}


const port = 8081
app.listen(port,
()=> console.log(`Server Started on port ${port}...`))

var clientID = ""; //for the session that when the client is still connecting after login
var userFName = "";
var userLName = "";

app.get('/', (req,res)=> {
	if(req.session.adultId){
		res.redirect('/welcome');
	}
	else{
		console.log("what?");
		res.sendFile(path + "index.html");
	}
});

app.post('/createaccount',async(req,res)=> {

   	var fname = req.body.firstname;
   	var lname = req.body.lastname;
   	var email = req.body.email;
   	var password = req.body.password.toString();
	const hash = await bcrypt.hash(password, 13);
	const checkLoginExist = await checkLoginPromise(email);
	// const checkIDinBase = await checkIDPromise();
	
	if(checkLoginExist[0] === undefined){
		db.query(`INSERT INTO Adult (fname, lname, parent_role, admin_role, login, password) 
	   		VALUES (?, ?, ?, ?, ?, ?)`,[fname,lname,1,0,email,hash],
            		function(err,data){

      			if(err) { 
				console.log("Unsuccessful! Error:");
				console.log(err);
			}	
        		else	{ 
				console.log("Insert successful");
				return res.json(data);
			}	
		});
	}
	else{
		if(checkLoginExist[0].login === email[0]){
			console.log('There is already an account associated with this email');
			return res.json("createSuccess");
		}
		else
		{		
   			console.log('An error occurs');
		}
	}
})

app.post('/login',async(req,res)=> {

   	var email = req.body.email;
   	var password = req.body.password.toString();
	const checkLogin = await checkLoginPromise(email);
	
	if(checkLogin[0] === undefined) {
		console.log("Email is not in the database.");
		return res.json("Incorrect Login");
	}

	db.query(`Select password,ID,fname,lname From Adult where login = ?`,[email],
            	function(err,data){
        if(err) throw err;

		clientID = data[0]["ID"];
		userFName = data[0]["fname"];
		userLName = data[0]["lname"];
			
		const hashedPass = data[0]["password"];
		req.session.adultId = data[0]["ID"];
		bcrypt.compare(password, hashedPass, (err, data) => {
			if (err) throw err;
			
			if (data) {
				console.log("Successful login");
				return res.json({success: ["yes"], userID: [clientID], fname: [userFName], lname: [userLName]});
			}
			else {
				console.log("Incorrect Password");
				return res.json("Incorrect Password");
			}
		});
		
    });

})

app.post('/createprofile',async(req,res)=> {

	const fname = req.body.firstName;
	const lname = req.body.lastName;
	const grade = req.body.grade;
	const teacher = req.body.teacher;
	const adultId = req.session.adultId;
	let studentId = 0;

	db.getConnection( (err, connection)=> {
		connection.beginTransaction((err) => {
			if (err) {
				throw err;
			}
			connection.query(`INSERT INTO Student (fname, lname, grade, teacher)
					  VALUES (?, ?, ?, ?)`,
				[fname, lname, grade, teacher],
				(err, result) => {
					if (err) {
						console.log("Cannot create profile:");
						console.log(err);
						connection.rollback(() => {
							return res.status(500).json(err.code);
						});
					}
					studentId = result.insertId;
					console.log("Inserted Student ID " + studentId);
					connection.query(`INSERT INTO HAS (Adult_Id, Student_Id)
					  VALUES (?, ?)`,
						[adultId, studentId],
						(err, result) => {
							if (err) {
								console.log("Cannot create profile:");
								console.log(err);
								connection.rollback(() => {
									return res.status(500).json(err.code);
								});
							}
							connection.commit((err) => {
								if (err) {
									console.log("Cannot create profile:");
									console.log(err);
									connection.rollback(() => {
										throw err;
									});
									return res.json(err.code).status(500);
								}
								console.log("Profile created successfully");
								return res.json(req.body);
							});
						});
			});
		});
	})
});

app.post('/ChangePassword',async(req,res)=> {
	
   	var current = req.body.current_password.toString();
   	var password = req.body.password.toString();
	const hash = await bcrypt.hash(password, 13);
	const clientID = req.session.adultId;
	const checkpassword = await checkPasswordPromise(clientID);

	bcrypt.compare(current, checkpassword[0]["password"], (err, data) => {
			if (err) throw err;

			if (data) {
				db.query(`Update Adult set password = ? where ID = ?`,[hash, clientID],
        			function(err,result){
        				if(err) {
						console.log("Unsuccessfull! Error:");
						console.log(err);
					}
        				else	{
						console.log("change password sucessful");
						return res.json("Success");
					}
				});
			}
			else {
				console.log("Incorrect Password!");
				return res.json("Incorrect Password");
			}
    	});
})

app.post('/Logout',async(req,res)=> {
	req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("session clear!");
        }
    });
})

// MySQL groupings for different periods
const periods = {
	"week": "WEEK(`Minutes`.`date`)",
	"month": "MONTH(`Minutes`.`date`)",
	"trimester": "trimester"
};

// get reading & math statistics of students by student
app.get('/statistics/:period/student/:studentid', (req, res) => {
	if(!(req.params.period in periods)) {
		res.send("Invalid request");
		return;
	}

	const period = periods[req.params.period];
	db.query(`select ${period} ?, sum(reading_minutes) readMinutes, sum(math_minutes) mathMinutes
			from Student left join Minutes on Student.ID = Minutes.Student_Id
			where Student.ID = ? group by ${period}`,
		[req.params.period, req.params.studentid], (err, data) => {
			if(err) console.log(err);
			else res.send(data);
		}
	);
});

// gets reading & math statistics of students by adult
app.get('/statistics/adult/:adultid', (req, res) => {
    db.query(
        "SELECT fname AS firstName, ID AS sid, lname AS lastName, SUM(reading_minutes) AS readMinutes, \
        SUM(math_minutes) AS mathMinutes, \
        SUM(CASE WHEN date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) THEN reading_minutes ELSE 0 END) AS weeklyReadMinutes, \
        SUM(CASE WHEN date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) THEN math_minutes ELSE 0 END) AS weeklyMathMinutes \
        FROM HAS \
        LEFT JOIN Student ON Student.ID = HAS.Student_Id \
        LEFT JOIN Minutes ON Minutes.Student_Id = Student.ID \
        WHERE HAS.Adult_Id = ? \
        GROUP BY Student.ID",
        [req.params.adultid],
        (err, data) => {
            if (err) console.log(err);
            else res.send(data);
        }
    );
});

// route for aggregating reading/math statistics
app.get('/statistics/:period', (req, res) => {
	if(!(req.params.period in periods)) {
		res.send("Invalid request");
		return;
	}

	const period = periods[req.params.period];
	db.query(`select SUM(math_minutes) math, SUM(reading_minutes) reading from Minutes group by ${period}`, [], function(err, data) {
		if(err) console.log("An error has occurred");
		else if(data.length > 0) {
			let result = {"math": [], "reading": [], "total": []};
			let math, reading;
			data.forEach(row => {
				math = parseInt(row.math);
				reading = parseInt(row.reading);
				result["math"].push(math);
				result["reading"].push(reading);
				result["total"].push(math + reading);
			});
			res.send(result);
		} else res.send("No statistics are currently available");
	});
})

// Add Minutes from kid's profile page
app.post('/KidProfilePage/:id', async (req, res) => { // Removed the trailing slash
    try {
        const studentId = req.body.studentId; // Retrieve studentId from the request body
        const { activity, minutes } = req.body;

        let columnName;
        if (activity === 'Math') {
          columnName = 'math_minutes';
        } else if (activity === 'Reading') {
          columnName = 'reading_minutes';
        } else {
          return res.status(400).json({ error: 'Invalid activity' });
        }

        const sql = `INSERT INTO Minutes (student_id, ${columnName}) VALUES (?, ?)`; // Include student_id in the query

        db.query(sql, [studentId, minutes], (err, result) => {
          if (err) {
            console.error(`Error inserting ${activity} minutes:`, err);
            return res.status(500).json({ error: `An error occurred while inserting ${activity} minutes` });
          }
          console.log(`${activity} minutes inserted:`, result);
          res.json({ success: true });
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/student/:id/books', isAuthenticated, async (req, res) => {
	let student = new StudentController(new Database(db));
	await student.getBooks(req, res);
});

app.post('/forgetpassword',async(req,res)=> {

   	var email = req.body.email;
	const checkLogin = await checkLoginPromise(email);

	if(checkLogin[0] === undefined) {
		console.log("Email is not in the database.");
		return res.json("Incorrect Login");
	}
	else{
		db.query(`Select ID From Adult where login = ?`,[email],
            		function(err,data){
				if(err) throw err;
				req.session.adultId = data[0]["ID"];
		});

		const mailData = {
			from: '', // your email here
  			to: email,
  			subject: 'Forget Password from MinutesTracker',
  			text: 'You request to change password!',
		};
		
		emailsender.sendMail(mailData, function (err, info) {
   			if(err)
     				console.log(err)
		});
		return res.json("Success");
	}
})