import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { STEPS, setStep, setUserData, setErrorAlert } from '../../redux/stepsSlice';
import TextInput from '../shared/TextInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepsTitle from '../shared/StepsTitle';




const StepEmail = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');



    const handleNextClick = ()=>{ 

        const isValidEmail = validator.isEmail(email);
        if(!isValidEmail){
            dispatch(setErrorAlert({ message: 'Please enter a valid email id'}));
            return;
        }

        dispatch(setUserData({email:email}));
        dispatch(setStep(STEPS.PASSWORD));
    }

    return (
        <Box sx={(theme)=>theme.stepsBoxStyle}>

            <StepsTitle icon={null} title="What's your email id?" image='/images/email-emoji.png'/>
            
            <TextInput type='email' placeholder='' value={email} setValue={setEmail}/>

            <Typography variant='body2' mt='15px' color='text.secondary'>
                Email will be used for the login
            </Typography>

            <Button variant='contained' endIcon={<ArrowForwardIcon/>} sx={(theme)=>theme.btnStyle} onClick={handleNextClick}>Next</Button>

        </Box>
    )
}

export default StepEmail;