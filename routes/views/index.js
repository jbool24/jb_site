var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';

  // fix scroll-efx by updating href of about link
  var about = locals.navLinks[1];
  about.href = '#about';

  var tech = { label: 'Technology', key: 'tech', href: '#technology' };
  locals.navLinks.splice(2, 0, tech);

  // Render the view
  view.render('index');
};
