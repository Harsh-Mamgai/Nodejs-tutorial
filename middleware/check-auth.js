const jwt = require('jsonwebtoken');

function checkAuth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];//Bearer  (our Token)

        //verifies our token with the secret key and returns payload data. synchronous
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        
        req.userData = decodedToken;//setting token payload data in req userData key value
        next();//hands execution to next middleware available
    }
    catch(err){
        return res.status(401).json({
           "message": "Invalid or expired token provided!",
           "error": err 
        });
    }
}

module.exports = {
    checkAuth: checkAuth
};