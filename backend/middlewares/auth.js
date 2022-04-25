const jwt = require('jsonwebtoken');

const auth = async (req, res, next)=>{
    try{
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({
                message: 'Access token has been expired!'
            });
        }

        const isVerified = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        req.id = isVerified.id;
        next();
        
    }catch(e){
        return res.status(401).json({
            message: 'User is not authenticated'
        });
    }
}

module.exports = auth;