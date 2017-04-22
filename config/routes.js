const express                   = require('express');
const router                    = express.Router();
const countriesController       = require('../controllers/countries');
const registrationController    = require('../controllers/registration');
const sessionsController        = require('../controllers/sessions');

router.get('/', (req, res) => res.render('statics/home'));

router.route('/countries')
  .get(countriesController.index)
  .post(countriesController.create);

router.route('/countries/new')
  .get(countriesController.new);

router.route('/countries/:id')
  .get(countriesController.show)
  .put(countriesController.update)
  .delete(countriesController.delte);

router.route('/countries/:id/edit')
  .get(countriesController.edit);

router.route('/register')
 .get(registrationController.new)
 .post(registrationController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);



module.exports = router;
