class UserControls{

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
    //<To-Do> Check if email already exists in database
    
    //<To-Do> Ensure Password / CPassword are the same
    if(password!=Cpassword){
        throw 'Passwords do not match';
    }
    console.log(name,email,password);
    response.redirect('/login')
}
catch{
    response.redirect('/register');
}
}
}

module.exports = new UserControls();