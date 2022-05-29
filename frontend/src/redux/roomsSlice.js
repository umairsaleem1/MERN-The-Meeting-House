import { createSlice } from '@reduxjs/toolkit';



const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
        socket: null,
        socketEventsRegistered: false,
        onlineUsers: [],
        openedRoom: null,
        openedRoomParticipants: null,
        remoteUsersStreams: [],
        roomEndedForAll: false,
        isAllParticipantsMicMuted: false,
        messages: []
    },
    reducers: {
        setRooms(state, action){
            state.rooms = [...state.rooms, ...action.payload];
        },
        setSocket(state, action){
            state.socket = action.payload;
        },
        setSocketEventsRegistered(state, action){
            state.socketEventsRegistered = action.payload;
        },
        setOnlineUsers(state, action){
            state.onlineUsers = action.payload;
        },
        setOpenedRoom(state, action){
            state.openedRoom = action.payload;
        },
        setOpenedRoomParticipants(state, action){
            state.openedRoomParticipants = action.payload;
        },
        setRemoteUsersStreams(state, action){
            state.remoteUsersStreams = action.payload;
        },
        appendStreamToRemoteUsersStreams(state, action){
            state.remoteUsersStreams = [...state.remoteUsersStreams, action.payload];
        },
        removeStreamFromRemoteUsersStreams(state, action){

            let updatedStreams = state.remoteUsersStreams.filter((stream)=>{
                return stream.peerId!==action.payload.userId;
            })
            
            state.remoteUsersStreams = updatedStreams;
        },
        setRoomEndedForAll(state, action){
            state.roomEndedForAll = action.payload;
        },
        toggleMyMic(state, action){
            const roomParticipants = state.openedRoomParticipants;
            roomParticipants[action.payload.userId] = { ...roomParticipants[action.payload.userId], isMicMuted: action.payload.value };
            state.openedRoomParticipants = roomParticipants;
        },
        toggleMyVideo(state, action){
            const roomParticipants = state.openedRoomParticipants;
            roomParticipants[action.payload.userId] = { ...roomParticipants[action.payload.userId], isVideoOff: action.payload.value };
            state.openedRoomParticipants = roomParticipants;
        },
        setIsAllParticipantsMicMuted(state, action){
            state.isAllParticipantsMicMuted = action.payload;
        },
        setIsMyMicMutedByRoomCreator(state, action){
            const roomParticipants = state.openedRoomParticipants;
            roomParticipants[action.payload.userId] = { ...roomParticipants[action.payload.userId], isMyMicMutedByRoomCreator: action.payload.value, isMicMuted: false };
            state.openedRoomParticipants = roomParticipants;
        },
        appendMessage(state, action){
            state.messages.push(action.payload);
        },
        resetMessages(state, action){
            state.messages = action.payload;
        }
    }
});



export const { setRooms, setSocket, setSocketEventsRegistered, setOnlineUsers, setOpenedRoom, setOpenedRoomParticipants, setRemoteUsersStreams, appendStreamToRemoteUsersStreams, removeStreamFromRemoteUsersStreams, setRoomEndedForAll, toggleMyMic, toggleMyVideo, setIsAllParticipantsMicMuted ,setIsMyMicMutedByRoomCreator, appendMessage, resetMessages } = roomsSlice.actions;
export default roomsSlice.reducer;







// Thunks

export function createRoom(roomData, setTopic, setSelectedRoomType, setShowLoader, setOpenModal){

    return async function createRoomThunk(dispatch){

        setShowLoader(true);
        try{
            const res = await fetch('/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(roomData)
            });

            if(!res.ok){
                throw new Error(res.statusText);
            }

            const data = await res.json();

            setShowLoader(false);
            setOpenModal(false);
            setTopic('');
            setSelectedRoomType('public');
            dispatch(setRooms(data.createdRoom));

        }catch(e){
            console.log(e);
        }
    }
}




export function getAllPublicRooms(){
    return async function getAllPublicRoomsThunk(dispatch){
        try{
            const res = await fetch('/rooms');
            if(!res.ok){
                throw new Error(res.stausText);
            }

            const data = await res.json();

            dispatch(setRooms(data.rooms));

        }catch(e){
            console.log(e);
        }
    }
}






export function getSingleRoom(roomId, navigate){
    return async function getSingleRoomThunk(dispatch){
        try{
            const res = await fetch(`/rooms/${roomId}`);
            if(!res.ok){
                navigate('/');
                throw new Error(res.stausText);
            }

            const data = await res.json();

            dispatch(setOpenedRoom(data.room));

        }catch(e){
            console.log(e);
        }
    }
}