const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'My_secret_string');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }
        next();
    } catch(error){
        res.status(401).json("sorry");
        
    }
} 