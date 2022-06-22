import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { STEPS, setStep, setUserData, setErrorAlert, setUserRegistrationCompleted } from '../../redux/stepsSlice';
import TextInput from '../shared/TextInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepsTitle from '../shared/StepsTitle';




const StepPassword = () => {

    const dispatch = useDispatch();
    const [password, setPassword] = useState('');



    const handleNextClick = ()=>{
        
        if(password.trim().length<5){
            dispatch(setErrorAlert({ message: 'Password must be of minimum 5 characters'}));
            return;
        }

        dispatch(setUserData({password:password}));
        dispatch(setUserRegistrationCompleted(true));
        dispatch(setStep(STEPS.ACTIVATION));
    }

    return (
        <Box sx={(theme)=>theme.stepsBoxStyle}>

            <StepsTitle icon={null} title='Pick a strong password' image='/images/lock.png' fromPassword={true}/>

            <TextInput type='password' placeholder='' value={password} setValue={setPassword}/>

            <Typography variant='body2' mt='15px' color='text.secondary'>
                Password will be used for the login
            </Typography>

            <Button variant='contained' endIcon={<ArrowForwardIcon/>} sx={(theme)=>theme.btnStyle} onClick={handleNextClick}>Next</Button>

        </Box>
    )
}

export default StepPassword;