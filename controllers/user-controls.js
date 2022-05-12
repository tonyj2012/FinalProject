const User = require('../models/user-model');
const bcrypt = require("bcrypt");

class UserControls{

postLogin(request,response,next){
    const config={};
    config.sucessRedirect='/';
    config.failureRedirect='/login';
    const authHandler = passport.authenticate('local',config);
    authHandler(request,response,next);
}

 getLogin(request,response){
    response.render('login.ejs')
}

 getRegister(request,response){
     console.log(request.session.id);
    response.render('register.ejs');
}

 postRegister(request,response){ //Add user to database
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
    const newUser = new User({name:name,email:email,password:password});
    newUser.password = bcrypt.hash(password, 15);
    newUser.save(function (err, User) {
        if (err) return console.error(err);
        console.log(User.name + " saved to Users.");
      });
    const document = newUser
    const json = {state:true,msg:"data inserted", document:document}
    console.log(json);
    response.redirect('/login')
}
catch(err){
    console.log(err.message)
    response.redirect('/register');
}
}
}

module.exports = new UserControls();