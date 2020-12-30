var mongoose = require('mongoose');
var {errorrecord} = require('./../apilogger/logs')

var Vehicle = mongoose.Schema({
    vehicle_type:{type:String, required:true},
    vehicle_owner:{type:String,required:true},
    vehicle_model:{type:String, required:true},
    vehicle_number:{type:String,required:true,unique:true},
    vehicle_avialable:{type:String,required:true},
    vehicle_img:{type:String,required:true},
    vehicle_type_model:{type:String, required:true},
    color:{type:String, required:true},
    fuel_type:{type:String,required:true},
    price:{type:String,required:true},
    location:{type:String,required:true}
})

 var VehicleModel = mongoose.model("Vehicles",Vehicle)

module.exports = VehicleModel;