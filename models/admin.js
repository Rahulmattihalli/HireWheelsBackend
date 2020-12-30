var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var {salt} = require('../secretkeys/secretkeys');
const { errorrecord } = require('../apilogger/logs');

var userschema = mongoose.Schema({

    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    registered_time:{type:String, default:new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '')},
        updated_time:{type:String, default:new Date().toISOString().
            replace(/T/, ' ').
            replace(/\..+/, '')},
    isActive:{type:Boolean, default:true},
    isDeleted:{type:Boolean,default:false},
    Wallet:{type:String, default:"100000"},
    isAdmin:{type:Boolean, default:false}

 
})
   

userschema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,salt.value);
    this.email = this.email.toLowerCase();
   await next();
})



var AdminModel = mongoose.model("AdminModule",userschema);


module.exports = AdminModel;