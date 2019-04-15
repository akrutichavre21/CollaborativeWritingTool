const Version = require('../models/ProjectVersionSchema');

function statusupdate(req,res,next) {
  var proj = new Version();
  const {body} = req;
  const {
    pid,
    pver,
    status
  }=body;

  Version.find({projectname:pid,versionNum:pver},(err,project)=>{
    if(err){
      res.status(404).send({
        success: false,
        message:'Error: Server error'});
    }
    else if(project.length === 0){
      res.status(400).send({
        success: false,
        message: 'Error: Project does not exist'});
    }
    else {
      proj = project[0];
      proj.status = status;
      proj.save((err,project)=>{
        if(err){
            res.status(404).send({
              success: false,
              message:'Error: Server error'});
          }
          else{


              res.status(201).send({
                success: true,
                message:'Status updated successfully'});
                //console.log(newProject.__v);
          }

      });

    }
  });
};

module.exports = statusupdate;
