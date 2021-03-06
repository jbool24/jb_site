const _ = require('lodash');


/**
  Initialises the standard view locals
*/
const year = new Date();

exports.initLocals = function (req, res, next) {
    res.locals.navLinks = [
        { label: 'Home', key: 'home', href: '/' },
        { label: 'About', key: 'about', href: '/#about' },
        // { label: 'Blog', key: 'blog', href: '/blog' },
        // { label: 'Gallery', key: 'gallery', href: '/gallery' },
        { label: 'Contact', key: 'contact', href: '/contact' },
    ];
    res.locals.copyright = year.getFullYear();
    res.locals.user = req.user;
    next();
};

/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = function (req, res, next) {

    res.err = function (err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message,
        });
    };

    res.notfound = function (title, message) {
        res.status(404).render('errors/404');
    };

    next();

};

/**
  Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
    const flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error'),
    };
    res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
    next();
};


/**
  Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};
