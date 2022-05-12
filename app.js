const express = require('express'); //import module: express
const app = express(); //express fxn to create app
const http = require('http'); //import module: http
const server = http.createServer(app); //create http server for app
const port = 80;
const {database} = require ('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes'); //import user-routes module
const session = require('express-session');
const passport = require('./middleware/passport');

//Initial setup of app on initialization
function setupApp(){
app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
//Session config
const sessionConfig = { secret:'Gafilta-Fish', resave:false, saveUninitialized:true}; 
app.use(session(sessionConfig));
//Set up passport
app.use(passport.initialize());
app.use(passport.session());
//set up database
const mongoose_config = {useNewUrlParser: true, useUnifiedTopology: true};
const connection = mongoose.connect(database, mongoose_config);

if (connection){ //log connection result
    console.log('database connected');
    }
    else{
    console.log('database connection error')
    }    

app.use('/', userRoutes);
app.use(express.static('public'));
app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:false})); 
    
}

setupApp();
app.get('/',(request,response)=> //Auto reidrect to Register form
{response.redirect('/register');
});
app.listen(port,()=>console.log("Server is running port",port));