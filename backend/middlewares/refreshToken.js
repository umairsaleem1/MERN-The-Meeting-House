const jwt = require('jsonwebtoken');

const refreshToken = async (req, res, next)=>{
    try{    
        const accessToken = req.cookies.accessToken;
        if(accessToken){
            next();
            return;
        }

        const refreshTokenPresent = req.cookies.refreshToken;
        if(!refreshTokenPresent){
            return res.status(401).json({ 
                message: 'Refresh token has been expired!'
            });
        }

        const isVerified = await jwt.verify(refreshTokenPresent, process.env.REFRESH_TOKEN_SECRET);
        if(!isVerified){
            return res.status(401).json({
                message: 'Invalid refresh token'
            });
        }

        const newAccessToken = await jwt.sign({ id: isVerified.id }, process.env.ACCESS_TOKEN_SECRET);
        console.log('hi') 
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 180000)
            }
        );
        req.cookies.accessToken = newAccessToken;

        next();
        
    }catch(e){
        return res.status(500).json({
            message: 'Some problem occurred'
        });
    }
}

module.exports = refreshToken;