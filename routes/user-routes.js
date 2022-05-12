const express = require('express');
const router = express.Router(); //Create router object
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const passport = require('../middleware/passport');
const req = require('express/lib/request');
const { checkAuthenticated,checkNotAuthenticated } = require('../middleware/authenticate');

//REST Endpoint collections(Check if logged in already)
router.get('/',checkAuthenticated,getProjects);
router.get('/login',checkNotAuthenticated,getLogin);
router.get('/register',checkNotAuthenticated,getRegister);
router.post('/register',checkNotAuthenticated,postRegister);
router.post('/login',checkNotAuthenticated,postLogin);

async function getProjects(request,response){
    response.render('projects.ejs', {name:request.user.name});
}

async function postLogin(request,response,next){
    const config = {};
    config.successRedirect = '/';
    config.failureRedirect = '/login';
    const authHandler = passport.authenticate('local',config);
    authHandler(request ,response ,next); 
}


async function getLogin(request,response){
    response.render('login.ejs')
}

async function getRegister(request,response){
    response.render('register.ejs');
}

async function postRegister(request,response){ //Add user to database
try{
    const{name,email,password,Cpassword}=request.body;
    
    // Ensure Password / CPassword are the same
    if(password!=Cpassword){
        throw new Error("Passwords don't match!");
    }
    let test = await User.findOne({email:email})
    if(test){
        throw new Error('User already Exists!')
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({name:name,email:email,password:hashpassword});
    await newUser.save();
    const document = newUser;
    const json = {state:true,msg:"data inserted", document:document}
    console.log(json);
    response.redirect('/login');
}
catch(err){
    console.log(err.message)
    response.redirect('/register');
}
}


module.exports = router;