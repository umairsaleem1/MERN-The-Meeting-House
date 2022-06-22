import React, { useState, useEffect, useRef } from 'react';
import { Box, Dialog, Typography, Button, Slide, IconButton } from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { setIsChatScreenOpened, setIsUnreadMessagesPresent } from '../../redux/roomsSlice';
import ChatNotificationModal from './ChatNotificationModal';
import Message from './Message';
import ChatFooter from './ChatFooter';




const style = {
    chatDialog: {
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

    const { rooms: { messages, isMsgNotificationMuted, isChatScreenOpened }, auth: { user } } = useSelector((state)=>state);
    const [openChatNotificationModal, setOpenChatNotificationModal] = useState(false);
    const messagesContainerRef = useRef();
    const dispatch = useDispatch();




    useEffect(()=>{
        if(messagesContainerRef.current){
            messagesContainerRef.current.scrollTo({top:messagesContainerRef.current.scrollHeight, left:0});
        }
    }, [messages])

    useEffect(()=>{
        dispatch(setIsUnreadMessagesPresent(false));
    }, [dispatch, isChatScreenOpened])


    return (
        <Dialog
            open={openChatDialog}
            TransitionComponent={TransitionComponent}
            keepMounted
            fullScreen={true}
            onClose={()=> {
                setOpenChatDialog(false)
                dispatch(setIsChatScreenOpened(false))
            }}
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
                    <Button sx={style.closeBtn} onClick={()=> {
                        setOpenChatDialog(false)
                        dispatch(setIsChatScreenOpened(false))
                    }}>
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

                <ChatNotificationModal openChatNotificationModal={openChatNotificationModal} setOpenChatNotificationModal={setOpenChatNotificationModal}/>

                <Box sx={style.messagesContainer} ref={messagesContainerRef}>
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