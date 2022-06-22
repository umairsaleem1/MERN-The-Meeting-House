import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    roomsFetchingCompleted: false,
    roomsParticipants: null,
    roomSearchString: '',
    socket: null,
    socketEventsRegistered: false,
    onlineUsers: [],
    openedRoom: null,
    openedRoomParticipants: null,
    remoteUsersStreams: [],
    roomEndedForAll: false,
    isAllParticipantsMicMuted: false,
    messages: [],
    receivedFiles: [],
    alert: { showAlert: false, severity:'', message: '' },
    isMsgNotificationMuted: false,
    isChatScreenOpened: false,
    isUnreadMessagesPresent: false
  },
  reducers: {
    setRooms(state, action) {
      state.rooms = action.payload;
    },
    setRoomsFetchingCompleted(state, action){
      state.roomsFetchingCompleted = action.payload;
    },
    addNewRoomForRoomCreator(state, action){
      if(action.payload.room.type==='public'){
        state.rooms = [action.payload.room, ...state.rooms];
        if(action.payload.socket){
          action.payload.socket.emit('new room', action.payload.room);
        }
      }
      action.payload.navigate(`/${action.payload.room._id}`);
    },
    addNewRoom(state, action){
      state.rooms = [action.payload, ...state.rooms];
    },
    removeRoom(state, action){
      const updatedRooms = state.rooms.filter((room)=>{
        return room._id!==action.payload;
      })
      state.rooms = updatedRooms;
    },
    setRoomsParticipants(state, action){
      state.roomsParticipants = action.payload;
    },
    setRoomSearchString(state, action){
      state.roomSearchString = action.payload;
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setSocketEventsRegistered(state, action) {
      state.socketEventsRegistered = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setOpenedRoom(state, action) {
      state.openedRoom = action.payload;
    },
    setOpenedRoomParticipants(state, action) {
      state.openedRoomParticipants = action.payload;
    },
    setRemoteUsersStreams(state, action) {
      state.remoteUsersStreams = action.payload;
    },
    appendStreamToRemoteUsersStreams(state, action) {
      state.remoteUsersStreams = [...state.remoteUsersStreams, action.payload];
    },
    removeStreamFromRemoteUsersStreams(state, action) {
      let updatedStreams = state.remoteUsersStreams.filter((stream) => {
        return stream.peerId !== action.payload.userId;
      });

      state.remoteUsersStreams = updatedStreams;
    },
    setRoomEndedForAll(state, action) {
      state.roomEndedForAll = action.payload;
    },
    toggleMyMic(state, action) {
      const roomParticipants = state.openedRoomParticipants;

      roomParticipants[action.payload.userId] = {
        ...roomParticipants[action.payload.userId],
        isMicMuted: action.payload.value,
      };
      state.openedRoomParticipants = roomParticipants;

    },
    toggleMyVideo(state, action) {
      const roomParticipants = state.openedRoomParticipants;

      roomParticipants[action.payload.userId] = {
        ...roomParticipants[action.payload.userId],
        isVideoOff: action.payload.value,
      };

      state.openedRoomParticipants = roomParticipants;
    },
    setIsAllParticipantsMicMuted(state, action) {
      state.isAllParticipantsMicMuted = action.payload;
    },
    setIsMyMicMutedByRoomCreator(state, action) {
      const roomParticipants = state.openedRoomParticipants;

      roomParticipants[action.payload.userId] = {
        ...roomParticipants[action.payload.userId],
        isMyMicMutedByRoomCreator: action.payload.value,
        isMicMuted: false,
      };

      state.openedRoomParticipants = roomParticipants;
      
    },
    appendMessage(state, action) {
      state.messages.push(action.payload.message);
      if(!state.isMsgNotificationMuted && !action.payload.fromMe){
        state.alert = { showAlert: true, severity: 'info', message: `${action.payload.message.authorName} sent a message` };
      }
    },
    resetMessages(state, action) {
      state.messages = action.payload;
    },
    setReceivedFiles(state, action){
      state.receivedFiles = action.payload;
    },
    addFileToReceivedFiles(state, action){
      state.receivedFiles.unshift(action.payload);
    },
    removeFileFromReceivedFiles(state, action){
      const updatedFiles = state.receivedFiles.filter((file)=>{
        return file.cloudinaryId!==action.payload;
      })

      state.receivedFiles = updatedFiles;
    },
    setErrorAlert(state, action){
      state.alert = { showAlert: true, severity: 'error', message: action.payload };
    },
    setInfoAlert(state, action){
        state.alert = { showAlert: true, severity: 'info', message: action.payload };
    },
    setSuccessAlert(state, action){
      state.alert = { showAlert: true, severity: 'success', message: action.payload };
    },
    resetAlert(state, action){
      state.alert = { showAlert: false, severity: '', message: action.payload };
    },
    setIsMsgNotificationMuted(state, action){
      state.isMsgNotificationMuted = action.payload;
    }, 
    setIsChatScreenOpened(state, action){
      state.isChatScreenOpened = action.payload;
    },
    setIsUnreadMessagesPresent(state, action){
      state.isUnreadMessagesPresent = action.payload;
    }
  },
});

