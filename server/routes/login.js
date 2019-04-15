const User = require('../models/Registration');
const UserSession = require('../models/UserSession');
const express = require('express');
const router = express.Router();


//router.post('/login',function(req,res,next){
function login(req,res,next) {


    console.log(req.body);
    const {body} = req;
    const {
      pswd
    } = body;
    let {
      name
    } = body;

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
    name : name
  },(err,users)=>{
    if(err){
      res.status(404).send({
        success: false,
        message:'Error: Server error'});
    }
    else if(users.length !=1){
      res.status(400).send({
        success: false,
        message:'Error: Username does not exist'
      });
    }
    else {
      const user = users[0];
      if(!user.validPassword(pswd)){
        res.status(400).send({
          success: false,
          message:'Error: Wrong password'});
      }
      else {
        //correct username password
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err,doc)=>{
          if(err){
            res.status(404).send({
              success: false,
              message:'Error: Server error'});
          }
          else {
            res.status(200).send({
              success: true,
              message:'Logged in successfully',
              isReviewer: user.isReviewer,
              token: doc._id,
              name: user.name
            });
          }
        });
      }
    }
  });
};

module.exports = login;
