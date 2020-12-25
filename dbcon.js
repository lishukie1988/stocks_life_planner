var mysql = require('mysql');
var pool = mysql.createPool({
   connectionLimit : 10,
   host            : 'portfolio2.cbdwadacowh0.us-east-2.rds.amazonaws.com',
   user            : 'liyuk',
   password        : 'c001!0z0mb!3osu',
   database        : 'portfolio2'
});
module.exports.pool = pool;
