const login = require('express').Router();
const { check, validationResult } = require("express-validator");
const userModel = require("../Models/users.model");
const bcrypt = require('bcrypt');


login.post("/access_acount",
    check("email").isEmail(),
    check("password").isLength({ max: 4, min: 4 }),

    async (req, res) => {

        let errors = validationResult(req);
        let errorsArray = errors.array();
        let InputsData = req.body

        if (errors.isEmpty()) {
            let { email, password } = req.body
            const user = await userModel.findOne({ email });
            if (user) { // to check if user email found
                const matchPassword = await bcrypt.compare(password, user.password)

                if (matchPassword) {

                    req.session.userID = user._id
                    req.session.name = user.name
                    req.session.role = user.role
                    req.session.confirmed = user.confirmed


                    if(user.role == "analyst")
                    {
                        res.redirect("/InstPage")

                    }
                    else
                    {
                        res.redirect("/superVisorPage")
                    }

                
                }
                else {
                    res.render("login.ejs", { errorsArray, InputsData, userNotfound: false, wrongpass: true })
                }
            } // if not found user 
            else {
                //res.render("login.ejs", { errorsArray, InputsData, wrongpass: false, userNotfound: true })
                req.flash("userNotfound","true")
                res.redirect("/")


            }

        } // if there errors in inputs
        else {
            res.render("login.ejs", { errorsArray, InputsData, wrongpass: false, userNotfound: false })


        }
    })


module.exports = login

