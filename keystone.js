// Development ENV
require('dotenv').config();


const keystone = require('keystone');

keystone.init({
  'name': 'Justin Bellero',
  'brand': 'Justin Bellero',

  'sass': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'pug',

  'emails': 'templates/emails',

  'frame guard': 'deny',
  'auto update': true,
  'session': true,
  'session store': 'mongo',
  'auth': true,
  'user model': 'User',
  'wysiwyg images': true,
});

// Load All Models
keystone.import('models');

// Setup common locals for templates. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  posts: ['posts', 'post-categories'],
  galleries: 'galleries',
  enquiries: 'enquiries',
  users: 'users',
});


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  console.log('----------------------------------------'
  + '\nWARNING: MISSING MAILGUN CREDENTIALS'
  + '\n----------------------------------------'
  + '\nYou have opted into email sending but have not provided'
  + '\nmailgun credentials. Attempts to send will fail.'
  + '\n\nCreate a mailgun account and add the credentials to the .env file to'
  + '\nset up your mailgun integration');
}


keystone.start();
