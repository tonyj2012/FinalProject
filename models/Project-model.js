const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const projectSchema = new Schema({
    ProjectId: {type:String,
            required:true},
    tasks:[String],
    projectName:{type:String,required:true},
    projectDescription:{type:String},
    manager:{type:String,required:true}
},
{collection:'Projects'});

const User =  module.exports = mongoose.model('Project',projectSchema);