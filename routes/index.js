var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function (req, res, next) {
  res.notfound();
});

// Handle other errors
keystone.set('500', function (err, req, res, next) {
  var title, message;
  if (err instanceof Error) {
    title = err.name;
    message = err.message;
    err = err.stack;
  }
  res.err(err, title, message);
});

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
  // Views
  app.get('/', routes.views.index);
  // app.get('/blog/:category?', routes.views.blog);
  // app.get('/blog/post/:post', routes.views.post);
  // app.get('/gallery', routes.views.gallery);
  app.get('/admin', (req, res) => res.redirect('/keystone/signin'));
  app.all('/contact', routes.views.contact);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

};
