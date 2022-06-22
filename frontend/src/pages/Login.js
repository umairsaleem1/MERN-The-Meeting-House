import { useState } from "react";
import validator from "validator";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setErrorAlert, loginUser } from "../redux/stepsSlice";
import TextInput from '../components/shared/TextInput';
import StepsTitle from "../components/shared/StepsTitle";
import LoginIcon from '@mui/icons-material/Login';
import CustormAlert from '../components/shared/CustormAlert';
import Navbar from "../components/shared/Navbar";




const style = {
    container: {
        height: {
            md: 'calc(100vh - 80px)',
            xs: 'calc(100vh - 60px)',
        },
        width: '100%',
        backgroundColor: 'background.primary',
        display: { 
            sm: 'flex' ,
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
            xs: '60px'
        }
    },
    newUser: {
        color: 'blue',
        marginTop: '20px'
    },
    registerBtn: {
        marginLeft: '10px',
        color: 'blue',
        marginTop: '-3px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    }
}
const Login = () => {
    const { alert, apiRequestFinished } = useSelector((state)=>state.steps);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    


    const handleLogin = ()=>{
        if(!email || !password){
            dispatch(setErrorAlert({ message: 'Please enter required fields!'}));
            return;
        }

        const isValidEmail = validator.isEmail(email);
        if(!isValidEmail){
            dispatch(setErrorAlert({ message: 'Please enter a valid email!'}));
            return;
        }

        dispatch(loginUser(email, password, navigate));

    }
    
    return (
        <>
        <Navbar/>
        <Box sx={style.container}>

            <Box sx={(theme)=>theme.stepsBoxStyle}>

                <StepsTitle icon='🚀' title='Log in to your account'/>

                <TextInput type='email' placeholder='Enter email' value={email} setValue={setEmail}/>
                <TextInput type='password' placeholder='Enter password' value={password} setValue={setPassword}/>
                <br/>

                <Button variant='contained' endIcon={apiRequestFinished && <LoginIcon />} sx={(theme)=>theme.btnStyle} style={ !apiRequestFinished ? { width: '95px' } : null } onClick={handleLogin} disabled={!apiRequestFinished}>
                    {
                        apiRequestFinished
                        ?
                        <>
                        Login
                        </>
                        :
                        <CircularProgress color='error' size={24}/>
                    }
                </Button>

                <Typography variant='body1' sx={style.newUser}>
                    New user? 
                    <Button variant="text" sx={style.registerBtn} onClick={()=> navigate('/register')}>Create account</Button>
                </Typography>

                <Button variant="text" sx={style.registerBtn} style={{marginLeft:'0px'}} onClick={()=> navigate('/forgotpassword')}>Forgot Password?</Button>

            </Box>

            { alert.showAlert && <CustormAlert/> }

        </Box>
        </>
    )
}

export default Login;