const Version = require('../models/ProjectVersionSchema');

function projectdesc(req,res,next){
  const {body} = req;
  const {
    pid,
    versionNum
  }=body;

  Version.find({projectname:pid,versionNum:versionNum},(err,project)=>{
    if(err){
      res.status(404).send({
        success: false,
        message:'Error: Server error'});
    }
    else{
      res.status(200).send({
        success:true,
        message: 'Project found',
        description: project[0].description
      });
    }
  });
};

module.exports=projectdesc;
