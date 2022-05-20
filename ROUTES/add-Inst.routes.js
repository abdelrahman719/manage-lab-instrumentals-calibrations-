const addInst = require('express').Router();
const addInstController = require("../controllers/add-inst.controller")
 

addInst.post("/addInst",addInstController)


module.exports = addInst

