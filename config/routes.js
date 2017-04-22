const express                   = require('express');
const router                    = express.Router();
const countries                 = require('../controllers/countries');
const registrations             = require('../controllers/registrations');
const sessions        = require('../controllers/sessions');

router.get('/', (req, res) => res.render('statics/home'));

router.route('/countries')
  .get(countries.index)
  .post(countries.create);

router.route('/countries/new')
  .get(countries.new);

router.route('/countries/:id')
  .get(countries.show)
  .put(countries.update)
  .delete(countries.delete);

router.route('/countries/:id/edit')
  .get(countries.edit);

router.route('/register')
 .get(registrations.new)
 .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

// router.route('/logout')
//   .get(sessionsController.delete);

module.exports = router;
