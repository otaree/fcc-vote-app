const index_home = (req, res) => {
    res.status(202).render('index', {title: 'home'});
};

const index_login = (req, res) => {
    res.status(202).render('login', {title: 'Login'});
};

module.exports = { index_home, index_login };