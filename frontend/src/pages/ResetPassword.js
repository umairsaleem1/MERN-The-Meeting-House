import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorAlert, resetPassword } from '../redux/stepsSlice';
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
    },
    spinner: {
        height: '25px',
        width: '25px' 
    },
    spinnerBtn: {
        width: '110px',
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
    },
}
const ResetPassword = () => {

    const { alert, apiRequestFinished } = useSelector((state)=>state.steps);
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const { token } = useParams();
    const navigate = useNavigate();


    const handleSubmit = async ()=>{

        if(newPassword.trim().length<5){
            dispatch(setErrorAlert({ message: 'Password must be of minimum 5 characters'}));
            return;
        }

        dispatch(resetPassword(newPassword, token, navigate));
    }

    return (
        <>
        <Navbar/>
        <Box sx={style.container}>
            
            <Box sx={(theme)=>theme.stepsBoxStyle}> 
                 
                <StepsTitle icon='😃' title='Enter your new password'/>
                
                <TextInput type='password' placeholder='' setValue={setNewPassword}/>

                <Typography variant='body2' mt='15px' color='text.secondary'>
                    New password will be used to get access to your account
                </Typography>

                <Button variant='contained' endIcon={apiRequestFinished && <ArrowForwardIcon/>} sx={!apiRequestFinished ? style.spinnerBtn : (theme)=>theme.btnStyle} onClick={handleSubmit} disabled={!apiRequestFinished}>
                    {   
                        apiRequestFinished
                        ?
                        <>
                        Submit
                        </>
                        :
                        <img src='/images/spinner.gif' alt='loader' style={style.spinner} /> 
                    }
                </Button>

            </Box>

            { alert.showAlert && <CustormAlert/> }

        </Box>
        </>
    )
}

export default ResetPassword;