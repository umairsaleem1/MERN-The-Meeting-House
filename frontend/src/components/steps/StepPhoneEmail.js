import React, { useState } from 'react';
import { Box, Fab, Typography, Button } from '@mui/material';
import validator from 'validator';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useDispatch } from 'react-redux';
import { STEPS, setStep, setOtpDetails, setUserData, setErrorAlert, getOtp } from '../../redux/stepsSlice';
import TextInput from '../shared/TextInput';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepsTitle from '../shared/StepsTitle';
import 'react-phone-number-input/style.css';
import './stepPhoneEmail.css';


const style = {
    mainContainer: {
        height: 'auto',
        width: {
            md: '550px',
            xs: '100%',
        },
        position: 'relative'
    },
    tabBtns: {
        height: '60px',
        width: '125px',
        position: 'absolute',
        top: {
            sm: 0,
            xs: -80
        },
        right: {
            md: 0,
            xs: 10,
        },
        display: 'flex',
        justifyContent: 'space-between'
    },
    tabBtn: {
        height: '100%',
        backgroundColor: 'background.secondary',
        borderRadius: '10px',
        color: 'text.primary',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    },
    tabBtnIcon: {
        fontSize: '2.3rem'
    }
}
const StepPhoneEmail = () => {

    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState('number');
    // it is either email or phone number which user has entered
    const [receiver, setReceiver] = useState('');




     
    const handleNextClick = ()=>{
        if(!receiver.trim()){
            dispatch(setErrorAlert({ message: 'Please enter Phone No or Email!'}));
            return;
        }

        if(selectedTab==='email'){
            const isValid = validator.isEmail(receiver);
            if(!isValid){
                dispatch(setErrorAlert({ message: 'Please enter a valid email!'}));
                return;
            }

            dispatch(setOtpDetails({ method: 'email', receiver: receiver }));
            dispatch(setStep(STEPS.OTP));

        }else{
            const isValid = isValidPhoneNumber(receiver);
            if(!isValid){
                dispatch(setErrorAlert({ message: 'Please enter a valid phone No!'}));
                return;
            }

            dispatch(setOtpDetails({ method: 'number', receiver: receiver }));
            dispatch(setUserData({ phone: receiver }));
            dispatch(setStep(STEPS.OTP));
        }

        dispatch(getOtp(selectedTab, receiver));
        
    }

    return (
        <Box sx={style.mainContainer}>

            <Box sx={style.tabBtns}>

                <Fab sx={style.tabBtn} style={selectedTab==='number' ? {backgroundColor:'#0077FF'} : null } onClick={()=> setSelectedTab('number')}>
                    <PhoneAndroidIcon sx={style.tabBtnIcon}/>
                </Fab>

                <Fab sx={style.tabBtn} style={selectedTab==='email' ? {backgroundColor:'#0077FF'} : null } onClick={()=> setSelectedTab('email')}>
                    <MailOutlineIcon sx={style.tabBtnIcon}/>
                </Fab>

            </Box>

            <Box sx={(theme)=>theme.stepsBoxStyle} mt='80px'>

                {
                    selectedTab==='number'
                    ?
                    <StepsTitle icon='📲' title='Enter your phone number' fromPassword={false}/>
                    :
                    <StepsTitle icon='📩' title='Enter your email id' fromPassword={false} fromEmailOtp={true}/>
                }
               
               {
                   selectedTab==='number'
                   ?
                
                    <PhoneInput
                        defaultCountry='PK'
                        placeholder=""
                        value={receiver}
                        onChange={setReceiver}
                        className='phone-num-input'
                    />
                    :
                    <TextInput type={selectedTab} placeholder='' value={receiver} setValue={setReceiver}/>
               }
                <br/>

                <Button variant='contained' endIcon={<ArrowForwardIcon/>} style={selectedTab==='number' ? {marginTop:'32px'} : null} sx={(theme)=>theme.btnStyle} onClick={handleNextClick}>
                    Next
                </Button>

                <Typography variant='body2' color='text.secondary' mt='20px'>
                    By entering your {selectedTab}, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
                </Typography>

            </Box>

        </Box>
    )
}

export default StepPhoneEmail;