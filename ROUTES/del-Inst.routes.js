const delInst = require("express").Router();
const InstModel = require("../Models/Instrumental.model")


delInst.post("/del",async (req,res)=>{
    console.log(req.params.id);
   await InstModel.findByIdAndRemove({_id:req.body.hiddenID})
    res.redirect("/InstPage")
})

module.exports=delInst