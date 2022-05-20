const mongoose = require('mongoose');



const InstSchema = mongoose.Schema({
    instName:String,
     instCode:String,
     calDate:String,
     calPeriod:String,
     calBy:String,
     nextCalDate:String,
     deadline:Number,
     userID :{type:mongoose.Schema.Types.ObjectId ,ref: 'user' }
})




const InstModel = mongoose.model("Instrumental",InstSchema)

module.exports=InstModel