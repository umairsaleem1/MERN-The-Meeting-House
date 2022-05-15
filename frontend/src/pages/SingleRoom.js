import { useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography, Snackbar, Alert } from '@mui/material';
import Peer from 'peerjs';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleRoom, setOpenedRoomParticipants, appendStreamToRemoteUsersStreams } from '../redux/roomsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import RoomFooter from '../components/others/RoomFooter';
import RoomHeader from '../components/others/RoomHeader';
import GuestVideo from '../components/others/GuestVideo';
import { useSocket } from '../utils/useSocket';
import 'swiper/css';
import 'swiper/css/pagination';




const style = {
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: 'background.primary',
    },
    swiperContainer: {
        width: '100%',
        height: 'calc(100vh - 160px)'
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
        padding: '70px 0px'
    },
    media: {
        width: '90%',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    name: {
        position: 'absolute',
        left: '30px',
        bottom: '20px',
        color: 'text.primary'
    },
    guestsContainer: {
        height: '100%',
        width: '100%',
        border: '3px solid blue',
        overflow: 'auto'
    },
    guest: {
        width: '280px',
        height: '350px',
        border: '1px solid red',
        borderRadius: '7px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginRight: '10px',
        marginBottom: '30px'
    },
    guestMedia: {
        height: '100%',
        width: '100%'
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
    }
}

export let peer = null;

const SingleRoom = () => { 

    const { rooms: { socket, openedRoom, openedRoomParticipants, remoteUsersStreams }, auth: { user } } = useSelector((state)=> state);
    const [alert, setAlert] = useState({ showAlert: false, severity: '', message: ''});
    const [myStream, setMyStream] = useState(null);
    const { roomId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myVideoRef = useRef();
    useSocket();

    
    

    



    useEffect(()=>{

        if(roomId){
            dispatch(getSingleRoom(roomId, navigate));
        }
        
    }, [roomId, navigate, dispatch])


    useEffect(()=>{
        if(socket && openedRoom){

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
                                setAlert({ setAlert: true, severity: 'error', message: 'Connection failure!'});
                            })

                        });
                        
                    })
    
    
                    peer.on('call', (mediaConnection)=>{

                        mediaConnection.answer(myStream);
    
                        let id;
                        mediaConnection.on('stream', (remoteUserStream)=>{
                            if(id!==remoteUserStream.id){
                                id = remoteUserStream.id;
                                dispatch(appendStreamToRemoteUsersStreams({ peerId: mediaConnection.peer, stream: remoteUserStream }));
                            }
                        });
                    }) 

                    
                    peer.on('error', (err)=>{
                        console.log(err);
                        setAlert({ showAlert: true, severity: 'error', message: 'Connection failure!'});
                    })

                })  

            })
            .catch((e)=>{
                console.log(e);
                setAlert({ showAlert: true, severity: 'error', message: 'Cannot get local microphone or camera'});
            })

        }
  
    }, [socket, roomId, openedRoom, user._id, user.name, user.avatar, dispatch])







    return (
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
                                {/* <img alt='avatar' src='/images/monkey-avatar.png' sx={style.media}/> */}
                                <video style={style.media} muted ref={myVideoRef}></video>
                                <Typography variant='h6' sx={style.name}>
                                    { user.name ? user.name : '' }
                                </Typography>
                            </Box>
                        </SwiperSlide> 
                        <SwiperSlide>
                            <Grid container justifyContent='space-evenly' sx={style.guestsContainer}>
                                {
                                    remoteUsersStreams.length
                                    ?
                                    [
                                        ...new Map(remoteUsersStreams.map((item)=>[item["peerId"], item])).values()
                                    ].map(( { peerId, stream } )=>{  

                                        return <Grid item sx={style.guest} key={stream.id}>
                                            <GuestVideo stream={stream} style={style}/>
                                            {/* <img alt='avatar' src='/images/monkey-avatar.png' sx={style.guestAvatar}/> */}
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
                        </SwiperSlide>
                    </Swiper>
                </Box>
                <RoomFooter myStream={myStream}/>

            </Box>
            {
            alert.showAlert && <Snackbar open={alert.showAlert} autoHideDuration={3000} onClose={()=>setAlert({ showAlert: false, severity: '', message: '' })}>
                <Alert onClose={()=>setAlert({ showAlert: false, severity: '', message: '' })} severity={alert.severity} sx={{ width: '100%' }} variant='filled'>
                    { alert.message }
                </Alert>
            </Snackbar>
            }
        </>
    )
}

export default SingleRoom;