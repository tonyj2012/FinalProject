const express = require('express');
const router = express.Router(); //Create router object
const User = require("../models/user-model");
const Project = require('../models/Project-model');
const Task = require('../models/task-model');
const bcrypt = require("bcrypt");
const passport = require('../middleware/passport');
const req = require('express/lib/request');
const { checkAuthenticated,checkNotAuthenticated } = require('../middleware/authenticate');
const { render } = require('express/lib/response');
const _ = require('lodash');
const taskModel = require('../models/task-model');
const shortid = require('shortid');

//REST Endpoint collections(Check if logged in already)
router.get('/',checkAuthenticated,getProjects);
router.get('/login',checkNotAuthenticated,getLogin);
router.get('/register',checkNotAuthenticated,getRegister);
router.get('/createproject',checkAuthenticated,getCreateProject);
router.get('/createtask/:projectId',checkAuthenticated,getCreateTask);
router.get('/project/containing/:projectId',checkAuthenticated,getSProject);

router.post('/register',checkNotAuthenticated,postRegister);
router.post('/login',checkNotAuthenticated,postLogin);
router.post('/logout',checkAuthenticated,postLogout);
router.post('/project',checkAuthenticated, postSingleProject);
router.post('/task/:projectId',checkAuthenticated,postSingleTask);

async function getCreateTask(request,response){
    let projectId = request.params.projectId;
    response.render('createTask.ejs',{projectId});
}

async function postSingleTask(request,response){
    try{
    const{dueDate,description}=request.body;
    const owningProject = await Project.findOne({ProjectId:request.params.projectId});
    let hortid = shortid.generate()
    const newTask = new Task({taskId:hortid,dueDate:dueDate,taskDescription:description,manager:request.user.email});
    await newTask.save();
    await Project.updateOne({ProjectId:request.params.projectId},{$push:{tasks:[newTask.taskId]}});
    response.redirect(`/project/containing/${request.params.projectId}`);
    }
    catch(err){
        console.log(err.message);
    }
}


async function getCreateProject(request,response){
    response.render('createProject.ejs');
    
}

async function postLogout(request,response){
    request.logOut();
    response.redirect('/login');
}


async function postSingleProject(request,response){
   try{
    const{pName,description}=request.body;
    let hortid = shortid.generate()
    const newProject = new Project({ProjectId:hortid,projectName:pName,projectDescription:description,manager:request.user.email});
    await newProject.save();
    await User.updateOne({email:request.user.email},{$push:{projects:[newProject.ProjectId]}});
    const document = newProject;
    const json = {state:true,msg:"data inserted", document:document}
    response.redirect('/');
   }
   catch(err){
       console.log(err.message);
   }
}

async function getProjects(request,response){
    try{
    let test = await User.findOne({email:request.user.email});
    let projects = test.projects;
    //Get all the projects that are assigned to the logged in user
    let pNames = await Project.find({'ProjectId':{$in:projects}},{projectName:1,_id:0});
    let pDesc = await Project.find({'ProjectId':{$in:projects}},{projectDescription:1,_id:0});
    //Map project Name / Descriptions to pass them in numbered order
    let mapped = _.map(pNames,'projectName');
    let dMap = _.map(pDesc,'projectDescription');
    pDesc = JSON.stringify(dMap);
    pNames = JSON.stringify(mapped);
    projects = JSON.stringify(projects);
    //Render project carousel with project variables
    response.render('projects.ejs', {name:request.user.name,projects,pNames,pDesc});
   }
   catch(err){
    console.log(err.message)
   }
}

async function getSProject(request,response){
    try{
        //Save the project Id from the URL parameter
    let projectId = request.params.projectId;
    //Get the project to retrieve tasks
    let test = await Project.findOne({ProjectId:projectId});
    var tasks = test.tasks;
    //Get all tasks in a project. Get the same project for each variable we need  to pass 
    let tDates = await Task.find({'taskId':{$in:tasks}},{dueDate:1,_id:0});
    let tDesc = await Task.find({'taskId':{$in:tasks}},{taskDescription:1,_id:0});
    //Build maps to be iterated through by i
    let dateMap= _.map(tDates,'dueDate');
    let descMap=_.map(tDesc,'taskDescription');
    tDates = JSON.stringify(dateMap);
    tDesc = JSON.stringify(descMap);
    tasks = JSON.stringify(tasks);
 response.render('projectViewer.ejs',{projectId,tDates,tDesc,tasks});
    }catch(err)
    {
        console.log(err.message);
    }
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
    const newUser = new User({name:name,email:email.toLowerCase(),password:hashpassword});
    await newUser.save();
    const document = newUser;
    const json = {state:true,msg:"data inserted", document:document}
    response.redirect('/login');
}
catch(err){
    console.log(err.message)
    response.redirect('/register');
}
}


module.exports = router;