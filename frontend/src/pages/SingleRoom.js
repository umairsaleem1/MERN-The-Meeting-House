import { useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography, Snackbar, Alert, Fab, IconButton } from '@mui/material';
import Peer from 'peerjs';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleRoom, setOpenedRoomParticipants, appendStreamToRemoteUsersStreams, setIsMyMicMutedByRoomCreator, setIsAllParticipantsMicMuted, resetAlert, setErrorAlert, removeFileFromReceivedFiles } from '../redux/roomsSlice';
import { getUser } from '../redux/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import { saveAs } from 'file-saver'
import RoomFooter from '../components/others/RoomFooter';
import RoomHeader from '../components/others/RoomHeader';
import GuestVideo from '../components/others/GuestVideo';
import { useSocket } from '../utils/useSocket';
import 'swiper/css';
import 'swiper/css/pagination';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';




const style = {
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: 'background.primary'
    },
    swiperContainer: {
        width: '100%',
        height: {
            sm: 'calc(100vh - 160px)',
            xs: 'calc(100vh - 130px)'
        }
    },
    swiper: {
        width: '100%',
        height: '100%'
    },
    myVideoContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '70px 0px',
    },
    media: {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    name: {
        position: 'absolute',
        left: '30px',
        bottom: '20px',
        color: 'text.primary',
        fontSize: {
            md: '23px',
            sm: '20px',
            xs: '18px'
        },
        zIndex: -900
    },
    guestsContainer: {
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: '30px',
        justifyContent: {
            sm: 'flex-start',
            xs: 'space-around'
        }
    },
    guest: {
        width: '280px',
        height: '350px',
        border: '2px solid #20BD5F',
        borderRadius: '7px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginRight: '10px',
        marginBottom: '30px',
        cursor: 'pointer'
    },
    guestMedia: {
        height: 'auto',
        width: 'auto',
        maxHeight: '100%',
        maxWidth: '100%'
    },
    guestName: {
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        color: 'text.primary',
        backgroundColor: 'background.primary',
        padding: '0px 5px',
        borderRadius: '10px',
        fontSize: '15px',
        maxWidth: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    expandedGuestContainer: {
        zIndex: 10,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '70px 0px'
    },
    expandedVideoBackBtn: {
        position: 'absolute',
        left: '30px',
        top: '20px'
    },
    receivedFiles: {
        height: 'auto',
        maxHeight: '300px',
        width: '300px',
        overflow: 'auto',
        position: 'absolute',
        top: '60px',
        right: '0px'
    },
    receivedFile: {
        width: '100%',
        height: '50px',
        backgroundColor: 'white',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
        marginBottom: '10px'
    },
    receivedFileName: {
        maxWidth: '150px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    receivedFileDownloadBtn: {
        height: '40px',
        width: '40px',
        cursor: 'pointer',
        backgroundColor: 'blue',
        color: 'white',
        marginLeft: '10px',
        '&:hover': {
            backgroundColor: 'blue',
            color: 'white'
        }
    },
    receivedFileCrossBtn: {
        height: '30px',
        width: '30px',
        cursor: 'pointer',
        color: 'black',
        backgroundColor: 'white',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black'
        }
    }
}

export let peer = null;

