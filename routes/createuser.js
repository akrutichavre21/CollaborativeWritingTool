const User = require('../models/Registration');
const contributor = require('../models/ContributorSchema');
const reviewer = require('../models/ReviewerSchema');

const express = require('express');
const router = express.Router();

//router.post('/createuser',function(req,res,next){
function signup(req,res,next) {


//console.log(req.body);
    const {body} = req;
    const {
      email,
      name,
      pswd,
      isReviewer
    }=body;
    if(!name){
      res.status(400).send({
        success: false,
        message: 'Username cannot be empty'
      });
    }
      if(!pswd){
        res.status(400).send({
          success: false,
          message: 'Password cannot be empty'
        });
      }
      //email = email.toLowerCase();

      User.find({
        name:name
      },(err,existingUsers)=>{
        if(err){
          res.status(404).send({
            success: false,
            message:'Error: Server error'});
        }
        else if(existingUsers.length >0){
          res.status(400).send({
            success: false,
            message: 'Error: Username already exists'});
        }
        else{
          //save the details to DB
          const newUser = new User();

          newUser.email = email;
          newUser.name = name;
          newUser.pswd = newUser.generateHash(pswd);
          newUser.isReviewer = isReviewer;
          newUser.save((err,user)=>{
            if(err){
                res.status(404).send({
                  success: false,
                  message:'Error: Server error'});
              }
              else{
                  res.status(201).send({
                    success: true,
                    message:'Signed up successfully'});
                    console.log(req.body);
              }

          });
          if(isReviewer === true){
            const newReviewer = new reviewer();
            newReviewer.reviewer = name;
            newReviewer.save();
          }
          else {
            const newContributor = new contributor();
            newContributor.name = name;
            newContributor.save();
          }
        }
      });

};

module.exports = signup;
