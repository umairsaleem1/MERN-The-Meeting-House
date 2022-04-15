const jwt = require('jsonwebtoken');

const auth = async (req, res, next)=>{
    try{
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({
                message: 'Access token expired!'
            });
        }

        const isVerified = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(!isVerified){
            return res.status(401).json({
                message: 'User is not authenticated'
            });
        }

        req.id = isVerified.id;
        next();
        
    }catch(e){
        return res.status(500).json({
            message: 'Some problem occcurred'
        });
    }
}

module.exports = auth;