// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'learnnodejs',
//     password: ''
// });

// module.exports = pool.promise();

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("learnnodejs", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

// mongodb+srv://mainten:<db_password>@cluster0.myvsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//mongodb://atlas-sql-67c3974a83909803435f01e4-myvsg.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = (collBack) => {
  MongoClient.connect(
    "mongodb+srv://mainten:Aa456789Ff$@cluster0.myvsg.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      collBack();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found..!!";
};

// module.exports = MongoConnect;
exports.mongoConnect = MongoConnect;
exports.getDb = getDb;
