const home = require('express').Router();
const InstModel = require("../Models/Instrumental.model");
const authCheckUser = require("../Auth/auth-checkUser");
const suervisorController = require("../controllers/suervisor.controller")
 
home.get("/InstPage",authCheckUser, async (req, res) => {

  const userName = req.session.name
  let Instrumentals = await  InstModel.find({userID:req.session.userID})
  res.render("home.ejs",{Instrumentals , userName})

})
home.get("/logout" , (req,res)=>{
  req.session.destroy();
  res.redirect("/")
  
})

home.get("/", (req, res) => {

  // get data and show it in home bafe
  let userNotfound;
 
  if(req.flash("userNotfound")[0]=="true")
  {
    userNotfound = true

  }
  else
  {
    userNotfound = false
  }

    res.render("login.ejs",{errorsArray:[],InputsData:"" , wrongpass:false , userNotfound})
})

home.get("/superVisorPage",authCheckUser,suervisorController.getSupervisorPage)

home.post("/addTeamMembers",suervisorController.addTeamMember)
home.post("/addNote",suervisorController.addNote)



module.exports = home

