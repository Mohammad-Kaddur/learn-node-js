const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('67c61ca325d0daa827e422f7')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => { 
  app.listen(3000);
});


//67c61ca325d0daa827e422f7

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
