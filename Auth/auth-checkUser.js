

module.exports=(req,res,next)=>{

    if(req.session.userID && req.session.confirmed==true)
    {
      next();
    }
    else
    {
      res.redirect("/")
    }

}

