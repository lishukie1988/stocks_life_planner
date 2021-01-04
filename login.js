module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // - render front end login page
    //   - front-end:
    //     - sends front-end ajax post request to "/login" (below) with entered userid_x & password_x 
    router.get('/', function(req, res){

        //console.log(req.query);

        if (req.session.userID) {
            res.redirect("/calendar");
        }
        else {
            //if (req.query.status == 0) {
            var context = {};
            context.status = req.query.status;
            context.jsscripts = ["./helper.js", "login/front_login_on_load.js"];
            //console.log("about to render login page");
            res.render('login', context);
        
        }
    
    });

    /*
    - validate that userid_x exists in the database & password_x matches password for userid_x stored in the database
    - if validated:
         - set req.session.userid to retrieved userid from database
         - redirect to "/calendar"
       - if not validated:
         - redirect back to get "/login" route (above) (again)
    */


    // simplified post route for testing purpose
    /*
   router.post('/', function(req, res){
    var body_params = [req.body.username, req.body.password];
    console.log(body_params);

    //var callbackCount = 0;
    var context = {};
    //context.jsscripts = ["calendar/front_calendar_day.js", "calendar/front_calendar.js", "calendar/front_calendar_on_load.js"];
    
    var mysql = req.app.get('mysql');
    var sql_string = "SELECT * FROM Users";

    mysql.pool.query(sql_string, function(error, results, fields){
            context.users = results;
            console.log(results);
        
    });
    
    res.render('login', context);
});
*/

    
    router.post('/', function(req, res){
        var body_params = [req.body.username, req.body.password];
        //console.log(body_params);

        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["calendar/front_calendar_day.js", "calendar/front_calendar.js", "calendar/front_calendar_on_load.js"];
        
        var mysql = req.app.get('mysql');
        
        validate(res, body_params, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log("@ login post: context.users: ", context.users);

                if (context.users.length == 0) {

                    console.log("invalid username &/ password");
                    //res.redirect("/login");
                    res.write("invalid");
                }
                else {
                    //console.log(context.users[0].userID);
                    req.session.userID = context.users[0].userID;
                    req.session.save();
                    console.log(req.session);
                    res.write("valid");
                    //console.log(context.users[0][userID]);
                }
                res.end();
                //res.render('login', context);
            }
        }
    });

    

    function validate(res, params, mysql, context, complete){
        var sql_string = "SELECT * FROM Users WHERE userid=? AND password=?";
        mysql.pool.query(sql_string, params, function(error, results, fields){
            if(error){
                console.log("error");
                res.write(JSON.stringify(error));
                res.end();
                return;
            }
            context.users = results;
            console.log("@ post login: validate: mysql result = ", results);
            //console.log("reached compelte()");
            complete();
            
        });
    }

    router.post('/todos', function(req, res){
        var params = [req.body.year, req.body.month, req.body.date];
        var callbackCount = 0;
        //var context = {};
        //context.jsscripts = ["calendar/front_calendar_day.js", "calendar/front_calendar.js", "calendar/front_calendar_on_load.js"];
        
        var mysql = req.app.get('mysql');
        getTodos(res, params, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                //console.log(context);
                res.send(context);
            }

        }
        
       res.render('calendar', context);
    });


    
    return router;
}();

