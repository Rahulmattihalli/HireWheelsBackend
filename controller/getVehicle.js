var mongoose = require('mongoose');
var VehicleModel = require('./../models/vehicles');
var {errorrecord, requestrecord} = require('./../apilogger/logs')
var jwt = require('jsonwebtoken');
var tokenkey = require('./../secretkeys/secretkeys')
var AdminModel = require('./../models/admin')
const GetVehicle =async (req,resp)=>{

        try{

            requestrecord(JSON.stringify(req.body));
            let vehiclenumber;
            let token = req.cookies["authtoken"];
            if(!token){
               
                errorrecord(JSON.stringify(req.body))
                resp.status(400).send("PLEASE LOGIN AGAIN")
                return
            }

            var user=await jwt.decode(token,tokenkey.value);
            var user_email = user.email.toLowerCase();
           
            var userfound = await AdminModel.findOne({email:user_email})
            console.log(userfound)
            if(!userfound){
               
                errorrecord(JSON.stringify(req.body))
                resp.status(400).send("PLEASE LOGIN AGAIN")
                return
            }
            vehiclenumber = req.body.vehiclenumber;

            if(vehiclenumber){
                var vehicles = await VehicleModel.findOne({vehicle_number:vehiclenumber})
                resp.status(200).json(vehicles)
                return;
            }
            var vehicles = await VehicleModel.find({})
            resp.status(200).json(vehicles)

        }
        catch(err){
            errorrecord(err)
        }


}
module.exports = {GetVehicle};