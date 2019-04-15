const Comment = require('../models/CommentSchema');

function savecomment(req,res,next){
  const {body} = req;
  const {
    pid,
    pver,
    timestamp,
    comment,
    name
  }=body;

  var newComment = new Comment();
  newComment.pid = pid;
  newComment.pver = pver;
  newComment.timestamp = Date.now();
  newComment.comment = comment;
  newComment.name = name;
  //console.log(newComment);

  newComment.save((err,project)=>{
    if(err){
      console.log(err);
        res.status(404).send({
          success: false,
          message:'Error: Server error'});
      }
      else{


          res.status(201).send({
            success: true,
            message:'Comment saved successfully'});

      }

  });

};

module.exports = savecomment;
