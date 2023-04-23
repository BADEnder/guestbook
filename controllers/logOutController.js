const pgConfig = require('../database/pgConection')

const getLogOut = (req, res) => {
    // const client = pgConfig()
    res.clearCookie('jwt', {httpOnly: true})
    res.redirect('/')
}



module.exports = {
    getLogOut
}