var mongoose = require('mongoose');
var AdminModel = require('../models/admin');
var {signupvalidator,loginvalidator} = require('../validators/validators')
var {requestrecord,errorrecord} = require('./../apilogger/logs')

var bcrypt = require('bcrypt')


var signup = async (req,resp)=>{
    try{

        requestrecord(JSON.stringify(req.body))

        let firstname;
        let lastname;
        let email;
        let phone;
        let password;
        var userAlreadyexists;

    var validate = signupvalidator(req.body);
    if(validate.valid){

        firstname = req.body.firstname;
        lastname = req.body.lastname;
        email= req.body.email;
        phone = req.body.phone;

        email = email.toLowerCase();

        userAlreadyexists = await AdminModel.findOne({email});
        

        if(userAlreadyexists){
            resp.status(400).send("User Already Exists");
            return
        }

        userAlreadyexists = await AdminModel.findOne({phone});
    

        if(userAlreadyexists){
            resp.status(400).send("User Already Exists");
            return
        }


        var NewUser =await new AdminModel(req.body)
        await NewUser.save();
        resp.status(200).send("Registered");
    }
    else{
        resp.status(400).send("Send valid data");

    }}
    catch(Err){
        errorrecord(Err);

    }
}



module.exports={signup};