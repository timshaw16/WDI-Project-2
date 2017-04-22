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
      return res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
    }
    return res.direct('/');
  });

}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate
};
