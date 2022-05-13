const jwt = require('jsonwebtoken');

const refreshToken = async (req, res, next)=>{
    try{    
        const accessToken = req.cookies.accessToken;
        if(accessToken){
            next();
            return;
        }
        
        const hasRefreshToken = req.cookies.refreshToken;
        if(!hasRefreshToken){
            return res.status(401).json({ 
                message: 'Refresh token has been expired!'
            });
        }
        
        const isVerified = await jwt.verify(hasRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const newAccessToken = await jwt.sign({ id: isVerified.id }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000)
            }
        );
        req.cookies.accessToken = newAccessToken;

        next();
        
    }catch(e){
        return res.status(401).json({
            message: 'User is not authenticated'
        });
    }
}

module.exports = refreshToken;