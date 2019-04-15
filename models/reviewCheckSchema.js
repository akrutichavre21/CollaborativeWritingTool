const mongoose = require('mongoose');

const reviewCheckSchema = new mongoose.Schema({
    
    
    pid: String,
    pver:String,
    rname:String,
    status: String,
    timestamp:date
    
   
});
module.exports = mongoose.model('reviewCheck', reviewCheckSchema);
