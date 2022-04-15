import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setUserRegistrationCompleted } from '../../redux/stepsSlice';



const style = {
    loader: {
        height: '200px',
        width: '200px'
    }
}
const StepActivation = () => {

    const userRegistrationCompleted = useSelector((state) => state.steps.userRegistrationCompleted);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    useEffect(()=>{

        if(userRegistrationCompleted){
            dispatch(setUserRegistrationCompleted(false));
        }

        if(!userRegistrationCompleted){
            dispatch(registerUser(navigate));
        }

    }, [navigate, dispatch, userRegistrationCompleted])


    return (
        <Box sx={(theme)=>theme.stepsBoxStyle}>

            <img style={style.loader} src='images/loader.gif' alt='loader'/>
                
            <Typography variant='h5' fontWeight='bold' mb='10px'>
                Activation in progress...
            </Typography>

        </Box>
        
    )
}

export default StepActivation;