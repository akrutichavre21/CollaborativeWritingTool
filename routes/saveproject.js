const Version = require('../models/ProjectVersionSchema');
const Project = require('../models/ProjectSchema');

function saveproject(req,res,next){
  var projversion = new Version();
  var projectentry = new Project();
  const {body} = req;
  const {
    pid,
    description
  }=body;
  var version;


  Project.find({_id:pid},(err,project)=>{
    if(err){
      res.status(404).send({
        success: false,
        message:'Error: Server error'});
    }
    else {
      version = project[0].__v;


      projectentry = project[0];
      projversion.versionNum=version+1;
      projversion.description=description;
      projversion.projectname=project[0]._id;
      projversion.status=0;

      projversion.save((err,project)=>{
        if(err){
            res.status(404).send({
              success: false,
              message:'Error: Server error'});
          }
          else{

              //project.save();
              projectentry.versions.push(projversion._id);
              projectentry.save();
              res.status(201).send({
                success: true,
                message:'Project saved successfully'});
                //console.log(newProject.__v);
          }

      });

      console.log(version);
    }
  });



};

module.exports = saveproject;
