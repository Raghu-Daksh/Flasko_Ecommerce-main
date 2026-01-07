const jwt = require('jsonwebtoken');
function checkAuth(req,res,next){
    const token = req.cookies.token;
    console.log("token from cookie", token);
    
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("auth error", error);
        
        return res.status(401).json({message: error.message});
    }
}

module.exports = {checkAuth};