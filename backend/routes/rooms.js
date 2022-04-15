const router = require('express').Router();
const auth = require('../middlewares/auth');
const refreshToken = require('../middlewares/refreshToken');



router.get('/rooms', refreshToken, auth, (req, res)=>{
    res.status(200).json({
        message: 'Rooms list'
    });
});

module.exports = router;