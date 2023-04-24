require('dotenv').config()

const verifyLogIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/log-in')
    }

    next()
}

module.exports = verifyLogIn