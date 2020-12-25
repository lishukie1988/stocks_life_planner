module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // - render front end login page
    //   - front-end:
    //     - sends front-end ajax post request to "/login" (below) with entered userid_x & password_x 
    router.get('/', function(req, res){
        console.log("redirected to login page");
        var context = {};
        res.render('login', context);
    });

    /*
    - validate that userid_x exists in the database & password_x matches password for userid_x stored in the database
    - if validated:
         - set req.session.userid to retrieved userid from database
         - redirect to "/calendar"
       - if not validated:
         - redirect back to get "/login" route (above) (again)
    */
    router.post('/', function(req, res){
        console.log("redirected to login page");
        var context = {};
        res.render('login', context);
    });

    
    return router;
}();

