const express = require("express");
const mysql = require("mysql2");

const app = express();
let port = 1313;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sample 1",
  port: 3306,
});
db.connect((err) => {
  if (err) {
    console.log(err, "error");
  } else {
    console.log("database connected");
  }
});
// GET METHOD
app.get("/:id", (req, res) => {
  let id = req.params.id;
  let qry = 'SELECT * FROM `student` WHERE std_id="' + id + '"';
  db.query(qry, (err, result) => {
    if (err) {
      console.log(err, "error");
    }
    console.log(result);
    if (result.length > 0) {
      res.send({ status: true, msg: "execution sucess", data: result });
    } else {
      res.send({ status: false, msg: "failed" });
    }
  });
});

// POST METHOD
app.post("/add", (req, res) => {
  let name = req.body.name;
  let lang = req.body.lang;
  let maths = req.body.maths;
  let sic = req.body.sic;
  let soc = req.body.soc;

  let qry =
    "INSERT INTO `student`(`Name`, `lang`, `maths`, `sic`, `soc`) VALUES ('" +
    name +
    "','" +
    lang +
    "','" +
    maths +
    "','" +
    sic +
    "','" +
    soc +
    "')";
    //console.log(qry);

  db.query(qry, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result.affectedRows == 1) {
      res.send({ status: true, msg: "success", data: result });
    } else {
      res.send({ status: false, msg: "error" });
    }
  });
});

app.listen(port, () => {
  console.log("run it");
});
