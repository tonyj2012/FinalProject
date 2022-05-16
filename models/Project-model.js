const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const projectSchema = new Schema({
    ProjectId: {type:String,
            default:shortid.generate(),
            required:true},
    tasks:[Number],
    projectName:{type:String,required:true},
    projectDescription:{type:String},
    manager:{type:String,required:true}
},
{collection:'Projects'});

const User =  module.exports = mongoose.model('Project',projectSchema);