const express                   = require('express');
const router                    = express.Router();
const countries                 = require('../controllers/countries');
const registrations             = require('../controllers/registrations');
const sessions                  = require('../controllers/sessions');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }
  return next();
}

function registrationsCreate(req, res) {
  User
  .create(req.body)
  .then((user) => {
    req.flash('info', `Thanks for registering, ${user.username}! Please login.`);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).render('registrations/new', { Message: 'Passwords donot match '});
    }
    res.status(500).end();
  });
}

router.get('/', (req, res) => res.render('statics/home'));

router.route('/countries')
  .get(countries.index)
  .post(secureRoute, countries.create);

router.route('/countries/new')
  .get(secureRoute, countries.new);

router.route('/countries/:id')
  .get(countries.show)
  .put(secureRoute, countries.update)
  .delete(secureRoute, countries.delete);

router.route('/countries/:id/edit')
  .get(secureRoute, countries.edit);

router.route('/register')
 .get(registrations.new)
 .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


module.exports = router;
