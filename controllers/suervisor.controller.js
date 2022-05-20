const InstModel = require("../Models/Instrumental.model");
const userModel = require("../Models/users.model");



module.exports.getSupervisorPage = async (req, res) => {
   const userName = req.session.name;
 const theuser=  await userModel.findOne({_id: req.session.userID })

console.log(theuser);
  // let Instrumentals = await InstModel.find({userID: req.session.userID })
   res.render("supervisor.ejs", { Instrumentals:"", userName , Notes: theuser.notes })


};

module.exports.addTeamMember = async (req, res) => {
   const userName = req.session.name

   const teamMember = await userModel.findOne({ email: req.body.memberEmail });
   const theuser=  await userModel.find({ _id: req.session.userID })
   if (teamMember && teamMember.role == "analyst") {
      let Instrumentals = await InstModel.find({ userID: teamMember._id })
      res.render("supervisor.ejs", { Instrumentals, userName ,Notes: theuser.notes });


   }
   else {
      res.send("not found this team member")
   }



}

module.exports.addNote = async(req,res)=>{
 await userModel.findOneAndUpdate({ _id: req.session.userID },{notes:req.body.note});
 res.redirect("/superVisorPage");
}