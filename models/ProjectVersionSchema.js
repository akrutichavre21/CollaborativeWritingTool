const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectVersionSchema = new Schema({


    versionNum: Number,
    description:String,
    projectname:{type: Schema.Types.ObjectId, ref: 'Project' },
    status:Number

/*
status=0 => pending
status=1 => accepted
status=2 => rejected
*/


});
module.exports = mongoose.model('ProjectVersion', ProjectVersionSchema);
