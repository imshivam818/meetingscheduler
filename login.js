const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
var cors = require("cors");
const path = require("path");
// const { log } = require("console");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shiv@m123",
  database: "login",
  insecureAuth: true,
});


const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(cors());


app.get("/", function (request, response) {
  response.send("login page");
});



app.post("/login", function (request, response) {
  let email = request.body.email;
  let password = request.body.password;
  if (email && password) {
    connection.query(
      "SELECT id, email FROM user WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.email = email;
          request.session.password = password;
          response.send(results);
          console.log(results);
        } else {
          response.send("Incorrect Username and/or Password!");
        }
      }
    );
  } else {
    response.send("Please enter Username and Password!");
  }
});
app.post('/signup',function(request,response){
       let email= request.body.email;
       let password= request.body.password;
       
       connection.query(
        "insert into user(email,password) values(?,?)",[email,password],
        function(error,result){
      if(error) throw error;
       response.send(result);
        }
       )
  });
app.get('/roomdetails',function(request,response){
    connection.query(
     "SELECT * FROM room_details",
     (error,result)=>{
   if(error) throw error
    response.send(result);
     }
    )
});
app.get('/details',function(request,response){
    connection.query(
     "SELECT * FROM meeting_details",
     (error,result)=>{
   if(error) throw error
    response.send(result);
     }
    )
});
app.post('/meetingdetails',function(request,response){
  // console.log(request.body);
  // let meeting_id=request.body.meeting_id;
  let room_id=request.body.room_id;
  let name= request.body.name;
  let start_time= request.body.start_time;
  let end_time=request.body.end_time;
  let meeting_date=request.body.meeting_date;
  let purpose=request.body.purpose;
  let userId=request.body.userId;
  connection.query(
    `INSERT INTO meeting_details(room_id,name,start_time,end_time,meeting_date,purpose,userId) values("${room_id}","${name}","${start_time}","${end_time}","${meeting_date}","${purpose}","${userId}")`,
   function(error,result){
    // console.log("result", result);
    // console.log("error", error);
 if(error) throw error;
  response.send(result);

   }
  )
});
app.delete('/details/:room_id', (req, res) => {
  const room_id = req.params.room_id;
  const query = `DELETE FROM meeting_details WHERE room_id = '${room_id}'`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting meeting details from database');
    } else {
      res.send(results);
    }
  });
});
app.listen(3000, function () {
  console.log("myserver connect on 3000");
});


