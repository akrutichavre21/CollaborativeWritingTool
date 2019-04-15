const mongoose = require('mongoose');

const reviewProSchema = new mongoose.Schema({
    
    
    pid: String,
    pname:String,
    rname:String
    
   
});
module.exports = mongoose.model('reviewPro', reviewProSchema);
