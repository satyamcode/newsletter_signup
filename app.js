const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const dotenv = require('dotenv');
dotenv.config();
const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup1.html");

});
app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.sname;
  const email=req.body.email;

  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_field:{
        FNAME: firstname,
        LNAME: lastname
      }
    }
  ]
};
const jsondata=JSON.stringify(data);
const url="https://us17.api.mailchimp.com/3.0/lists/1a5ea65756";
const options={
  method: "POST",
  auth: `satyam:${process.env.API_KEY}`
}
const request=https.request(url,options,function(response){
  if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
}
  else{
      res.sendFile(__dirname+"/failure.html.html");
}
  response.on("data",function(data){
    console.log(JSON.parse(data));

  })
})
request.write(jsondata);
request.end();
})
app.post("/failure",function(req,res){
  res.redirect("/");




})

app.listen(3000,function(){
  console.log("server is running on port 3000");
})
