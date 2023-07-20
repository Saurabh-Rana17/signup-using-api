require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const { dirname } = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT||3000, function () {
    console.log("server is running on port 3000");
})

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req,res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const ename = req.body.ename;
    const data = {
        members: [
            {
                email_address: ename,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
    ]
    }
    const jsonData = JSON.stringify(data);
    var url = "https://us10.api.mailchimp.com/3.0/lists/15d03aa077"; 
    const option = {
        method : "POST",
        auth : "Saurabh:fd15afb0f1364d3e78173529feb6dd61-us10"
    }
    const request = https.request(url, option, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
            console.log(response.statusCode);
            if (response.statusCode === 200 ) {
                res.sendFile(__dirname+"/success.html");
            } else {
                res.sendFile(__dirname+"/failure.html");
            }
        })
    })
    request.write(jsonData);
    request.end();
    
    

})
app.post("/failure", function (req,res) {
    res.redirect("/");
})

