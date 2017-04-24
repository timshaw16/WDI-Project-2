const Country = require('../models/country');

function countriesIndex(req, res, next) {
  Country
  .findAndGroupByRegion()
  .then((countries) => res.render('countries/index', { countries }))
  .catch(next);
}

function countriesNew(req, res, next) {
  try {
    res.render('countries/new');
  } catch(e) {
    next(e);
  }
}

// why is there 'next' but not in the above
function countriesCreate(req, res, next) {
  Country
  .create(req.body)
  .then(() => res.redirect('/countries'))
  .catch(next);
}

function countriesShow(req, res) {
  Country
  .findById(req.params.id)
  .exec()
  .then(country => {
    console.log(country);
    if (!country) {
      return res.render('error', { error: 'No country found!' });
    }
    return res.render('countries/show', { country });
  })
    .catch(err => {
      return res.render('error', { error: err });
    });
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
