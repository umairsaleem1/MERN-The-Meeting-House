import React from 'react';
import { Box, Dialog, Typography, Button, Avatar, Slide } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';




const style = {
    participantsDialog: {
        position: 'fixed',
        left: 'calc(100% - 350px)',
        top: '0px',
        width: '350px'
    },
    participants: {
        backgroundColor: 'background.secondary',
        height: '100%'
    },
    participantsHeader: {
        height: '60px',
        width: '100%',
        position: 'relative',
        padding: '0px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeBtn: {
        color: 'blue',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    muteAllBtn: {
        fontWeight: 'bold',
        color: 'text.primary',
        backgroundColor: 'placeholder',
        '&:hover': {
            backgroundColor: 'placeholder'
        }
    },
    participantsList: {
        width: '100%',
        height: 'calc(100% - 60px)',
        overflow: 'auto',
        borderTop: '1px solid #f2f2f217'
    },
    participant: {
        width: '100%',
        height: '55px',
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f2f2f217'
    },
    participantLeft: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        height: '39px',
        width: '39px',
        marginRight: '10px'
    },
    name: {
        color: 'text.primary',
        marginRight: '5px',
        fontWeight: 'bold',
        width: '110px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    role: {
        color: 'text.secondary'
    }
}
const TransitionComponent = React.forwardRef(function TransitionComponent(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const Participants = ( { openParticipantsDialog, setOpenParticipantsDialog } ) => {
    
    const playingAudio = true;
    const playingVideo = true;

    return (
        <Dialog
            open={openParticipantsDialog}
            TransitionComponent={TransitionComponent}
            keepMounted
            fullScreen={true}
            onClose={()=> setOpenParticipantsDialog(false)}
            sx={style.participantsDialog}
            BackdropProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                },
            }}
            PaperProps={{
                style: {
                    boxShadow: 'none',
                    backgroundImage: 'none',
                    backgroundColor: 'transparent'
                }
            }}   
        >
            <Box sx={style.participants}>
                <Box sx={style.participantsHeader}>
                    <Button sx={style.closeBtn} onClick={()=> setOpenParticipantsDialog(false)}>
                        Close
                    </Button>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                        Participants (1)
                    </Typography>
                    <Button  variant='contained' sx={style.muteAllBtn}>
                        Mute All
                    </Button>
                </Box>
                <Box sx={style.participantsList}>
                    <Box sx={style.participant}>
                        <Box sx={style.participantLeft}>
                            <Avatar alt='avatar' src='/images/monkey-avatar.png' sx={style.avatar}/>
                            <Typography variant='body1' sx={style.name}>
                                Umair Saleem
                            </Typography>
                            <Typography variant='body2' sx={style.role}>
                                (Host, me)
                            </Typography>
                        </Box>
                        <Box>
                            {
                                playingAudio
                                ?
                                <MicIcon style={{ marginRight: '10px' }}/>
                                :
                                <MicOffIcon style={{ marginRight: '10px', color: '#F44336' }}/>
                            }
                            {
                                playingVideo
                                ?
                                <VideocamIcon/>
                                :
                                <VideocamOffIcon style={{ color: '#F44336' }}/>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default Participants;