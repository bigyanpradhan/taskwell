const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.json({
            message: 'Token not found'
        })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) {
            return res.json({
                message: 'invalid token',
            })
        }
        req.user = user;
        next();
    })
}

module.exports = {
    authenticateToken
}