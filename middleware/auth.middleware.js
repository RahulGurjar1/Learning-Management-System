const jwt= require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Auth Token missing"});
    }
    try{
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded_token;
        next();
    }catch(err){
        res.status(401).json({message: "Invalid Auth Token"});
    }
};

module.exports = authMiddleware;