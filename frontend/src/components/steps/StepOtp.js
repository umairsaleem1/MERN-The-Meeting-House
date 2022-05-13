import { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import AuthCode from 'react-auth-code-input';
import { useDispatch, useSelector } from 'react-redux';
import { getOtp, verifyOtp } from '../../redux/stepsSlice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepsTitle from '../shared/StepsTitle';
import './stepOtp.css';


const style = {
    resendBtn: {
        marginLeft: '10px',
        color: 'blue',
        marginTop: '-3px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    }
}
const StepOtp = () => {
    
    const { otpDetails, apiRequestFinished } = useSelector((state)=>state.steps);
    const { method, receiver } = otpDetails;
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');



    const handleNextClick = ()=>{
        dispatch(verifyOtp(receiver, otp));
    }

    return (
        <Box sx={(theme)=>theme.stepsBoxStyle}>

            <StepsTitle icon='🔒' title='Enter the code we just sent you'/>

            <AuthCode
                autoFocus={true}
                onChange={(val)=> setOtp(val)}
                length={4}
                containerClassName='otpInputContainer'
                inputClassName='otpInput'
            />

            <Typography variant='body2' mt='15px' color='text.secondary'>
                Didn't received?
                <Button variant="text" sx={style.resendBtn} onClick={()=>dispatch(getOtp(method, receiver))}>Resend</Button>
            </Typography>

            <Button variant='contained' endIcon={ apiRequestFinished && <ArrowForwardIcon/>} sx={(theme)=>theme.btnStyle } style={ !apiRequestFinished ? { width: '90px' } : null } onClick={handleNextClick} disabled={!apiRequestFinished}>
                {
                    apiRequestFinished
                    ?
                    <>
                    Next
                    </>
                    :
                    <CircularProgress color='error' size={24}/>
                }
            </Button>
        
        </Box>
    )
}

export default StepOtp;