export const {
  setRooms,
  setRoomsFetchingCompleted,
  addNewRoomForRoomCreator,
  addNewRoom,
  removeRoom,
  setRoomsParticipants,
  setRoomSearchString,
  setSocket,
  setSocketEventsRegistered,
  setOnlineUsers,
  setOpenedRoom,
  setOpenedRoomParticipants,
  setRemoteUsersStreams,
  appendStreamToRemoteUsersStreams,
  removeStreamFromRemoteUsersStreams,
  setRoomEndedForAll,
  toggleMyMic,
  toggleMyVideo,
  setIsAllParticipantsMicMuted,
  setIsMyMicMutedByRoomCreator,
  appendMessage,
  resetMessages,
  setReceivedFiles,
  addFileToReceivedFiles,
  removeFileFromReceivedFiles,
  setErrorAlert,
  setInfoAlert,
  setSuccessAlert,
  resetAlert,
  setIsMsgNotificationMuted,
  setIsChatScreenOpened,
  setIsUnreadMessagesPresent
} = roomsSlice.actions;
export default roomsSlice.reducer;








// Thunks

export function createRoom(roomData, setTopic, setSelectedRoomType, setShowLoader, setOpenModal, navigate, socket) {
  return async function createRoomThunk(dispatch) {
    setShowLoader(true);
    try {
      const res = await fetch("/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();

      setShowLoader(false);
      setOpenModal(false);
      setTopic("");
      setSelectedRoomType("public");
      dispatch(addNewRoomForRoomCreator({ room: data.createdRoom, navigate, socket }));

    } catch (e) {
      console.log(e);
    }
  };
}

export function getAllPublicRooms() {
  return async function getAllPublicRoomsThunk(dispatch, getState) {
    const { roomsFetchingCompleted } = getState().rooms;
    if(roomsFetchingCompleted){
      return;
    }
    dispatch(setRoomsFetchingCompleted(false));
    try {
      const res = await fetch("/rooms");
      if (!res.ok) {
        throw new Error(res.stausText);
      }

      const data = await res.json();

      dispatch(setRooms(data.rooms));
      dispatch(setRoomsFetchingCompleted(true));
    } catch (e) {
      console.log(e);
      dispatch(setRoomsFetchingCompleted(true));
    }
  };
}

export function getSingleRoom(roomId, navigate) {
  return async function getSingleRoomThunk(dispatch) {
    try {
      const res = await fetch(`/rooms/${roomId}`);
      if (!res.ok) {
        navigate("/");
        throw new Error(res.stausText);
      }

      const data = await res.json();

      dispatch(setOpenedRoom(data.room));
    } catch (e) {
      console.log(e);
    }
  };
}





export function deleteRoom(roomId){
  return async function deleteRoomThunk(){
    try{
      const res = await fetch(`/rooms/${roomId}`, {
        method: 'DELETE'
      });

      if(!res.ok){
        throw new Error(res.statusText);
      }

      await res.json();

    }catch(e){
      console.log(e);
    }
  }
}
