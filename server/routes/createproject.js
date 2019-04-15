const Contributor = require('../models/ContributorSchema');
const Reviewer = require('../models/ReviewerSchema');
const Project = require('../models/ProjectSchema');

function newproject(req,res,next){
  const newProject = new Project();
  var PrReviewer = new Reviewer();
  const PrContributor = new Array();

  const {body} = req;
  const {
    pname,
    contributors,
    reviewer
  }=body;
  if(!pname){
    res.status(400).send({
      success: false,
      message: 'Project name cannot be empty'
    });
  }
    if(!contributors){
      res.status(400).send({
        success: false,
        message: 'One or more contributors is required'
      });
    }
    if(!reviewer){
      res.status(400).send({
        success: false,
        message: 'Reviewer field cannot be empty'
      });
    }

    //newProject.save();
    var contributor=contributors.split(",");
    for(i=0;i<contributor.length;i++)
    {
      Contributor.find({name:contributor[i]},(err,existingUsers)=>{
        if(err){
          res.status(404).send({
            success: false,
            message:'Error: Server error'});
        }
        else if(existingUsers.length === 0){
          res.status(400).send({
            success: false,
            message: 'Error: Contributor does not exist',
            name: name});
        }
        else{

            //existingUsers.subscribing.push(newProject);
            //existingUsers.save();
            //newProject.contributors.push(existingUsers);
            //console.log(existingUsers[0]);
            PrContributor.push(existingUsers[0]);
            //newProject.contributors.push(existingUsers[0]._id);
            //console.log(newProject.contributors.length);
            //newProject.save();
            //console.log(PrContributor.length);
        }
      });
    }

    Reviewer.find({reviewer:reviewer},(err,existingUsers)=>{
      if(err){
        res.status(404).send({
          success: false,
          message:'Error: Server error'});
      }
      else if(existingUsers.length === 0){
        res.status(400).send({
          success: false,
          message: 'Error: Reviewer does not exist'});
      }
      else{
          //existingUsers.reviewing.push(newProject);
          //existingUsers.save();
          //console.log(existingUsers[0]._id);
          //newProject.reviewer=existingUsers[0]._id;
          PrReviewer = existingUsers[0];
          //console.log(PrReviewer);

          //checking for valid contributors:
          newProject.pname=pname;
          newProject.reviewer=PrReviewer._id;


          //console.log(PrContributor.length);
          for(i=0;i<PrContributor.length;i++){
            newProject.contributors.push(PrContributor[i]._id);
          }

          console.log(newProject);
          PrReviewer.reviewing.push(newProject);
          PrReviewer.save();
          for(i=0;i<PrContributor.length;i++){
            PrContributor[i].subscribing.push(newProject);
            PrContributor[i].save();
          }

          newProject.save((err,project)=>{
            if(err){
                res.status(404).send({
                  success: false,
                  message:'Error: Server error'});
              }
              else{

                  //project.save();

                  res.status(201).send({
                    success: true,
                    message:'Project created successfully'});
                    //console.log(newProject.__v);
              }

          });
      }
    });


    //console.log(newProject.contributors.length);
    //PrContributor.forEach(function(c){
      //newProject.contributors.push(c._id);
      //console.log(c._id);
    //});
    //console.log(newProject.reviewer);
    //console.log(PrReviewer.reviewing.length);
    //var num = PrReviewer.reviewing.length;
    /**/
};

module.exports = newproject;
