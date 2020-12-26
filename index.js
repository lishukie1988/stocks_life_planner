var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

var session = require('express-session');
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

// test post route for mysql 
/*
app.post('/login',function(req,res,next){
  var context = {};
  var {username, password} = req.body;
  console.log("reached test post login");
  console.log(username, password);
  mysql.pool.query('SELECT * FROM Users', function(err, result){

    if(err){
      next(err);
      return;
    }

    console.log(result);

  });
});

*/

app.use('/login', require('./login.js'));

app.use('/create', require('./create.js'));

app.all('*', function(req, res, next){
    console.log("passed through getall route");
    console.log(req.session);
    //next();
    //res.redirect('/calendar');
    // TODO: validate that session object exists & contains userid
    // - if exists & contains session object w/ userid
    //   - next() to allow request to trickle down to next matching route
    // - if session object doesn't exist (user not logged in)
    //   - res.redirect() to login page
    //     - NOTE: redirect essentially converts request target to redirection url & sends request back to the start of list of routes
    if (!req.session.userID) {
        console.log("session doesn't contain userID, redirected to get login");
        res.redirect("/login?status=0");
    }
    else {
        console.log("trickle down to target route");
        console.log(req.session.userID);
        next();
    }
});

app.use('/calendar', require('./calendar.js'));
app.use('/todo', require('./todo.js'));
//app.use('/Users', require('./Users.js'));
//app.use('/Items', require('./Items.js'));
//app.use('/Orders', require('./Orders.js'));
//app.use('/Order_Item_Pairs', require('./Order_Item_Pairs.js'));
//app.use('/Returns', require('./Returns.js'));
//app.use('/Return_Item_Pairs', require('./Return_Item_Pairs.js'));

//console.log("successfully trickled down the routes");


app.use('/', function(req, res){
  res.status(200);
  res.render('homepage');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
