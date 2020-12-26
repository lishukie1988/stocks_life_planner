module.exports = function(){
    var express = require('express');
    var router = express.Router();

   
    // post to retrieve todo data for day thumbnail & day view
    // ****TODO: copied from users.js, modify for user info retrieval
    router.post('/', function(req, res){
        var body_params = [req.body.userID, req.body.year, req.body.month, req.body.date];
        console.log(body_params);

        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["calendar/front_calendar_day.js", "calendar/front_calendar.js", "calendar/front_calendar_on_load.js"];
        
        var mysql = req.app.get('mysql');
        getTodos(res, body_params, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                
                console.log("in complete() of todo post");
                console.log(context);
                res.send(context);
                //return;
            }
        }
    });

    

    function getTodos(res, params, mysql, context, complete){
        console.log("reached getTodos");
        console.log(params);
        var sql_string = 'SELECT * FROM Todo_items WHERE userID=? AND year=? AND month=? AND date=?';
        mysql.pool.query(sql_string, params, function(error, results, fields){
            if(error){
                console.log("TODO MYSQL ERROR");
                res.write(JSON.stringify(error));
                res.end();
            }
            context.todos = results;
            console.log("TODO SQL SUCCESS");
            console.log(results);
            console.log("CONTEXT OBJECT AFTER todo items retrieved");
            console.log(context);
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

