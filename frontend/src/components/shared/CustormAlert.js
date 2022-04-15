import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSuccessAlert } from '../../redux/stepsSlice';

const CustormAlert = () => {

    const alert = useSelector((state)=>state.steps.alert);
    const dispatch = useDispatch();

    const closedAlertState = {
        showAlert: false,
        severity: '',
        message: ''
    };
    
    return (
        <Snackbar open={alert.showAlert} autoHideDuration={3000} onClose={()=>dispatch(setSuccessAlert(closedAlertState))}>
            <Alert onClose={()=>dispatch(setSuccessAlert(closedAlertState))} severity={alert.severity} sx={{ width: '100%' }} variant='filled'>
                { alert.message }
            </Alert>
        </Snackbar>
    )
}

export default CustormAlert;