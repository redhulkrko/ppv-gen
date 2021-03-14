const mysql = require("mysql");

// create here mysql connection

const dbConn = mysql.createConnection({
  host: "magnetar.servers.prgn.misp.co.uk",
  user: "rbdesign_t2",
  password: "QiLzt9sFvFrA",
  database: "rbdesign_ppv",
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Database Connected Successfully!!!");
});

module.exports = dbConn;
