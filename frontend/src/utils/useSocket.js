import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, setSocketEventsRegistered, setOnlineUsers, removeStreamFromRemoteUsersStreams, setOpenedRoomParticipants, setRoomEndedForAll, appendMessage, addFileToReceivedFiles, setReceivedFiles, setInfoAlert, addNewRoom, removeRoom, setRoomsParticipants, setIsUnreadMessagesPresent } from "../redux/roomsSlice";
import io from 'socket.io-client';
import { baseURL } from "../config/baseURL";


export const useSocket = () => {

    const { rooms: { socket, socketEventsRegistered, isChatScreenOpened }, auth: { user } } = useSelector((state)=> state);
    const dispatch = useDispatch();





    useEffect(()=>{

        if(user){

            if(!socket){

                const socketConn = io(baseURL, { transports: ['websocket']});
                dispatch(setSocket(socketConn));
                
            }
            else if(socket && !socketEventsRegistered){
                
                socket.emit('new connection', user._id);

                
                socket.on('onlineUsers', (users)=>{
                    dispatch(setOnlineUsers(users));
                });


                socket.on('rooms participants', (roomsParticipants)=>{
                    dispatch(setRoomsParticipants(roomsParticipants));
                });


                socket.on('new room', (room)=>{
                    dispatch(addNewRoom(room));
                })

                socket.on('remove room', (roomId)=>{
                    dispatch(removeRoom(roomId));
                });


                socket.on('updatedRoomParticipants', (participants, alert)=>{
                    dispatch(setOpenedRoomParticipants(participants));
                    if(alert){
                        dispatch(setInfoAlert(alert));
                    }
                })


                socket.on('participant left', (userId, participants, alert)=>{
                    dispatch(removeStreamFromRemoteUsersStreams({ userId }));
                    dispatch(setOpenedRoomParticipants(participants));
                    dispatch(setInfoAlert(alert));
                });


                socket.on('room ended', (alert)=>{
                    dispatch(setRoomEndedForAll(true));
                    dispatch(setInfoAlert(alert));
                });



                socket.on('new message', (newMessage)=>{
                    dispatch(appendMessage({ message: newMessage, fromMe: false }));
                    if(!isChatScreenOpened){
                        dispatch(setIsUnreadMessagesPresent(true));
                    }
                })


                socket.on('receive files', (data)=>{
                    dispatch(setReceivedFiles(data));
                })


                socket.on('receive file', (data)=>{
                    dispatch(addFileToReceivedFiles(data));
                })

        


                dispatch(setSocketEventsRegistered(true));

            }

        }

    }, [socket, dispatch, user, socketEventsRegistered, isChatScreenOpened]);




}
