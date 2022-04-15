import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { STEPS, setStep, setUserData } from '../../redux/stepsSlice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StepsTitle from '../shared/StepsTitle';



const style = {
    profileAvatar: {
        height: '120px',
        width: '120px',
        padding: '5px',
        border:'5px solid #0077FF',
        margin: 'auto',
        marginBottom: '15px'
    },
    fileInputBtn: {
        color: 'blue',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    }
}


const Input = styled('input')({
    display: 'none',
});

const StepAvatar = () => {

    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile ] = useState();
    const [preview, setPreview] = useState();






    // create a preview(set url of selected file) , whenever selected file is changed
    useEffect(()=>{
        if(!selectedFile){
            setPreview(undefined);
            return;
        }

        // generating the url of the selected file
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return ()=>{
            URL.revokeObjectURL(objectUrl);
        }

    }, [selectedFile, setPreview])



    const onSelectingFile = (e)=>{
        if(!e.target.files || e.target.files.length===0){
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    }

    
    const handleNextClick = ()=>{
        if(selectedFile){
            dispatch(setUserData({ avatar: selectedFile}));
        }
        dispatch(setStep(STEPS.EMAIL));
    }
    
    return (
        <Box sx={(theme)=>theme.stepsBoxStyle}>

            <StepsTitle icon='🙉' title='Okay, Faheem Hassan!'/>

            <Typography variant='body1' mt='15px' color='text.secondary' mb='20px'>
                How's this photo?
            </Typography>

            <Avatar alt="profileAvatar" src={ preview || "/images/monkey-avatar.png" }sx={style.profileAvatar} />

            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={onSelectingFile}/>
                <Button component="span" sx={style.fileInputBtn}>
                    Choose a different photo
                </Button>
            </label>
            <br/>

            <Button variant='contained' endIcon={<ArrowForwardIcon/>} sx={(theme)=>theme.btnStyle} onClick={handleNextClick}>Next</Button>
        
        </Box>
    )
}

export default StepAvatar;