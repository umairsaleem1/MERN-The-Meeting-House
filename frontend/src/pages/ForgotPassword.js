import { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
        minHeight: {
            md: 'calc(100vh - 80px)',
            xs: 'calc(100vh - 60px)',
        },
        width: '100%',
        backgroundColor: 'background.primary',
        display: {
            sm: 'flex',
            xs: 'block'
        },
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: {
            md: '80px',
            xs: '60px',
        },
        paddingTop: {
            sm: '0px',
            xs: '90px'
        }
    },
    rememberPassword: {
        color: 'blue',
        marginTop: '20px'
    },
    signInBtn: {
        marginLeft: '10px',
        color: 'blue',
        marginTop: '-3px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    }
}
const ForgotPassword = () => {

    const { alert, apiRequestFinished } = useSelector((state)=>state.steps);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


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
                
                <TextInput type='email' placeholder='' value={email} setValue={setEmail}/>

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

                <Typography variant='body1' sx={style.rememberPassword}>
                    Remember Password? 
                    <Button variant="text" sx={style.signInBtn} onClick={()=> navigate('/login')}>Sign in</Button>
                </Typography>

            </Box>

            { alert.showAlert && <CustormAlert/> }

        </Box>
        </>
    )
}

export default ForgotPassword;