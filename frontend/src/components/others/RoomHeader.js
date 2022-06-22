import React, { useState, useEffect } from "react";
import { Grid, IconButton, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenedRoom, setRemoteUsersStreams, setOpenedRoomParticipants, setRoomEndedForAll, resetMessages, setIsAllParticipantsMicMuted, resetAlert, deleteRoom, setReceivedFiles, setIsMsgNotificationMuted, setIsChatScreenOpened, setIsUnreadMessagesPresent } from "../../redux/roomsSlice";
import EndRoom from "./EndRoom";
import RoomDetails from "./RoomDetails";




const style = {
    container: {
        width: '100%',
        height: '60px',
        backgroundColor: 'background.secondary',
        padding: {
            md: '0px 100px',
            sm: '0px 50px',
            xs: '0px 15px'
        }
    },
    meetingDetailsBtn: {
        fontWeight: 'bold',
        color: 'text.primary',
        letterSpacing: '1px',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    },
    endBtn: {
        backgroundColor: 'danger',
        fontWeight: 'bold',
        color: 'text.primary',
        '&:hover': {
            backgroundColor: 'danger'
        }
    }
}
const RoomHeader = ( { roomId, peer }) => {
    
    const { rooms: { socket, openedRoom, roomEndedForAll }, auth: { user } } = useSelector((state)=> state);
    const [openMeetingDetailsDialog, setOpenMeetingDetailsDialog] = useState(false);
    const [openEndMeetingDialog, setOpenEndMeetingDialog] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();




    useEffect(()=>{

        if(roomEndedForAll){

            dispatch(setRoomEndedForAll(false));
           
            if(peer){
                peer.destroy(); 
            }
            socket.emit('leave room', roomId, user._id, user.name);
    
            dispatch(setOpenedRoom(null));
            dispatch(setOpenedRoomParticipants(null));
            dispatch(setRemoteUsersStreams([]));
            dispatch(resetMessages([]));
            dispatch(setIsAllParticipantsMicMuted(false));
            dispatch(resetAlert(''));
            dispatch(setReceivedFiles([]));
            dispatch(setIsMsgNotificationMuted(false));
            dispatch(setIsChatScreenOpened(false));
            dispatch(setIsUnreadMessagesPresent(false));
            navigate('/');
            window.location.reload();

        }

    }, [dispatch, roomEndedForAll, navigate, peer, roomId, socket, user._id, user.name])
    


    


    function leaveRoom(){
        if(peer){
            peer.destroy();
        }
        socket.emit('leave room', roomId, user._id, user.name);

        dispatch(setOpenedRoom(null));
        dispatch(setOpenedRoomParticipants(null));
        dispatch(setRemoteUsersStreams([]));
        dispatch(resetMessages([]));
        dispatch(setIsAllParticipantsMicMuted(false));
        dispatch(resetAlert(''));
        dispatch(setReceivedFiles([]));
        dispatch(setIsMsgNotificationMuted(false));
        dispatch(setIsChatScreenOpened(false));
        dispatch(setIsUnreadMessagesPresent(false));
        navigate('/');
        window.location.reload();
    }


    const endRoomForAll = ()=>{
        
        dispatch(deleteRoom(roomId));

        socket.emit('end room', roomId, user._id, user.name);
        leaveRoom();

    }

    const handleBackBtnClick = ()=>{
        if(openedRoom && peer){
            if(openedRoom.creator===user._id){
                endRoomForAll();
            }else{
                leaveRoom();
            }
        }else{
            navigate('/');
        }
    }

    return (
        <Grid container alignItems='center' justifyContent='space-between' sx={style.container}>
            
            <Grid item>
                <IconButton onClick={handleBackBtnClick}>
                    <ArrowBackIcon/>
                </IconButton>
            </Grid>

            <Grid item>
                <Button endIcon={<KeyboardArrowDownIcon/>} sx={style.meetingDetailsBtn} onClick={()=> setOpenMeetingDetailsDialog(true)}>
                    Room details
                </Button>
            </Grid>

            <RoomDetails openMeetingDetailsDialog={openMeetingDetailsDialog} setOpenMeetingDetailsDialog={setOpenMeetingDetailsDialog} roomId={roomId}/>

            <Grid item>
                <Button sx={style.endBtn} onClick={()=> setOpenEndMeetingDialog(true)}>
                    End
                </Button>
            </Grid>
            
            <EndRoom openEndMeetingDialog={openEndMeetingDialog} setOpenEndMeetingDialog={setOpenEndMeetingDialog} leaveRoom={leaveRoom} endRoomForAll={endRoomForAll} user={user} openedRoom={openedRoom}/>

        </Grid>
    )
}

export default RoomHeader;