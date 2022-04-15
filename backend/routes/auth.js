const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Otp = require('../models/otp');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');
const upload = require('../middlewares/upload');
// const { baseURL } = require('../utils/baseURL');



 
// first create a new otp, after that check if there is already an otp present in db associated to that user, if there is then update that otp with this new one and lastly send the otp to user
router.put('/sendOtp', async (req, res)=>{ 
    try{
        const { method, receiver } = req.body;
        if(!method || !receiver){
            return res.status(400).json({
                message: 'Please fill out required fields' 
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        
        await Otp.updateOne({ receiver: receiver }, { $set: {method, receiver, otp} }, { upsert: true });

        if(method==='number'){
            sendSMS(receiver, otp);
        }
        else if(method==='email'){
            sendEmail('', receiver, null, otp); 
        }


        res.status(201).json({
            otp: otp
        })

    }catch(e){
        res.status(500).json({
            message: 'Some problem occurred!'
        });
        console.log(e); 
    }
})







// first verify the otp and then delete it
router.delete('/verifyOtp', async (req, res)=>{
    try{
        const { receiver, otp } = req.body;

        const result = await Otp.findOne({ receiver, otp });
        
        if(!result){
            return res.status(422).json({
                message: 'Code is incorrect!'
            });
        }

        await Otp.findByIdAndDelete({ _id: result._id });

        res.status(200).json({
            message: 'Code verified successfully...'
        });
    }catch(e){
        res.status(500).json({
            message: 'Some problem occurred'
        });
        console.log(e);
    }
})








// register
router.post('/register', upload.single('avatar'), async (req, res)=>{
    try{
        const { phone, name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: 'Please fill out the required fields!'
            });
        }

        const user = await User.findOne({ email: email });
        if(user){
            return res.status(422).json({
                message: 'User already exists with the same email'
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        let avatar = '';
        if(req.file){
            // avatar = baseURL + req.file.path;
            avatar = req.file.path;
            
        }

        const newUser = new User({
            phone: phone,
            name: name,
            avatar: avatar,
            email: email,
            password: hashedPassword
        });

        await newUser.save();


        res.status(201).json({
            message: 'User registered successfully...'
        });

    }catch(e){
        res.status(500).json({
            message: 'Some problem occurred'
        });
        console.log(e);
    }
})






router.post('/login', async (req, res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: 'All fields are required!'
            });
        }

        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(401).json({
                message: 'Invalid credentials!'
            });
        }
        
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(401).json({
                message: 'Invalid credentials!'
            });
        }

        const accessToken = await jwt.sign( {id: user._id}, process.env.ACCESS_TOKEN_SECRET);
        const refreshToken = await jwt.sign( {id: user._id}, process.env.REFRESH_TOKEN_SECRET);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 180000)
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 604800000)
        })

        res.status(200).json({
            accessToken,
            refreshToken
        });

    }catch(e){
        res.status(500).json({
            message: 'Some problem occurred'
        });
        console.log(e);
    }
})


module.exports = router;