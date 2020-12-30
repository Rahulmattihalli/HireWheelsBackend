var mongoose = require('mongoose');
var AdminModel = require('../models/admin');
var {signupvalidator,loginvalidator} = require('../validators/validators')
var {requestrecord,errorrecord} =require('./../apilogger/logs')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var {tokenkey} = require('../secretkeys/secretkeys')
var login = async (req,resp)=>{

    try {

        requestrecord( JSON.stringify(req.body))

        let email;
        let password;

        var validate =  loginvalidator(req.body);
        if(!validate.valid){
            resp.status(400).send("Invalid Request")
            return
        }
        email =await req.body.email;
        email =  email.toLowerCase();
        pass = req.body.password;
        var userdetails = await AdminModel.findOne({email})
        if(!userdetails){
            resp.status(201).send("User not found")
            return
        }
        var passwordcorrect = await bcrypt.compare(pass, userdetails.password)
        if(passwordcorrect){
            var token = await jwt.sign(req.body,tokenkey.value)
           resp.cookie("authtoken",token);
            resp.status(200).send("Login successful")
         
            return
        }
        else{
            resp.status(200).send("Password incorrect")
        }

    } catch (err) {
        console.log(err)
        resp.status(400).send("Something went wrong")
    }

}


module.exports={login};