const Comment = require('../models/CommentSchema');

function displaycomments(req,res,next){
  const {body} = req;
  const {
    pid
  }=body;

  Comment.find({pid:pid},(err,project)=>{
    if(err){
      res.status(404).send({
        success: false,
        message:'Error: Server error'});
    }
    else{
      res.status(200).send({
        success:true,
        message: 'Project found',
        description: project
      });
    }
  });
};

module.exports=displaycomments;
