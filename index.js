const express         = require('express');
const morgan          = require('morgan');
const expressLayouts  = require('express-ejs-layouts');
const session         = require('express-session');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const methodOverride  = require('method-override');
const env             = require('./config/env');
const router          = require('./config/routes');
const app             = express();
const User            = require('./models/user');
const flash           = require('express-flash');

mongoose.connect(env.db);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use(session({
  secret: process.env.SESSION_SECRET || `ssh it\'s a secret`,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// Informs all views that it's the same userId, do not log out
app.use((req, res, next) => {
  if (!req.session.userId) return next();

  User
  .findById(req.session.userId)
  // .exec()
  .then((user) => {
    if (!user) {
      return req.session.regenerate(() => {
        req.flash('danger', 'You must be logged in.');
        res.redirect('/');
      });
    }
    req.session.userId = user._id;
    res.locals.user = user;
    res.locals.isLoggedIn = true;

    return next();
  });
});

app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(router);

app.listen(env.port, () => console.log(`Server up and running on port: ${env.port}.`));
