import { useState } from "react";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedSharpIcon from '@mui/icons-material/SentimentSatisfiedSharp';
import Picker from 'emoji-picker-react';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessage } from "../../redux/roomsSlice";
import { useParams } from "react-router-dom";






const style = {
    chatFooter: {
        width: '100%',
        height: '100px',
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        padding: '0px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '280px',
        height: '45px',
        backgroundColor: '#262626',
        borderRadius: '10px',
        padding: '0px 15px',
        paddingTop: '6.7px'
    },
    sendBtn: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    emojiBtn: {
        cursor: 'pointer',
        color: 'text.secondary'
    }
}
const ChatFooter = () => {

    const { rooms: { socket }, auth: { user } } = useSelector((state)=>state)
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { roomId } = useParams();
    const dispatch = useDispatch();




    const onEmojiClick = (event, emojiObject) => {
        setMessage(message+emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleMessageKeyUp = (e)=>{
        if(e.keyCode===13){
            sendMessage();
        }
    }

    function sendMessage(){
        if(!message.length){
            alert('Message should not be empty!');
            return;
        }
        
        const newMessage = {
            _id: new Date(Date.now()),
            text: message,
            authorId: user._id,
            authorName: user.name,
            authorAvatar: user.avatar
        };

        dispatch(appendMessage({ message: newMessage, fromMe: true }));
        setMessage('');

        socket.emit('new message', roomId, newMessage);
    }


    return (
        <Box sx={style.chatFooter}>
            <TextField 
                type='text'
                placeholder='Send a message to everyone'
                variant="standard"
                autoComplete="off"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton sx={style.emojiBtn} onClick={()=> setShowEmojiPicker(!showEmojiPicker)}>
                                <SentimentSatisfiedSharpIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                    style: { fontSize: '1rem', color: '#C4C5C5' }
                }}
                sx={style.input}
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
                onKeyUp={handleMessageKeyUp}
                required
            ></TextField>
            <IconButton sx={style.sendBtn} onClick={sendMessage}>
                <SendIcon/>
            </IconButton>

            {
                showEmojiPicker && <Picker pickerStyle={{ position: 'absolute', left:'10px', bottom: '100px'}} onEmojiClick={onEmojiClick}/>
            }
        </Box>
    )
}

export default ChatFooter;