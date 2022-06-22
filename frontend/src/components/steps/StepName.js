import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { STEPS, setStep, setUserData, setErrorAlert } from '../../redux/stepsSlice';
import TextInput from '../shared/TextInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepsTitle from '../shared/StepsTitle';



const StepName = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');




    const handleNextClick = ()=>{
        if(!name.trim()){
            dispatch(setErrorAlert({ message: 'Please enter your name'}));
            return;
        }
        if(name.length<=2){
            dispatch(setErrorAlert({ message: 'Name must be of minimum 3 characters'}));
            return;
        }

        dispatch(setUserData({name:name}));
        dispatch(setStep(STEPS.AVATAR));
    }

    return (
        <Box sx={(theme)=>theme.stepsBoxStyle}>

            <StepsTitle icon='🤓' title="What's your full name?"/>

            <TextInput type='text' placeholder='' value={name} setValue={setName}/>

            <Typography variant='body1' mt='15px' color='text.secondary'>
                People use real names at The Meeting House :)
            </Typography>

            <Button variant='contained' endIcon={<ArrowForwardIcon/>} sx={(theme)=>theme.btnStyle} onClick={handleNextClick}>Next</Button>

        </Box>
    )
}

export default StepName;