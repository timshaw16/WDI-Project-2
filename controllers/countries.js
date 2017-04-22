const Country = require('../models/country');

function countriesIndex(req, res, next) {
  Country
  .find()
  .then((countries) => res.render('countries/index', { countries }))
  .catch(next);
}

// Why is there nothing/what goes in the {}
function countriesNew(req, res) {
  res.render('countries/new', { });
}
// why is there 'next' but not in the above
function countriesCreate(req, res, next) {
  Country
  .create(req.body)
  .then(() => res.redirect('/countries'))
  .catch(next);
}

function countriesShow(req, res, next) {
  Country
  .findById(req.params.id)
  .then((country) => {
    if(!country) return res.status(404).render('static/404');
    res.render('countries/show', { country });
  })
  .catch(next);
}

function countriesEdit(req, res, next) {
  Country
  .findById(req.params.id)
  .then((country) => {
    if(!country) return res.status(404).render('static/404');
    res.render('videos/edit', { country });
  })
  .catch(next);
}
// Need explanation on the below
function countriesUpdate(req, res, next) {
  Country
  .findById(req.params.id)
  .then((country) => {
    if(!country) return res.status(404).render('static/404');

    for (const field in req.body) {
      country[field] = req.body[field];
    }

    return country.save();
  })
  .then((country) => res.render(`/countries/${country.id}`))
  .catch(next);
}

function countriesDelete(req,res, next) {
  Country
  .findById(req.params.id)
  .then((country) => {
    if(!country) return res.status(404).render('static/404');
    return country.remove();
  })
  .then(() => res.redirect('/countries'))
  .catch(next);
}

module.exports = {
  index: countriesIndex,
  new: countriesNew,
  create: countriesCreate,
  show: countriesShow,
  edit: countriesEdit,
  update: countriesUpdate,
  delete: countriesDelete
};
