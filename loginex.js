const path = require("path");

const express = require("express");
const app = express();

//

const helmet = require("helmet")
app.use(helmet())
//
const cookieParser = require("cookie-parser")
//

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

//

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) =>{
    res.send("<h1>welcome, back again </h1>");
})

//

app.get("/login", (req, res, next) =>{
    res.render("login");
})
//
// app.post("/process_login", (req, res, next) =>{
//     res.json("hello")
// })

app.post("/process_login", (req, res, next) =>{
    //req. body  is made by urlencoded, which parses the http message foe sent data
   const password = req.body.password;
   const username = req.body.username;
//check the db to see if user credentails valid
//if the are valid
//-- save they username in a cookie
//- send them to wel come page
    if(password === "x"){
        // res.cookie take 2 arg
        //1. name on the cookie
        //2.value to set it to
        res.cookie("username", username);
        //res.redirect take 1 arug
        // send them to other browser
        res.redirect("/welcome")
    }else{
        res.redirect("/login?msg=fail")
    }
    // res.json(req.body);
})


//welcome page path

app.get("/welcome", (req, res, next)=>{
    res.render("welcome",{
        username:req.cookies.username
    });

})
//
//logout
app.get("/logout", (req, res, next) =>{
    // res.clearCookie take 1 arug
    //1. Cookie to clear (by name) 
    res.clearCookie('username');
    res.redirect("/login")
})

app.listen(8081);
console.log("Server is runing 8081");