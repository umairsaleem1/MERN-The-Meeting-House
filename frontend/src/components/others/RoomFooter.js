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
import { useSelector, useDispatch } from 'react-redux';
import { toggleMyMic, toggleMyVideo } from '../../redux/roomsSlice';
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
const RoomFooter = ( { roomId, userId, myStream, socket } ) => {

    const { openedRoom, openedRoomParticipants, isAllParticipantsMicMuted } = useSelector((state)=>state.rooms);
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openParticipantsDialog, setOpenParticipantsDialog] = useState(false);
    const [openChatDialog, setOpenChatDialog] = useState(false);
    const [isSharingScreen, setIsSharingScreen] = useState(false);
    const dispatch = useDispatch();




    const muteAudio = ()=>{
        if(!isAllParticipantsMicMuted || openedRoom.creator===userId){
            if(myStream && myStream.getAudioTracks().length>0){
                myStream.getAudioTracks()[0].enabled = false;
                dispatch(toggleMyMic({ userId: userId, value: true }));

                socket.emit('toggleMic', roomId, userId, true);
            }
        }
    }

    const unMuteAudio = ()=>{
        if(!isAllParticipantsMicMuted || openedRoom.creator===userId){
            if(myStream && myStream.getAudioTracks().length>0){
                myStream.getAudioTracks()[0].enabled = true;
                dispatch(toggleMyMic({ userId: userId, value: false }));

                socket.emit('toggleMic', roomId, userId, false);
            }
        }
    }

    const stopVideo = ()=>{
        if(myStream && myStream.getVideoTracks().length>0){
            myStream.getVideoTracks()[0].enabled = false;
            dispatch(toggleMyVideo({ userId: userId, value: true }));

            socket.emit('toggleVideo', roomId, userId, true);
        }
    }

    const startVideo = ()=>{
        if(myStream && myStream.getVideoTracks().length>0){
            myStream.getVideoTracks()[0].enabled = true;
            dispatch(toggleMyVideo({ userId: userId, value: false }));

            socket.emit('toggleVideo', roomId, userId, false);
        }
    }



    const startScreenSharing = ()=>{
    }



    const stopScreenSharing = ()=>{

    }




    return (
        <Grid container justifyContent='space-evenly' alignItems='center' sx={style.roomFooter}>
            
            <Grid item>
                {
                    openedRoomParticipants && (openedRoomParticipants[userId].isMicMuted || openedRoomParticipants[userId].isMyMicMutedByRoomCreator)
                    ?
                    <IconButton sx={style.iconBtn} style={{ width:'55px' }} onClick={unMuteAudio}>
                        <MicOffIcon sx={style.iconBtnIcon}/>
                        <Typography color='text.primary'>Unmute</Typography>
                    </IconButton>
                    :
                    <IconButton sx={style.iconBtn} style={{ width:'55px' }} onClick={muteAudio}>
                        <MicIcon sx={style.iconBtnIcon}/>
                        <Typography color='text.primary'>Mute</Typography>
                    </IconButton>
                }
            </Grid>

            <Grid item>
                {
                    openedRoomParticipants && openedRoomParticipants[userId].isVideoOff
                    ?
                    <IconButton sx={style.iconBtn} onClick={startVideo}>   
                        <VideocamOffIcon sx={style.iconBtnIcon}/>   
                        <Typography color='text.primary'>Start video</Typography>
                    </IconButton>
                    :
                    <IconButton sx={style.iconBtn} onClick={stopVideo}>    
                        <VideocamIcon sx={style.iconBtnIcon}/>
                        <Typography color='text.primary'>Stop video</Typography>
                    </IconButton>
                }
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

            <Share openShareDialog={openShareDialog} setOpenShareDialog={setOpenShareDialog} startScreenSharing={startScreenSharing} stopScreenSharing={stopScreenSharing} isSharingScreen={isSharingScreen}/>

            <Grid item>
                <IconButton sx={style.iconBtn} onClick={()=> setOpenParticipantsDialog(true)}>
                    <GroupIcon sx={style.iconBtnIcon}/>
                    <Typography color='text.primary'>
                        Participants
                    </Typography>
                </IconButton>
            </Grid>

            <Participants openParticipantsDialog={openParticipantsDialog} setOpenParticipantsDialog={setOpenParticipantsDialog} roomId={roomId}/>

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