const Reviewer = require('../models/ReviewerSchema');
const Projects = require('../models/ProjectSchema');
const Version = require('../models/ProjectVersionSchema');

function reviewer(req,res,next) {
  var pdetails =  new Array();
  const {body} = req;
  const {
    name
  }=body;

  /*Contributors.findById(name)
       .populate('subscribing')
       .exec(function(err, user){
         if(err){
             res.status(404).send({
               success: false,
               message:'Error: Server error'});
           }
           else{
               res.status(400).send({
                 success: true});
                 console.log(user[0].subscribing);
           }
       });*/

       Reviewer.find({reviewer:name},(err,existingUsers)=>{
         if(err){
           res.status(404).send({
             success: false,
             message:'Error: Server error'});
         }
         else if(existingUsers.length === 0){
           res.status(400).send({
             success: false,
             message: 'Error: Contributor does not exist'});
         }
         else{
           //console.log(existingUsers[0].subscribing[10]);
           var pid = new Array();
           pid = existingUsers[0].reviewing;
           var x=0;
           //console.log(pid);
           for(i=0;i<pid.length;i++)
           //var pid = existingUsers[0].subscribing[10];
           {Projects.find({_id:pid[i]},(err,projects)=>{
             if(err){
               res.status(404).send({
                 success: false,
                 message:'Error: Server error'});
             }
             else if(projects.length === 0){
                                  //console.log(projects);
               res.status(400).send({
                 success: false,
                 message: 'Error: Project does not exist'});
             }
             else {

               /*res.status(200).send({
                 success:true,
                 message: 'Projects found'

               });*/
               var name  = projects[0].pname;
               var status;
               if(projects[0].__v>0)
               {Version.find({projectname:projects[0]._id,versionNum:projects[0].__v},(err,p)=>{
                 if(err){
                   res.status(404).send({
                     success: false,
                     message:'Error: Server error'});
                 }
                 else if(p.length === 0){

                   res.status(400).send({
                     success: false,
                     message: 'Error: Project does not exist', err: projects[0]});
                 }
                 else {
                   x=x+1;
                   //console.log(p[0]);
                   status = p[0].status;
                   //console.log(status);
                   var json = {pid: p[0].projectname, pname : name, pver:p[0].versionNum, status:p[0].status};
                   //console.log(json);
                   pdetails.push(json);
                   //console.log(pdetails);
                   //console.log(projects);
                   console.log(x);
                   if(x===pid.length)
                   {
                     //console.log(pdetails);
                     res.status(200).send({
                       success:true,
                       message: 'Projects found',
                       pdetails: pdetails});
                   }

                 }
               });}
               //console.log(status);
               else
               {x=x+1;
                 console.log(x);
               if(x===pid.length)
               {
                 //console.log(pdetails);
                 res.status(200).send({
                   success:true,
                   message: 'Projects found',
                   pdetails: pdetails});
               }
             }

             }
           });}




         }
       });
};

module.exports = reviewer;
