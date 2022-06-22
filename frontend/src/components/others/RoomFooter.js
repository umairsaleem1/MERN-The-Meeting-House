import { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import ShareIcon from '@mui/icons-material/Share';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Grid, IconButton, Typography, Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMyMic, toggleMyVideo, setErrorAlert, setIsChatScreenOpened } from '../../redux/roomsSlice';
import Share from './Share';
import Participants from './Participants';
import Chat from './Chat';



const style = {
    roomFooter: {
        width: '100%',
        height: {
            sm: '100px',
            xs: '70px'
        },
        backgroundColor: 'background.secondary',
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        padding: {
            lg: '0px 400px',
            xm: '0px 200px',
            md: '0px 100px'
        }
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
        fontSize: {
            sm: '35px',
            xs: '25px'
        }
    },
    iconBtnText: {
        fontSize: {
            sm: '16px',
            xs: '14px'
        }
    }
}
const RoomFooter = ( { roomId, userId, myStream, socket, peer, calls } ) => {

    const { openedRoom, openedRoomParticipants, isAllParticipantsMicMuted, isUnreadMessagesPresent } = useSelector((state)=>state.rooms);
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
        if(isSharingScreen){
            stopScreenSharing();
        }
        navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
        .then((screenStream)=>{
            const videoTrack = screenStream.getVideoTracks()[0];
            videoTrack.onended = ()=>{
                stopScreenSharing();
            }
            if(peer){
                calls.forEach((call)=>{
                    const sender = call.peerConnection.getSenders().find((s)=>{
                        return s.track.kind === videoTrack.kind;
                    })

                    sender.replaceTrack(videoTrack);
                })
            }
            setIsSharingScreen(true);
            setOpenShareDialog(false);
        })
        .catch((e)=>{
            console.log(e);
            dispatch(setErrorAlert('Cannot get local microphone or camera'));
        })
    }



    function stopScreenSharing(){
        const videoTrack = myStream.getVideoTracks()[0];
        if (peer) {
            calls.forEach((call)=>{
                const sender = call.peerConnection.getSenders().find(function (s) {
                    return s.track.kind === videoTrack.kind;
                })
                sender.replaceTrack(videoTrack)
            })
            
            
        }

        setIsSharingScreen(false);
        setOpenShareDialog(false);
    }




    return (
        <Grid container justifyContent='space-evenly' alignItems='center' sx={style.roomFooter}>
            
            <Grid item>
                {
                    openedRoomParticipants && (openedRoomParticipants[userId].isMicMuted || openedRoomParticipants[userId].isMyMicMutedByRoomCreator)
                    ?
                    <IconButton sx={style.iconBtn} style={{ width:'55px' }} onClick={unMuteAudio}>
                        <MicOffIcon sx={style.iconBtnIcon}/>
                        <Typography color='text.primary' sx={style.iconBtnText}>Unmute</Typography>
                    </IconButton>
                    :
                    <IconButton sx={style.iconBtn} style={{ width:'55px' }} onClick={muteAudio}>
                        <MicIcon sx={style.iconBtnIcon}/>
                        <Typography color='text.primary' sx={style.iconBtnText}>Mute</Typography>
                    </IconButton>
                }
            </Grid>

            <Grid item>
                {
                    openedRoomParticipants && openedRoomParticipants[userId].isVideoOff
                    ?
                    <IconButton sx={style.iconBtn} onClick={startVideo}>   
                        <VideocamOffIcon sx={style.iconBtnIcon}/>   
                        <Typography color='text.primary' sx={style.iconBtnText}>Start video</Typography>
                    </IconButton>
                    :
                    <IconButton sx={style.iconBtn} onClick={stopVideo}>    
                        <VideocamIcon sx={style.iconBtnIcon}/>
                        <Typography color='text.primary' sx={style.iconBtnText}>Stop video</Typography>
                    </IconButton>
                }
            </Grid>

            <Grid item>
                <IconButton sx={style.iconBtn} color='success' onClick={()=> setOpenShareDialog(true)}>
                    <ShareIcon sx={style.iconBtnIcon}/>
                    <Typography sx={style.iconBtnText}>
                        Share
                    </Typography>
                </IconButton>
            </Grid>

            <Share openShareDialog={openShareDialog} setOpenShareDialog={setOpenShareDialog} startScreenSharing={startScreenSharing} stopScreenSharing={stopScreenSharing} isSharingScreen={isSharingScreen} socket={socket}/>

            <Grid item>
                <IconButton sx={style.iconBtn} onClick={()=> setOpenParticipantsDialog(true)}>
                    {
                        openedRoomParticipants
                        ?
                        <Badge badgeContent={Object.keys(openedRoomParticipants).length} color="success">
                            <GroupIcon sx={style.iconBtnIcon}/>
                        </Badge>
                        :
                        <GroupIcon sx={style.iconBtnIcon}/>
                    }
                    <Typography color='text.primary' sx={style.iconBtnText}>
                        Participants
                    </Typography>
                </IconButton>
            </Grid>

            <Participants openParticipantsDialog={openParticipantsDialog} setOpenParticipantsDialog={setOpenParticipantsDialog} roomId={roomId}/>

            <Grid item>
                <IconButton sx={style.iconBtn} onClick={()=> {
                    setOpenChatDialog(true)
                    dispatch(setIsChatScreenOpened(true))
                }}>
                    {
                        isUnreadMessagesPresent
                        ?
                        <Badge color="success" variant="dot">
                            <ChatBubbleIcon sx={style.iconBtnIcon}/>
                        </Badge>
                        :
                        <ChatBubbleIcon sx={style.iconBtnIcon}/>
                    }
                    <Typography color='text.primary' sx={style.iconBtnText}>
                        Chat
                    </Typography>
                </IconButton>
            </Grid>

            <Chat openChatDialog={openChatDialog} setOpenChatDialog={setOpenChatDialog}/>

        </Grid>
    )
}

export default RoomFooter;