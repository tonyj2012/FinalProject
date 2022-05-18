const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const taskSchema = new Schema({
    taskId: {type:String,
            required:true},
    dueDate:{type:Date,required:true}, //yyyy-mm-dd
    aUsers:[String],
    taskDescription:{type:String,required:true},
    deliverable:{type:String},
    manager:{type:String,required:true}
},
{collection:'Tasks'});

const User =  module.exports = mongoose.model('Task',taskSchema);