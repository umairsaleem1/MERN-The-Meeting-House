import { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
// import ShareIcon from '@mui/icons-material/Share';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Grid, IconButton, Typography } from '@mui/material';
import Share from './Share';
import Participants from './Participants';
import Chat from './Chat';



const style = {
    roomFooter: {
        width: '100%',
        height: '100px',
        backgroundColor: 'background.secondary',
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        padding: '0px 400px'
    },
    iconBtn: {
        // padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    },
    iconBtnIcon: {
        fontSize: '35px'
    }
}
const RoomFooter = () => {

    const [playingAudio, setPlayingAudio] = useState(true);
    const [playingVideo, setPlayingVideo] = useState(true);
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openParticipantsDialog, setOpenParticipantsDialog] = useState(false);
    const [openChatDialog, setOpenChatDialog] = useState(false);

    return (
        <Grid container justifyContent='space-evenly' alignItems='center' sx={style.roomFooter}>
            
            <Grid item>
                <IconButton sx={style.iconBtn} style={{ width:'55px' }} onClick={()=> setPlayingAudio(!playingAudio)}>
                    {
                        playingAudio
                        ?
                        <MicIcon sx={style.iconBtnIcon}/>
                        :
                        <MicOffIcon sx={style.iconBtnIcon}/>
                    }
                    <Typography color='text.primary'>
                        {
                            playingAudio
                            ?
                            <>
                            Mute
                            </>
                            :
                            <>
                            Unmute
                            </>
                        }
                    </Typography>
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton sx={style.iconBtn} onClick={()=> setPlayingVideo(!playingVideo)}>
                    {
                        playingVideo
                        ?
                        <VideocamIcon sx={style.iconBtnIcon}/>
                        :
                        <VideocamOffIcon sx={style.iconBtnIcon}/>
                    }
                    <Typography color='text.primary'>
                        {
                            playingVideo
                            ?
                            <>
                            Stop video
                            </>
                            :
                            <>
                            Start video
                            </>
                        }
                    </Typography>
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton sx={style.iconBtn} color='success' onClick={()=> setOpenShareDialog(true)}>
                    <ScreenShareIcon sx={style.iconBtnIcon}/>
                    {/* <ShareIcon sx={style.iconBtnIcon}/> */}
                    <Typography>
                        Share
                    </Typography>
                </IconButton>
            </Grid>

            <Share openShareDialog={openShareDialog} setOpenShareDialog={setOpenShareDialog}/>

            <Grid item>
                <IconButton sx={style.iconBtn} onClick={()=> setOpenParticipantsDialog(true)}>
                    <GroupIcon sx={style.iconBtnIcon}/>
                    <Typography color='text.primary'>
                        Participants
                    </Typography>
                </IconButton>
            </Grid>

            <Participants openParticipantsDialog={openParticipantsDialog} setOpenParticipantsDialog={setOpenParticipantsDialog}/>

            <Grid item>
                <IconButton sx={style.iconBtn} onClick={()=> setOpenChatDialog(true)}>
                    <ChatBubbleIcon sx={style.iconBtnIcon}/>
                    <Typography color='text.primary'>
                        Chat
                    </Typography>
                </IconButton>
            </Grid>

            <Chat openChatDialog={openChatDialog} setOpenChatDialog={setOpenChatDialog}/>

        </Grid>
    )
}

export default RoomFooter;