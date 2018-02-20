const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  var now  = new Date().toString();
  var log = `${now} : ${req.method} :${req.url}`;

  console.log(log);
  fs.appendFile('Server.log', log+'\n',(err)=>{
    if(err)
    {
      console.log('Unable to log');
    }
  });
  next();
});

app.use((req,res,next)=>
{
    res.render('maintance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

// set up a handler for a http get
app.get('/',(req, res)=>{
    res.render('home.hbs',{
      welcomeMessage:'This is the home dfgdfgdf',
      pageTitle : 'Home'
    });
});

app.get('/about',(req,res)=>
{
    //res.send('<h1> about page </h1>');
    res.render('about.hbs',{
      pageTitle:'ABout Page'
    });
});

app.get('/bad',(req,res)=>
{
  res.send({
      errorMEssage :'Error Handling Request'
    });
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
