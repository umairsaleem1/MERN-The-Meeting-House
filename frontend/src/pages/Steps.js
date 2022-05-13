import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { STEPS } from '../redux/stepsSlice';
import StepLetsGo from '../components/steps/StepLetsGo';
import StepPhoneEmail from '../components/steps/StepPhoneEmail';
import StepOtp from '../components/steps/StepOtp';
import StepName from '../components/steps/StepName';
import StepAvatar from '../components/steps/StepAvatar';
import StepEmail from '../components/steps/StepEmail';
import StepPassword from '../components/steps/StepPassword';
import StepActivation from '../components/steps/StepActivation';
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
const Setps = () => {
  const { step, alert } = useSelector((state)=> state.steps);


  return (
    <>
    <Navbar/>
    <Box sx={style.container}>
        { step===STEPS.LETSGO && <StepLetsGo/> }
        { step===STEPS.PHONEEMAIL && <StepPhoneEmail/> }
        { step===STEPS.OTP && <StepOtp/> }
        { step===STEPS.NAME && <StepName/> }
        { step===STEPS.AVATAR && <StepAvatar/> }
        { step===STEPS.EMAIL && <StepEmail/> }
        { step===STEPS.PASSWORD && <StepPassword/> }
        { step===STEPS.ACTIVATION && <StepActivation/> }

        { alert.showAlert && <CustormAlert/> }
        
    </Box>
    </>
  )
}

export default Setps;
