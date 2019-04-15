const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewerSchema = new Schema({



   reviewer:String,
   reviewing: [{type: Schema.Types.ObjectId, ref: 'Project' }]




});
module.exports = mongoose.model('Reviewer', ReviewerSchema);
