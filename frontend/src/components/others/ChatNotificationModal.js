import { Box, Typography, Modal, Backdrop, Fade, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setIsMsgNotificationMuted } from '../../redux/roomsSlice';




const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 330,
        bgcolor: 'background.secondary',
        boxShadow: 24,
        borderRadius: '20px'
    },
    textInfo: {
        p: 3
    },
    heading: { 
        color: 'text.primary',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        color: 'text.primary',
        marginTop: '15px',
        fontSize: '16px',
        textAlign: 'center'
    },
    btns: {
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: '1px solid #f2f2f217'
    },
    btn: {
        width: '50%',
        height: '100%',
        color: 'blue',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'transparent'
        }
        
    }
}

const ChatNotificationModal = ( { openChatNotificationModal, setOpenChatNotificationModal } ) => {

    const { isMsgNotificationMuted } = useSelector((state)=>state.rooms);
    const dispatch = useDispatch();


    const handleMuteAndUnmuteBtnClick = ()=>{
        setOpenChatNotificationModal(false);
        dispatch(setIsMsgNotificationMuted(!isMsgNotificationMuted));
    }
    
    return (
        <Modal
            open={openChatNotificationModal}
            onClose={()=> setOpenChatNotificationModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={openChatNotificationModal}>

                <Box sx={style.modal}>

                    <Box sx={style.textInfo}>
                        <Typography variant='h6' sx={style.heading}>
                            {
                                isMsgNotificationMuted
                                ?
                                <>
                                Unmute Notification
                                </>
                                :
                                <>
                                Mute Notification
                                </>
                            }
                        </Typography>

                        <Typography variant='body2' sx={style.text}>
                            {
                                isMsgNotificationMuted
                                ?
                                <>
                                You will now see chat preview notifications in this session.
                                </>
                                :
                                <>
                                You will not see any chat notifications in this session.
                                </>
                            }
                        </Typography>
                    </Box>
                    
                    <Box sx={style.btns}>
                        <Button sx={style.btn} style={{ borderRight: '1px solid #f2f2f217', color: 'white' }} onClick={()=> setOpenChatNotificationModal(false)}>
                            Cancel
                        </Button>
                        <Button sx={style.btn} onClick={handleMuteAndUnmuteBtnClick}>
                            {
                                isMsgNotificationMuted
                                ?
                                <>
                                Unmute
                                </>
                                :
                                <>
                                Mute
                                </>
                            }
                        </Button>
                    </Box>

                </Box>

            </Fade>

        </Modal>
    )
}

export default ChatNotificationModal;