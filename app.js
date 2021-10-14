const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
let posts = [];

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');


const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
var contactContent= "this";
var aboutContent = "this is about page"

//app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("blog_ejs"));

app.get('/',(req,res)=>{
  res.render("home.ejs",{startingContent:homeStartingContent,posts:posts});
});

app.get('/contact',(req,res)=>{
  res.render("contact.ejs",{content:contactContent});
});

app.get('/about',(req,res)=>{
  res.render("about.ejs",{content:aboutContent});
});



app.get("/compose",(req,res)=>{
  res.render("compose.ejs")
});



app.post("/compose",(req,res)=>{
  const post = {
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});




app.get('/posts/:post',(req,res)=>{
  posts.forEach(element => {
    if  (_.lowerCase( element.title) == _.lowerCase(req.params.post)){
      console.log("match found");
      res.render('post.ejs',{title:element.title,content:element.content});
    } else{
      console.log("not found");
      res.render("notfound.ejs")
    }   
  });

})




app.listen(3000,function(){
  console.log("server started ejs blog post ");
})