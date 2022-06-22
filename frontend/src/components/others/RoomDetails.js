import { useState } from "react";
import { Box, Grid, Button, Dialog, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from "react-redux";
import TransitionComponent from '../shared/TransitionComponent';






const style = {
    meetingDetailsDialog: {
        position: 'fixed',
        left: 'calc(50% - 175px)',
        top: '60px',
        width: '350px',
    },
    meetingDetails: {
        padding: '20px',
        backgroundColor: 'rgba(18, 18, 18, 0.88)',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        height: 'auto'
    },
    meetingTopic: {
        fontWeight: 'bold',
        color: 'text.primary'
    },
    meetingDetailName: {
        color: 'text.secondary',
        width: '100px',
        fontSize: '17px'
    },
    meetingDetailValue: {
        color: 'text.primary',
        width: 'calc(100% - 100px)',
        wordWrap: 'break-word',
        fontSize: '17px'
    },
    copyInviteLinkBtn: {
        marginTop: '20px',
        fontWeight: 'bold',
        color: 'text.primary',
        width: '100%',
        backgroundColor: 'blue',
        '&:hover': {
            backgroundColor: 'blue'
        }
    },
    copiedMessage: {
        background: '#e7fce3',
        border: '1px solid #e7fce3',
        color: '#1b8748',
        borderRadius: '3px',
        fontSize: '15px',
        padding: '8px',
        lineHeight: '17px',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '15px'
    }
}
const RoomDetails = ( { openMeetingDetailsDialog, setOpenMeetingDetailsDialog, roomId } ) => {

    const { openedRoom, openedRoomParticipants} = useSelector((state)=>state.rooms);
    const [invitationLinkCopied, setInvitationLinkCopied] = useState(false);




    const handleInvitationLinkCopy = ()=>{
        setInvitationLinkCopied(true);
        setTimeout(()=>{
            setInvitationLinkCopied(false);
        }, 2000)
    }
    return (
        <Dialog
            open={openMeetingDetailsDialog}
            TransitionComponent={TransitionComponent}
            keepMounted
            fullScreen={true}
            onClose={()=> setOpenMeetingDetailsDialog(false)}
            sx={style.meetingDetailsDialog}
            style={ invitationLinkCopied ? { height: '333px' } : { height: '283px' } }
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
            <Box sx={style.meetingDetails}>
                <Typography variant='h6' sx={style.meetingTopic}>
                    { openedRoom && openedRoom.topic}
                </Typography>
                <Grid container mt={2}>
                    <Typography variant='body2' sx={style.meetingDetailName}>
                        Host
                    </Typography>
                    <Typography variant='body2' sx={style.meetingDetailValue}>
                        {
                            openedRoom && openedRoomParticipants
                            ?
                            openedRoomParticipants[openedRoom.creator] && openedRoomParticipants[openedRoom.creator].name
                            :
                            ''
                        }
                    </Typography>
                </Grid>
                <Grid container flexWrap='wrap' mt={2}>
                    <Typography variant='body2' sx={style.meetingDetailName}>
                        Invite Link
                    </Typography>
                    <Typography variant='body2' sx={style.meetingDetailValue}>
                        https://www.themeetinghouse.herokuapp.com/rooms/{roomId}
                    </Typography>
                </Grid>

                <CopyToClipboard text='https://www.themeetinghouse.herokuapp.com' onCopy={handleInvitationLinkCopy}>
                    <Button startIcon={<ContentCopyIcon/>} variant='contained' sx={style.copyInviteLinkBtn}>
                        Copy Invite Link
                    </Button>
                </CopyToClipboard>
                {
                    invitationLinkCopied && <Typography variant='body2' sx={style.copiedMessage}>
                        Copied!
                    </Typography>
                }
            </Box>
        </Dialog>
    )
}

export default RoomDetails;