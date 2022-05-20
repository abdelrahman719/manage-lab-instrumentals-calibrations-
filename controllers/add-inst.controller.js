const InstModel = require("../Models/Instrumental.model")



module.exports=async (req, res) => {

    let instInfo = {userID:"", instName: "", instCode: "", calDate: "", calPeriod: "", calBy: "", nextCalDate: "",deadline:0 };
    /**** get data from body then sit in object ***** */
    instInfo.userID=req.session.userID
    instInfo.instName = req.body["inst-name"]
    instInfo.instCode = req.body["inst-code"]
    instInfo.calDate = req.body["cal-date"]
    instInfo.calBy = req.body["cal-by"]
    instInfo.calPeriod = req.body["cal-period"]

    /**** sit condions for next date cal*** */
   if (req.body["cal-period"] == "3Months") {
        let caldate = new Date(req.body["cal-date"]);
        caldate.setDate(caldate.getDate() + 90);
        instInfo.nextCalDate = caldate.toISOString().substring(0, 10);
    }
    else if (req.body["cal-period"] == "6Months") {
        let caldate = new Date(req.body["cal-date"]);
        caldate.setDate(caldate.getDate() + 180);
        instInfo.nextCalDate = caldate.toISOString().substring(0, 10);
    }
    else if (req.body["cal-period"] == "12Months") {
        let caldate = new Date(req.body["cal-date"]);
        caldate.setDate(caldate.getDate() + 360);
        instInfo.nextCalDate = caldate.toISOString().substring(0, 10);
    }

    /*******************cal deadline in days*** */

    instInfo.deadline= calcDeadline( new Date(instInfo.nextCalDate))
   

    //const userID = req.session.name;
    /*** then sit this data object in my data base */
    await InstModel.insertMany(instInfo)
   // console.log(req.session.name);
   // console.log("Request_body: ", req.body);



    res.redirect("/InstPage")
}

function calcDeadline (x) {
    var today = new Date();
    let diffInSeconds = x-today;
    let diffInDays = Math.floor(diffInSeconds / (1000 * 60 * 60 * 24))
    return diffInDays
 }

