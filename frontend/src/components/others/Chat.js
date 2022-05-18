import React, { useState } from 'react';
import { Box, Dialog, Typography, Button, Slide, IconButton } from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import { useSelector } from 'react-redux';
import ChatNotificationModal from './ChatNotificationModal';
import Message from './Message';
import ChatFooter from './ChatFooter';




const style = {
    chatDialog: {
        position: 'fixed',
        left: 'calc(100% - 350px)',
        top: '0px',
        width: '350px'
    },
    chat: {
        backgroundColor: 'background.secondary',
        height: '100%',
        position: 'relative'
    },
    chatHeader: {
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
    title: {
        fontWeight: 'bold', 
        fontSize: '18px', 
        position: 'relative', 
        left: '-17px'
    },
    notificationsBtn: {
        color: 'blue',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    messagesContainer: {
        width: '100%',
        height: 'calc(100% - 160px)',
        // border: '2px solid blue',
        overflow: 'auto',
        padding: '20px 0px'
    }
}
const TransitionComponent = React.forwardRef(function TransitionComponent(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const Chat = ( { openChatDialog, setOpenChatDialog } ) => {

    const { rooms: { messages }, auth: { user } } = useSelector((state)=>state);
    const [openChatNotificationModal, setOpenChatNotificationModal] = useState(false);
    const [isMsgNotificationMuted, setIsMsgNotificationMuted] = useState(false);
    // const [messages, setMessages] = useState([{id:1, author:'usman'},{id:2, author:'faheem'},{id:3, author:'me'},{id:4, author:'me'},{id:5, author:'qasim'},{id:6, author:'qasim'}]);


    return (
        <Dialog
            open={openChatDialog}
            TransitionComponent={TransitionComponent}
            keepMounted
            fullScreen={true}
            onClose={()=> setOpenChatDialog(false)}
            sx={style.chatDialog}
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
            <Box sx={style.chat}>
                <Box sx={style.chatHeader}>
                    <Button sx={style.closeBtn} onClick={()=> setOpenChatDialog(false)}>
                        Close
                    </Button>
                    <Typography variant='body1' sx={style.title}>
                        Chat
                    </Typography>
                    <IconButton sx={style.notificationsBtn} onClick={()=> setOpenChatNotificationModal(true)}>
                        {
                            isMsgNotificationMuted
                            ?
                            <NotificationsOffOutlinedIcon/>
                            :
                            <NotificationsNoneOutlinedIcon/>
                        }
                    </IconButton>
                </Box>

                <ChatNotificationModal openChatNotificationModal={openChatNotificationModal} setOpenChatNotificationModal={setOpenChatNotificationModal} isMsgNotificationMuted={isMsgNotificationMuted} setIsMsgNotificationMuted={setIsMsgNotificationMuted}/>

                <Box sx={style.messagesContainer}>
                    {
                        messages.length
                        ?
                        [
                            ...new Map(messages.map((item)=>[item["_id"], item])).values()
                        ].map((message, index)=>{
                            return <Message key={message._id} message={message} prevMessage={messages[index-1]} messageNo={index+1} user={user} />
                        })
                        :
                        null
                    }
                </Box>
                
                <ChatFooter/>

            </Box>
        </Dialog>
    )
}

export default Chat;