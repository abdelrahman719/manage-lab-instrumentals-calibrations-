const InstModel = require("../Models/Instrumental.model")

module.exports=async (req, res) => {

    let currentInst = await InstModel.findById({ _id: req.params.id })
    let newNextcalDate=""
 if (currentInst["calPeriod"] == "3Months") {
        let caldate = await new Date(req.body["cal-date"]);
        caldate.setDate(caldate.getDate() + 90);
        newNextcalDate = caldate.toISOString().substring(0, 10);
    }
    else if (currentInst["calPeriod"] == "6Months") {
        let caldate = await new Date(req.body["cal-date"]);
        caldate.setDate(caldate.getDate() + 180);
        newNextcalDate = caldate.toISOString().substring(0, 10);
    }
    else if (currentInst["calPeriod"] == "12Months") {
      
       let caldate = await new Date(req.body["cal-date"]);
        caldate.setDate(caldate.getDate() + 365);
        newNextcalDate = caldate.toISOString().substring(0, 10);
      
    }

    /**** for deadline in days */

    calcDeadline()

    


    await InstModel.findByIdAndUpdate({ _id: req.params.id }, {deadline:calcDeadline( new Date(newNextcalDate)), calDate: req.body["cal-date"], nextCalDate:newNextcalDate})

    res.redirect("/InstPage")
}

   
function calcDeadline (x) {

    var today = new Date();
    let diffInSeconds = x-today;
    let diffInDays = Math.floor(diffInSeconds / (1000 * 60 * 60 * 24))
    return diffInDays


 }
