const generateReport = require("express").Router();

const InstModel = require("../Models/Instrumental.model")
generateReport.get("/gn", async (req, res) => {

    const insts = await InstModel.find({ userID: req.session.userID });
    let upcomingInst = [];
    const lastInst = [];
    for (let i = 0; i < insts.length; i++) {
        if (insts[i].deadline < 30) {
            upcomingInst.push(insts[i])
        }

    }
    //console.log(upcomingInst);
    //console.log(req.headers.host);

    res.render("report.ejs", { upcomingInst })



})

module.exports = generateReport