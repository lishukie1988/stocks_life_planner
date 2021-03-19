var mysql = require('mysql');
var pool = mysql.createPool({
   connectionLimit : 10,
   host            : 'portfolio2.cbdwadacowh0.us-east-2.rds.amazonaws.com',
   user            : 'liyuk',
   password        : '5pammu5ub!',
   database        : 'portfolio2',
   port            : 3300
});
module.exports.pool = pool;
