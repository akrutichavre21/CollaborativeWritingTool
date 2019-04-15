const mongoose = require('mongoose');

const projectInfoSchema = new mongoose.Schema({
    
    
    pid: String,
    pver:String,
    description:String,
    name: String,
    timestamp:date
    
   
});
module.exports = mongoose.model('projectInfo', projectInfoSchema);
