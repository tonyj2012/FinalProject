const shortid = require('shortid'); 

class User{
 constructor(){
 }
 add (name ,email ,password){
 const id = shortid.generate();
 const user = {id:id ,name:name, email:email ,password:password};
 console.log(this.users);
 }
}
module.exports = new User(); 