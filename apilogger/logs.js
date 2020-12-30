
 var fs = require('fs');

 var requestrecord=(req)=>{
     req = '['+req +' '+new Date().toISOString().
     replace(/T/, ' ').
     replace(/\..+/, '')+']'
     console.log(req)
 fs.appendFile('requests.txt',req,(err)=>{
     if(err){
         console.log(err)
     }
 })

 }

 var errorrecord=(err)=>{

err = '['+err +' '+new Date().toISOString().
replace(/T/, ' ').
replace(/\..+/, '')+']'

console.log(err)
fs.appendFile('errors.txt',err,(errs)=>{
    console.log(errs)
})
 }

 module.exports={requestrecord,errorrecord}