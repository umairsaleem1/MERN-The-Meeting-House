import { useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Peer from 'peerjs';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleRoom, setRoomsParticipants } from '../redux/roomsSlice';
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


let peer = null;

const SingleRoom = () => {

    const { rooms: { socket, openedRoom }, auth: { user } } = useSelector((state)=> state);
    const [myStream, setMyStream] = useState(null);
    const [remoteUsersStreams, setRemoteUsersStreams] = useState([]);
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

                    socket.emit('join room', roomId, user._id);

                    socket.on('roomsParticipants', (roomsParticipants)=>{

                        dispatch(setRoomsParticipants(roomsParticipants));
    
                        const currentRoomParticipants = Object.values(roomsParticipants[roomId]);
                        let myIdIndex = currentRoomParticipants.indexOf(user._id);
                        currentRoomParticipants.splice(myIdIndex, 1);
                        

                        const otherPeerIds = Object.values(currentRoomParticipants);
                        otherPeerIds.forEach((otherPeerId)=>{

                            const mediaConnection = peer.call(otherPeerId, myStream);
                            
                            let id;
                            mediaConnection.on('stream', (remoteUserStream)=>{
                                if(id!==remoteUserStream.id){
                                    id = remoteUserStream.id;
                                    console.log(remoteUserStream);
                                    setRemoteUsersStreams([...remoteUsersStreams, remoteUserStream]);
                                }
                            });

                        })
                    })
    
    
                    peer.on('call', (mediaConnection)=>{
                        // console.log('call received')
                        mediaConnection.answer(myStream);
    
                        let id;
                        mediaConnection.on('stream', (remoteUserStream)=>{
                            if(id!==remoteUserStream.id){
                                id = remoteUserStream.id;
                                // console.log('stream received')
                                setRemoteUsersStreams([...remoteUsersStreams, remoteUserStream]);
                                console.log(remoteUserStream);
                            }
                        });
                    }) 
                })  

            })
            .catch((e)=>{
                console.log(e);
            })

        }
  
    }, [socket, roomId, openedRoom, user._id])







    return (
        <Box sx={style.container}>
            <RoomHeader roomId={roomId}/>
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
                                remoteUsersStreams.map((stream)=>{  

                                return <Grid item sx={style.guest} key={stream.id}>
                                        <GuestVideo stream={stream} style={style}/>
                                        {/* <img alt='avatar' src='/images/monkey-avatar.png' sx={style.guestAvatar}/> */}
                                        <Typography variant='body1' sx={style.guestName}>
                                            Umair Saleem
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
            <RoomFooter/>

        </Box>
    )
}

export default SingleRoom;