var mongoose = require('mongoose');
var BookingModel = require('./../models/booking');
var VehicleModel = require('./../models/vehicles')
var {bookingvalidator} = require('./../validators/validators')
var {errorrecord,requestrecord} = require('./../apilogger/logs')

const book = async(req,resp)=>{

    try{

        requestrecord(JSON.stringify(req.body));

        var valid= bookingvalidator(req.body);
        if(!valid){

            errorrecord(JSON.stringify(req.body))
            resp.status(400).send("Not valid request");
            return;

        }

        var alreadyexists = await BookingModel.findOne({vehicle:req.body.vehicle})
        if(alreadyexists){

            errorrecord(JSON.stringify(req.body))
            resp.status(400).send("Already booked");
            return;
        }

       
       var found= await VehicleModel.findOneAndUpdate({vehicle_number:req.body.vehicle},{vehicle_avialable:"no"});
       if(!found){
        errorrecord(JSON.stringify(req.body))
        resp.status(400).send("Vehicle Doesn't exist");
        return;
       }
        var book = await new BookingModel(req.body);
        await book.save();
        resp.status(200).send("Booked successfully");



    }catch(err){
        errorrecord(JSON.stringify(req.body))
        errorrecord(err);
        resp.status(400).send("Something went wrong");

    }
    

}

module.exports = {book};