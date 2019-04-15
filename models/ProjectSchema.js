const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({



    pname:String,
    reviewer:{type: Schema.Types.ObjectId, ref: 'Reviewer' },
    contributors    : [{type: Schema.Types.ObjectId, ref: 'Contributer' }],
    versions    : [{type: Schema.Types.ObjectId, ref: 'ProjectVersion' }]


});
module.exports = mongoose.model('Project', ProjectSchema);
