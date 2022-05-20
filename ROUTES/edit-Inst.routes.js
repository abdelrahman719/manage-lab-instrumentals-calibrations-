const editInst = require("express").Router();

const editInstController = require("../controllers/edit-inst.controller")


editInst.post("/saveEdit/:id",editInstController )






module.exports = editInst