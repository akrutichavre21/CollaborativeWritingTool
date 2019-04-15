const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    pid:{type: Schema.Types.ObjectId, ref: 'Project' },
    pver:Number,
    timestamp:Date,
    comment:String,
    name:String


});
module.exports = mongoose.model('Comment', CommentSchema);
