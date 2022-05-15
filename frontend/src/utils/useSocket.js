import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, setSocketEventsRegistered, setOnlineUsers, removeStreamFromRemoteUsersStreams, setOpenedRoomParticipants, setRoomEndedForAll } from "../redux/roomsSlice";
import io from 'socket.io-client';
import { baseURL } from "../config/baseURL";


export const useSocket = () => {

    const { rooms: { socket, socketEventsRegistered }, auth: { user } } = useSelector((state)=> state);
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


                socket.on('updatedRoomParticipants', (participants)=>{
                    dispatch(setOpenedRoomParticipants(participants));
                })


                socket.on('participant left', (userId, participants)=>{
                    dispatch(removeStreamFromRemoteUsersStreams({ userId }));
                    dispatch(setOpenedRoomParticipants(participants));
                });


                socket.on('room ended', ()=>{
                    dispatch(setRoomEndedForAll(true));
                });

        


                dispatch(setSocketEventsRegistered(true));

            }

        }

    }, [socket, dispatch, user, socketEventsRegistered]);




}
