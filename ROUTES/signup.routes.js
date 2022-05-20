const signup = require('express').Router();
const addingUserController = require("../controllers/addingUser.controller")




signup.get("/signup", (req, res) => {
  res.render("signup.ejs", { errorsArray: [], InputsData: "", oldUser: false })


})
signup.post("/addUser",addingUserController.validateInputs , addingUserController.addUser )

signup.post("/confirmMail/:email" , addingUserController.Confirmation )





module.exports = signup

