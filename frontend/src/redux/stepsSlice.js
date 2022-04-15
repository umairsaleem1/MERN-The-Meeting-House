import { createSlice } from '@reduxjs/toolkit';



export const STEPS = Object.freeze({
    LETSGO: 'letsgo',
    PHONEEMAIL: 'phoneEmail',
    OTP: 'otp',
    NAME: 'name',
    AVATAR: 'avatar',
    EMAIL: 'email',
    PASSWORD: 'password',
    ACTIVATION: 'activation'
})




const stepsSlice = createSlice({
    name: 'steps',
    initialState: {
        step: STEPS.LETSGO,
        otpDetails: {
            method: '',
            receiver: ''
        },
        userData: {
            phone: '',
            name: '',
            avatar: null,
            email: '',
            password: ''
        },
        alert: { showAlert: false, severity:'', message: '' },
        apiRequestFinished: true,
        userRegistrationCompleted: false
    },
    reducers: {
        setStep(state, action){
            state.step = action.payload;
        },
        setOtpDetails(state, action){
            state.otpDetails = action.payload;
        },
        setUserData(state, action){
            state.userData = {...state.userData, ...action.payload};
        },
        setErrorAlert(state, action){
            state.alert = { showAlert: true, severity: 'error', ...action.payload};
        },
        setSuccessAlert(state, action){
            state.alert = { showAlert: true, severity: 'success', ...action.payload};
        },
        setApiRequestFinished(state, action){
            state.apiRequestFinished = action.payload;
        },
        setUserRegistrationCompleted(state, action){
            state.userRegistrationCompleted = action.payload;
        }
    }
});


export const { setStep, setOtpDetails, setUserData, setErrorAlert, setSuccessAlert, setApiRequestFinished, setUserRegistrationCompleted } = stepsSlice.actions;
export default stepsSlice.reducer;








// Thunks



export function getOtp(method, receiver){

    return async function getOtpThunk(){
        try{
            const res = await fetch('/auth/sendOtp', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ method: method, receiver: receiver})
            });
    
            if(!res.ok){
                throw new Error(res.statusText);
            }
    
            await res.json();
    
        }catch(e){
            console.log(e);
        }
    }
}



export function verifyOtp(receiver, otp, setVerifying){

    return async function verifyOtpThunk(dispatch){

        setVerifying({ status: true, requestFinished: false });
        let errorMessage;
        try{
            const res = await fetch('/auth/verifyOtp', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({receiver, otp})
            });
    
            if(res.status===422){
                errorMessage = 'Code is incorrect!';
                throw new Error(res.statusText);
            }
            if(!res.ok){
                errorMessage = 'Oops! some problem occcurred';
                throw new Error(res.statusText)
            }
    
            await res.json();
    
            setVerifying({ status: false, requestFinished: true });
    
        }catch(e){
            setVerifying({ status: false, requestFinished: false });
            dispatch(setErrorAlert({ message: errorMessage}));
            console.log(e);
        }
    }
}



export function registerUser(navigate){

    return async function registerUserThunk(dispatch, getState){

        const { userData } = getState().steps;
        let errorMessage;
            try{
                let formData = new FormData();
                formData.append('phone', userData.phone);
                formData.append('name', userData.name);
                formData.append('avatar', userData.avatar);
                formData.append('email', userData.email);
                formData.append('password', userData.password);

                const res = await fetch('/auth/register', {
                    method: 'POST',
                    body: formData
                });


                if(res.status===400){
                    errorMessage = 'Please fill out the required fields!';
                    throw new Error(res.statusText);
                }
                else if(res.status===422){
                    errorMessage = 'User already exists the same email';
                    throw new Error(res.statusText);
                }
                else if(!res.ok){
                    errorMessage = 'Oops! some problem occurred';
                    throw new Error(res.statusText);
                }

                await res.json();

                dispatch(setUserRegistrationCompleted(true));
                dispatch(setOtpDetails({ method: '', receiver: '' }));
                dispatch(setUserData({ phone: '', name: '', avatar: null, email: '', password: '' }));
                dispatch(setStep(STEPS.LETSGO));
                navigate('/login');

            }catch(e){
                dispatch(setErrorAlert({ message: errorMessage }));
                console.log(e);
            }
    }
}








export function loginUser(email, password, navigate){

    return async function loginUserThunk(dispatch){

        dispatch(setApiRequestFinished(false));
        let errorMessage;
        try{
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password})
            })

            if(res.status===400){
                errorMessage = 'All fields are required!';
                throw new Error(res.statusText);
            }
            else if(res.status===401){
                errorMessage = 'Invalid credentials!';
                throw new Error(res.statusText);
            }
            else if(!res.ok){
                errorMessage = 'Oops! some problem occurred';
                throw new Error(res.statusText);
            }

            const data = await res.json();

            console.log(data);
            dispatch(setApiRequestFinished(true));
            navigate('/rooms');

            
        }catch(e){
            dispatch(setApiRequestFinished(true));
            dispatch(setErrorAlert({ message: errorMessage }));
            console.log(e);
        }
    }
}