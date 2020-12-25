module.exports = function(){
    var express = require('express');
    var router = express.Router();


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["calendar/front_calendar_day.js", "calendar/front_calendar.js", "calendar/front_calendar_on_load.js"];
        /*
        var mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                //console.log(context);
                res.render('calendar/front_calendar', context);
            }

        }
        */
       //res.next();
       res.render('calendar', context);
    });

    function getTodos(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
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

