var mongoose = require('mongoose');

var booking = mongoose.Schema({
    user_email:{type:String,required:true},
    source_city:{type:String,required:true},
    destination_city:{type:String,required:true},
    vehicle:{type:String,required:true,unique:true},
    booking_time:{type:String, default:new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '')},
    isActive:{type:Boolean, required:true},
    fare:{type:String,required:true},
    pickup_datetime:{type:String,required:true},
    dropoff_datetime:{type:String,required:true},
    vehicle_location:{type:String,required:true}

})

var BookingModel = mongoose.model("Bookings", booking);

module.exports = BookingModel;