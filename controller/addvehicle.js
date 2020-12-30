var VehicleModel = require('./../models/vehicles');
var {vehicleaddvalidator} = require('./../validators/validators')
var {errorrecord,requestrecord} = require('./../apilogger/logs')

    const addVehicle=async (req,resp)=>{

        let vehicle_type;
        let vehicle_model;
        let vehicle_number;
        let vehicle_available;
        let vehicle_img;

        try{

            
            requestrecord(JSON.stringify(req.body))
           var validate = vehicleaddvalidator(req.body);
           if(!validate) {
            errorrecord(req.body);
            resp.status(400).send("Enter valid data");
            return;
           }

           var found = await VehicleModel.findOne({vehicle_number:req.body.vehicle_number})
           if(found){
               errorrecord(JSON.stringify(req.body))
            resp.status(400).send("vehicle already exists");
            return;
           }

          var vehicleadd = await new VehicleModel(req.body);
           await vehicleadd.save()
           resp.status(200).send("Added vehicle successfully");

        }
        catch(err){
            errorrecord(JSON.stringify(req.body))
            errorrecord(err);
            resp.status(400).send("Something went wrong");
        }

    }

    module.exports = {addVehicle};