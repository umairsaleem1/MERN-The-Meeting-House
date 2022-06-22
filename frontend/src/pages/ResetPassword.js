import { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
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
    }
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
                
                <TextInput type='password' placeholder='' value={newPassword} setValue={setNewPassword}/>

                <Typography variant='body2' mt='15px' color='text.secondary'>
                    New password will be used to get access to your account
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

export default ResetPassword;