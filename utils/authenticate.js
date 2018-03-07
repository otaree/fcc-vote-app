const requireLogin = (req, res, next) => {
    if (req.session.userInfo !== undefined) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = requireLogin;