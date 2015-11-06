var controllers = require('./controllers');
var mid = require('./middleware');

var router = function(app) {

   app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
   app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
   app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
   app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
   app.get("/logout", mid.requiresLogin, controllers.Account.logout);
   app.get("/new", mid.requiresLogin, controllers.Account.newPage);
   app.get("/maker", mid.requiresLogin, controllers.Domo.makerPage);
   app.post("/maker", mid.requiresLogin, controllers.Domo.make);
   app.get("/killer/:_id", mid.requiresLogin, controllers.Domo.deleteDomo); //'/Domo/:_id/delete'
   app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
