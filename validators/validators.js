var validate = require('jsonschema').validate




const signupvalidator=(reqbody)=>{
   
    return validate(reqbody,{
        "additionalProperties":false,
        "type":"object",
        "properties":{
            "firstname":{"type":"string","required":true},
            "lastname":{"type":"string","required":true},
            "email":{"type":"string","required":true},
            "phone":{"type":"string","required":true},
            "password":{"type":"string","required":true},
            "Wallet":{"type":"string", "required":true},
            "isAdmin":{"type":"boolean", "required":true}
        }
    })

}
const loginvalidator=(reqbody)=>{

    return validate(reqbody,{
        "additionalProperties":false,
        "type":"object",
        "properties":{
            "email":{"type":"string","required":true},
            "password":{"type":"string","required":true}
        }
    })

}

const vehicleaddvalidator=(reqbody)=>{

    return validate(reqbody,{
        "additionalProperties":false,
        "type":"object",
        "properties":{
            "vehicle_type":{"type":"string","required":true},
            "vehicle_owner":{"type":"string","required":true},
            "vehicle_model":{"type":"string","required":true},
            "vehicle_number":{"type":"string","required":true},
            "vehicle_available":{"type":"string","required":true},
            "vehicle_img":{"type":"string","required":true},
            "vehicle_type_model":{"type":"string", "required":true},
            "color":{"type":"string", "required":true},
            "fuel_type":{"type":"string","required":true},
            "price":{"type":"string","required":true},
            "location":{"type":"string","required":true}
        }
    })

}

const bookingvalidator=(reqbody)=>{

    return validate(reqbody,{
        "additionalProperties":false,
        "type":"object",
        "properties":{
            "user_email":{"type":"string","required":true},
            "source_city":{"type":"string","required":true},
            "destination_city":{"type":"string","required":true},
            "vehicle":{"type":"string","required":true},
            "booking_time":{"type":"string","required":true},
            "isActive":{"type":"boolean","required":true},
            "fare":{"type":"string","required":true}
        }
    })

}

module.exports={signupvalidator,loginvalidator,vehicleaddvalidator,bookingvalidator};