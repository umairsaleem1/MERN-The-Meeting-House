import { useState } from 'react';
import { Grid, Box, TextField, Typography, Button, IconButton, Modal, Backdrop, Fade, Avatar, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { createRoom } from '../../redux/roomsSlice';
import { useNavigate } from 'react-router-dom';




const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            md: 500,
            xs: '90%'
        },
        bgcolor: 'background.secondary',
        boxShadow: 24,
        p: {
            md: 4,
            xs: 2
        },
        borderRadius: '20px'
      },
      closeModalBtn: {
        color: 'text.primary',
        position: 'absolute',
        right: '5px',
        top: '5px',
        cursor: 'pointer'
      },
      topic: { 
        color: 'text.primary',
        fontWeight: 'bold',
        marginTop: '25px'
      },
      topicInput: {
        width: '100%',
        height: '45px',
        backgroundColor: '#262626',
        borderRadius: '10px',
        padding: '0px 20px',
        paddingTop: '5.7px',
        marginTop: '10px'
      },
      roomType: {
        padding: '5px 17px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '7px'
      },
      roomTypeImg: {
        height: '60px',
        width: '60px'
      },
      roomDesc: {
        textAlign: 'center',
        color: 'text.primary',
        fontWeight: 'bold',
        marginTop: '40px',
        marginBottom: '20px'
      }
}
const CreateRoomModal = ( { openModal, setOpenModal } ) => {

    const { socket } = useSelector((state)=>state.rooms);
    const [topic, setTopic] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('public');
    const [roomDesc, setRoomDesc] = useState('Start a room, open to everyone');
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handlePublicRoomTypeClick = ()=>{
        setSelectedRoomType('public');
        setRoomDesc('Start a room, open to everyone');
    }
    const handlePrivateRoomTypeClick = ()=>{
        setSelectedRoomType('private');
        setRoomDesc('Start a room, open to selected people');
    }


    const handleCreateRoom = ()=>{
        dispatch(createRoom({ topic, selectedRoomType }, setTopic, setSelectedRoomType, setShowLoader, setOpenModal, navigate, socket));
    }

    return (
        <Modal
            open={openModal}
            onClose={()=> setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={openModal}>

                <Box sx={style.modal}>

                    <IconButton sx={style.closeModalBtn} onClick={()=> setOpenModal(false)}>
                        <CloseIcon/>
                    </IconButton>

                    <Typography variant='h6' sx={style.topic}>
                        Enter the topic to be discussed
                    </Typography>

                    <TextField
                        sx={style.topicInput}
                        autoComplete='off'
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '1.2rem', color: '#C4C5C5' }
                        }}
                        variant="standard"
                        required
                        value={topic}
                        onChange={(e)=> setTopic(e.target.value)}
                    />

                    <Typography variant='h6' sx={style.topic} my={2}>
                        Room type
                    </Typography>

                    <Grid container justifyContent='space-evenly'>
                        <Box item>
                            <IconButton sx={style.roomType} style={ selectedRoomType==='public' ? { backgroundColor: '#262626' } : null } onClick={handlePublicRoomTypeClick}>
                                <Avatar alt='roomTypeImage' src='/images/globe.png' sx={style.roomTypeImg}/>
                                <Typography variant='body1' color='text.secondary'>
                                    Public
                                </Typography>
                            </IconButton>
                        </Box>
                        <Box item>
                            <IconButton sx={style.roomType} style={ selectedRoomType==='private' ? { backgroundColor: '#262626' } : null } onClick={handlePrivateRoomTypeClick}>
                                <Avatar alt='roomTypeImage' src='/images/lock.png' sx={style.roomTypeImg}/>
                                <Typography variant='body1' color='text.secondary'>
                                    Private
                                </Typography>
                            </IconButton>
                        </Box>
                    </Grid>

                    <Typography variant='body1' sx={style.roomDesc}>
                        { roomDesc }
                    </Typography> 

                    <Grid container justifyContent='center'>
                        <Button item variant='container' sx={(theme)=>theme.greenBtnStyle} style={ showLoader ? { width: '118px' } : null } disabled={showLoader} onClick={handleCreateRoom}>
                            {
                                showLoader
                                ?
                                <CircularProgress color='error' size={24}/>
                                :
                                <>
                                <img src='/images/celebration.png' alt='celebrationImage' /> 
                                &nbsp;Let's Go
                                </>
                            }
                        </Button>
                    </Grid>

                </Box>

            </Fade>

        </Modal>
    )
}

export default CreateRoomModal;