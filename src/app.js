const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const { registerPartials } = require("hbs");
//var nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

//setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/css',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


//routing
//app.get(path, callback)

//Email
/*var transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: 'nationscitech@gmail.com',
        pass:'Scitechnation'
    }
}); */



app.get("/",(req,res)=>{
    res.render("index");
})



app.post("/contact", async(req,res) => {
    try{
        //res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        
      /*  var mailOptions = {
            from: 'scitechnation@gmail.com',
            to: userData.email, 
            subject: 'Registered for Weekly Newsletter', 
            text: `You are successfully registered with SciTech Nation for weekly Newsletter`
        };


        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
            console.log('Email sent:'+info.response);
            }
        }); */

        res.status(201).render("index");

    }catch(error){
        res.status(500).send(error);
    }

})

//server create

app.listen(port, () => {
    console.log('server is running at port no 3000');
})









