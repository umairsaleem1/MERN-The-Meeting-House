import { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import validator from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorAlert, getResetPassowrdLink } from '../redux/stepsSlice';
import StepsTitle from '../components/shared/StepsTitle';
import TextInput from '../components/shared/TextInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustormAlert from '../components/shared/CustormAlert';
import Navbar from '../components/shared/Navbar';



const style = {
    container: {
        minHeight: 'calc(100vh - 80px)',
        height: 'auto',
        width: '100%',
        backgroundColor: 'background.primary',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'80px'
    }
}
const ForgotPassword = () => {

    const { alert, apiRequestFinished } = useSelector((state)=>state.steps);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();


    const handleSubmit = async ()=>{

        const isValidEmail = validator.isEmail(email);
        if(!isValidEmail){
            dispatch(setErrorAlert({ message: 'Please enter a valid email id'}));
            return;
        }

        dispatch(getResetPassowrdLink(email));
    }

    return (
        <>
        <Navbar/>
        <Box sx={style.container}>
            
            <Box sx={(theme)=>theme.stepsBoxStyle}>

                <StepsTitle icon='🥺' title='Enter your registered email'/>
                
                <TextInput type='email' placeholder='' setValue={setEmail}/>

                <Typography variant='body2' mt='15px' color='text.secondary'>
                    Password reset link will be sent to above email id
                </Typography>

                <Button variant='contained' endIcon={apiRequestFinished && <ArrowForwardIcon/>} sx={(theme)=>theme.btnStyle} style={ !apiRequestFinished ? { width: '108px' } : null } onClick={handleSubmit} disabled={!apiRequestFinished}>
                    {
                        apiRequestFinished
                        ?
                        <>
                        Submit
                        </>
                        :
                        <CircularProgress color='error' size={24}/>
                    }
                </Button>

            </Box>

            { alert.showAlert && <CustormAlert/> }

        </Box>
        </>
    )
}

export default ForgotPassword;