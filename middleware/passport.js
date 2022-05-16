const {Strategy} = require('passport-local');
const passport = require('passport');
const user = require('../models/user-model');
const bcrypt = require('bcrypt');


async function authenticateUser(email,password,done){
    //<to-do> check if Password matches email in database
    const test = await user.findOne({email:email.toLowerCase()})
    if(!test)
    {
        console.log('User does not exist')
        return done(null, false,{message:'User does not exist!'});
    }
    if(await bcrypt.compare(password, test.password)){
        console.log('Authentication varified');
        return done(null,test);
    }
    else{
        console.log("Incorrect password");
        return done(null, false, {message:"Password does not match!"});
    }
}

function setupPassport(){
   const formNames = {usernameField:'email',passwordField:'password'};
   const localStrategy = new Strategy(formNames,authenticateUser);
   passport.use(localStrategy);
   passport.serializeUser((user,done)=>done(null,user.email));
   passport.deserializeUser((email,done)=>{
    user.findOne({email:email}).then((user) =>{
        done(null,user);
    });
   });
}

setupPassport();
module.exports = passport;