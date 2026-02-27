const express = require('express');
const app = express();
const { v4:uuidv4 } =require('uuid');
uuidv4();
const methodOverride = require('method-override');


let port=3000;
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine','ejs');

const path=require("path");

app.set("views",path.join(__dirname,"/Views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   id:uuidv4(),
        username:"NikitaDafda",
     content:"i got my placement!"
    },
    {   id:uuidv4(),
        username:"Tushar",
     content:"i am in first year of clg"
    },
    {   id:uuidv4(),
        username:"DhartiRathod",
        content:"hello world"
    },

];
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");

})
app.post("/posts",(req,res)=>{
   
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("http://localhost:3000/posts");
    console.log(req.body);

})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=>id===p.id);
    console.log(post);
     res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});


})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post= posts.find((p)=>id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    console.log(post); 
    res.redirect("http://localhost:3000/posts");

})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts= posts.filter((p)=>id!==p.id);
        res.redirect("http://localhost:3000/posts");


})

app.get("/posts",(req,res)=>{
    res.render("index.ejs", { posts });
    console.log(posts);
})
app.listen(port,()=>{
    console.log(`listening on port:${port}`);
})    