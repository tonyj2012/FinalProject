const {Strategy} = require('passport-local');
const passport = require('passport');
const user = require('../models/user-model');

function authenticateUser(email,password,done){
    //<to-do> check if Password matches email in database
}

function setupPassport(){
    const formNames = {usernameField:'email',passwordField:'password'};
    const localStrategy = new Strategy(formNames, authenticateUser);
    passport.use(localStrategy);
}

setupPassport();
module.exports = passport;