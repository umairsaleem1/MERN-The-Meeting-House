import React from 'react';
import { Box, Dialog, Typography, Button, Avatar, Slide } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAllParticipantsMicMuted } from '../../redux/roomsSlice';




const style = {
    participantsDialog: {
        position: 'fixed',
        left: {
            sm: 'calc(100% - 350px)',
            xs: '0px'
        },
        top: '0px',
        width: {
            sm: '350px',
            xs: '100%'
        }
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
        padding: '8px 15px',
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
const Participants = ( { openParticipantsDialog, setOpenParticipantsDialog, roomId } ) => {

    const { rooms: { socket, openedRoom, openedRoomParticipants, remoteUsersStreams, isAllParticipantsMicMuted }, auth: { user } } = useSelector((state)=>state);
    const dispatch = useDispatch();
    
    const colors = ['#0077FF', '#20BD5F', '#F44336', '#E91E63', '#5453E0', 'yellow'];




    
    
    const muteAll = ()=>{
        dispatch(setIsAllParticipantsMicMuted(true));
        socket.emit('toggleGuestsMic', roomId, true);
    }

    const unMuteAll = ()=>{
        dispatch(setIsAllParticipantsMicMuted(false));
        socket.emit('toggleGuestsMic', roomId, false);
    }


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
                        {
                            openedRoomParticipants
                            ?
                            `Participants (${Object.keys(openedRoomParticipants).length})`
                            :
                            ''
                        }
                    </Typography>
                    {
                        (openedRoom && user) && <Box>
                            {
                                openedRoom.creator===user._id
                                ?
                                    isAllParticipantsMicMuted
                                    ?
                                    <Button  variant='contained' sx={style.muteAllBtn} onClick={unMuteAll}>
                                        Unmute All
                                    </Button>
                                    :
                                    <Button  variant='contained' sx={style.muteAllBtn} onClick={muteAll}>
                                        Mute All
                                    </Button>
                                :
                                <Button  variant='contained' sx={style.muteAllBtn} style={{ opacity: 0, cursor: 'default' }}>
                                    Mute All
                                </Button>
                            }
                        </Box>
                    }
                </Box>
                <Box sx={style.participantsList}>
                    {
                        openedRoom && openedRoomParticipants && openedRoomParticipants[openedRoom.creator]
                        ?
                        <Box sx={style.participant} key={openedRoom.creator}>
                            <Box sx={style.participantLeft}>
                                <Avatar 
                                    alt={openedRoomParticipants[openedRoom.creator].name} 
                                    src={openedRoomParticipants[openedRoom.creator].avatar || '/images/monkey-avatar.png'} 
                                    sx={style.avatar}
                                    style={{ border: `2px solid ${colors[Math.floor(Math.random() * 6)]}` }}
                                />
                                <Typography variant='body1' sx={style.name}>
                                    {openedRoomParticipants[openedRoom.creator].name}
                                </Typography>
                                <Typography variant='body2' sx={style.role}>
                                    {
                                        openedRoom.creator===user._id
                                        ?
                                        '(Host, me)'
                                        :
                                        '(Host)'
                                    }
                                </Typography>
                            </Box>
                            <Box>
                                {
                                    openedRoomParticipants[openedRoom.creator].isMicMuted
                                    ?
                                    <MicOffIcon style={{ marginRight: '10px', color: '#F44336' }}/>
                                    :
                                    <MicIcon style={{ marginRight: '10px' }}/>
                                }
                                {
                                    openedRoomParticipants[openedRoom.creator].isVideoOff
                                    ?
                                    <VideocamOffIcon style={{ color: '#F44336' }}/>
                                    :
                                    <VideocamIcon/>
                                }
                            </Box>
                        </Box>
                        :
                        null
                    }
                    {
                        openedRoom && openedRoomParticipants && openedRoomParticipants[user._id] && user._id!==openedRoom.creator
                        ?
                        <Box sx={style.participant} key={user._id}>
                            <Box sx={style.participantLeft}>
                                <Avatar 
                                    alt={openedRoomParticipants[user._id].name} 
                                    src={openedRoomParticipants[user._id].avatar || '/images/monkey-avatar.png'} 
                                    sx={style.avatar}
                                    style={{ border: `2px solid ${colors[Math.floor(Math.random() * 6)]}` }}
                                />
                                <Typography variant='body1' sx={style.name}>
                                    {openedRoomParticipants[user._id].name}
                                </Typography>
                                <Typography variant='body2' sx={style.role}>
                                    (me)
                                </Typography>
                            </Box>
                            <Box>
                                {
                                    openedRoomParticipants[user._id].isMicMuted || openedRoomParticipants[user._id].isMyMicMutedByRoomCreator
                                    ?
                                    <MicOffIcon style={{ marginRight: '10px', color: '#F44336' }}/>
                                    :
                                    <MicIcon style={{ marginRight: '10px' }}/>
                                }
                                {
                                    openedRoomParticipants[user._id].isVideoOff
                                    ?
                                    <VideocamOffIcon style={{ color: '#F44336' }}/>
                                    :
                                    <VideocamIcon/>
                                }
                            </Box>
                        </Box>
                        :
                        null
                    }
                    {
                        remoteUsersStreams.length
                        ?
                        remoteUsersStreams.map(( { peerId } )=>{
                            return(
                                openedRoom && openedRoomParticipants && openedRoomParticipants[peerId] && (peerId!==openedRoom.creator && peerId!==user._id)
                                ?
                                <Box sx={style.participant} key={peerId}>
                                    <Box sx={style.participantLeft}>
                                        <Avatar 
                                            alt={openedRoomParticipants[peerId].name} 
                                            src={openedRoomParticipants[peerId].avatar || '/images/monkey-avatar.png'} 
                                            sx={style.avatar}
                                            style={{ border: `2px solid ${colors[Math.floor(Math.random() * 6)]}` }}
                                        />
                                        <Typography variant='body1' sx={style.name}>
                                            {openedRoomParticipants[peerId].name}
                                        </Typography>
                                        <Typography variant='body2' sx={style.role}>
                                            {
                                                peerId===user._id
                                                ?
                                                '(me)'
                                                :
                                                ''
                                            }
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {
                                            openedRoomParticipants[peerId].isMicMuted || openedRoomParticipants[peerId].isMyMicMutedByRoomCreator
                                            ?
                                            <MicOffIcon style={{ marginRight: '10px', color: '#F44336' }}/>
                                            :
                                            <MicIcon style={{ marginRight: '10px' }}/>
                                        }
                                        {
                                            openedRoomParticipants[peerId].isVideoOff
                                            ?
                                            <VideocamOffIcon style={{ color: '#F44336' }}/>
                                            :
                                            <VideocamIcon/>
                                        }
                                    </Box>
                                </Box>
                                :
                                null
                            )
                        })
                        
                        :
                        null
                    }
                </Box>
            </Box>
        </Dialog>
    )
}

export default Participants;