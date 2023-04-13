const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
var cors = require("cors");
const path = require("path");
const { log } = require("console");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gopi@2406",
  database: "meetingapp",
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
app.post('/signup', function (request, response) {
  let email = request.body.email;
  let password = request.body.password;
 


  connection.query(
    "insert into user(email,password) values(?,?)", [email, password],
    function (error, result) {
      if (error) throw error;
      response.send(result);
    }
  )
});
app.get('/roomdetails', function (request, response) {
  connection.query(
    "SELECT * FROM room_details",
    (error, result) => {
      if (error) throw error
      response.send(result);
    }
  )
});
app.get('/details', function (request, response) {
  connection.query(
    "SELECT * FROM meeting_details",
    (error, result) => {
      if (error) throw error
      response.send(result);
    }
  )
});
// post api 
app.post('/meetingdetails', function (request, response) {
  
  let room_id = request.body.room_id;
  let name = request.body.name;
  let start_time = request.body.start_time;
  let end_time = request.body.end_time;
  let meeting_date = request.body.meeting_date;
  let purpose = request.body.purpose;
  let userId = request.body.userId;
  console.log(userId);

  connection.query(
    `INSERT INTO meeting_details(room_id,name,start_time,end_time,meeting_date,purpose,userId) values("${room_id}","${name}","${start_time}","${end_time}","${meeting_date}","${purpose}","${userId}")`,
    function (error, result) {
      console.log("result", result);
      console.log("error", error);
      if (error) throw error;
      response.send(result);

    }
  )
});

// delete api
app.delete('/details/:meeting_id', (req, res) => {
  const meeting_id = req.params.meeting_id;
  const query = `DELETE FROM meeting_details WHERE meeting_id = '${meeting_id}'`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting meeting details from database');
    } else {
      res.send(results);
    }
  });
});

app.put('/details/:room_id', function (request, response) {
  const room_id = request.params.room_id;
  let name = request.body.name;
  let start_time = request.body.start_time;
  let end_time = request.body.end_time;
  let meeting_date = request.body.meeting_date;
  let purpose = request.body.purpose;

  if (meeting_id == '') {
    connection.query(
      `UPDATE meeting_details SET name=?,start_time=?,end_time=?,meeting_date=?,purpose=? WHERE room_id=?`,
      [name, start_time, end_time, meeting_date, purpose, room_id],
      //`UPDATE meeting_details SET name = '${name}', start_time = '${start_time}', end_time = '${end_time}', meeting_date = '${meeting_date}', purpose = '${purpose}' WHERE room_id = '${room_id}'`,
      function (error, result) {
        if (error) throw error;
        response.send(result);
      }
    )
  } else {
    connection.query(
      `UPDATE meeting_details SET name=?,start_time=?,end_time=?,meeting_date=?,purpose=? WHERE room_id=?`,
      [name, start_time, end_time, meeting_date, purpose, room_id],
      //`UPDATE meeting_details SET name = '${name}', start_time = '${start_time}', end_time = '${end_time}', meeting_date = '${meeting_date}', purpose = '${purpose}' WHERE room_id = '${room_id}'`,
      function (error, result) {
        if (error) throw error;
        response.send(result);
      }
    )
  }

});

app.get('/getdetails/:room_id', function (request, response) {
  console.log(response);
  let room_id = request.params.room_id;
  connection.query(
    "SELECT * FROM meeting_details WHERE room_id=?", [room_id],
    (error, result) => {
      if (error) throw error
      response.send(result);
    }
  )
});

app.listen(3000, function () {
  console.log("myserver connect on 3000");
});

//i am changing this to check it 