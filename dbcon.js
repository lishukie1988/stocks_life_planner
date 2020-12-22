var mysql = require('mysql');
var pool = mysql.createPool({
   connectionLimit : 10,
   host            : 'classmysql.engr.oregonstate.edu',
   user            : 'cs340_liyuk',
   password        : '6186',
   database        : 'cs340_liyuk'
});
module.exports.pool = pool;
