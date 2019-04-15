const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userId:{
      type: String,
      default: '-1'
    },
    timestamp:{
      type: Date,
      default: Date.now()
    },
    isDeleted: {
      type: Boolean,
      default: false
    }

});

UserSessionSchema.methods.generateHash = function(pswd){
  return bcrypt.hashSync(pswd,bcryt.genSaltSync(8),null);
}

UserSessionSchema.methods.validPassword = function (pswd) {
  return bcrypt.compareSync(pswd,this.pswd);
}

module.exports = mongoose.model('UserSession', UserSessionSchema);
