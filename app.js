const express = require("express");
const path = require("path");
var nodemailer = require('nodemailer');
const port = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded())


// STATIC SPECIFIC STUFF
app.use("/static",express.static("static"));

//VIEW SPECIFIC STUFF
app.set("view engine","pug");
app.set("/view",path.join(__dirname,"view"));


//ENDPOINT SPECIFIC STUFF
app.get("/",(req,res)=>{
    res.status(200).render("index.pug");

})
app.get("/about",(req,res)=>{
    res.status(200).render("about.pug");

})
app.get("/course",(req,res)=>{
    res.status(200).render("courses.pug");

})
app.get("/blog",(req,res)=>{
    res.status(200).render("blog.pug");

})
app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug");

})

//SENDING RESPONCE TO GMAIL
app.post("/contact",(req,res)=>{
    
    var user_information = {
        name:`${req.body.name}`,
        mobile:`${req.body.mobile}`,
        email:`${req.body.email}`,
        address:`${req.body.address}`,
        more:`${req.body.more}`,
      
       
    }
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'the.akashrajiwale@gmail.com',
          pass:'AKASH@123'
          
        }
      });
      
    var mailOptions = {
        from: `${req.body.email}`,
        to: 'the.akashrajiwale@gmail.com',
        subject: `This is user information`,
        text: `
        ${user_information.name} feel the form of Eduford
        student_name: ${user_information.name} 
        phone number: ${user_information.mobile}
        Email: ${user_information.email}
        Address: ${user_information.address}
        more: ${user_information.more}
    
        `
        
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).render("contact.pug");


})



//LISTING
app.listen(port,()=>{
    console.log(`website online at http://localhost:${port}`);
})