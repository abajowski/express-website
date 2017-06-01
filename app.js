const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
    res.render("index");
}); 

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.post("/contact/send", function(req, res) {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "",
            pass: ""
        }
    });

    let mailOptions = {
        from: "",
        to: "",
        subject: "",
        text: "",
        html: ""
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            res.redirect("/");
        } else {
            console.log("Message send "+info.response);
            res.redirect("/");
        }
    });

});

app.listen(3000);
console.log("Server is running on port 3000");
