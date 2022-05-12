const express = require('express');
const router = express.Router(); //Create router object
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
router.get('/login',getLogin);
router.get('/register',getRegister);
router.post('/register',postRegister);
router.post('/login',postLogin);



async function postLogin(request,response,next){
    const config={};
    config.sucessRedirect='/';
    config.failureRedirect='/login';
    const authHandler = passport.authenticate('local',config);
    authHandler(request,response,next);
}

async function getLogin(request,response){
    response.render('login.ejs')
}

async function getRegister(request,response){
     console.log(request.session.id);
    response.render('register.ejs');
}

async function postRegister(request,response){ //Add user to database
try{
    const{name,email,password,Cpassword}=request.body;
    // Check if email already exists in database
    
    //<To-Do> Ensure Password / CPassword are the same
    if(password!=Cpassword){
        throw new Error("Passwords don't match!");
    }
    //Add to database
   // let test = User.findOne({email:email})
   // console.log(test)
   // if(test){
     //   throw new Error('Email already exists');
  //  }
    let test = await User.findOne({email:email})
    if(test){
        throw new Error('User already Exists!')
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({name:name,email:email,password:hashpassword});
    console.log(newUser.password)
    await newUser.save();
    const document = newUser;
    const json = {state:true,msg:"data inserted", document:document}
    console.log(json);
    response.redirect('/login')
}
catch(err){
    console.log(err.message)
    response.redirect('/register');
}
}


module.exports = router;