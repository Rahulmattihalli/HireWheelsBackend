var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('mongoose')
var sanitize = require('express-mongo-sanitize')
var router = require('./routes/routes')
var app = express();
var dburl = require('./config/db')
var cookie = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie())
app.use(sanitize());

app.use(router)

mongoose.connect(dburl.url,
        {useNewUrlParser:true,
        useUnifiedTopology: true,
    useCreateIndex:true },
            (err)=>{
            if(!err){
                const port = process.env.port||4000;
                app.listen(port,(err)=>{
                    if(!err){
                        console.log("App is listening at:",port);
                    }
                })
            }
})


