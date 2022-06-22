import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { STEPS, setStep } from '../../redux/stepsSlice';
import StepsTitle from '../shared/StepsTitle';



const style = {
    introText: {
        marginTop: {
            md: '30px',
            xs: '10px'
        },
        color: 'text.secondary',
        lineHeight: '30px',
        fontSize: {
            md: '20px',
            xs: '18px'
        }
    },
    alreadyRegistered: {
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
const StepLetsGo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Box sx={(theme)=>theme.stepsBoxStyle}>

            <StepsTitle icon='👋' title='Welcome to The Meeting House!'/>

            <Typography variant='h6' sx={style.introText}>
                We’re working hard to get The Meeting House ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks :)
            </Typography>

            <Button variant='contained' endIcon={<ArrowForwardIcon/>} sx={(theme)=>theme.btnStyle} onClick={()=> dispatch(setStep(STEPS.PHONEEMAIL))}>
                Let's go
            </Button>

            <Typography variant='body1' sx={style.alreadyRegistered}>
                Already registered? 
                <Button variant="text" sx={style.signInBtn} onClick={()=> navigate('/login')}>Sign in</Button>
            </Typography>

        </Box>
    )
}

export default StepLetsGo;