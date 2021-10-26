require("dotenv/config");
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const blogData = require("./blogData.js")

const app = express();

app.use(express.urlencoded({extended:true}));


app.use(express.static("blog_ejs"));
//variable posts
let posts = [];

mongoose.connect(process.env.MONGOWIKI);

const articleSchema = {title:String,content:String};
const Article = mongoose.model('articles',articleSchema);




app.get('/',(req,res)=>{
  //
  Article.find({},async(err,result)=>{
    if(!err){
      posts = await result;
      res.render("home.ejs",{startingContent:blogData.homecontent,posts: posts});
    }else{
      console.log(err);
    }
  });
  
 
});

app.get('/contact',(req,res)=>{
  res.render("contact.ejs",{content:blogData.contactContent});
});

app.get('/about',(req,res)=>{
  res.render("about.ejs",{content:blogData.aboutContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose.ejs")
});

app.post("/compose",async (req,res)=>{
  console.log(req.body);
  const post = new Article ({
    title:req.body.postTitle,
    content:req.body.postBody
  });
  await post.save();
  res.redirect("/");
});


app.get('/posts/:post',(req,res)=>{
  //a route to all indivisual posts dynamicaly created pages
  //ist a ancher tag with a href to /post/ ejs (post.tilte)
  // get the post tilte by taping into req.prams and then go through lowdash
  //
  posts.forEach(post => 
    {
      if  (_.lowerCase( post.title) == _.lowerCase(req.params.post))
      {
        console.log("match found");
        res.render('post.ejs',{title:post.title,content:post.content});
      }
    });
  });




app.listen(process.env.PORT ||3000,function(){
  console.log("server started ejs blog post ");
})