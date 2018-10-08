const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');
hbs.registerPartials('./views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (x) => x.toUpperCase() );

const port = process.env.PORT || 3000;



// app.use( (req,res,next) => {
//     res.send('<h2>Server is down for maintainance. Come back later</h2>');
// });


app.use( express.static(__dirname + '/public') );



app.use( (req,res,next) => {
    console.log();
    fs.appendFileSync('server.log',`${Date()} : ${req.method} ${req.url} \n `);
    next();
})

app.get('/' , (req,res) => {
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        owner : 'Yash',
        
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle : 'About Page',
        owner : 'Yash',
        
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle : 'Projects Page',
        owner : 'Yash'
    })
})

app.get('/bad', (req,res) => {
    res.send({
        errorMessage : "Too many errorrrrs"
    })
})

app.listen(port , () => {
    console.log(`Server is up and running on Port ${port}`);
});