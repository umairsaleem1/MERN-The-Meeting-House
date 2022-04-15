import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AuthCode from 'react-auth-code-input';
import { useDispatch, useSelector } from 'react-redux';
import { STEPS, setStep, getOtp, verifyOtp } from '../../redux/stepsSlice';
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
    },
    spinner: {
        height: '25px',
        width: '25px' 
    },
    spinnerBtn: {
        width: '90px',
        backgroundColor: 'blue',
        marginTop: '50px',
        borderRadius: '18px',
        '&:hover': {
            backgroundColor: 'blue'
        },
        '&:disabled': {
            backgroundColor: '#79aef0',
            opacity: '0.8',
            cursor: 'not-allowed',
            pointerEvents: 'all !important'
        }
    }
}
const StepOtp = () => {
    
    const { method, receiver } = useSelector((state)=>state.steps.otpDetails);
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const [verifying, setVerifying] = useState({ status: false, requestFinished: false });



    if(!verifying.status && verifying.requestFinished){
        setTimeout(()=>{
            dispatch(setStep(STEPS.NAME));
        }, 10)
    }
    const handleNextClick = ()=>{
        dispatch(verifyOtp(receiver, otp, setVerifying));
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

            <Button variant='contained' endIcon={ !verifying.status && <ArrowForwardIcon/>} sx={ verifying.status ? style.spinnerBtn : (theme)=>theme.btnStyle } onClick={handleNextClick} disabled={verifying.status}>
                {
                    verifying.status
                    ?
                    <img src='/images/spinner.gif' alt='loader' style={style.spinner} />
                    :
                    <>
                    Next
                    </>
                }
            </Button>
        
        </Box>
    )
}

export default StepOtp;