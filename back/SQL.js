const mysql = require("mysql2");


module.exports.SQL = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"A MODIFIER",
    database:"A MODIFIER"
})
