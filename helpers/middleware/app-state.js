
/**
 * Basic middleware that populates some user state data so that every template can access it, if needed.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    // Google Analytics ID
    if (process.env.GOOGLE_ANALYTICS_ID) {
        res.locals.gaId = process.env.GOOGLE_ANALYTICS_ID;
        res.locals.gaUrl = 'https://www.googletagmanager.com/gtag/js?id=' + res.locals.gaId;
    }

    // User state storage.
    res.locals.userState = {};
    if (req.user) {
        res.locals.userState.isLoggedIn = typeof req.user.id !== 'undefined';
        res.locals.userState.isRegistered = typeof req.user.username !== 'undefined';
        res.locals.userState.username = req.user.username;
    }

    next();
};