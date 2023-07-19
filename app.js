const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

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
    var data = {
        email_address: ename,
        status: "subscribed",
        merge_fields: {
            FNAME : fname,
            LNAME : lname
        }
    }
    var jsonData = JSON.stringify(data);
    var url = "https://us10.api.mailchimp.com/3.0/lists/15d03aa077"; 
    const option = {
        method : "POST",
        auth : "Saurabh:885fcf2f5f1c52744c99a09f98d843c1-us10"
    }
    const request = https.request(url, option, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

//api key
//885fcf2f5f1c52744c99a09f98d843c1-us10

//list id
//15d03aa077