const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContributorSchema = new Schema({

    name: String,
    subscribing   : [{type: Schema.Types.ObjectId, ref: 'Project' }]


});
module.exports = mongoose.model('Contributor', ContributorSchema);
/*user.findById(req.userId)
     .populate('subscribing')
     .exec(function(err, user){
          console.log(user.subscribing);
     })*/
