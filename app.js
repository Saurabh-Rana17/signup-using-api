const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
    console.log("server is running on port 3000");
})

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req,res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var ename = req.body.ename;
    

})

//api key
//885fcf2f5f1c52744c99a09f98d843c1-us10

// id
//15d03aa077