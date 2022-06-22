import { useState, useEffect } from 'react';
import { Typography, Box, Avatar, Button, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import validator from 'validator';
import Navbar from '../components/shared/Navbar'; 
import TextInput from '../components/shared/TextInput';
import { useSocket } from "../utils/useSocket";




const style = {
    container: {
        height: {
            md: 'calc(100vh - 80px)',
            xs: 'calc(100vh - 60px)',
        },
        width: "100%",
        backgroundColor: "background.primary",
        marginTop: {
            md: '80px',
            xs: '60px',
        },
        overflow: "auto",
        padding: {
            xm: "0px 174px",
            md: '0px 70px',
            sm: '0px 40px',
            xs: '0px 15px'
          }
    },
    heading: {
        color: 'white',
        marginTop: '30px',
        borderBottom: '3px solid #0077FF',
        width: '90px',
        fontWeight: 'bold'
    },
    form: {
        height: 'auto',
        width: {
            md: '400px',
            sm: '100%'
        },
        margin: 'auto',
        marginTop: '50px'
    },
    avatarContainer: {
        height: '120px',
        width: '120px',
        borderRadius: '50%',
        margin: 'auto',
        position: 'relative',
        marginBottom: '50px'
    },
    avatar: {
        height: '100%',
        width: '100%',
        border: '3px solid #0077FF'
    },
    changeAvatarBtn: {
        position: 'absolute',
        right: '-6%',
        bottom: '10%',
        height: '40px',
        width: '40px',
        backgroundColor: 'danger',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        paddingTop: '4px'
    },
    cameraIcon: {
        color: 'white',
        fontSize: '25px'
    },
    loaderScreen: {
        height: "auto",
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        marginTop: '50px'
      },
    loaderImg: {
        height: "300px",
        width: "250px",
    }
}

const Input = styled('input')({
    display: 'none'
});
const Profile = () => {
    const { user } = useSelector((state)=>state.auth);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(undefined);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password , setPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [alert, setAlert] = useState({ showAlert: false, severity: '', message: '' });
    const dispatch = useDispatch();
    useSocket();





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


    const handleSubmit = async ()=>{
        setShowLoader(true);
        let errorMessage;
        try{
            const formData = new FormData();
            selectedFile && formData.append('avatar', selectedFile);
            (name.trim()!==user.name && name.length>2) && formData.append('name', name);
            (email.trim()!==user.email && validator.isEmail(email)) && formData.append('email', email);
            (phone.trim()!==user.phone && phone.trim()) && formData.append('phone', phone);
            (password.trim().length>=5) && formData.append('password', password);

            const isProfileUpdated = !formData.entries().next().done;
            if(!isProfileUpdated){
                return;
            }

            const res = await fetch('/auth/profile', {
                method: 'PUT',
                body: formData
            });

            if(res.status===401){
                errorMessage = 'User is not authenticated, please login first';
                throw new Error(res.statusText);
            }
            else if(res.status===400){
                errorMessage = 'No data found to update the profile';
                throw new Error(res.statusText);
            }
            else if(!res.ok){
                errorMessage = 'Oops! some problem occurred';
                throw new Error(res.statusText);
            }

            const data = await res.json();

            dispatch(setUser(data.updatedUser));
            setSelectedFile(null);
            setPreview(undefined);
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setShowLoader(false);
            setAlert({ showAlert: true, severity: 'success', message: 'Profile updated successfully'});

        }catch(e){
            console.log(e);
            setShowLoader(false);
            setAlert({ showAlet: true, severity: 'error', message: errorMessage });
        }
    }

    return (
        <>
            <Navbar/>
            <Box sx={style.container}>
                <Typography variant='h6' sx={style.heading}>Profile</Typography>
                {
                    user
                    ?
                    <Box sx={style.form}>
                        <Box sx={style.avatarContainer}>

                            <Avatar src={ preview || user.avatar || '/images/monkey-avatar.png'} alt={user.name} sx={style.avatar}/>
                            <Box sx={style.changeAvatarBtn}> 
                                <label htmlFor="avatar">
                                    <Input accept='image/*' id="avatar" type="file" onChange={onSelectingFile}/>
                                    <CameraAltIcon sx={style.cameraIcon}/>
                                </label>
                            </Box>
                        </Box>
                        <TextInput type='text' placeholder={user.name} value={name} setValue={setName} fromProfile={true}/>
                        <TextInput type='email' placeholder={user.email} value={email} setValue={setEmail} fromProfile={true}/>
                        <TextInput type='text' placeholder={user.phone} value={phone} setValue={setPhone} fromProfile={true}/>
                        <TextInput type='password' placeholder='New Password' value={password} setValue={setPassword} fromProfile={true}/>
                        <Grid container justifyContent='center'>
                            <Button 
                                variant='contained' 
                                sx={(theme)=>theme.btnStyle} 
                                style={{ marginTop: '30px', height: '38px', width: '100px' }} 
                                endIcon={!showLoader && <ArrowForwardIcon/>}
                                onClick={handleSubmit}
                                disabled={showLoader}
                            >
                                {
                                    showLoader
                                    ?
                                    <CircularProgress color='error' size={24}/>
                                    :
                                    <>
                                    Submit
                                    </>
                                }
                            </Button>
                        </Grid>
                    </Box>
                    :
                    <Box sx={style.loaderScreen}>
                        <img src="/images/loader.gif" alt="loader" style={style.loaderImg} />
                        <Typography variant="h5" color='white' fontSize='30px'>Please wait...</Typography>
                    </Box>
                }
            </Box>
            {
                alert.showAlert && <Snackbar open={alert.showAlert} autoHideDuration={3000} onClose={()=>setAlert({ showAlert: false, severity: '', message: '' })}>
                    <Alert onClose={()=>setAlert({ showAlert: false, severity: '', message: '' })} severity={alert.severity} sx={{ width: '100%' }} variant='filled'>
                        { alert.message }
                    </Alert>
                </Snackbar>
            }
        </>
    )
}

export default Profile;