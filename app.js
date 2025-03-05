const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");
// const Product = require("./models/product");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67c61ca325d0daa827e422f7")
    .then((user) => {
      if (!user) {
        console.log("User not found!");
        return next(); // Move to next middleware without setting req.user
      }
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log("Error fetching user:", err);
    });
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);
app.use(errorController.get404);

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// User.hasMany(Product);

mongoConnect((client) => {
  app.listen(3000);
});

// sequelize
//   .sync({ force: true })
//   .then((result) => {
//     app.listen(3000);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
//   .then(() => {
//     return sequelize.drop();  // Drop all tables
//   })
//   .then(() => {
//     return sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
//   })
//   .then(() => {
//     return sequelize.sync({ force: true });  // Sync the models
//   })
//   .then(() => {
//     app.listen(3000);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
