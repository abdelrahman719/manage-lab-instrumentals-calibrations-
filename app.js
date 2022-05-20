const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const home = require("./ROUTES/home.routes");
const addInst = require("./ROUTES/add-Inst.routes")
const editInst = require("./ROUTES/edit-Inst.routes")
const delInst = require("./ROUTES/del-Inst.routes")
const login = require("./ROUTES/login.routes");
const signup = require("./ROUTES/signup.routes");
const generateReport = require("./ROUTES/generateReport.routes")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
app.set('views', path.join(__dirname, "views"))





const DBurlONLINE = "mongodb://abdo:abdo@abdocluster-shard-00-00.i2pyf.mongodb.net:27017,abdocluster-shard-00-01.i2pyf.mongodb.net:27017,abdocluster-shard-00-02.i2pyf.mongodb.net:27017/test?replicaSet=atlas-dijpsa-shard-0&ssl=true&authSource=admin"
const DBurlLocal = "mongodb://localhost:27017/instDB"
var store = new MongoDBStore({
    uri: DBurlONLINE,
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
    },
    store: store
}))
app.use(flash());






app.use(express.static(path.join(__dirname, 'public')))   // for static file and can call css file
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs'); // for identaction the type of engine
//app.set('views'.path.join(__dirname,'viewsss'))  //here if had changed views file name


app.use(home)
app.use(addInst)
app.use(editInst)
app.use(delInst)
app.use(login)
app.use(signup)
app.use(generateReport)
app.use("*", (req, res) => {
    res.render('notfound.ejs')
})

mongoose.connect(DBurlONLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(process.env.PORT || 3000, () => { console.log("here....."); });