const SingleRoom = () => { 

    const { rooms: { socket, openedRoom, openedRoomParticipants, remoteUsersStreams, receivedFiles, alert }, auth: { user } } = useSelector((state)=> state);
    const [myStream, setMyStream] = useState(null);
    const [calls, setCalls] = useState([]);      // it contains all the calls received by this(current) user
    const [isGuestVideoExpanded, setIsGuestVideoExpanded] = useState(false);
    const [expandedGuestData, setExpandedGuestData] = useState(null);
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myVideoRef = useRef();
    useSocket();

    
    

    


    useEffect(()=>{

        if(!user){
            dispatch(getUser(navigate));
        }
    
    }, [dispatch, navigate, user])


    useEffect(()=>{

        if(roomId){
            dispatch(getSingleRoom(roomId, navigate));
        }
        
    }, [roomId, navigate, dispatch])


    useEffect(()=>{
        if(socket && openedRoom && user){

            navigator.mediaDevices.getUserMedia({ audio: true, video: true})
            .then((myStream)=>{
                if('srcObject' in myVideoRef.current){
                    myVideoRef.current.srcObject = myStream;
                }else{
                    myVideoRef.current.src = window.URL.createObjectURL(myStream)
                }
                myVideoRef.current.play();
                setMyStream(myStream);






                peer = new Peer(user._id);
                

                peer.on('open', ()=>{

                    socket.emit('join room', roomId, user._id, user.avatar, user.name);

                    socket.on('roomParticipants', (roomParticipants)=>{
                        
                        dispatch(setOpenedRoomParticipants(roomParticipants));

                       
                        const currentRoomParticipants = {...roomParticipants };
                        delete currentRoomParticipants[user._id];
                    
                        const remotePeersIds = Object.keys(currentRoomParticipants);
                        [
                            ...new Map(remotePeersIds.map((item)=>[item, item])).values()
                        ].forEach((remotePeerId)=>{

                            const mediaConnection = peer.call(remotePeerId, myStream);

                            let id;
                            mediaConnection.on('stream', (remoteUserStream)=>{
                                if(id!==remoteUserStream.id){
                                    id = remoteUserStream.id;
                                    dispatch(appendStreamToRemoteUsersStreams({ peerId: mediaConnection.peer, stream: remoteUserStream }));
                                }
                            });

                            mediaConnection.on('error', (err)=>{
                                console.log(err);
                                dispatch(setErrorAlert('Connection failure!'));
                            })


                            setCalls((prevCalls)=>{
                                return [...prevCalls, mediaConnection]
                            })

                        });
                        
                    })


                    socket.on('toggleGuestMic', (roomId, value)=>{
                        myStream.getAudioTracks()[0].enabled = Boolean(!value);
                        dispatch(setIsMyMicMutedByRoomCreator({ userId: user._id, value: Boolean(value) }));
                        dispatch(setIsAllParticipantsMicMuted(Boolean(value)));

                        socket.emit('micUpdate', roomId, user._id, value);
                    });


    
    
                    peer.on('call', (mediaConnection)=>{

                        mediaConnection.answer(myStream);
    
                        let id;
                        mediaConnection.on('stream', (remoteUserStream)=>{
                            if(id!==remoteUserStream.id){
                                id = remoteUserStream.id;
                                dispatch(appendStreamToRemoteUsersStreams({ peerId: mediaConnection.peer, stream: remoteUserStream }));
                            }
                        });

                        setCalls((prevCalls)=>{
                            return [...prevCalls, mediaConnection]
                        });
                        
                    }) 

                    
                    peer.on('error', (err)=>{
                        console.log(err);
                        dispatch(setErrorAlert('Connection failure!'));
                    })


                })  

            })
            .catch((e)=>{
                console.log(e);
                dispatch(setErrorAlert('Cannot get local microphone or camera'));
            })

        }
  
    }, [socket, roomId, openedRoom, dispatch, user])

    

    const downloadFile = (file)=>{
        saveAs(file.file, file.name);
        dispatch(removeFileFromReceivedFiles(file.cloudinaryId));
    }

    const expandGuestVideo = (peerId, stream)=>{
        setExpandedGuestData({ peerId, stream });
        setIsGuestVideoExpanded(true);
    }

    const shrinkGuestVideo = ()=>{
        setExpandedGuestData(null);
        setIsGuestVideoExpanded(false);
    }


    return (
        user &&
        <>
            <Box sx={style.container}>
                <RoomHeader roomId={roomId} peer={peer}/>
                <Box sx={style.swiperContainer}>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSlideChange={() => console.log('slide change')}
                        style={style.swiper}
                    >
                        <SwiperSlide>
                            <Box sx={style.myVideoContainer}>

                                {
                                    (openedRoomParticipants && openedRoomParticipants[user._id].isVideoOff)
                                    &&
                                    <img alt='avatar' src={openedRoomParticipants[user._id].avatar || '/images/monkey-avatar.png'} style={style.media}/>
                                }
                                <video height='100%' width='100%' muted ref={myVideoRef} style={openedRoomParticipants && openedRoomParticipants[user._id].isVideoOff ? { display: 'none' } : null}></video>
                                
                                <Typography variant='h6' sx={style.name}>
                                    { user.name ? user.name : '' }
                                </Typography>

                            </Box>
                        </SwiperSlide> 
                        <SwiperSlide>
                            {
                                !isGuestVideoExpanded
                                ?
                                <Grid container gap={2} sx={style.guestsContainer}>
                                    {
                                        remoteUsersStreams.length
                                        ?
                                        [
                                            ...new Map(remoteUsersStreams.map((item)=>[item["peerId"], item])).values()
                                        ].map(( { peerId, stream } )=>{  

                                            return <Grid item sx={style.guest} key={stream.id} onClick={()=>expandGuestVideo(peerId, stream)}>
                                                {
                                                    openedRoomParticipants
                                                    ?
                                                        openedRoomParticipants[peerId].isVideoOff
                                                        ?
                                                        <img alt='avatar' src={openedRoomParticipants[peerId].avatar || '/images/monkey-avatar.png'} style={style.guestMedia}/>
                                                        :
                                                        <GuestVideo stream={stream} style={style}/>
                                                        :
                                                    null
                                                }
                                                <Typography variant='body1' sx={style.guestName}>
                                                    { 
                                                        openedRoomParticipants[peerId]
                                                        ?
                                                        openedRoomParticipants[peerId].name
                                                        :
                                                        ''
                                                    }
                                                </Typography>
                                            </Grid>
                                        })
                                        :
                                        null
                                    }
                                </Grid>
                                :
                                <Box sx={style.expandedGuestContainer}>
                                    <IconButton sx={style.expandedVideoBackBtn} onClick={shrinkGuestVideo}>
                                        <CloseIcon/>
                                    </IconButton>
                                    {
                                        openedRoomParticipants
                                        ?
                                            openedRoomParticipants[expandedGuestData.peerId].isVideoOff
                                            ?
                                            <img alt='avatar' src={openedRoomParticipants[expandedGuestData.peerId].avatar || '/images/monkey-avatar.png'} style={style.media}/>
                                            :
                                            <GuestVideo stream={expandedGuestData.stream} style={style} expanded={true}/>
                                            :
                                        null
                                    }
                                    <Typography variant='h6' sx={style.name}>
                                        { 
                                            openedRoomParticipants[expandedGuestData.peerId]
                                            ?
                                            openedRoomParticipants[expandedGuestData.peerId].name
                                            :
                                            ''
                                        }
                                    </Typography>
                                </Box>
                            }
                        </SwiperSlide>
                    </Swiper>
                </Box>
                <RoomFooter roomId={roomId} userId={user._id} myStream={myStream} socket={socket} peer={peer} calls={calls}/>

            </Box>
            {
                receivedFiles.length
                ?
                <Box sx={style.receivedFiles}>
                    {
                        receivedFiles.map((receivedFile)=>{
                            return(
                                <Box sx={style.receivedFile} key={receivedFile.cloudinaryId}>
                                    <Typography variant='body1' sx={style.receivedFileName}>
                                        { receivedFile.name }
                                    </Typography>
                                    <Fab sx={style.receivedFileDownloadBtn} onClick={()=> downloadFile(receivedFile)}>
                                        <FileDownloadIcon/>
                                    </Fab>
                                    <Fab sx={style.receivedFileCrossBtn} onClick={()=> dispatch(removeFileFromReceivedFiles(receivedFile.cloudinaryId))}>
                                        <CloseIcon/>
                                    </Fab>
                                </Box>   
                            )
                        })
                }
                </Box>
                :
                null
            }
            {
                alert.showAlert && <Snackbar open={alert.showAlert} autoHideDuration={3000} onClose={()=>dispatch(resetAlert(''))}>
                    <Alert onClose={()=>dispatch(resetAlert(''))} severity={alert.severity} sx={{ width: '100%' }} variant='filled'>
                        { alert.message }
                    </Alert>
                </Snackbar>
            }
        </>
    )
}

export default SingleRoom;