// When we log in, we are essentially creating an authorized session with the site. The session will last until we log out again.

const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}
// login
function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {

      if (!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        return res.redirect('/login');
      }

      req.session.userId = user.id;

      req.flash('info', `Welcome back, ${user.username}!`);
      res.redirect('/');
    });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
