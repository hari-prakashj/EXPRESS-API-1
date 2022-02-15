const express = require("express");
const mysql = require("mysql2");

const app = express();
let port = 1313;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sample 2",
  port: 3306,
});
db.connect((err) => {
  if (err) {
    console.log(err, "error");
  } else {
    console.log("database connected");
  }
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  let qry = 'SELECT * FROM `mark list` WHERE std_id="'+id+'"';
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err, "error");
    }
    if (result.length > 0) {
      res.send({ status: true, msg: "execution sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
});

app.listen(port, () => {
  console.log("run it");
});
