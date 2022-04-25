import { useState } from 'react';
import { Grid, Box, TextField, Typography, Button, IconButton, Modal, Backdrop, Fade, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.secondary',
        boxShadow: 24,
        p: 4,
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

    const [selectedRoomType, setSelectedRoomType] = useState('public');
    const [roomDesc, setRoomDesc] = useState('Start a room, open to everyone')


    const handlePublicRoomTypeClick = ()=>{
        setSelectedRoomType('public');
        setRoomDesc('Start a room, open to everyone');
    }
    const handlePrivateRoomTypeClick = ()=>{
        setSelectedRoomType('private');
        setRoomDesc('Start a room, open to selected people');
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
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '1.2rem', color: '#C4C5C5' }
                        }}
                        variant="standard"
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
                        <Button item variant='container' sx={(theme)=>theme.greenBtnStyle}>
                            <img src='/images/celebration.png' alt='celebrationImage' /> 
                            &nbsp;Let's Go
                        </Button>
                    </Grid>

                </Box>

            </Fade>

        </Modal>
    )
}

export default CreateRoomModal;