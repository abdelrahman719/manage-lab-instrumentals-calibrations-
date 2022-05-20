const userModel = require("../Models/users.model");
const bcrypt = require('bcrypt')
const { check, validationResult } = require("express-validator")

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdosamir2022.2022@gmail.com", // generated ethereal user
    pass: "01553499532", // generated ethereal password
  },
});

module.exports.Confirmation = async (req, res) => {

  let emailParam = req.params.email;
  console.log(emailParam);
  await userModel.findOneAndUpdate({ email:req.params.email }, { confirmed: true })


  res.redirect("/InstPage")
}


module.exports.addUser =
  async (req, res) => {
    let errors = validationResult(req)
    let errorsArray = errors.array();
    let InputsData = req.body;
    const theUrl = req.headers.host
    if (errors.isEmpty()) {
      let { name, email, password, role } = req.body
      const user = await userModel.findOne({ email })
      if (!user) {
        let info = await transporter.sendMail({
          from: ' Pharo Pharma Team " " abdosamir2022.2022@gmail.com', // sender address
          to: email, // list of receivers
          subject: "E-mail Activation ✔", // Subject line
          text: " Welcome to your team ", // plain text body
          html: `<body>
          <form method="post" action="http://${theUrl}/confirmMail/${email}"
          style="background-color: coral; text-align: center; padding: 5vw; width: 75%; margin: auto;">
          <h2>Follow next Link to confirm your mail 😉 </h2>
          <button type="submit" style="font-size: larger; font-weight: bolder;">Click here </button>
      </form>
                </body>`, // html body
        });
        bcrypt.hash(password, 4, async (err, hash) => {
          // Store hash in your password DB.
          await userModel.insertMany({ name, email, password: hash, role });
          const thisUser = await userModel.findOne({ email });
          req.session.userID = thisUser._id
          req.session.name = thisUser.name;
          req.session.role = thisUser.role;
          if(req.session.confirmed==true)
          {
            if (req.session.role == "supervisor" ) {
              res.redirect("/superVisorPage")
  
            }
            else
              res.redirect("/InstPage")

          }
          else
          {
            res.send("Please Check Your E-mail For Confirmation ...")
          }
         

        });
      }
      else {
        res.render("signup.ejs", { errorsArray, InputsData, oldUser: true })

      }

    }
    else {

      res.render("signup.ejs", { errorsArray, InputsData, oldUser: false })

    }


  }



module.exports.validateInputs =
  check("name").isAlpha("en-IN"),
  check("email").isEmail(),
  check("password").isLength({ max: 4, min: 4 }),
  check('repassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      return false
    }
    return true;
  })




